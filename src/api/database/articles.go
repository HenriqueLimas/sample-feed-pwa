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
		Image:    "https://images.pexels.com/photos/730256/pexels-photo-730256.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
	}, nil
}

func (article *articleRepository) LoadLatestArticlesByLocation(origin location.Location) (*articles.Articles, error) {
	var articlesFromDb articles.Articles

	query := "SELECT article_id, title, subtitle, content, images FROM articles_by_user LIMIT 5"
	iterable := article.DB.Query(query).Iter()
	articleIterable := map[string]interface{}{}

	for iterable.MapScan(articleIterable) {
		images := articleIterable["images"].([]map[string]interface{})

		articleID := articleIterable["article_id"].(gocql.UUID).String()

		articlesFromDb = append(articlesFromDb, articles.Article{
			ID:       articleID,
			URL:      "posts/" + articleID,
			Title:    articleIterable["title"].(string),
			Subtitle: articleIterable["subtitle"].(string),
			Image:    images[0]["url"].(string),
		})
	}

	return &articlesFromDb, nil
}

func (article *articleRepository) LoadArticleByID(id string) (*articles.Article, error) {
	uuid, err := gocql.ParseUUID(id)
	if err != nil {
		return nil, err
	}

	query := "SELECT article_id, title, subtitle, content, images FROM articles WHERE article_id = ? LIMIT 1"
	articleIterable := map[string]interface{}{}

	if err := article.DB.Query(query, uuid).Consistency(gocql.One).MapScan(articleIterable); err != nil {
		return nil, err
	}

	images := articleIterable["images"].([]map[string]interface{})
	articleID := articleIterable["article_id"].(gocql.UUID).String()

	return &articles.Article{
		ID:       articleID,
		Title:    articleIterable["title"].(string),
		Subtitle: articleIterable["subtitle"].(string),
		Image:    images[0]["url"].(string),
		Content:  articleIterable["content"].(string),
	}, nil
}

// NewArticleRepository create a new article Repository
func NewArticleRepository(db *gocql.Session) articles.Repository {
	r := &articleRepository{
		DB: db,
	}

	return r
}
