package domain

import (
	"encoding/json"
	"fmt"
	"time"
)

type EventStatus string

const (
	EventStatus_Open    EventStatus = "Y"
	EventStatus_Closed  EventStatus = "N"
	EventStatus_Error   EventStatus = "X"
	EventStatus_Started EventStatus = "L"
)

func (eventStatus *EventStatus) UnmarshalJSON(data []byte) (err error) {
	var s string
	if err := json.Unmarshal(data, &s); err != nil {
		return err
	}
	status := EventStatus(s)
	switch status {
	case EventStatus_Open,
		EventStatus_Closed,
		EventStatus_Started,
		EventStatus_Error:
		*eventStatus = status
		return nil
	}
	return fmt.Errorf("unknown situation event status received: '%s'", s)
}

type EventType string

const (
	SampledEvent EventType = "Sampled"
	PureEvent    EventType = "Pure"
	HubEvent     EventType = "Hub"
)

type SituationEvent struct {
	Id             string
	Originnode     string
	Status         string
	Atomize        string
	Node           string
	LocalTimestamp time.Time
	Result         string
	Sitcount       int
	Type           EventType
	Name           string
}
