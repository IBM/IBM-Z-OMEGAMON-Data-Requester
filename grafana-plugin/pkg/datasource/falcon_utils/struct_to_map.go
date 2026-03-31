package falcon_utils

import (
	"reflect"
	"strings"
)

func StructToMap(arg any) map[string]any {
	result := map[string]any{}

	v := reflect.ValueOf(arg)
	if v.Kind() == reflect.Pointer {
		v = v.Elem()
	}
	if v.Kind() != reflect.Struct {
		return result // , errors.New() // I decided to not return error
	}

	t := v.Type()
	for i := range v.NumField() {
		fieldV := v.Field(i)
		fieldT := t.Field(i)

		if fieldT.PkgPath != "" {
			// skip "private" fields
			continue
		}

		name := fieldT.Name
		tag, hasTag := fieldT.Tag.Lookup("json")
		if hasTag {
			if tag == "-" {
				// skip json:"-" fields
				continue
			}

			commaIdx := strings.Index(tag, ",")
			if commaIdx == -1 {
				name = tag
			} else if commaIdx == 0 {
				// FieldName T `json",omitempty"` case
				// name = name
			} else {
				name = tag[:commaIdx]
			}
		}
		result[name] = fieldV.Interface()
	}

	return result
}
