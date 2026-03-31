package plugin

import (
	"context"
	"encoding/json"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
	"github.com/grafana/grafana-plugin-sdk-go/backend/httpclient"
	"github.com/grafana/grafana-plugin-sdk-go/backend/instancemgmt"
	"github.com/grafana/grafana-plugin-sdk-go/backend/log"
	"github.com/grafana/grafana-plugin-sdk-go/backend/resource/httpadapter"
	"github.com/julienschmidt/httprouter"

	"itm-datasource-plugin/pkg/datasource/domain"
	"itm-datasource-plugin/pkg/datasource/endpoints"
	"itm-datasource-plugin/pkg/datasource/falcon_utils"
)

type FalconDatasource struct {
	configuration     domain.Configuration
	resourceHandler   backend.CallResourceHandler
	dataQueryResolver *endpoints.DataQueryResolver
}

// Make sure FalconDatasource implements required interfaces. This is important to do
// since otherwise we will only get a not implemented error response from plugin in
// runtime. In this example datasource instance implements backend.QueryDataHandler,
// backend.CheckHealthHandler, backend.StreamHandler interfaces. Plugin should not
// implement all these interfaces - only those which are required for a particular task.
// For example if plugin does not need streaming functionality then you are free to remove
// methods that implement backend.StreamHandler. Implementing instancemgmt.InstanceDisposer
// is useful to clean up resources used by previous datasource instance when a new datasource
// instance created upon datasource settings changed.
var (
	_ backend.QueryDataHandler    = (*FalconDatasource)(nil)
	_ backend.CheckHealthHandler  = (*FalconDatasource)(nil)
	_ backend.StreamHandler       = (*FalconDatasource)(nil)
	_ backend.CallResourceHandler = (*FalconDatasource)(nil)
)

const (
	QueryType_Metrics    = "metrics"
	QueryType_Situations = "situations"
)

type JsonDataSettings struct {
	OauthPassThru bool `json:"oauthPassThru"`
	// TlsSkipVerify          bool   `json:"tlsSkipVerify"`
	// Timeout                int    `json:"timeout"`
	// MetadataCacheTimeInSec int    `json:"metadataCacheTimeInSec"`
	// AdminUrl               string `json:"adminUrl"`
	// FalconVersion          int    `json:"falconVersion"`
}

// NewFalconDatasource creates a new datasource instance.
func NewFalconDatasource(ctx context.Context, settings backend.DataSourceInstanceSettings) (inst instancemgmt.Instance, err error) {
	defer falcon_utils.LogPanic("NewFalconDatasource")

	backend.Logger.Info("Start spawning new OMEGAMON datasource instance", "id", settings.ID, "UID", settings.UID, "Name", settings.Name)
	backend.Logger.Debug("Datasource instance settings",
		"ID", settings.ID,
		"UID", settings.UID,
		"Name", settings.Name,
		"User", settings.User,
		"BasicAuthEnabled", settings.BasicAuthEnabled,
		"BasicAuthUser", settings.BasicAuthUser,
		"JSONData", settings.JSONData,
		"Updated", settings.Updated.String(),
	)

	var configuration domain.Configuration

	configuration.ID = settings.ID
	configuration.UID = settings.UID
	configuration.Name = settings.Name
	configuration.GatewayBaseUrl = settings.URL
	httpClientOptions, err := settings.HTTPClientOptions(ctx)
	if err != nil {
		return nil, err
	}

	var s JsonDataSettings
	jsonParseErr := json.Unmarshal(settings.JSONData, &s)
	if jsonParseErr != nil {
		return nil, jsonParseErr
	}

	if s.OauthPassThru == true {
		httpClientOptions.ForwardHTTPHeaders = true
	}

	configuration.HttpClient, err = httpclient.New(httpClientOptions)
	if err != nil {
		return nil, err
	}

	resourceRouter := httprouter.New()
	endpoints.AddMetadataServiceEndpoints(resourceRouter, "/metadata", configuration)
	endpoints.AddAgentEndpoints(resourceRouter, "/agents", configuration)
	endpoints.AddActionEndpoints(resourceRouter, "/actions", configuration)

	dataQueryResolver := endpoints.NewDataQueryResolver(configuration)
	dataQueryResolver.AddQueryEndpoint(endpoints.NewSituationStreamEndpoint(
		QueryType_Situations,
		dataQueryResolver,
		configuration,
	))
	dataQueryResolver.AddQueryEndpoint(endpoints.NewMetricsQueryEndpoint(QueryType_Metrics, configuration))

	datasource := &FalconDatasource{
		configuration:     configuration,
		resourceHandler:   httpadapter.New(resourceRouter),
		dataQueryResolver: dataQueryResolver,
	}
	backend.Logger.Info("OMEGAMON datasource instance successfully spawned", "UID", settings.UID)
	return datasource, nil
}

