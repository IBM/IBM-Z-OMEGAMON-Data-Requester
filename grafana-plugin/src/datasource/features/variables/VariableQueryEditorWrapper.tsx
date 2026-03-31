import React from 'react';

// eslint-disable-next-line import/no-cycle
import { QueryEditorWrapperProps, QueryEditorWrapper } from 'datasource/features/QueryEditor';

export function VariableQueryEditorWrapper(props: QueryEditorWrapperProps) {
  return <QueryEditorWrapper {...props} isVariableQueryEditor />;
}
