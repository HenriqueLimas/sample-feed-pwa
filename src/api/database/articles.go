package database

import (
	"github.com/HenriqueLimas/sample-feed-pwa/src/api/articles"
	"github.com/HenriqueLimas/sample-feed-pwa/src/api/location"
)

type articleRepository struct {
	DB *Database
}

func (article *articleRepository) FindHeadlineByLocation(origin location.Location) (*articles.Article, error) {
	return &articles.Article{
		URL:      "posts/123456",
		Title:    "Snowing hard this week",
		Subtitle: "Montepelier will have a lot of snow today",
		Image:    "https://monosnap.com/file/MPTTcBp3h8e2by9o7YB4p437Ckux8g.png",
	}, nil
}

func (article *articleRepository) LoadLatestArticlesByLocation(origin location.Location) (*articles.Articles, error) {
	return &articles.Articles{
		articles.Article{URL: "/posts/569878", Title: "John closed", Subtitle: "John store closed yesterday", Image: "https://monosnap.com/file/QYowGO3y9hIyRH8c6FuhXsR5X9XJBU.png"},
		articles.Article{URL: "/posts/984564", Title: "Taxi vs Uber", Subtitle: "Who will win that battle in Montepelier", Image: "https://monosnap.com/file/GOtFNlrmvq0NGgRTV8nX0K5oTuT1iZ.png"},
		articles.Article{URL: "/posts/787878", Title: "New Graffito", Subtitle: "The wall has a new Graffito", Image: "https://monosnap.com/file/csxHA93yyHdaFd1PoL7H8eDV44f6lW.png"},
		articles.Article{URL: "/posts/548975", Title: "Murder on downtown", Subtitle: "Yesterday downtown had a murder", Image: "https://monosnap.com/file/XN4zaQlEhCd0xtQOBWxt0RaKJQTHNz.png"},
	}, nil
}

// NewArticleRepository create a new article Repository
func NewArticleRepository(db *Database) articles.Repository {
	r := &articleRepository{
		DB: db,
	}

	return r
}
