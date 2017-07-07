package articles

import (
	"context"
	"log"
	"net/http"

	"github.com/gorilla/mux"

	apihttp "../http"
	"../location"
)

// MakeHandler router
func MakeHandler(as Service, logger log.Logger) http.Handler {
	loadMainPageHandler := apihttp.NewServer(
		makeLoadMainPage(as),
		decodeLoadMainPageRequest,
		logger,
	)

	r := mux.NewRouter()

	r.Handle("/v1/articles/main-page", loadMainPageHandler).Methods("GET")

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
