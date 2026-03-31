package domain

import (
	"fmt"
	"strings"
)

type ApplicationMetadata struct {
	ApplicationCode string                     `json:"applicationCode"`
	ApplicationName string                     `json:"applicationName"`
	ProductCode     string                     `json:"productCode"`
	Id              AffinityId                 `json:"id"`
	Version         int                        `json:"version"`
	Tables          []ApplicationTableMetadata `json:"tables"`
	AffinityEntity  AffinityEntity             `json:"affinityEntity"`
}

type ApplicationTableMetadata struct {
	Id      string `json:"id"`
	Name    string `json:"name"`
	Version int    `json:"version"`
}

func GetApplicationAffinityIDs(applications []ApplicationMetadata) []AffinityId {
	applicationAffinities := make([]AffinityId, len(applications))
	for _, application := range applications {
		applicationAffinities = append(applicationAffinities, application.AffinityEntity.Id)
	}
	return applicationAffinities
}

type TableMetadata struct {
	ProductCode     string                    `json:"productCode"`
	ApplicationCode string                    `json:"applicationCode"`
	ApplicationName string                    `json:"applicationName"`
	Id              string                    `json:"id"`
	Name            string                    `json:"name"`
	Description     string                    `json:"description"`
	Columns         map[string]ColumnMetadata `json:"columns"`
	AffinityEntity  AffinityEntity            `json:"affinityEntity"`
	Version         int64                     `json:"version"`
}

func (tm *TableMetadata) GetColumn(id string) (*ColumnMetadata, error) {
	if IsWritetimeColumn(id) {
		return &WritetimeColumnMetadata, nil
	}
	if columnMetadata, found := tm.Columns[id]; found {
		return &columnMetadata, nil
	}
	return nil, fmt.Errorf("cannot find column with id '%s'", id)
}

type ColumnMetadata struct {
	Id                   string            `json:"id"`
	Name                 string            `json:"name"`
	AttributeName        string            `json:"attributeName"`
	OdpName              string            `json:"odpName"`
	Description          string            `json:"description"`
	Type                 string            `json:"type"`
	MaxLength            int64             `json:"maxLength"`
	SortType             string            `json:"sortType"`
	Version              int64             `json:"version"`
	DefaultSortDirection string            `json:"defaultSortDirection"`
	Enums                map[string]any    `json:"enums"`
	Extensions           map[string]string `json:"extensions"`
	ScaleFactor          int64             `json:"scaleFactor"`
	Precision            int64             `json:"precision"`
	Printf               string            `json:"printf"`
	Unit                 string            `json:"unit"`
}

func GetUnqualifiedColumnId(columnId string) string {
	if strings.Contains(columnId, ".") {
		return strings.Split(columnId, ".")[1]
	}
	return columnId
}

var WritetimeColumnMetadata = ColumnMetadata{
	Id:                   "WRITETIME",
	Name:                 "Recording time",
	Description:          "",
	AttributeName:        "WRITETIME",
	Type:                 "timestamp",
	MaxLength:            16,
	DefaultSortDirection: "A",
	SortType:             "lexical",
	Extensions:           map[string]string{"com.rs.ctds_common": "HISTORICALTIMESTAMP"},
	Version:              0,
}

func IsWritetimeColumn(colId string) bool {
	return strings.ToUpper(colId) == WritetimeColumnMetadata.Id
}

// Don't forget to also modify corresponding list in gateway
var AllowedApplicationAffinityIds map[AffinityId]struct{} = map[AffinityId]struct{}{
	"%IBM.STATIC011":   {},
	"%IBM.CICSplex":    {},
	"%IBM.STATIC115":   {},
	"%IBM.STATIC014":   {},
	"%IBM.JVM_Monitor": {},
	"%IBM.STATIC022":   {},
	"%IBM.STATIC163":   {},
	"%IBM.STATIC154":   {},
	"%IBM.STATIC128":   {},
	"%IBM.STATIC150":   {},
	"%IBM.STATIC149":   {},
	"%IBM.STATIC148":   {},
	"%IBM.STATIC017":   {},
	"%IBM.STATIC006":   {},
	"%IBM.STATIC007":   {},
	"%IBM.STATIC139":   {},
	"%IBM.KQQ":         {},
	"%IBM.STATIC101":   {},
}
