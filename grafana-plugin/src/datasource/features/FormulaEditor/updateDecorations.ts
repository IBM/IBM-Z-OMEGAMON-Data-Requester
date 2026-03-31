import { monacoTypes } from '@grafana/ui';

import { CmsSqlParsingProblem } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery';

function problemSeverityToMonacoSeverity(
  severity: CmsSqlParsingProblem['severity'],
  monaco: typeof monacoTypes
): monacoTypes.MarkerSeverity {
  switch (severity) {
    case 'error':
      return monaco.MarkerSeverity.Error;
    case 'warning':
      return monaco.MarkerSeverity.Warning;
    case 'informational':
      return monaco.MarkerSeverity.Info;
    default:
      throw new Error(`Unknown CMS SQL parsing problem severity ${severity}`);
  }
}

export function updateDecorations(
  model: monacoTypes.editor.IModel,
  monaco: typeof monacoTypes,
  problems: CmsSqlParsingProblem[]
): void {
  const decorations = problems.map(({ severity, message, position, stage }) => {
    return {
      severity: problemSeverityToMonacoSeverity(severity, monaco),
      message: `${stage}: ${message}`,
      // parser returns positions in 0-based indexes, monaco uses 1-based
      startLineNumber: position.startLine + 1,
      startColumn: position.startColumn + 1,
      endLineNumber: position.endLine + 1,
      endColumn: position.endColumn + 1,
    } as monacoTypes.editor.IMarkerData;
  });
  monaco.editor.setModelMarkers(model, 'validator', decorations);
}
