package endpoints

import (
	"errors"
	"net/http"
	"net/url"

	"github.com/grafana/grafana-plugin-sdk-go/backend"

	"itm-datasource-plugin/pkg/datasource/domain"
	"itm-datasource-plugin/pkg/datasource/gateway"
)

type ActionsResponse struct {
	Actions []domain.ActionDefinition `json:"actions"`
}

type gatewayActionsResponse struct {
	Error string                    `json:"error"`
	Data  []domain.ActionDefinition `json:"data"`
}

func AddActionEndpoints(mux *http.ServeMux, prefix string, configuration domain.Configuration) {
	handler := getActionsEndpointHandler(configuration)
	mux.HandleFunc("GET "+prefix, handler)
	mux.HandleFunc("GET "+prefix+"/affinityId/{affinityId}", handler)
}

func getActionsEndpointHandler(configuration domain.Configuration) http.HandlerFunc {
	return func(rw http.ResponseWriter, req *http.Request) {
		ctx := req.Context()
		logger := backend.Logger.FromContext(ctx)
		logger.Debug("Actions endpoint. Start getting actions")

		user := backend.UserFromContext(ctx)

		if user == nil {
			// Grafana doesn't allow non-authenticated users to call resources
			// Still, should check it
			writeResponse(nil, errors.New("not authenticated"), rw, nil)
			return
		}

		// TO DO OMUI5-1727 Remove unnecessary escape
		// Our go backend unescapes 2 times
		// Grafana before 10.4.0 version unescapes 1 time
		// Grafana after and including 10.4.0 version does not unescape
		// Frontend sends affinityId escaped 3 times
		possiblyEscapedId := req.PathValue("affinityId")

		unescapedId, err := url.QueryUnescape(possiblyEscapedId)
		var id string
		if err != nil {
			id = possiblyEscapedId
		} else {
			id = unescapedId
		}

		logger.Debug("Actions endpoint. Request params", "affinityId", id)

		apiPath := "/actions"
		query := url.Values{}
		if id != "" {
			query.Add("affinityId", id)
		}
		for _, cv := range req.URL.Query()["contextVariable"] {
			query.Add("contextVariable", cv)
		}

		resp, _, err := gateway.Get[gatewayActionsResponse](ctx, configuration, apiPath, query)
		if err != nil {
			writeResponse(nil, err, rw, nil)
			return
		}

		if resp.Error != "" {
			writeResponse(nil, err, rw, nil)
			return
		}

		logger.Debug("Actions endpoint. Finish getting actions",
			"actions count", len(resp.Data),
		)

		writeResponse(map[string]any{"actions": resp.Data}, nil, rw, nil)
	}
}
