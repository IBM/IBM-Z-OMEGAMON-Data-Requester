import { Field, FieldType } from '@grafana/data';

type DataQueryResponseFieldValue = string | number | boolean;

export function convertFieldToString(field: Field<DataQueryResponseFieldValue>): Field<DataQueryResponseFieldValue> {
  if (field.type === FieldType.string) {
    return field;
  }

  const typesToConvert = [FieldType.number, FieldType.boolean];

  if (typesToConvert.includes(field.type)) {
    const type = FieldType.string;
    const values = field.values.map((value: DataQueryResponseFieldValue) => value.toString());
    return {
      ...field,
      type,
      values,
    };
  }

  throw new Error('convertFieldToString: field.type not supported');
}
