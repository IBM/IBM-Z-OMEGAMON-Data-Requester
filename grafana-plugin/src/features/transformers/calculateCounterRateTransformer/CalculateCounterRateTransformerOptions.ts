// Copyright contributors to the IBM-Z-OMEGAMON-data-requester project.

export interface CalculateCounterRateTransformerOptions {
  sourceColumn?: string;
  counterRateColumnName?: string;
  timeColumn?: string;
  falconVersion: 1;
}
