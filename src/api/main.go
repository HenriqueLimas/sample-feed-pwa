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
	apiauth "github.com/HenriqueLimas/sample-feed-pwa/src/api/auth"
	"github.com/HenriqueLimas/sample-feed-pwa/src/api/database"
)

const (
	defaultPort = "8080"
)

type mockDatabase struct{}

func main() {
	var (
		addr              = envString("PORT", defaultPort)
		authSecret        = envString("AUTH_SECRET", "Yay")
		cassandraAddress  = envString("CASSANDRA_ADDRESS", "192.168.99.100")
		cassandraKeyspace = envString("CASSANDRA_KEYSPACE", "news_in_city")
		httpAddr          = flag.String("http.addr", ":"+addr, "HTTP listen address")
	)

	flag.Parse()

	logger := log.New(os.Stderr, "Logger: ", log.Lshortfile)

	cassandraSession, err := database.InitCassandra(cassandraKeyspace, cassandraAddress)
	defer cassandraSession.Close()
	if err != nil {
		logger.Fatal(err)
	}

	var (
		articles = database.NewArticleRepository(cassandraSession)
	)

	var as apiarticles.Service
	var authService = apiauth.NewService(authSecret)

	as = apiarticles.NewService(articles)

	mux := http.NewServeMux()

	mux.Handle("/v1/articles/", apiarticles.MakeHandler(as, *logger))
	mux.Handle("/v1/login", apiauth.MakeHandler(authService, *logger))

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
