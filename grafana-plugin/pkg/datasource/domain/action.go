package domain

type LiteralPatternItem struct {
	Value string `json:"value"`
	Type  string `json:"type"`
}

type VariablePatternItem struct {
	Name string `json:"name"`
	Type string `json:"type"`
}

type ActionCommand struct {
	Pattern   []any    `json:"pattern"`
	Variables []string `json:"variables"`
}

type ActionDefinition struct {
	Id         string        `json:"id"`
	AffinityId AffinityId    `json:"affinityId"`
	Name       string        `json:"name"`
	Command    ActionCommand `json:"command"`
	Version    int           `json:"version"`
}
