package domain

import "net/http"

// Falcon datasource plugin instance settings.
// This comes from `DataSourceInstanceSettings` and mostly handled by .
// See https://pkg.go.dev/github.com/grafana/grafana-plugin-sdk-go/backend#DataSourceInstanceSettings
type Configuration struct {
	// - gateway url. Is taken from DataSourceInstanceSettings.URL
	GatewayBaseUrl string `json:"-"`
	// - ID is the Grafana assigned numeric identifier of the the data source instance.
	ID int64 `json:"-"`
	// - UID is the Grafana assigned string identifier of the the data source instance.
	UID string `json:"-"`
	// - NAME is the Grafana name of datasource instance
	Name string `json:"-"`
	// - The http client used to communicate with gateway.
	HttpClient *http.Client
}
