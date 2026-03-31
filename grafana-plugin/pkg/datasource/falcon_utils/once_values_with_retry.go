package falcon_utils

import (
	"sync/atomic"
	"time"
)

type OnceValueWithRetry[T any, K any] struct {
	onceValues   atomic.Pointer[func(K) (T, error)]
	timeoutInSec int
	action       func(K) (T, error)
}

func NewOnceValueWithRetry[T any, K any](action func(K) (T, error), timeoutInSec int) *OnceValueWithRetry[T, K] {
	onceValueWithRetry := OnceValueWithRetry[T, K]{
		action:       action,
		timeoutInSec: timeoutInSec,
		onceValues:   atomic.Pointer[func(K) (T, error)]{},
	}

	newOnceValues := onceValueWithRetry.getOnceValue()
	onceValueWithRetry.onceValues.Store(&newOnceValues)

	return &onceValueWithRetry
}

func (e *OnceValueWithRetry[T, K]) Execute(arg K) (T, error) {
	return (*e.onceValues.Load())(arg)
}

func (e *OnceValueWithRetry[T, K]) resetOnceValue() {
	defer LogPanic("resetOnceValue")
	time.Sleep(time.Duration(e.timeoutInSec) * time.Second)
	newExecuteActionOnceFunc := e.getOnceValue()
	e.onceValues.Store(&newExecuteActionOnceFunc)
}

func (e *OnceValueWithRetry[T, K]) getOnceValue() func(K) (T, error) {
	return FalconOnceValues(
		func(arg K) (T, error) {
			value, err := e.action(arg)
			if err != nil {
				go e.resetOnceValue()
				var zero T
				return zero, err
			}
			return value, nil
		},
	)
}
