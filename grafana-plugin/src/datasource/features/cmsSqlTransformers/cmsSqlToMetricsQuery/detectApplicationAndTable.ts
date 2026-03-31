import { skipUntil, parseFromClause } from './parser';
import { tokenize } from './tokenizer';

export function detectApplicationAndTable(cmsSqlSource: string): { applicationCode: string; tableId?: string } | null {
  try {
    const tokens = tokenize(cmsSqlSource);
    const [_, start] = skipUntil(tokens, 'from_keyword');
    const [from] = parseFromClause(start, true);
    if (!from) {
      return null;
    }

    const tableIdentifier = from.tables[0];
    if (!tableIdentifier) {
      return null;
    }

    if (tableIdentifier.nodeType !== 'qualified_identifier') {
      return {
        applicationCode: tableIdentifier.token.tokenText.toUpperCase(),
      };
    }
    return {
      applicationCode: tableIdentifier.left.tokenText.toUpperCase(),
      tableId: tableIdentifier.right.tokenText.toUpperCase(),
    };
  } catch (_) {
    return null;
  }
}
