package endpoints

import (
	"fmt"
	"itm-datasource-plugin/pkg/datasource/domain"
	"reflect"
	"slices"
	"strings"
	"time"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
	"github.com/grafana/grafana-plugin-sdk-go/data"
	"github.com/grafana/grafana-plugin-sdk-go/live"
)

type QueryResponse struct {
	name              string
	rows              *[]domain.GenericRow
	channel           *live.Channel
	requestColumns    []string
	custom            any
	perSourceErrors   map[string]string
	isHistoricalQuery bool
	isTimeSeriesQuery bool
}

func newQueryResponse(
	name string,
	rows *[]domain.GenericRow,
	channel *live.Channel,
	requestColumnsIds []string,
	gatewayDbgData any,
	perSourceErrors map[string]string,
	isHistoricalQuery bool,
	isTimeSeriesQuery bool,
) *QueryResponse {
	return &QueryResponse{
		name:              name,
		rows:              rows,
		channel:           channel,
		requestColumns:    requestColumnsIds,
		custom:            map[string]any{gatewayDebugFieldName: gatewayDbgData},
		perSourceErrors:   perSourceErrors,
		isHistoricalQuery: isHistoricalQuery,
		isTimeSeriesQuery: isTimeSeriesQuery,
	}
}

func newQueryResponseFromStructs[T any](name string, data []T, channel *live.Channel, requestColumnsIds []string, isHistoricalQuery bool) (*QueryResponse, error) {
	rows, err := newQueryRows(data)
	if err != nil {
		return nil, err
	}

	return &QueryResponse{
		name:              name,
		rows:              rows,
		channel:           channel,
		requestColumns:    requestColumnsIds,
		isHistoricalQuery: isHistoricalQuery,
	}, nil
}

const originnodeColumn = "originnode"

func (response *QueryResponse) getFrames() []*data.Frame {
	rows := *response.rows

	if len(rows) == 0 {
		frame := data.NewFrame(response.name)
		setMeta(frame, response.perSourceErrors, response.custom)
		return []*data.Frame{frame}
	}

	// For time-series queries with originnode, split into per-agent frames to avoid
	// null-filled gaps caused by different agent data collection intervals.
	if response.isTimeSeriesQuery && slices.Contains(response.requestColumns, originnodeColumn) {
		return response.getPerAgentTimeSeriesFrames(rows)
	}

	frame := response.buildFrame(response.name, rows, response.requestColumns, "")
	if response.channel != nil {
		frame.SetMeta(&data.FrameMeta{Channel: response.channel.String()})
	}
	setMeta(frame, response.perSourceErrors, response.custom)

	frames := []*data.Frame{frame}
	if response.isTimeSeriesQuery {
		frames = ConvertToWideFormat(frames, true)
	}

	return frames
}

// getPerAgentTimeSeriesFrames groups rows by originnode and builds a separate frame per agent.
// The originnode column is excluded from frame fields and added as a Label on value fields
// after wide format conversion, so each agent gets a dense time series without cross-agent null gaps.
func (response *QueryResponse) getPerAgentTimeSeriesFrames(rows []domain.GenericRow) []*data.Frame {
	agentRows, agentOrder := groupRowsByOriginnode(rows)

	columns := filterOut(response.requestColumns, originnodeColumn)

	if response.channel != nil {
		backend.Logger.Warn("Streaming channel is not supported for per-agent time-series frames, ignoring channel")
	}

	frames := make([]*data.Frame, 0, len(agentOrder))
	for i, agent := range agentOrder {
		frameName := response.name + " - " + agent
		frame := response.buildFrame(frameName, agentRows[agent], columns, originnodeColumn)

		// Attach metadata only to the first frame to avoid duplicating potentially large debug data.
		if i == 0 {
			setMeta(frame, response.perSourceErrors, response.custom)
		}

		frames = append(frames, frame)
	}

	if response.isTimeSeriesQuery {
		frames = ConvertToWideFormat(frames, true)
	}

	for i, frame := range frames {
		addFieldLabel(frame, originnodeColumn, agentOrder[i])
	}

	return frames
}

// buildFrame constructs a data.Frame from rows, ordered by columns.
// If excludeColumn is non-empty, that column is skipped during field construction.
func (response *QueryResponse) buildFrame(name string, rows []domain.GenericRow, columns []string, excludeColumn string) *data.Frame {
	fieldMap := make(map[string]*data.Field)

	for idx, row := range rows {
		for colName, colValue := range row {
			if colValue == nil || colName == excludeColumn {
				continue
			}

			colValue = response.convertHistoricalTimestamp(colName, colValue)

			field, found := fieldMap[colName]
			if !found {
				fieldType := data.FieldTypeFor(colValue)
				field = data.NewFieldFromFieldType(fieldType.NullableType(), len(rows))
				field.Name = colName
				fieldMap[colName] = field
			}
			field.SetConcrete(idx, colValue)
		}
	}

	fields := make([]*data.Field, 0, len(fieldMap))
	for _, columnId := range columns {
		field, ok := fieldMap[columnId]
		if ok {
			fields = append(fields, field)
		} else {
			// In some cases all the rows can be missing some selected columns (all agents are outdated, etc.). We still
			// need to add it into the field
			fakeField := data.NewFieldFromFieldType(data.FieldTypeNullableInt8, len(rows))
			fakeField.Name = columnId
			fields = append(fields, fakeField)
		}
	}

	return data.NewFrame(name, fields...)
}

