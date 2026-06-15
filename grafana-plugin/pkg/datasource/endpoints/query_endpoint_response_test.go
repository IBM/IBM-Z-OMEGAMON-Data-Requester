package endpoints

import (
	"fmt"
	"itm-datasource-plugin/pkg/datasource/domain"
	"reflect"
	"testing"
	"time"

	"github.com/grafana/grafana-plugin-sdk-go/data"
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

	response, err := newQueryResponseFromStructs("ISITSTSH", situations, nil, situationsColumns, false)
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

func TestConvertHistoricalTimestamp(t *testing.T) {
	tests := []struct {
		name              string
		colName           string
		colValue          any
		isHistoricalQuery bool
		expectConverted   bool
	}{
		{
			name:              "WRITETIME column in historical query with valid string",
			colName:           "WRITETIME",
			colValue:          "2026-01-20T07:30:00-05:00",
			isHistoricalQuery: true,
			expectConverted:   true,
		},
		{
			name:              "WRITETIME column in non-historical query",
			colName:           "WRITETIME",
			colValue:          "2026-01-20T07:30:00-05:00",
			isHistoricalQuery: false,
			expectConverted:   false,
		},
		{
			name:              "Non-WRITETIME column in historical query",
			colName:           "TIMESTAMP",
			colValue:          "2026-01-20T07:30:00-05:00",
			isHistoricalQuery: true,
			expectConverted:   false,
		},
		{
			name:              "WRITETIME with non-string value",
			colName:           "WRITETIME",
			colValue:          12345,
			isHistoricalQuery: true,
			expectConverted:   false,
		},
		{
			name:              "WRITETIME with invalid string format",
			colName:           "WRITETIME",
			colValue:          "invalid-date",
			isHistoricalQuery: true,
			expectConverted:   false, // Should return original on parse error
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			response := &QueryResponse{
				isHistoricalQuery: tt.isHistoricalQuery,
			}

			result := response.convertHistoricalTimestamp(tt.colName, tt.colValue)

			if tt.expectConverted {
				// Should be converted to time.Time
				if _, ok := result.(time.Time); !ok {
					t.Errorf("Expected time.Time, got %T", result)
				}
			} else {
				// Should return original value
				if reflect.TypeOf(result) != reflect.TypeOf(tt.colValue) {
					t.Errorf("Expected type %T, got %T", tt.colValue, result)
				}
			}
		})
	}
}

func TestGetFrames_WithWritetimeConversion(t *testing.T) {
	// Test that WRITETIME conversion is applied during getFrames()
	rows := []domain.GenericRow{
		{
			"WRITETIME": "2026-01-20T07:30:00-05:00",
			"CPU":       float64(50.5),
		},
		{
			"WRITETIME": "2026-01-20T07:31:00-05:00",
			"CPU":       float64(60.2),
		},
	}

	response := &QueryResponse{
		name:              "test",
		rows:              &rows,
		requestColumns:    []string{"WRITETIME", "CPU"},
		isHistoricalQuery: true,
	}

	frames := response.getFrames()

	if len(frames) != 1 {
		t.Fatalf("Expected 1 frame, got %d", len(frames))
	}

	frame := frames[0]

	// Find WRITETIME field
	var writetimeField *data.Field
	for _, field := range frame.Fields {
		if field.Name == "WRITETIME" {
			writetimeField = field
			break
		}
	}

	if writetimeField == nil {
		t.Fatal("WRITETIME field not found in frame")
	}

	// Check that the field contains time.Time values
	for i := 0; i < writetimeField.Len(); i++ {
		value := writetimeField.At(i)
		if value == nil {
			continue
		}

		// Dereference if it's a pointer
		val := reflect.ValueOf(value)
		if val.Kind() == reflect.Ptr {
			if val.IsNil() {
				continue
			}
			val = val.Elem()
		}

		if val.Type() != reflect.TypeOf(time.Time{}) {
			t.Errorf("Expected time.Time at index %d, got %T", i, value)
		}
	}
}