func (d *FalconDatasource) CallResource(ctx context.Context, req *backend.CallResourceRequest, sender backend.CallResourceResponseSender) error {
	defer falcon_utils.LogPanic("CallResource")
	return d.resourceHandler.CallResource(getCtxWithRequestID(ctx), req, sender)
}

// QueryData handles multiple queries and returns multiple responses.
// req contains the queries []DataQuery (where each query contains RefID as a unique identifier).
// The QueryDataResponse contains a map of RefID to the response for each query, and each response
// contains Frames ([]*Frame).
func (d *FalconDatasource) QueryData(ctx context.Context, req *backend.QueryDataRequest) (*backend.QueryDataResponse, error) {
	defer falcon_utils.LogPanic("QueryData")
	return d.dataQueryResolver.HandleDataQueries(getCtxWithRequestID(ctx), req)
}

// CheckHealth handles health checks sent from Grafana to the plugin.
// The main use case for these health checks is the test button on the
// datasource configuration page which allows users to verify that
// a datasource is working as expected.
func (d *FalconDatasource) CheckHealth(ctx context.Context, req *backend.CheckHealthRequest) (*backend.CheckHealthResult, error) {
	defer falcon_utils.LogPanic("CheckHealth")
	return endpoints.CheckHealth(getCtxWithRequestID(ctx), d.configuration)
}

// SubscribeStream is called when a client wants to connect to a stream. This callback
// allows sending the first message.
func (d *FalconDatasource) SubscribeStream(ctx context.Context, req *backend.SubscribeStreamRequest) (*backend.SubscribeStreamResponse, error) {
	defer falcon_utils.LogPanic("SubscribeStream")
	return d.dataQueryResolver.IsStreamingAllowed(ctx, req)
}

// RunStream is called once for any open channel.  Results are shared with everyone
// subscribed to the same channel.
// If RunStream returns error, then Grafana automatically:
// 1. prints error in console
// 2. calls RunStream again with same arguments
func (d *FalconDatasource) RunStream(ctx context.Context, req *backend.RunStreamRequest, sender *backend.StreamSender) error {
	defer falcon_utils.LogPanic("RunStream")
	return d.dataQueryResolver.StreamData(getCtxWithRequestID(ctx), req, sender)
}

// PublishStream is called when a client sends a message to the stream.
func (d *FalconDatasource) PublishStream(_ context.Context, req *backend.PublishStreamRequest) (*backend.PublishStreamResponse, error) {
	defer falcon_utils.LogPanic("PublishStream")
	// Do not allow publishing at all.
	return &backend.PublishStreamResponse{
		Status: backend.PublishStreamStatusPermissionDenied,
	}, nil
}

// TODO: properly integrate with tracing capabilities
func getCtxWithRequestID(ctx context.Context) context.Context {
	return log.WithContextualAttributes(ctx, []any{"RequestID", falcon_utils.GetRandomString(15)})
}
