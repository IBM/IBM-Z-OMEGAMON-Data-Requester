package endpoints

import (
	"context"
	"fmt"
	"itm-datasource-plugin/pkg/datasource/domain"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
	"github.com/grafana/grafana-plugin-sdk-go/data"
	"github.com/grafana/grafana-plugin-sdk-go/live"
)

var _ StreamChannelProvider = (*DataQueryResolver)(nil)

type DataQueryEndpointHandler interface {
	GetRootPath() string
	HandleQuery(context.Context, backend.DataQuery, *backend.User) (*QueryResponse, error)
}

type DataStreamEndpointHandler interface {
	DataQueryEndpointHandler
	StreamData(context.Context, *backend.RunStreamRequest, *DataSender, context.CancelFunc)
	IsAllowed(context.Context, *backend.SubscribeStreamRequest) (bool, error)
}

type StreamChannelProvider interface {
	GetChannel(string) *live.Channel
}

type DataQueryResolver struct {
	configuration  domain.Configuration
	queryHandlers  map[string]DataQueryEndpointHandler
	streamHandlers map[string]DataStreamEndpointHandler
}

func NewDataQueryResolver(configuration domain.Configuration) *DataQueryResolver {
	return &DataQueryResolver{
		configuration:  configuration,
		queryHandlers:  map[string]DataQueryEndpointHandler{},
		streamHandlers: map[string]DataStreamEndpointHandler{},
	}
}

func (resolver *DataQueryResolver) HandleDataQueries(
	ctx context.Context,
	req *backend.QueryDataRequest,
) (*backend.QueryDataResponse, error) {
	logger := backend.Logger.FromContext(ctx)
	response := backend.NewQueryDataResponse()
	user := req.PluginContext.User
	if user == nil {
		return nil, nil
	}
	logger.Debug("Start handling queries", "queries", req.Queries)
	for _, q := range req.Queries {
		response.Responses[q.RefID] = resolver.handleDataQuery(ctx, q, user)
	}
	return response, nil
}

func (resolver *DataQueryResolver) handleDataQuery(ctx context.Context, query backend.DataQuery, user *backend.User) backend.DataResponse {
	handler := resolver.queryHandlers[query.QueryType]
	if handler == nil {
		return backend.DataResponse{
			Error: fmt.Errorf("unknown query type '%s'", query.QueryType),
		}
	}

	response, err := handler.HandleQuery(ctx, query, user)
	if err != nil {
		return backend.DataResponse{
			Error:  err,
			Status: backend.StatusInternal,
		}
	}

	frames := response.getFrames()

	return backend.DataResponse{
		Frames: frames,
		Status: backend.StatusOK,
	}
}

func (resolver *DataQueryResolver) StreamData(
	ctx context.Context,
	req *backend.RunStreamRequest,
	sender *backend.StreamSender,
) error {
	handler := resolver.streamHandlers[req.Path]
	if handler == nil {
		return fmt.Errorf("unknown stream path '%s' in StreamData method", req.Path)
	}
	observer := NewDataSender(sender)
	childCtx, cancelChildCtx := context.WithCancel(ctx)
	defer cancelChildCtx()
	handler.StreamData(childCtx, req, observer, cancelChildCtx)
	return nil
}

func (resolver *DataQueryResolver) IsStreamingAllowed(
	ctx context.Context,
	req *backend.SubscribeStreamRequest,
) (*backend.SubscribeStreamResponse, error) {
	logger := backend.Logger.FromContext(ctx)
	handler := resolver.streamHandlers[req.Path]
	if handler == nil {
		logger.Warn("Unknown stream path", "path", req.Path)
		return &backend.SubscribeStreamResponse{
			Status: backend.SubscribeStreamStatusNotFound,
		}, nil
	}

	status, err := handler.IsAllowed(ctx, req)
	if err != nil {
		return nil, err
	}

	if status {
		return &backend.SubscribeStreamResponse{
			Status: backend.SubscribeStreamStatusOK,
		}, nil
	} else {
		return &backend.SubscribeStreamResponse{
			Status: backend.SubscribeStreamStatusPermissionDenied,
		}, nil
	}
}

func (resolver *DataQueryResolver) AddQueryEndpoint(handler DataQueryEndpointHandler) {
	resolver.queryHandlers[handler.GetRootPath()] = handler
}

func (resolver *DataQueryResolver) AddStreamEndpoint(handler DataStreamEndpointHandler) {
	rootPath := handler.GetRootPath()
	resolver.queryHandlers[rootPath] = handler
	resolver.streamHandlers[rootPath] = handler
}

func (resolver *DataQueryResolver) GetChannel(streamPath string) *live.Channel {
	return &live.Channel{
		Scope:     live.ScopeDatasource,
		Namespace: resolver.configuration.UID,
		Path:      streamPath,
	}
}

type DataSender struct {
	sender *backend.StreamSender
}

func NewDataSender(sender *backend.StreamSender) *DataSender {
	return &DataSender{sender: sender}
}

func (s *DataSender) Send(response *QueryResponse, err error) error {
	if err != nil {
		backend.Logger.Info("Error occurred while streaming data", err)
		return nil
	}

	if s.sender == nil {
		senderErr := fmt.Errorf("sending frame to sender which is nil")
		backend.Logger.Warn(senderErr.Error())
		return senderErr
	}

	frames := response.getFrames()
	for _, frame := range frames {
		err = s.sender.SendFrame(frame, data.IncludeAll)
		if err != nil {
			backend.Logger.Debug("Sending frame", "name", frame.Name, "error", err)
		}
	}
	return nil
}
