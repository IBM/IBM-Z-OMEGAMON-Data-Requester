package endpoints

import (
	"encoding/json"
	"fmt"
	"maps"
	"net/http"
)

const gatewayDebugFieldName = "__gateway_debug"

func writeResponse(data map[string]any, err error, rw http.ResponseWriter, gatewayMessages any) {
	if err != nil {
		writeErrorResponse(err, rw, gatewayMessages)
		return
	}

	rw.Header().Add("Content-Type", "application/json")

	dataCopy := maps.Clone(data)
	if dataCopy == nil {
		dataCopy = make(map[string]any)
	}
	dataCopy[gatewayDebugFieldName] = gatewayMessages

	rw.WriteHeader(http.StatusOK)
	metadataInfoEncoderErr := json.NewEncoder(rw).Encode(dataCopy)
	if metadataInfoEncoderErr != nil {
		writeErrorResponse(metadataInfoEncoderErr, rw, gatewayMessages)
	}
}

func writeErrorResponse(err error, rw http.ResponseWriter, gatewayMessages any) {
	rw.WriteHeader(http.StatusInternalServerError)
	errorEncodeErr := json.NewEncoder(rw).Encode(
		map[string]any{
			"error":               err.Error(),
			gatewayDebugFieldName: gatewayMessages,
		},
	)
	if errorEncodeErr != nil {
		panic(fmt.Sprintf("unable to encode error (%s) response: %s", err.Error(), errorEncodeErr.Error()))
	}
}