// groupRowsByOriginnode partitions rows into groups keyed by originnode value,
// preserving the order of first appearance.
func groupRowsByOriginnode(rows []domain.GenericRow) (map[string][]domain.GenericRow, []string) {
	groups := make(map[string][]domain.GenericRow)
	order := make([]string, 0)

	for _, row := range rows {
		agent, _ := row[originnodeColumn].(string)
		if _, seen := groups[agent]; !seen {
			order = append(order, agent)
		}
		groups[agent] = append(groups[agent], row)
	}

	return groups, order
}

// addFieldLabel adds a label key-value pair to all non-time fields in the frame.
func addFieldLabel(frame *data.Frame, key, value string) {
	for _, field := range frame.Fields {
		ft := field.Type()
		if ft == data.FieldTypeTime || ft == data.FieldTypeNullableTime {
			continue
		}
		if field.Labels == nil {
			field.Labels = data.Labels{key: value}
		} else {
			field.Labels[key] = value
		}
	}
}

// filterOut returns a copy of columns with the specified column removed.
func filterOut(columns []string, exclude string) []string {
	result := make([]string, 0, len(columns))
	for _, col := range columns {
		if col != exclude {
			result = append(result, col)
		}
	}
	return result
}

func setMeta(frame *data.Frame, errorsMap map[string]string, customValues any) {
	metaCopy := data.FrameMeta{}
	if frame.Meta != nil {
		metaCopy = *frame.Meta
	}

	if metaCopy.Custom == nil {
		metaCopy.Custom = customValues
	} else {
		// This should never happen
		// It doesn't make any sense to log it with no additional context provided so just ignore it =(
		// fmt.Errorf("grafana frame was already initialized with incompatible custom data field")
	}

	metaCopy.Notices = getErrorsAsNotices(errorsMap)

	frame.SetMeta(&metaCopy)
}

func getErrorsAsNotices(errorsMap map[string]string) []data.Notice {
	if len(errorsMap) == 0 {
		return nil
	}

	notices := make([]data.Notice, 0, len(errorsMap))
	for source, errorMsg := range errorsMap {
		notices = append(
			notices,
			data.Notice{
				Severity: data.NoticeSeverityWarning,
				Text:     "Failed to get data from '" + source + "': " + errorMsg,
				Inspect:  data.InspectTypeError,
				// Link: "",
			},
		)
	}
	return notices
}

func newQueryRows[T any](rows []T) (*[]domain.GenericRow, error) {
	data := make([]domain.GenericRow, len(rows))
	for i, row := range rows {
		rowMap, err := toPrimitiveMap(row)
		if err != nil {
			return nil, err
		}
		data[i] = rowMap
	}
	return &data, nil
}

func toPrimitiveMap(in any) (map[string]any, error) {
	out := make(map[string]any)

	v := reflect.ValueOf(in)
	if v.Kind() == reflect.Ptr {
		v = v.Elem()
	}

	if v.Kind() != reflect.Struct {
		return nil, fmt.Errorf("ToMap only accepts struct or struct pointer; got %T", v)
	}

	t := v.Type()
	for i := 0; i < v.NumField(); i++ {
		fieldName := t.Field(i).Name
		value, err := getPrimitiveAsInterface(v.Field(i))
		if err != nil {
			return nil, fmt.Errorf("error getting primitive type for '%s' field from '%s' struct: %s", fieldName, t, err.Error())
		}
		out[fieldName] = value
	}
	return out, nil
}

func getPrimitiveAsInterface(v reflect.Value) (any, error) {
	switch v.Kind() {
	case reflect.String:
		return v.String(), nil
	case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64:
		return v.Int(), nil
	case reflect.Uint, reflect.Uint8, reflect.Uint16, reflect.Uint32, reflect.Uint64:
		return v.Uint(), nil
	case reflect.Float32, reflect.Float64:
		return v.Float(), nil
	case reflect.Bool:
		return v.Bool(), nil
	case reflect.Struct:
		if value, ok := v.Interface().(time.Time); ok {
			return value, nil
		} else {
			return nil, fmt.Errorf("getPrimitiveAsInterface doesn't support the following struct: '%s'", v.Type())
		}
	default:
		return nil, fmt.Errorf("getPrimitiveAsInterface doesn't support the following kind %s", v.Kind())
	}
}

// convertHistoricalTimestamp converts timestamp column values to time.Time.
// Accepts either an already-decoded time.Time (from proto path) or an
// RFC3339 string (from JSON path).
// For time-series queries, conversion applies on the TIME_BUCKET column.
// For real-time metrics (historical) queries, conversion applies on the WRITETIME column.
// If parsing fails, the original value is returned and a warning is logged.
func (response *QueryResponse) convertHistoricalTimestamp(colName string, colValue any) any {
	upperColName := strings.ToUpper(colName)
	shouldConvert := (response.isTimeSeriesQuery && upperColName == "TIME_BUCKET") ||
		(response.isHistoricalQuery && upperColName == "WRITETIME")

	if !shouldConvert {
		return colValue
	}

	switch v := colValue.(type) {
	case time.Time:
		return v // proto path: already decoded
	case string:
		timestamp, err := parseRFC3339Time(v)
		if err != nil {
			backend.Logger.Warn("Failed to parse timestamp", "column", colName, "value", v, "error", err)
			return colValue
		}
		return timestamp
	}
	return colValue
}

// parseRFC3339Time parses an RFC3339 string into time.Time.
// The input must be ISO 8601/RFC3339 with timezone information.
// It returns an error when the format or date/time components are invalid.
func parseRFC3339Time(timestamp string) (time.Time, error) {
	// Parse ISO 8601 / RFC3339 format
	t, err := time.Parse(time.RFC3339, timestamp)
	if err != nil {
		return time.Time{}, fmt.Errorf("failed to parse WRITETIME as RFC3339: %w", err)
	}

	return t, nil
}
