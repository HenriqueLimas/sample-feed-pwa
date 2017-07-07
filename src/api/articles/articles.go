package articles

import (
	"../location"
)

// Article type for articles
type Article struct {
	URL      string `json:"url"`
	Title    string `json:"title"`
	Subtitle string `json:"subtitle"`
	Image    string `json:"image"`
}

// Articles list of article
type Articles []Article

// MainPage structure
type MainPage struct {
	Headline Article
	Articles Articles
}

// Repository provide access to articles
type Repository interface {
	FindHeadlineByLocation(origin location.Location) (*Article, error)
	LoadLatestArticlesByLocation(origin location.Location) (*Articles, error)
}
