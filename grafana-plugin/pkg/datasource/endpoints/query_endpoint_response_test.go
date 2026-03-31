package endpoints

import (
	"fmt"
	"itm-datasource-plugin/pkg/datasource/domain"
	"reflect"
	"testing"
	"time"
)

func TestGetFrame(t *testing.T) {
	var situationsColumns = []string{
		"Status",
		"Atomize",
		"Node",
		"Result",
		"Id",
		"LocalTimestamp",
		"Sitcount",
		"Type",
		"Originnode",
	}

	var situations []domain.SituationEvent
	situations = append(situations, domain.SituationEvent{
		Originnode:     "                                ",
		Node:           "UIT:CMS                         ",
		LocalTimestamp: time.Date(2022, time.November, 6, 11, 04, 55, 10, time.Local),
		Status:         "Started",
		Atomize:        "                                                                                                                                ",
		Id:             "UADVISOR_KDP_DB2MSG             ",
		Result:         "=",
		Sitcount:       0,
		Type:           "Hub",
	})
	situations = append(situations, domain.SituationEvent{
		Originnode:     "                                ",
		Node:           "UIT:CMS                         ",
		LocalTimestamp: time.Date(2022, time.November, 6, 11, 04, 56, 10, time.Local),
		Status:         "Started",
		Atomize:        "                                                                                                                                ",
		Id:             "UADVISOR_KDP_REALTHDA           ",
		Result:         "=",
		Sitcount:       0,
		Type:           "Hub",
	})

	response, err := newQueryResponseFromStructs("ISITSTSH", situations, nil, situationsColumns)
	if err != nil {
		t.Fatal("Error occurred during QueryResponse creation", err)
	}

	frames := response.getFrames()

	if len(frames) != 1 {
		t.Fatalf("Frames size is '%d', expected 1", len(frames))
	}
	for _, frame := range frames {
		for _, field := range frame.Fields {
			for i := 0; i < field.Len(); i++ {
				value, err := getPrimitiveAsInterface(reflect.ValueOf(situations[i]).FieldByName(field.Name))
				if err != nil {
					t.Fatalf(
						"Error occurred while getting primitive as interface for index '%d', fieldName '%s', error: %s",
						i, field.Name, err,
					)
				}

				// field contains pointers to the value instead of the value itself.
				// Thus, we have to de-reference it first. And it looks agly.
				fieldValue := reflect.Indirect(reflect.ValueOf(field.At(i))).Interface()
				if fieldValue != value {
					t.Fatal("Mapped response structure failed test")
				}
			}
		}
	}
}

func TestGetPrimitiveAsInterface(t *testing.T) {
	type TestCase struct {
		input  interface{}
		output interface{}
	}

	successTestCases := []TestCase{
		{input: int(5), output: any(int64(5))},
		{input: uint(6), output: any(uint64(6))},
		{input: "test", output: any("test")},
		{input: time.Unix(1257894000, 0), output: any(time.Unix(1257894000, 0))},
		{input: domain.EventStatus_Started, output: any("L")},
	}

	for _, testCase := range successTestCases {
		value, err := getPrimitiveAsInterface(reflect.ValueOf(testCase.input))
		if err != nil {
			t.Fatal("Error in getPrimitiveAsInterface for ", testCase)
		}
		if value != testCase.output {
			t.Fatalf("getPrimitiveAsInterface: unexpected result, got %v for %+v", value, testCase)
		}
	}

	failedTestCases := []any{
		domain.SituationEvent{},
		fmt.Errorf("Input error"),
	}

	for _, input := range failedTestCases {
		_, err := getPrimitiveAsInterface(reflect.ValueOf(input))
		if err == nil {
			t.Fatal("getPrimitiveAsInterface: should return error for input ", input)
		}
	}
}
