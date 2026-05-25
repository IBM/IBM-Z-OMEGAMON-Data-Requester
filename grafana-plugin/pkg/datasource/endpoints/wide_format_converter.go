package endpoints

import (
	"sort"
	"time"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
	"github.com/grafana/grafana-plugin-sdk-go/backend/log"
	"github.com/grafana/grafana-plugin-sdk-go/data"
)

var wideFormatConverterLogger log.Logger = backend.Logger.With("component", "wide_format_converter")

// ConvertToWideFormat converts frames to wide format for historical queries.
// Non-historical queries are returned unchanged, and failed conversions fall back to original frames.
// Successful conversion can improve Grafana time-series rendering and remove manual transforms.
func ConvertToWideFormat(frames []*data.Frame, isHistoricalQuery bool) []*data.Frame {
	if !isHistoricalQuery {
		wideFormatConverterLogger.Debug("Skipping wide format conversion for non-historical query")
		return frames
	}

	if len(frames) == 0 {
		return frames
	}

	result := make([]*data.Frame, 0, len(frames))
	for _, frame := range frames {
		convertedFrame := convertSingleFrame(frame)
		result = append(result, convertedFrame)
	}
	return result
}

// convertSingleFrame converts one long-format time-series frame to wide format.
// If the frame is not convertible or conversion fails, the original frame is returned.
// Missing values are filled with nulls using FillModeNull.
func convertSingleFrame(frame *data.Frame) *data.Frame {
	if frame == nil || len(frame.Fields) == 0 {
		return frame
	}

	// Sort by time to ensure LongToWide receives ordered rows.
	sortFrameByTime(frame)

	// Check if frame is already in time series format and whether it's long format
	tsSchema := frame.TimeSeriesSchema()

	// Only convert if it's a valid time series and is in long format
	if tsSchema.Type != data.TimeSeriesTypeLong {
		wideFormatConverterLogger.Warn("Frame cannot be converted to wide format",
			"frameName", frame.Name,
			"schemaType", tsSchema.Type,
			"reason", "Frame must be in long format with at least: time field, numeric value field, and optionally label fields")
		return frame
	}

	wideFormatConverterLogger.Debug("Converting frame from long to wide format", "frameName", frame.Name)

	// Attempt conversion with null fill for missing values (most conservative approach)
	fillMissing := &data.FillMissing{
		Mode: data.FillModeNull,
	}

	wideFrame, err := data.LongToWide(frame, fillMissing)
	if err != nil {
		wideFormatConverterLogger.Warn("Failed to convert frame to wide format, returning original",
			"frameName", frame.Name,
			"error", err.Error())
		return frame
	}

	wideFormatConverterLogger.Debug("Successfully converted frame to wide format",
		"frameName", frame.Name,
		"originalFields", len(frame.Fields),
		"wideFields", len(wideFrame.Fields))

	return wideFrame
}

// sortFrameByTime sorts all rows in a frame in ascending time order.
// It locates the first time field, builds a sorted index, and reorders every field's values.
// Frames with fewer than two rows or no time field are left unchanged.
func sortFrameByTime(frame *data.Frame) {
	timeFieldIdx := -1
	for i, field := range frame.Fields {
		ft := field.Type()
		if ft == data.FieldTypeTime || ft == data.FieldTypeNullableTime {
			timeFieldIdx = i
			break
		}
	}
	if timeFieldIdx == -1 {
		return
	}

	rowCount := frame.Fields[timeFieldIdx].Len()
	if rowCount < 2 {
		return
	}

	indices := make([]int, rowCount)
	for i := range indices {
		indices[i] = i
	}

	timeField := frame.Fields[timeFieldIdx]
	sort.SliceStable(indices, func(a, b int) bool {
		return timeValueAt(timeField, indices[a]).Before(timeValueAt(timeField, indices[b]))
	})

	for _, field := range frame.Fields {
		reorderFieldRows(field, indices)
	}
}

// timeValueAt extracts a time.Time from a field at the given row index,
// handling both concrete (FieldTypeTime) and nullable (*time.Time) field types.
func timeValueAt(field *data.Field, idx int) time.Time {
	switch v := field.At(idx).(type) {
	case time.Time:
		return v
	case *time.Time:
		if v != nil {
			return *v
		}
	}
	return time.Time{}
}

// reorderFieldRows rearranges the values of a field according to the given index permutation.
func reorderFieldRows(field *data.Field, indices []int) {
	snapshot := make([]any, len(indices))
	for i, origIdx := range indices {
		snapshot[i] = field.At(origIdx)
	}
	for i, val := range snapshot {
		field.Set(i, val)
	}
}
