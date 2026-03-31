package domain

type AgentId string

func (n AgentId) String() string {
	return string(n)
}

type Agent struct {
	Originnode     AgentId        `json:"originnode"`
	ManagingTems   AgentId        `json:"managingTems"`
	IsOnline       bool           `json:"isOnline"`
	Version        int64          `json:"version"`
	VersionStr     string         `json:"versionString"`
	ProductCode    string         `json:"productCode"`
	AffinityEntity AffinityEntity `json:"affinityEntity"`
}

type AgentIndex = map[AgentId]Agent

var ORIGINNODE = "ORIGINNODE"
