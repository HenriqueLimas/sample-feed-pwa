package main

import (
	"./articles"
	"fmt"
	"github.com/gorilla/mux"
	"log"
	"net/http"
)

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to the Home Page")
	fmt.Println("Endpoint Hit: homepage")
}

func handleRequests() {
	router := mux.NewRouter()
	router.HandleFunc("/", homePage)

	articles.Init(router)

	http.Handle("/", router)
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func main() {
	handleRequests()
}
