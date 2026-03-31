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

// type SituationEndpointObserver struct {
// 	sender *DataSender
// 	cancel context.CancelFunc
// }

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

	// OMUI5-553 Return streaming
	// channel := e.channelProvider.GetChannel(e.GetRootPath())
	// return newQueryResponseFromStructs(queryResponseName, situations, channel, situationsColumns)
	return newQueryResponse(queryResponseName, rows, nil, situationsColumns, gatewayDbgMsgs, perSourceErrors), nil
}

// OMUI5-553 Return streaming
// func (e *SituationStreamEndpoint) StreamData(ctx context.Context, req *backend.RunStreamRequest, sender *DataSender, cancelCtx context.CancelFunc) {
// 	situationObserver := &SituationEndpointObserver{
// 		sender: sender,
// 		cancel: cancelCtx,
// 	}
// 	e.situationService.Subscribe(situationObserver)
// 	<-ctx.Done()
// 	e.situationService.Unsubscribe(situationObserver)
// }

func (e *SituationStreamEndpoint) GetRootPath() string {
	return e.rootPath
}

func (e *SituationStreamEndpoint) IsAllowed(ctx context.Context, req *backend.SubscribeStreamRequest) (bool, error) {
	return true, nil
}

// OMUI5-553 Return streaming
// func (o *SituationEndpointObserver) Update(situations []domain.SituationEvent, err error) {
// 	if err != nil {
// 		log.DefaultLogger.Warn("Error occurred while listening for situations updates: ", err)
// 		if err := o.sender.Send(nil, err); err != nil {
// 			o.cancel()
// 		}
// 	}

// 	if err := o.sender.Send(newQueryResponseFromStructs(queryResponseName, situations, nil, situationsColumns)); err != nil {
// 		o.cancel()
// 	}
// }
