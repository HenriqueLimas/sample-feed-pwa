package database

import (
	"github.com/gocql/gocql"

	"github.com/HenriqueLimas/sample-feed-pwa/src/api/articles"
	"github.com/HenriqueLimas/sample-feed-pwa/src/api/location"
)

type articleRepository struct {
	DB *gocql.Session
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
	var articlesFromDb articles.Articles

	query := "SELECT article_id, title, subtitle, content, images FROM articles_by_user LIMIT 5"
	iterable := article.DB.Query(query).Iter()
	articleIterable := map[string]interface{}{}

	for iterable.MapScan(articleIterable) {
		images := articleIterable["images"].([]map[string]interface{})

		articlesFromDb = append(articlesFromDb, articles.Article{
			URL:      "posts/" + articleIterable["article_id"].(gocql.UUID).String(),
			Title:    articleIterable["title"].(string),
			Subtitle: articleIterable["subtitle"].(string),
			Image:    images[0]["url"].(string),
		})
	}

	return &articlesFromDb, nil
}

// NewArticleRepository create a new article Repository
func NewArticleRepository(db *gocql.Session) articles.Repository {
	r := &articleRepository{
		DB: db,
	}

	return r
}
