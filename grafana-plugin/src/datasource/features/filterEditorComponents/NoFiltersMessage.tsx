import { Alert, VerticalGroup, Button } from '@grafana/ui';
import { type NoFiltersMessageProps, ClickBubblingStopper } from 'public-ui';
import React, { useCallback } from 'react';

import { tid } from 'datasource/components';
import { MetricsQueryFilterClause } from 'datasource/domain';

const emptyClause = { columnId: '', operator: '=', userDefinedValue: '' } as MetricsQueryFilterClause;

export function NoFiltersMessage({ addNewRootClause }: NoFiltersMessageProps<MetricsQueryFilterClause>) {
  const onAddFilter = useCallback(() => {
    addNewRootClause(emptyClause);
  }, [addNewRootClause]);

  return (
    <Alert title="No filters defined" severity="info" data-testid={tid('no-filters-notification')}>
      <VerticalGroup>
        There are no filters defined yet. Use button below to add new clause.
        <ClickBubblingStopper>
          <Button onClick={onAddFilter} data-testid={tid('no-filters-notification.add-clause-button')}>
            Create filter
          </Button>
        </ClickBubblingStopper>
      </VerticalGroup>
    </Alert>
  );
}
