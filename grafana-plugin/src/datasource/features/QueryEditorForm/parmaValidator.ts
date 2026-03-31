import { MetricsQueryParma } from 'datasource/domain';

export function parmaIsNodelist(parma: MetricsQueryParma): boolean {
  return parma.name.toUpperCase() === 'NODELIST';
}

export function haveParmasWithProblem(parmas: MetricsQueryParma[]): boolean {
  return parmas.some((parma) => parmaIsNodelist(parma));
}
