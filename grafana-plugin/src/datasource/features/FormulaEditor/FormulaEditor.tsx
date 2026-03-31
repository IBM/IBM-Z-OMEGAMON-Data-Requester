import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';
import { CodeEditorMonacoOptions, monacoTypes, useStyles2, CodeEditor, Button, Field } from '@grafana/ui';
import React, { memo, useState, useCallback, useEffect } from 'react';

import { tid } from 'datasource/components';
import { MetricsQueryParams, defaultMetricsQueryParams } from 'datasource/domain';
import { parseCmsSqlQuery } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery';
import { convertMetricsQueryToCmsSql } from 'datasource/features/cmsSqlTransformers/metricsQueryToCmsSql';
import { useMetadataLoader, MetadataLoader } from 'datasource/features/metadata';

import { registerCmsSqlLanguage } from './registerCmsSqlLanguage';
import { updateDecorations } from './updateDecorations';

interface FormulaEditorProps {
  params: MetricsQueryParams;
  changeMetricsQueryParams: (changedParams: Partial<MetricsQueryParams>) => void;
}

const MONACO_EDITOR_OPTIONS: CodeEditorMonacoOptions = {
  wordWrap: 'on',
  minimap: { enabled: false },
  scrollbar: { alwaysConsumeMouseWheel: false },
  scrollBeyondLastLine: false,
};

const getStyles = (theme: GrafanaTheme2) => {
  return {
    button: css({
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(1),
    }),
    editorWrapper: css({
      border: `1px solid ${theme.colors.border.medium}`,
      height: '10em',
    }),
  };
};

/**
 * Hack to expand "Show More" in suggestions by default,
 * as currently Monaco does not provide any API to do that. See more:
 * https://github.com/microsoft/monaco-editor/discussions/3666
 * https://github.com/microsoft/monaco-editor/issues/2177
 */
const expandSuggestionDetailsByDefault = (editor: monacoTypes.editor.IStandaloneCodeEditor) => {
  try {
    const { widget } = editor.getContribution('editor.contrib.suggestController') as unknown as {
      widget: { value: { _setDetailsVisible: (isVisible: boolean) => void } };
    };
    if (widget) {
      const suggestWidget = widget.value;
      if (suggestWidget && suggestWidget._setDetailsVisible) {
        suggestWidget._setDetailsVisible(true);
      }
    }
  } catch (error) {
    window.console.log(`Error while setting suggestion details to visible: ${error}`);
  }
};

export const FormulaEditor = memo(({ params, changeMetricsQueryParams }: FormulaEditorProps) => {
  const [queryText, setQueryText] = useState('');
  const [hasErrors, setHasErrors] = useState(false);
  const metadataLoader = useMetadataLoader();
  const styles = useStyles2(getStyles);

  const updateMetricsQueryParams = useCallback(async () => {
    if (queryText.trim() === '') {
      changeMetricsQueryParams(defaultMetricsQueryParams);
      return;
    }

    const cmsSqlParsingResult = await parseCmsSqlQuery(queryText, metadataLoader);
    const hasErrorProblems = !!cmsSqlParsingResult.problems.find((problem) => problem.severity === 'error');
    if (hasErrorProblems) {
      window.console.log('FormulaEditor cmsSqlParsingResult problems:', cmsSqlParsingResult.problems);
      return;
    }
    if (!cmsSqlParsingResult.queryObject) {
      window.console.log('FormulaEditor cmsSqlParsingResult queryObject is null');
      return;
    }
    changeMetricsQueryParams({ ...cmsSqlParsingResult.queryObject });
  }, [queryText, metadataLoader, changeMetricsQueryParams]);

  const applyErrorDecorations = async (
    model: monacoTypes.editor.ITextModel,
    monaco: typeof monacoTypes,
    queryText: string,
    metadataLoader: MetadataLoader
  ) => {
    const problems = queryText.trim() !== '' ? (await parseCmsSqlQuery(queryText, metadataLoader)).problems : [];
    setHasErrors(!!problems.find((problem) => problem.severity === 'error'));
    updateDecorations(model, monaco, problems);
  };

  const onEditorDidMount = useCallback(
    async (editor: monacoTypes.editor.IStandaloneCodeEditor, monaco: typeof monacoTypes) => {
      expandSuggestionDetailsByDefault(editor);

      const model = editor.getModel();
      if (!model) {
        // Should never happen
        return;
      }
      const queryText = model.getValue();
      applyErrorDecorations(model, monaco, queryText, metadataLoader);

      model.onDidChangeContent(async (e) => {
        const queryText = model.getValue();
        setQueryText(queryText);
        applyErrorDecorations(model, monaco, queryText, metadataLoader);
      });
    },
    [metadataLoader]
  );

  const updateQueryText = useCallback(async () => {
    if (!params.affinityId) {
      setQueryText('');
      return;
    }

    const applicationsPromise = metadataLoader.getApplicationMetadatas();

    const tableMetadataPromise = params.tableId
      ? metadataLoader.getTableMetadata(params.tableId)
      : Promise.resolve(null);

    try {
      const [tableMetadata, applications] = await Promise.all([tableMetadataPromise, applicationsPromise]);
      const convertedQuery = convertMetricsQueryToCmsSql(params, tableMetadata, applications);
      setQueryText(convertedQuery);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : error;
      window.console.error(`Failed to get metadata: ${errorMessage}`);
    }
  }, [params, metadataLoader]);

  useEffect(() => {
    updateQueryText();
  }, [updateQueryText]);

  const registerLanguage = useCallback(
    (monaco: typeof monacoTypes) => {
      registerCmsSqlLanguage(monaco, metadataLoader);
    },
    [metadataLoader]
  );

  return (
    <Field label="Formula" data-testid={tid('query-editor.field.formula')}>
      <>
        <CodeEditor
          containerStyles={styles.editorWrapper}
          monacoOptions={MONACO_EDITOR_OPTIONS}
          value={queryText}
          language="cms-sql"
          onBeforeEditorMount={registerLanguage}
          // NOTE #1: onChange doesn't work without onEditorDidMount
          // NOTE #2: We don't use onChange because it problems with
          // react hooks. It never re-register the callback so monaco
          // calls whatever was provided first.
          // So, we register our own onChange handler in onEditorDidMount
          // Yes, we still don't re-register the callback but this way
          // We already have all the neccessary monaco structures available
          //onChange={onEditorChange}
          onEditorDidMount={onEditorDidMount}
        />
        <Button
          disabled={hasErrors}
          className={styles.button}
          variant="secondary"
          onClick={updateMetricsQueryParams}
          data-testid={tid('query-editor.formula.button.upd-query-editor-form')}
        >
          Update Query Editor Form
        </Button>
        <Button
          className={styles.button}
          variant="secondary"
          onClick={updateQueryText}
          data-testid={tid('query-editor.formula.button.cancel')}
        >
          Cancel
        </Button>
      </>
    </Field>
  );
});
FormulaEditor.displayName = 'FormulaEditor';
