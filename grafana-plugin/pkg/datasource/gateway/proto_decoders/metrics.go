package proto_decoders

import (
	"itm-datasource-plugin/pkg/datasource/domain"
	"time"

	pb "falcon_proto.local/v1"
)

// MetricsRowsFromProto reconstructs []GenericRow from the structure-of-arrays
// MetricsResponse produced by the gateway.
// values in each column is dense (non-null entries only); null_indices holds
// the sorted row indices that are null. A two-pointer walk reconstructs rows.
// TimestampColumn values are converted to time.Time from Unix milliseconds;
// timezone_offset_seconds is a parallel array (one offset per non-null value)
// used to restore the original per-row timezone.
// Int64Column values are returned as int64.
// StringColumn values are returned as string.
func MetricsRowsFromProto(p *pb.MetricsResponse) ([]domain.GenericRow, map[string]string, string) {
	if p == nil {
		return nil, nil, ""
	}

	// All columns share the same row count: len(values) + len(null_indices).
	rowCount := 0
	if len(p.TimestampColumns) > 0 {
		c := p.TimestampColumns[0]
		rowCount = len(c.Values) + len(c.NullIndices)
	} else if len(p.Int64Columns) > 0 {
		c := p.Int64Columns[0]
		rowCount = len(c.Values) + len(c.NullIndices)
	} else if len(p.StringColumns) > 0 {
		c := p.StringColumns[0]
		rowCount = len(c.Values) + len(c.NullIndices)
	}

	colCount := len(p.TimestampColumns) + len(p.Int64Columns) + len(p.StringColumns)
	rows := make([]domain.GenericRow, rowCount)
	for i := range rows {
		rows[i] = make(domain.GenericRow, colCount)
	}

	for _, col := range p.TimestampColumns {
		nullPtr, valPtr := 0, 0
		for i := 0; i < rowCount; i++ {
			if nullPtr < len(col.NullIndices) && int(col.NullIndices[nullPtr]) == i {
				nullPtr++
			} else {
				loc := time.FixedZone("", int(col.TimezoneOffsetsSeconds[valPtr]))
				rows[i][col.Name] = time.UnixMilli(col.Values[valPtr]).In(loc)
				valPtr++
			}
		}
	}

	for _, col := range p.Int64Columns {
		nullPtr, valPtr := 0, 0
		for i := 0; i < rowCount; i++ {
			if nullPtr < len(col.NullIndices) && int(col.NullIndices[nullPtr]) == i {
				nullPtr++
			} else {
				rows[i][col.Name] = col.Values[valPtr]
				valPtr++
			}
		}
	}

	for _, col := range p.StringColumns {
		nullPtr, valPtr := 0, 0
		for i := 0; i < rowCount; i++ {
			if nullPtr < len(col.NullIndices) && int(col.NullIndices[nullPtr]) == i {
				nullPtr++
			} else {
				rows[i][col.Name] = col.Values[valPtr]
				valPtr++
			}
		}
	}

	return rows, p.PerSourceErrors, p.GatewayError
}
