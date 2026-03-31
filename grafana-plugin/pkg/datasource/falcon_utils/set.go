package falcon_utils

type Set[T comparable] struct {
	data map[T]bool
}

func NewSmallSet[T comparable]() Set[T] {
	data := make(map[T]bool)
	return Set[T]{data}
}

func NewSetOfSize[T comparable](capacity int) Set[T] {
	data := make(map[T]bool, capacity)
	return Set[T]{data}
}

func (m *Set[T]) Add(vals ...T) {
	for _, val := range vals {
		m.data[val] = true
	}
}

func (m *Set[T]) Remove(vals ...T) {
	for _, val := range vals {
		delete(m.data, val)
	}
}

func (m *Set[T]) ToSlice() []T {
	result := make([]T, len(m.data))

	idx := 0 // This way is reported to be ~15-20% faster than append
	for val := range m.data {
		result[idx] = val
		idx++
	}

	return result
}
