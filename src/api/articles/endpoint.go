package articles

import (
	"context"

	"../endpoint"
	"../location"
)

type loadMainPageRequest struct {
	Origin location.Location
}

type loadMainPageResponse struct {
	Headline Article  `json:"headline"`
	Articles Articles `json:"articles"`
	Err      error    `json:"error,omitempty"`
}

func (r loadMainPageResponse) error() error { return r.Err }

func makeLoadMainPage(s Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(loadMainPageRequest)
		mainPage, err := s.LoadMainPageByLocation(req.Origin)

		return loadMainPageResponse{Headline: mainPage.Headline, Articles: mainPage.Articles, Err: err}, nil
	}
}
