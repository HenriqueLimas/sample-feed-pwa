package articles

import (
	"github.com/HenriqueLimas/sample-feed-pwa/src/api/location"
)

// Service interface
type Service interface {
	LoadMainPageByLocation(origin location.Location) (*MainPage, error)
	LoadArticleByID(id string) (*Article, error)
}

type service struct {
	articles Repository
}

func (s *service) LoadMainPageByLocation(origin location.Location) (*MainPage, error) {
	headline, err := s.articles.FindHeadlineByLocation(origin)
	if err != nil {
		return nil, err
	}

	articles, err := s.articles.LoadLatestArticlesByLocation(origin)
	if err != nil {
		return nil, err
	}

	return &MainPage{
		Headline: *headline,
		Articles: *articles,
	}, nil
}

func (s *service) LoadArticleByID(id string) (*Article, error) {
	article, err := s.articles.LoadArticleByID(id)
	if err != nil {
		return nil, err
	}

	return article, nil
}

// NewService creates a article service
func NewService(articles Repository) Service {
	return &service{
		articles: articles,
	}
}
