package auth

import (
	"context"
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"

	apihttp "github.com/HenriqueLimas/sample-feed-pwa/src/api/http"
)

// MakeHandler create the handler for authentication
func MakeHandler(a Service, logger log.Logger) http.Handler {
	loginHandler := apihttp.NewServer(
		makeLogin(a),
		decodeLoginRequest,
		logger,
	)

	r := mux.NewRouter()

	r.Handle("/v1/login", loginHandler).Methods("POST")

	return r
}

func decodeLoginRequest(_ context.Context, r *http.Request) (interface{}, error) {
	var body struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		return nil, err
	}

	return loginRequest{
		Username: body.Username,
		Password: body.Password,
	}, nil
}