func TestGetFrames_TimeSeriesPerAgentSplit(t *testing.T) {
	t.Run("splits rows by originnode into separate dense frames", func(t *testing.T) {
		rows := []domain.GenericRow{
			{"time_bucket": time.Date(2026, 1, 1, 0, 0, 0, 0, time.UTC), "originnode": "agentA", "CPU": float64(10)},
			{"time_bucket": time.Date(2026, 1, 1, 0, 0, 0, 0, time.UTC), "originnode": "agentB", "CPU": float64(20)},
			{"time_bucket": time.Date(2026, 1, 1, 0, 1, 0, 0, time.UTC), "originnode": "agentA", "CPU": float64(15)},
			{"time_bucket": time.Date(2026, 1, 1, 0, 15, 0, 0, time.UTC), "originnode": "agentB", "CPU": float64(25)},
		}

		response := &QueryResponse{
			name:              "TestTable",
			rows:              &rows,
			requestColumns:    []string{"time_bucket", "originnode", "CPU"},
			isTimeSeriesQuery: true,
		}

		frames := response.getFrames()

		if len(frames) != 2 {
			t.Fatalf("Expected 2 frames, got %d", len(frames))
		}

		if frames[0].Name != "TestTable - agentA" {
			t.Errorf("Expected frame name 'TestTable - agentA', got '%s'", frames[0].Name)
		}
		if frames[1].Name != "TestTable - agentB" {
			t.Errorf("Expected frame name 'TestTable - agentB', got '%s'", frames[1].Name)
		}

		// Each agent frame should have exactly 2 rows (dense, no cross-agent null gaps)
		for _, frame := range frames {
			for _, field := range frame.Fields {
				if field.Len() != 2 {
					t.Errorf("Frame %s, field %s: expected 2 rows, got %d", frame.Name, field.Name, field.Len())
				}
			}
		}

		// originnode should NOT be a field column
		for _, frame := range frames {
			for _, field := range frame.Fields {
				if field.Name == "originnode" {
					t.Errorf("Frame %s: originnode should not be a field column", frame.Name)
				}
			}
		}

		// originnode should be a Label on non-time fields
		agents := []string{"agentA", "agentB"}
		for i, frame := range frames {
			for _, field := range frame.Fields {
				ft := field.Type()
				if ft == data.FieldTypeTime || ft == data.FieldTypeNullableTime {
					continue
				}
				if field.Labels == nil || field.Labels["originnode"] != agents[i] {
					t.Errorf("Frame %s, field %s: expected label originnode=%s, got %v",
						frame.Name, field.Name, agents[i], field.Labels)
				}
			}
		}

		// Value fields should have no nil values (dense data)
		for _, frame := range frames {
			for _, field := range frame.Fields {
				for i := 0; i < field.Len(); i++ {
					if field.At(i) == nil {
						t.Errorf("Frame %s, field %s: unexpected nil at index %d", frame.Name, field.Name, i)
					}
				}
			}
		}
	})

	t.Run("single agent produces one frame with label", func(t *testing.T) {
		rows := []domain.GenericRow{
			{"time_bucket": time.Date(2026, 1, 1, 0, 0, 0, 0, time.UTC), "originnode": "agentA", "CPU": float64(10)},
			{"time_bucket": time.Date(2026, 1, 1, 0, 1, 0, 0, time.UTC), "originnode": "agentA", "CPU": float64(15)},
		}

		response := &QueryResponse{
			name:              "TestTable",
			rows:              &rows,
			requestColumns:    []string{"time_bucket", "originnode", "CPU"},
			isTimeSeriesQuery: true,
		}

		frames := response.getFrames()

		if len(frames) != 1 {
			t.Fatalf("Expected 1 frame, got %d", len(frames))
		}
		if frames[0].Name != "TestTable - agentA" {
			t.Errorf("Expected frame name 'TestTable - agentA', got '%s'", frames[0].Name)
		}
	})

	t.Run("no originnode falls back to single frame", func(t *testing.T) {
		rows := []domain.GenericRow{
			{"time_bucket": time.Date(2026, 1, 1, 0, 0, 0, 0, time.UTC), "CPU": float64(10)},
			{"time_bucket": time.Date(2026, 1, 1, 0, 1, 0, 0, time.UTC), "CPU": float64(15)},
		}

		response := &QueryResponse{
			name:              "TestTable",
			rows:              &rows,
			requestColumns:    []string{"time_bucket", "CPU"},
			isTimeSeriesQuery: true,
		}

		frames := response.getFrames()

		if frames[0].Name != "TestTable" {
			t.Errorf("Expected frame name 'TestTable', got '%s'", frames[0].Name)
		}
	})

	t.Run("metadata attached only to first frame", func(t *testing.T) {
		rows := []domain.GenericRow{
			{"time_bucket": time.Date(2026, 1, 1, 0, 0, 0, 0, time.UTC), "originnode": "agentA", "CPU": float64(10)},
			{"time_bucket": time.Date(2026, 1, 1, 0, 0, 0, 0, time.UTC), "originnode": "agentB", "CPU": float64(20)},
		}

		response := &QueryResponse{
			name:              "TestTable",
			rows:              &rows,
			requestColumns:    []string{"time_bucket", "originnode", "CPU"},
			isTimeSeriesQuery: true,
			custom:            map[string]any{"__gateway_debug": "large_debug_data"},
			perSourceErrors:   map[string]string{"source1": "error1"},
		}

		frames := response.getFrames()

		if len(frames) != 2 {
			t.Fatalf("Expected 2 frames, got %d", len(frames))
		}

		// First frame has metadata
		if frames[0].Meta == nil || frames[0].Meta.Custom == nil {
			t.Error("First frame should have custom metadata")
		}
		if frames[0].Meta == nil || len(frames[0].Meta.Notices) == 0 {
			t.Error("First frame should have notices from perSourceErrors")
		}

		// Second frame should not have custom metadata or notices
		hasCustom := frames[1].Meta != nil && frames[1].Meta.Custom != nil
		hasNotices := frames[1].Meta != nil && len(frames[1].Meta.Notices) > 0
		if hasCustom || hasNotices {
			t.Error("Second frame should not have custom metadata or notices")
		}
	})

	t.Run("with additional labels besides originnode", func(t *testing.T) {
		rows := []domain.GenericRow{
			{"time_bucket": time.Date(2026, 1, 1, 0, 0, 0, 0, time.UTC), "originnode": "agentA", "region": "east", "CPU": float64(10)},
			{"time_bucket": time.Date(2026, 1, 1, 0, 0, 0, 0, time.UTC), "originnode": "agentA", "region": "west", "CPU": float64(20)},
			{"time_bucket": time.Date(2026, 1, 1, 0, 0, 0, 0, time.UTC), "originnode": "agentB", "region": "east", "CPU": float64(30)},
		}

		response := &QueryResponse{
			name:              "TestTable",
			rows:              &rows,
			requestColumns:    []string{"time_bucket", "originnode", "region", "CPU"},
			isTimeSeriesQuery: true,
		}

		frames := response.getFrames()

		if len(frames) != 2 {
			t.Fatalf("Expected 2 frames, got %d", len(frames))
		}

		// After wide conversion, value fields should have both originnode and region labels
		for _, frame := range frames {
			for _, field := range frame.Fields {
				ft := field.Type()
				if ft == data.FieldTypeTime || ft == data.FieldTypeNullableTime {
					continue
				}
				if _, ok := field.Labels["originnode"]; !ok {
					t.Errorf("Frame %s, field %s: missing originnode label, got %v",
						frame.Name, field.Name, field.Labels)
				}
			}
		}
	})

	t.Run("non-timeseries query is not split", func(t *testing.T) {
		rows := []domain.GenericRow{
			{"WRITETIME": "2026-01-20T07:30:00-05:00", "originnode": "agentA", "CPU": float64(10)},
			{"WRITETIME": "2026-01-20T07:30:00-05:00", "originnode": "agentB", "CPU": float64(20)},
		}

		response := &QueryResponse{
			name:              "TestTable",
			rows:              &rows,
			requestColumns:    []string{"WRITETIME", "originnode", "CPU"},
			isHistoricalQuery: true,
			isTimeSeriesQuery: false,
		}

		frames := response.getFrames()

		if len(frames) != 1 {
			t.Fatalf("Expected 1 frame for non-timeseries query, got %d", len(frames))
		}
		if frames[0].Name != "TestTable" {
			t.Errorf("Expected frame name 'TestTable', got '%s'", frames[0].Name)
		}
	})
}
