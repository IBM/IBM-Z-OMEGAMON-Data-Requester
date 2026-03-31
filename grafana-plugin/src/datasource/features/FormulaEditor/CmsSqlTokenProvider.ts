import { monacoTypes } from '@grafana/ui';

import { tokenize, Token } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/tokenizer';

const CMS_SQL_TOKENIZER_STATE: monacoTypes.languages.IState = {
  // cms-sql tokenizer is stateless
  clone: () => CMS_SQL_TOKENIZER_STATE,
  equals: () => true,
};

function kindToScope(token: Token): string {
  const { kind, genericKind } = token;
  if (kind === 'variable') {
    return 'variable.cms-sql';
  }

  if (kind === 'identifier') {
    return 'identifier.cms-sql';
  }
  if (genericKind === 'keyword') {
    const [keywordType] = kind.split('_');
    return `keyword.${keywordType}.cms-sql`;
  }
  if (genericKind === 'condition_connector') {
    return 'keyword.connector.cms-sql';
  }
  if (genericKind === 'literal') {
    if (kind === 'string_literal') {
      return 'string.cms-sql';
    }
    return 'number.cms-sql';
  }

  if (genericKind === 'parenthesis') {
    return 'delimiter.parenthesis.cms-sql';
  }

  if (kind === 'whitespace_separator') {
    return 'white.cms-sql';
  }

  if (genericKind === 'arithmetic_operator' || genericKind === 'comparison_operator') {
    return 'operator.cms-sql';
  }
  if (genericKind === 'separator') {
    return 'delimiter.cms-sql';
  }

  if (genericKind === 'order_direction') {
    return 'keyword.cms-sql';
  }

  return '';
}

export class CmsSqlTokenProvider implements monacoTypes.languages.TokensProvider {
  getInitialState(): monacoTypes.languages.IState {
    return CMS_SQL_TOKENIZER_STATE;
  }

  tokenize(line: string): monacoTypes.languages.ILineTokens {
    const tokens = tokenize(line);

    return {
      tokens: tokens.map((token) => ({ startIndex: token.startIdx, scopes: kindToScope(token) })),
      endState: CMS_SQL_TOKENIZER_STATE,
    };
  }
}
