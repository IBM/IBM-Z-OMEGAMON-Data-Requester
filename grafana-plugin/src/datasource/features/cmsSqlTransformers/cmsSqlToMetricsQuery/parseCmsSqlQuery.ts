import { throwIfNullish } from 'public-common';

import { MetricsQueryParams } from 'datasource/domain';
import { MetadataLoader } from 'datasource/features/metadata';
import { validateMetricsQuery } from 'datasource/features/validation/validateMetricsQuery';

import { ConversionProblem, convertToMetricsQuery } from './converter';
import { getNodeTokens, parseSelectStatement } from './parser';
import { SubstringPosition, LinesMap, getTokensPosition, buildLinesMap, getTokenPosition } from './SubstringPosition';
import { tokenize } from './tokenizer';

export type CmsSqlParsingProblem = {
  severity: 'warning' | 'error' | 'informational';
  stage: 'tokenizer' | 'parser' | 'converter' | 'validator';
  message: string;
  position: SubstringPosition;
};

export type CmsSqlParsingResult = {
  queryObject: MetricsQueryParams | null;
  queryString: string;
  problems: CmsSqlParsingProblem[];
};

function processConvertionProblems(
  conversionProblems: ConversionProblem[],
  linesMap: LinesMap
): CmsSqlParsingProblem[] {
  const problems: CmsSqlParsingProblem[] = [];
  conversionProblems.forEach((problem) => {
    const { message, severity } = problem;
    if ('affectedAstNodes' in problem) {
      problem.affectedAstNodes.forEach((affectedAstNode) => {
        problems.push({
          severity,
          stage: 'converter' as const,
          message,
          position: getTokensPosition(getNodeTokens(affectedAstNode), linesMap),
        });
      });
    }

    if ('affectedTokens' in problem) {
      problems.push({
        severity,
        stage: 'converter' as const,
        message,
        position: getTokensPosition(problem.affectedTokens, linesMap),
      });
    }
  });

  return problems;
}

export async function parseCmsSqlQuery(
  queryString: string,
  metadataLoader: MetadataLoader
): Promise<CmsSqlParsingResult> {
  const linesMap = buildLinesMap(queryString);
  const tokens = tokenize(queryString);
  const allProblems = tokens.reduce((acc, token) => {
    const problems = token.problems.map((problem) => ({
      severity: problem.severity,
      stage: 'tokenizer' as const,
      message: problem.message,
      position: getTokenPosition(token, linesMap),
    }));
    acc.push(...problems);
    return acc;
  }, [] as CmsSqlParsingProblem[]);

  const { statement, problems: parsingProblems } = parseSelectStatement(tokens);
  allProblems.push(
    ...parsingProblems.map(({ severity, message, problemTokens }) => ({
      severity,
      stage: 'parser' as const,
      message,
      position: getTokensPosition(problemTokens, linesMap),
    }))
  );

  if (!statement) {
    return {
      queryString,
      queryObject: null,
      problems: allProblems,
    };
  }

  const {
    query: queryObject,
    problems: conversionProblems,
    getTokensOf,
  } = await convertToMetricsQuery(statement, metadataLoader);
  allProblems.push(...processConvertionProblems(conversionProblems, linesMap));

  if (queryObject) {
    (await validateMetricsQuery(queryObject, metadataLoader, getTokensOf)).forEach(
      ({ severity, message, affectedTokens }) => {
        throwIfNullish(
          affectedTokens,
          'validateMetricsQuery should always return affected tokens if getTokensOf was provided'
        );
        allProblems.push({
          severity: severity,
          stage: 'validator' as const,
          message,
          position: getTokensPosition(affectedTokens, linesMap),
        });
      }
    );
  }

  return {
    queryString,
    queryObject,
    problems: allProblems,
  };
}
