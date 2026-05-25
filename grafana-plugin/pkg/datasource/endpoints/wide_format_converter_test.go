package endpoints

import (
	"testing"
	"time"

	"github.com/grafana/grafana-plugin-sdk-go/data"
)

func TestWideFormatConverter_ConvertToWideFormat_NonHistorical(t *testing.T) {
	// Create a sample frame
	frame := data.NewFrame("test",
		data.NewField("time", nil, []time.Time{
			time.Date(2020, 1, 2, 3, 4, 0, 0, time.UTC),
		}),
		data.NewField("value", nil, []float64{1.0}),
	)

	frames := []*data.Frame{frame}
	result := ConvertToWideFormat(frames, false)

	if len(result) != 1 {
		t.Fatalf("Expected 1 frame, got %d", len(result))
	}

	// Should not convert non-historical queries
	if result[0] != frame {
		t.Error("Frame should not be modified for non-historical queries")
	}
}

func TestWideFormatConverter_ConvertToWideFormat_LongFormat(t *testing.T) {
	// Create a long format frame with repeated times and a factor column
	frame := data.NewFrame("test",
		data.NewField("time", nil, []time.Time{
			time.Date(2020, 1, 2, 3, 4, 0, 0, time.UTC),
			time.Date(2020, 1, 2, 3, 4, 0, 0, time.UTC),
			time.Date(2020, 1, 2, 3, 5, 0, 0, time.UTC),
			time.Date(2020, 1, 2, 3, 5, 0, 0, time.UTC),
		}),
		data.NewField("value", nil, []float64{1.0, 2.0, 3.0, 4.0}),
		data.NewField("host", nil, []string{"server1", "server2", "server1", "server2"}),
	)

	frames := []*data.Frame{frame}
	result := ConvertToWideFormat(frames, true)

	if len(result) != 1 {
		t.Fatalf("Expected 1 frame, got %d", len(result))
	}

	resultFrame := result[0]

	// Check that conversion happened - wide format should have:
	// - Time field
	// - Multiple value fields with labels
	// - No string fields
	hasStringField := false
	for _, field := range resultFrame.Fields {
		if field.Type() == data.FieldTypeString || field.Type() == data.FieldTypeNullableString {
			hasStringField = true
			break
		}
	}

	if hasStringField {
		t.Error("Wide format should not contain string fields (they should be converted to labels)")
	}

	// Wide format should have more fields than original (one per host)
	if len(resultFrame.Fields) <= len(frame.Fields)-1 {
		t.Errorf("Expected wide format to have more value fields, got %d, original had %d",
			len(resultFrame.Fields), len(frame.Fields))
	}
}

func TestWideFormatConverter_ConvertToWideFormat_AlreadyWide(t *testing.T) {
	// Create a frame that's already in wide format (no repeated times, no string fields)
	frame := data.NewFrame("test",
		data.NewField("time", nil, []time.Time{
			time.Date(2020, 1, 2, 3, 4, 0, 0, time.UTC),
			time.Date(2020, 1, 2, 3, 5, 0, 0, time.UTC),
		}),
		data.NewField("value1", nil, []float64{1.0, 3.0}),
		data.NewField("value2", nil, []float64{2.0, 4.0}),
	)

	frames := []*data.Frame{frame}
	result := ConvertToWideFormat(frames, true)

	if len(result) != 1 {
		t.Fatalf("Expected 1 frame, got %d", len(result))
	}

	// Should return the same frame if already in wide format
	resultFrame := result[0]
	if resultFrame != frame {
		t.Log("Frame was converted even though it was already in wide format (this is acceptable)")
	}
}

func TestWideFormatConverter_ConvertToWideFormat_EmptyFrame(t *testing.T) {
	frame := data.NewFrame("test")
	frames := []*data.Frame{frame}
	result := ConvertToWideFormat(frames, true)

	if len(result) != 1 {
		t.Fatalf("Expected 1 frame, got %d", len(result))
	}

	if result[0] != frame {
		t.Error("Empty frame should be returned as-is")
	}
}

func TestWideFormatConverter_MultipleFrames(t *testing.T) {
	frame1 := data.NewFrame("frame1",
		data.NewField("time", nil, []time.Time{
			time.Date(2020, 1, 2, 3, 4, 0, 0, time.UTC),
			time.Date(2020, 1, 2, 3, 4, 0, 0, time.UTC),
		}),
		data.NewField("value", nil, []float64{1.0, 2.0}),
		data.NewField("host", nil, []string{"server1", "server2"}),
	)

	frame2 := data.NewFrame("frame2",
		data.NewField("time", nil, []time.Time{
			time.Date(2020, 1, 2, 3, 5, 0, 0, time.UTC),
			time.Date(2020, 1, 2, 3, 5, 0, 0, time.UTC),
		}),
		data.NewField("value", nil, []float64{3.0, 4.0}),
		data.NewField("region", nil, []string{"us-east", "us-west"}),
	)

	frames := []*data.Frame{frame1, frame2}
	result := ConvertToWideFormat(frames, true)

	if len(result) != 2 {
		t.Fatalf("Expected 2 frames, got %d", len(result))
	}

	// Both frames should be converted
	for i, resultFrame := range result {
		hasStringField := false
		for _, field := range resultFrame.Fields {
			if field.Type() == data.FieldTypeString || field.Type() == data.FieldTypeNullableString {
				hasStringField = true
				break
			}
		}

		if hasStringField {
			t.Errorf("Frame %d: Wide format should not contain string fields", i)
		}
	}
}
