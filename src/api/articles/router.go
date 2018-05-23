package articles

import (
	"context"
	"log"
	"net/http"

	"github.com/gorilla/mux"

	apihttp "github.com/HenriqueLimas/sample-feed-pwa/src/api/http"
	"github.com/HenriqueLimas/sample-feed-pwa/src/api/location"
)

// MakeHandler router
func MakeHandler(as Service, logger log.Logger) http.Handler {
	loadMainPageHandler := apihttp.NewServer(
		makeLoadMainPage(as),
		decodeLoadMainPageRequest,
		logger,
	)

	loadArticleHandler := apihttp.NewServer(
		makeLoadArticle(as),
		decodeLoadArticleRequest,
		logger,
	)

	r := mux.NewRouter()

	r.Handle("/v1/articles/main-page", loadMainPageHandler).Methods("GET")
	r.Handle("/v1/articles/{id}", loadArticleHandler).Methods("GET")

	return r
}

func decodeLoadMainPageRequest(_ context.Context, r *http.Request) (interface{}, error) {
	query := r.URL.Query()
	origin := location.Location{
		Lat:  query.Get("lat"),
		Long: query.Get("long"),
	}

	return loadMainPageRequest{
		Origin: origin,
	}, nil
}

func decodeLoadArticleRequest(_ context.Context, r *http.Request) (interface{}, error) {
	vars := mux.Vars(r)

	return loadArticleRequest{
		ID: vars["id"],
	}, nil
}
