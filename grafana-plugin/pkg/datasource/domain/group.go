package domain

type Group struct {
	Name           string         `json:"name"`
	AffinityEntity AffinityEntity `json:"affinityEntity"`
	Agents         []AgentId      `json:"agents"`
}

type GroupIndex = map[string]Group
