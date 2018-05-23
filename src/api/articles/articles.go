package articles

import (
	"github.com/HenriqueLimas/sample-feed-pwa/src/api/location"
)

// Article type for articles
type Article struct {
	ID       string `json:"article_id,omitempty"`
	URL      string `json:"url,omitempty"`
	Title    string `json:"title"`
	Subtitle string `json:"subtitle"`
	Image    string `json:"image"`
	Content  string `json:"content,omitempty"`
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
	LoadArticleByID(id string) (*Article, error)
}
