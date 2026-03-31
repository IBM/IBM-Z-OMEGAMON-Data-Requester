package falcon_utils

import (
	"sync"
)

// This is version of sync.OnceValues that allows passing argument to the original function.
// Original function will only be called once (with the argument provided by the very first call)
// It's mostly the copy of original implementation: https://cs.opensource.google/go/go/+/refs/tags/go1.21.6:src/sync/oncefunc.go
func FalconOnceValues[TArg any, T1 any, T2 any](f func(TArg) (T1, T2)) func(TArg) (T1, T2) {
	var (
		once       sync.Once
		valid      bool
		panicValue any
		r1         T1
		r2         T2
	)

	return func(arg TArg) (T1, T2) {
		g := func() {
			defer func() {
				// nil if 'f' didn't panic
				panicValue = recover()
				if !valid {
					panic(panicValue)
				}
			}()
			r1, r2 = f(arg)
			valid = true
		}
		once.Do(g)
		if !valid {
			panic(panicValue)
		}
		return r1, r2
	}
}
