package endpoints

import (
	"context"
	"itm-datasource-plugin/pkg/datasource/domain"
	"itm-datasource-plugin/pkg/datasource/gateway"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
)

var _ DataQueryEndpointHandler = (*SituationStreamEndpoint)(nil)

type SituationStreamEndpoint struct {
	channelProvider StreamChannelProvider
	configuration   domain.Configuration
	rootPath        string
}

func NewSituationStreamEndpoint(
	rootPath string,
	channelProvider StreamChannelProvider,
	configuration domain.Configuration,
) *SituationStreamEndpoint {
	return &SituationStreamEndpoint{
		channelProvider: channelProvider,
		configuration:   configuration,
		rootPath:        rootPath,
	}
}

var situationsColumns = []string{
	"Status",
	"Atomize",
	"Node",
	"Result",
	"Name",
	"LocalTimestamp",
	"Sitcount",
	"Type",
	"Originnode",
}

var queryResponseName = "situations"

type situationsGatewayResponse struct {
	Situations    *[]domain.SituationEvent `json:"situations"`
	PerTemsErrors *map[string]string       `json:"perTemsErrors"`
}

func (r *situationsGatewayResponse) getErrors() (perTemsErrors *map[string]string, gatewayError *string) {
	return r.PerTemsErrors, nil
}

func (r *situationsGatewayResponse) getData() any {
	return r.Situations
}

func (e *SituationStreamEndpoint) HandleQuery(ctx context.Context, query backend.DataQuery, user *backend.User) (*QueryResponse, error) {
	logger := backend.Logger.FromContext(ctx)
	logger.Debug("Situations endpoint. Start getting situations", "query", query)

	resp, perSourceErrors, err, gatewayDbgMsgs := gateway.GetAggregated[[]domain.SituationEvent](ctx, e.configuration, "/events", nil)
	if err != nil {
		logger.Error("Situations endpoint: Failed to get situations from gateway", "error", err)
		return nil, err
	}

	rows, err := newQueryRows(resp)
	logger.Debug("Situations endpoint. Finish getting situations", "situations count", len(resp), "error", err)
	if err != nil {
		return nil, err
	}

	return newQueryResponse(queryResponseName, rows, nil, situationsColumns, gatewayDbgMsgs, perSourceErrors, false, false), nil
}

func (e *SituationStreamEndpoint) GetRootPath() string {
	return e.rootPath
}

func (e *SituationStreamEndpoint) IsAllowed(ctx context.Context, req *backend.SubscribeStreamRequest) (bool, error) {
	return true, nil
}
