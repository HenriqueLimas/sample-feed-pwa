package database

import (
	"database/sql"

	"github.com/HenriqueLimas/sample-feed-pwa/src/api/articles"
	"github.com/HenriqueLimas/sample-feed-pwa/src/api/location"
	"github.com/lib/pq"
)

type articleSqlRepository struct {
	DB *sql.DB
}

func (article *articleSqlRepository) FindHeadlineByLocation(origin location.Location) (*articles.Article, error) {
	return &articles.Article{
		URL:      "posts/123456",
		Title:    "Snowing hard this week",
		Subtitle: "Montepelier will have a lot of snow today",
		Image:    "https://images.pexels.com/photos/730256/pexels-photo-730256.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
	}, nil
}

func (article *articleSqlRepository) LoadLatestArticlesByLocation(origin location.Location) (*articles.Articles, error) {
	var articlesFromDb articles.Articles

	query := "SELECT article_id, title, subtitle, images FROM articles LIMIT 5"
	rows, err := article.DB.Query(query)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		var (
			articleID string
			title     string
			subtitle  string
			images    []Image
		)

		err = rows.Scan(&articleID, &title, &subtitle, pq.Array(&images))
		if err != nil {
			return nil, err
		}

		articlesFromDb = append(articlesFromDb, articles.Article{
			ID:       articleID,
			URL:      "posts/" + articleID,
			Title:    title,
			Subtitle: subtitle,
			Image:    images[0].Url,
		})
	}

	return &articlesFromDb, nil
}

func (article *articleSqlRepository) LoadArticleByID(id string) (*articles.Article, error) {
	query := "SELECT article_id, title, subtitle, content, images FROM articles WHERE article_id = $1 LIMIT 1"

	var (
		articleID string
		title     string
		subtitle  string
		content   string
		images    []Image
	)

	if err := article.DB.QueryRow(query, id).Scan(&articleID, &title, &subtitle, &content, pq.Array(&images)); err != nil {
		return nil, err
	}

	return &articles.Article{
		ID:       articleID,
		Title:    title,
		Subtitle: subtitle,
		Image:    images[0].Url,
		Content:  content,
	}, nil
}

// NewArticleRepository create a new article Repository
func NewArticleRepository(db *sql.DB) articles.Repository {
	r := &articleSqlRepository{
		DB: db,
	}

	return r
}
