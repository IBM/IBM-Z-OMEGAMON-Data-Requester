package falcon_utils

import (
	"reflect"
	"strings"
)

// Goes throug a structure and trims each string field
// * works IN-PLACE
// * works on both struct and pointer-to-stuct
// * is NOT recursive
// * DOESN'T trim fields that:
//   - private
//   - non-addressable (fields of literal objects)
func TrimStringFields[T any](in T) {
	val := reflect.Indirect(reflect.ValueOf(in))
	if val.Kind() != reflect.Struct {
		// Special for Dima. UrWelcome!
		panic("TrimStringFields only supports struct or pointer-to-struct arguments")
	}

	fieldCount := val.NumField()
	for fieldId := 0; fieldId < fieldCount; fieldId++ {
		fieldVal := val.FieldByIndex([]int{fieldId})
		if fieldVal.Kind() != reflect.String {
			continue
		}
		if !fieldVal.CanSet() {
			panic("TrimStringFields encounter read-only field")
		}
		fieldVal.SetString(strings.TrimSpace(fieldVal.String()))
	}
}
