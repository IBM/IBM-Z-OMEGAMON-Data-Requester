import {
  CustomVariableSupport,
  DataQueryRequest,
  DataQueryResponse,
  DataFrame,
  FieldType,
  VariableSupportType,
} from '@grafana/data';
import { Observable, map } from 'rxjs';

// eslint-disable-next-line import/no-cycle
import { FalconDatasource } from 'datasource';
import { FalconQuery } from 'datasource/domain';
import { applyGrafanaFormatting } from 'datasource/features/formatting/format';

import { emptyStringFiller } from './emptyStringFiller';
import { VariableQueryEditorWrapper } from './VariableQueryEditorWrapper';

// @ts-expect-error: https://git.rocketsoftware.com/projects/FAL/repos/falcon/pull-requests/103/overview?commentId=181665
export class VariableSupport extends CustomVariableSupport<FalconDatasource, FalconQuery> {
  constructor(private readonly datasource: FalconDatasource) {
    super();
    // Grafana calls query with no context defined
    this.query = this.query.bind(this);
  }

  editor = VariableQueryEditorWrapper;

  override query(request: DataQueryRequest<FalconQuery>): Observable<DataQueryResponse> {
    return this.datasource.query(request, true).pipe(
      map((response) => ({
        ...response,
        data: response.data.map((dataElement: DataFrame) => ({
          ...dataElement,
          fields: dataElement.fields.map((field) => {
            return {
              ...field,
              type: FieldType.string,
              values: field.values.map((value) => {
                return value !== '' ? applyGrafanaFormatting(value, field) : emptyStringFiller;
              }),
            };
          }),
        })),
      }))
    );
  }

  override getType(): VariableSupportType {
    return VariableSupportType.Custom;
  }
}
