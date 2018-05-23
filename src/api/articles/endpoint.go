package articles

import (
	"context"

	"github.com/HenriqueLimas/sample-feed-pwa/src/api/endpoint"
	"github.com/HenriqueLimas/sample-feed-pwa/src/api/location"
)

// Main Page
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

// Article
type loadArticleRequest struct {
	ID string
}

type loadArticleResponse struct {
	Article Article `json:"article"`
	Err     error
}

func (r loadArticleResponse) error() error { return r.Err }

func makeLoadArticle(s Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(loadArticleRequest)
		article, err := s.LoadArticleByID(req.ID)
		if err != nil {
			return nil, err
		}

		return loadArticleResponse{Article: *article, Err: err}, nil
	}
}
