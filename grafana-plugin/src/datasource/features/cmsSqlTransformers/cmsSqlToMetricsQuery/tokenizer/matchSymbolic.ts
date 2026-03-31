import { createToken } from './createToken';
import { scanConstant } from './scanHelpers';
import { Token } from './token';
import { SymbolicTokenKind, SYMBOLIC_TOKENS } from './tokenKind';

interface LookupElement {
  pattern: string;
  kind: SymbolicTokenKind;
}

// Converts SYMBOLIC_TOKENS to an array of LookupElement sorted by pattern
// length
function buildLookupArray(): LookupElement[] {
  return Object.entries(SYMBOLIC_TOKENS)
    .map(([generic_kind, group]) => {
      return Object.entries(group).map(([specific_kind, pattern]) => ({
        pattern,
        kind: `${specific_kind}_${generic_kind}` as SymbolicTokenKind,
      }));
    })
    .flat()
    .sort((a, b) => b.pattern.length - a.pattern.length);
}

const LOOKUP_ARRAY = buildLookupArray();

export function matchSymbolic(source: string, startPos: number): Token[] {
  for (const tokenDef of LOOKUP_ARRAY) {
    const match = scanConstant(source, startPos, tokenDef.pattern);
    if (match) {
      return [createToken(tokenDef.kind, startPos, match) as Token];
    }
  }
  return [];
}
