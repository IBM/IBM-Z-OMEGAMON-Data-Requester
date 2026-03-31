package falcon_utils

import (
	"runtime/debug"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
)

func LogPanic(handler string) {
	if err := recover(); err != nil {
		backend.Logger.Warn("Panic detected", "handler", handler, "error", err, "stack", debug.Stack())
		panic(err)
	}
}
