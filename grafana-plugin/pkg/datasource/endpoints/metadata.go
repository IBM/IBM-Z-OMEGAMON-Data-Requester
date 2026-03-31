package endpoints

import (
	"itm-datasource-plugin/pkg/datasource/domain"
	"itm-datasource-plugin/pkg/datasource/gateway"
	"net/http"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
	"github.com/grafana/grafana-plugin-sdk-go/backend/log"
	"github.com/julienschmidt/httprouter"
)

func AddMetadataServiceEndpoints(router *httprouter.Router, prefix string, configuration domain.Configuration) {
	router.GET(prefix+"/tables/id/:tableId", getTableByIdEndpointHandler(configuration))
	router.GET(prefix+"/applications", getApplicationsEndpointHandler(configuration))
}

func getTableByIdEndpointHandler(configuration domain.Configuration) func(rw http.ResponseWriter, req *http.Request, par httprouter.Params) {
	return func(rw http.ResponseWriter, req *http.Request, par httprouter.Params) {
		ctx := req.Context()
		logger := backend.Logger.FromContext(ctx)
		id := par.ByName("tableId")
		logger.Debug("Metadata endpoint. Start getting table by id", "id", id)

		resp, _, err, gatewayDbgMsgs := gateway.GetAggregated[domain.TableMetadata](ctx, configuration, "/tables/id/"+id, nil)
		if err != nil {
			logger.Error("Metadata endpoint. Failed to get table by id", "table_id", id, "error", err)
			writeResponse(nil, err, rw, gatewayDbgMsgs)
			return
		}

		logger.Debug("Metadata endpoint. Finish getting table by id", "id", id, "version", resp.Version, "affinity", resp.AffinityEntity)
		writeResponse(map[string]any{"table": resp}, err, rw, gatewayDbgMsgs)
	}
}

type applicationsGatewayResponse struct {
	Applications  []domain.ApplicationMetadata `json:"applications"`
	PerTemsErrors map[string]string            `json:"perTemsErrors"`
}

func getApplicationsEndpointHandler(configuration domain.Configuration) func(rw http.ResponseWriter, req *http.Request, par httprouter.Params) {
	return func(rw http.ResponseWriter, req *http.Request, par httprouter.Params) {
		ctx := req.Context()
		logger := backend.Logger.FromContext(ctx)
		logger.Debug("Metadata endpoint. Start getting applications")

		resp, _, err, gatewayDbgMsgs := gateway.GetAggregated[[]domain.ApplicationMetadata](ctx, configuration, "/applications", nil)
		if err != nil {
			logger.Error("Metadata endpoint. Failed to get applications", "error", err)
			writeResponse(nil, err, rw, gatewayDbgMsgs)
			return
		}

		if logger.Level() == log.Debug {
			applicationAffinityIDs := domain.GetApplicationAffinityIDs(resp)
			logger.Debug("Metadata endpoint. Finish getting applications", "application affinities", applicationAffinityIDs)
		}

		filteredApplications := make([]domain.ApplicationMetadata, 0, len(domain.AllowedApplicationAffinityIds))

		for _, applicationMetadata := range resp {
			_, applicationIsAllowed := domain.AllowedApplicationAffinityIds[applicationMetadata.AffinityEntity.Id]
			if applicationIsAllowed {
				filteredApplications = append(filteredApplications, applicationMetadata)
			}
		}

		writeResponse(map[string]any{"applications": filteredApplications}, err, rw, gatewayDbgMsgs)
	}
}
