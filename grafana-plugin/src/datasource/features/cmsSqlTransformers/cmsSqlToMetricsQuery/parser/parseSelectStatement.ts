import { Token, TokenKind } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/tokenizer';

import { AstNode, SelectStatement } from './AstNode';
import { BlockParser, skipUntil } from './common';
import { parseAtFuncCall } from './parseAtFuncCall';
import { parseWhereClause, parseHavingClause } from './parseFilterGroup';
import { parseFromClause } from './parseFromClause';
import { parseGroupByClause } from './parseGroupByClause';
import { parseHistoryFuncCall } from './parseHistoryFuncCall';
import { parseOrderByClause } from './parseOrderByClause';
import { ParserError } from './ParserError';
import { parseSelectClause } from './parseSelectClause';

export type ParsingProblem = {
  severity: 'warning' | 'error';
  message: string;
  problemTokens: Token[];
};

function parseClause<T extends AstNode>(
  tokens: Token[],
  blockParser: BlockParser<T>,
  syncToken: TokenKind
): [clause: T | null, problems: ParsingProblem[], rest: Token[]] {
  const problems: ParsingProblem[] = [];
  try {
    let start = tokens;

    const [skippedTokens, newStart] = skipUntil(tokens, syncToken);
    start = newStart;

    if (skippedTokens.length) {
      problems.push({
        severity: 'error',
        message: 'Unexpected token(s) found',
        problemTokens: skippedTokens,
      });
    }

    const [clause, rest] = blockParser(start);

    return [clause, problems, rest];
  } catch (e) {
    if (e instanceof ParserError) {
      problems.push({
        severity: 'error',
        message: e.message,
        problemTokens: e.tokens,
      });
    }
    return [null, problems, tokens];
  }
}

// It's basically a definition of select statement.
// Items in this tuple represent the order in which clauses are expected to
// be in the query (and in which parser will try to parse them).
// Each tuple item contains 2 elements: parser function and sync token kind.
// Parser function is simple: it's a function that parses corresponding clause.
// Sync token kind is interesting one. One of the goals of parser is to provide
// error handling. We want parser to provide errors as helpful and as complete
// as possible. So, once we failed to parse some clause, we still have to try
// to parse the rest. This is where syncing tokens are helpful. They define
// the keyword we want particular clause to be synced with. Once we failed
// to parse, let's say, from clause, we still will find the beginning of
// where clause and parse it successfully (or report new problems)
const SELECT_STATEMENT_DEFINITION = [
  [parseSelectClause, 'select_keyword'],
  [parseFromClause, 'from_keyword'],
  [parseAtFuncCall, 'at_keyword'],
  [parseHistoryFuncCall, 'history_keyword'],
  [parseWhereClause, 'where_keyword'],
  [parseGroupByClause, 'group_keyword'],
  [parseHavingClause, 'having_keyword'],
  [parseOrderByClause, 'order_keyword'],
] as const satisfies ReadonlyArray<readonly [BlockParser, TokenKind]>;

type ExtractBlockType<T extends BlockParser> = T extends BlockParser<infer R> ? R | null : never;
type GetBlocksTuple<T extends ReadonlyArray<readonly [BlockParser, TokenKind | null]>> = {
  [K in keyof T]: ExtractBlockType<T[K][0]>;
};
type BlocksTuple = GetBlocksTuple<typeof SELECT_STATEMENT_DEFINITION>;

function runParsers(tokens: Token[]): [blocks: BlocksTuple, problems: ParsingProblem[], rest: Token[]] {
  const result: Array<AstNode | null> = [];
  const problems: ParsingProblem[] = [];
  let currPos = tokens;

  for (const [blockParser, syncWith] of SELECT_STATEMENT_DEFINITION) {
    const [clause, blockProblems, rest] = parseClause(currPos, blockParser as BlockParser, syncWith);
    result.push(clause);
    problems.push(...blockProblems);
    currPos = rest;
  }

  return [result as unknown as BlocksTuple, problems, currPos];
}

export function parseSelectStatement(tokens: Token[]): {
  statement: SelectStatement | null;
  problems: ParsingProblem[];
} {
  const [[select, from, at, history, where, groupBy, having, orderBy], underlyingProblems, rest] = runParsers(tokens);

  if (!select || !from) {
    return {
      statement: null,
      problems: [
        ...underlyingProblems,
        {
          severity: 'error',
          message: 'Both SELECT and FROM clauses are mandatory',
          problemTokens: tokens,
        },
      ],
    };
  }

  const problems = [...underlyingProblems];
  const [endOfStatement, ...afterEnd] = rest;
  const afterTheStatement = endOfStatement?.kind === 'statement_separator' ? afterEnd : rest;
  if (afterTheStatement.length !== 0 && problems.length === 0) {
    // We don't want to report this problem if there are other problems already
    // detected because this one is way too generic
    problems.push({
      severity: 'error',
      message: 'Unexpected tokens at the end of statement',
      problemTokens: afterTheStatement,
    });
  }

  return {
    statement: {
      nodeType: 'select_statement',
      select,
      from,
      at,
      history,
      where,
      groupBy,
      having,
      orderBy,
    },
    problems,
  };
}
