package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	apiarticles "github.com/HenriqueLimas/sample-feed-pwa/src/api/articles"
	"github.com/HenriqueLimas/sample-feed-pwa/src/api/database"
)

const (
	defaultPort = "8080"
)

type mockDatabase struct{}

func main() {
	var (
		addr     = envString("PORT", defaultPort)
		httpAddr = flag.String("http.addr", ":"+addr, "HTTP listen address")
	)

	flag.Parse()

	logger := log.New(os.Stderr, "Logger: ", log.Lshortfile)

	db := database.Database{}

	var (
		articles = database.NewArticleRepository(&db)
	)

	var as apiarticles.Service

	as = apiarticles.NewService(articles)

	mux := http.NewServeMux()

	mux.Handle("/v1/articles/", apiarticles.MakeHandler(as, *logger))

	http.Handle("/", accessControl(mux))

	errs := make(chan error, 2)
	go func() {
		logger.Println("transport", "http", "address", *httpAddr, "msg", "listening")
		errs <- http.ListenAndServe(*httpAddr, nil)
	}()
	go func() {
		c := make(chan os.Signal)
		signal.Notify(c, syscall.SIGINT)
		errs <- fmt.Errorf("%s", <-c)
	}()

	logger.Println("terminated", <-errs)
}

func accessControl(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type")

		if r.Method == "OPTIONS" {
			return
		}

		h.ServeHTTP(w, r)
	})
}

func envString(env, fallback string) string {
	e := os.Getenv(env)

	if e == "" {
		return fallback
	}

	return e
}
