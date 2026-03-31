package endpoints

import (
	"errors"
	"fmt"
	"net/http"
	"net/url"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
	"github.com/julienschmidt/httprouter"

	"itm-datasource-plugin/pkg/datasource/domain"
	"itm-datasource-plugin/pkg/datasource/falcon_utils"
	"itm-datasource-plugin/pkg/datasource/gateway"
)

type AgentsResponse struct {
	Agents            domain.AgentIndex `json:"agents"`
	Groups            domain.GroupIndex `json:"groups"`
	UnsupportedAgents domain.AgentIndex `json:"unsupportedAgents"`
}

type gatewayAgentsResponse struct {
	PerTemsErrors *map[string]string `json:"perTemsErrors"`
	Data          AgentsResponse     `json:"data"`
}

func (r *gatewayAgentsResponse) getErrors() (perTemsErrors *map[string]string, gatewayError *string) {
	return r.PerTemsErrors, nil
}

func (r *gatewayAgentsResponse) getData() any {
	return r.Data
}

func AddAgentEndpoints(router *httprouter.Router, prefix string, configuration domain.Configuration) {
	handler := getAgentsEndpointHandler(configuration)
	router.GET(prefix, handler)
	router.GET(prefix+"/productCode/:productCode", handler)
	router.GET(prefix+"/affinityId/:affinityId", handler)
}

func getAgentsEndpointHandler(configuration domain.Configuration) func(rw http.ResponseWriter, req *http.Request, par httprouter.Params) {
	return func(rw http.ResponseWriter, req *http.Request, par httprouter.Params) {
		ctx := req.Context()
		logger := backend.Logger.FromContext(ctx)
		logger.Debug("Agents endpoint. Start getting agents")

		user := backend.UserFromContext(ctx)

		if user == nil {
			// Grafana doesn't allow non-authenticated users to call resources
			// Still, should check it
			writeResponse(nil, errors.New("not authenticated"), rw, nil)
			return
		}

		productCode := par.ByName("productCode")
		// TO DO OMUI5-1727 Remove unnecessary escape
		// Our go backend unescapes 2 times
		// Grafana before 10.4.0 version unescapes 1 time
		// Grafana after and including 10.4.0 version does not unescape
		// Frontend sends affinityId escaped 3 times
		possiblyEscapedId := par.ByName("affinityId")

		unescapedId, err := url.QueryUnescape(possiblyEscapedId)
		var id string
		if err != nil {
			id = possiblyEscapedId
		} else {
			id = unescapedId
		}

		logger.Debug("Agents endpoint. Request params", "productCode", productCode, "affinityId", id)

		apiPath := "/agents"
		if id != "" {
			apiPath = fmt.Sprintf("%s/affinityId/%s", apiPath, url.QueryEscape(id))
		} else if productCode != "" {
			apiPath = fmt.Sprintf("%s/productCode/%s", apiPath, productCode)
		}

		resp, _, err, gatewayDbgMsgs := gateway.GetAggregated[AgentsResponse](ctx, configuration, apiPath, nil)
		if err != nil {
			writeResponse(nil, err, rw, gatewayDbgMsgs)
			return
		}

		logger.Debug("Agents endpoint. Finish getting agents",
			"agents count", len(resp.Agents),
			"unsupported agents count", len(resp.UnsupportedAgents),
			"groups count", len(resp.Groups),
		)

		writeResponse(falcon_utils.StructToMap(resp), nil, rw, gatewayDbgMsgs)
	}
}
