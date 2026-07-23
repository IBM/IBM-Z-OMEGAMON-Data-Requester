// Copyright contributors to the IBM-Z-OMEGAMON-data-requester project.

import { ColumnMetadata } from 'public-domain';

export interface ColumnMetadataAndValues<TValue = string | number> {
  values: readonly TValue[];
  columnMetadata: ColumnMetadata;
}
