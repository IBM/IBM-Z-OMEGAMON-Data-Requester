package falcon_utils

import "sync"

// Just a wrapper over sync.Map
// It's not really lockfree but in most of the cases it doesn't lock the
// goroutine
type LockfreeMap[K comparable, V any] struct {
	m sync.Map
}

func (lm *LockfreeMap[K, V]) Load(key K) (V, bool) {
	v, ok := lm.m.Load(key)
	if ok {
		return v.(V), ok
	}
	return *new(V), ok
}

func (lm *LockfreeMap[K, V]) Store(key K, value V) {
	lm.m.Store(key, value)
}

func (lm *LockfreeMap[K, V]) Delete(key K) {
	lm.m.Delete(key)
}

func (lm *LockfreeMap[K, V]) LoadAndDelete(key K) (V, bool) {
	v, ok := lm.m.LoadAndDelete(key)
	if ok {
		return v.(V), ok
	}
	return *new(V), ok
}

func (lm *LockfreeMap[K, V]) LoadOrStore(key K, value V) (V, bool) {
	v, loaded := lm.m.LoadOrStore(key, value)
	return v.(V), loaded
}

func (lm *LockfreeMap[K, V]) Range(f func(key K, value V) bool) {
	lm.m.Range(func(key, value any) bool {
		return f(key.(K), value.(V))
	})
}
