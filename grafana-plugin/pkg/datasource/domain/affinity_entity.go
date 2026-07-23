// Copyright contributors to the IBM-Z-OMEGAMON-data-requester project.

package domain

type AffinityId string

func (a AffinityId) String() string {
	return string(a)
}

type AffinityEntity struct {
	Id          AffinityId `json:"id"`
	DisplayText string     `json:"displayText"`
	ProductCode string     `json:"productCode"`
	Symbol      string     `json:"symbol"`
}
