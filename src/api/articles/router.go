package articles

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
)

func returnAllArticles(w http.ResponseWriter, r *http.Request) {
	articles := GetMainPage()
	fmt.Println("Endpoint Hit: articles")

	json.NewEncoder(w).Encode(articles)
}

// Init router
func Init(router *mux.Router) {
	router.HandleFunc("/main-page", returnAllArticles)
}
