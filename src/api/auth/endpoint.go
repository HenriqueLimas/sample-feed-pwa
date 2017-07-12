package auth

import (
	"context"

	"github.com/HenriqueLimas/sample-feed-pwa/src/api/endpoint"
)

type loginRequest struct {
	Username string
	Password string
}

type loginResponse struct {
	Token string `json:"token"`
	Err   error  `json:"error,omitempty"`
}

func (r loginResponse) error() error { return r.Err }

func makeLogin(a Service) endpoint.Endpoint {
	return func(_ context.Context, request interface{}) (interface{}, error) {
		req := request.(loginRequest)
		token, err := a.GenerateToken(User{Username: req.Username})

		return loginResponse{Token: token, Err: err}, nil
	}
}
