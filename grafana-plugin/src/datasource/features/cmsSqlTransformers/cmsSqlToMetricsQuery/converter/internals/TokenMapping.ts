import { AnySubobject, FilterProperties } from 'public-common';

import { MetricsQueryParams } from 'datasource/domain';
import { Token } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/tokenizer';

export type AnyMetricsQueryPart = AnySubobject<MetricsQueryParams>;

type MappingInstance = Record<string, Token[]>;

type FieldOf<T extends object> = T extends unknown[] ? number : keyof T & string;

export class TokenMapping {
  private storage = new Map<AnyMetricsQueryPart, MappingInstance>();
  private rootInstance: MappingInstance = {};

  registerTokens<T extends AnyMetricsQueryPart>(tokens: Token[], obj: T, field?: FieldOf<T>): void {
    if (field != null && typeof obj[field as keyof T] === 'object') {
      this.registerTokens(tokens, obj[field as keyof T] as AnyMetricsQueryPart);
      return;
    }

    const mappingInstance = this.storage.get(obj) ?? {};
    this.storage.set(obj, mappingInstance);
    const fieldVal = field?.toString() ?? '';
    const allTokens = mappingInstance[fieldVal] ?? [];
    mappingInstance[fieldVal] = allTokens;
    allTokens.push(...tokens);
  }

  registerRootAttachedNodes(
    tokens: Token[],
    field: keyof FilterProperties<
      Required<MetricsQueryParams>,
      string | number | boolean | undefined | { __brand: unknown }
    >
  ): void {
    this.rootInstance[field] = tokens;
  }

  setRoot(tokens: Token[], root: MetricsQueryParams): void {
    this.rootInstance[''] = tokens;
    this.storage.set(root, this.rootInstance);
  }

  /**
   * Get tokens from query object or any subobject
   * @param obj query object or part to get tokens from
   * @param field field from obj to get tokens from, undefined to get all tokens from obj
   */
  getTokensOf<T extends AnyMetricsQueryPart>(obj: T, field?: FieldOf<T>): Token[] {
    if (field != null && typeof obj[field as keyof T] === 'object') {
      return this.getTokensOf(obj[field as keyof T] as AnyMetricsQueryPart);
    }

    const fieldVal = field?.toString() ?? '';
    return this.storage.get(obj)?.[fieldVal] ?? [];
  }
}
