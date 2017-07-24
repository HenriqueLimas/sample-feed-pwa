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

func makeLogin(s Service) endpoint.Endpoint {
	return func(_ context.Context, request interface{}) (interface{}, error) {
		req := request.(loginRequest)
		token, err := s.GenerateToken(User{Username: req.Username})

		return loginResponse{Token: token, Err: err}, nil
	}
}

type signupRequest struct {
	Username  string
	FirstName string
	LastName  string
	Email     string
	Password  string
}

type signupResponse struct {
	Token string `json:"token,omitempty"`
	Err   error  `json:"error,omitempty"`
}

func makeSignup(s Service) endpoint.Endpoint {
	return func(_ context.Context, request interface{}) (interface{}, error) {
		req := request.(signupRequest)

		user, err := s.AddUser(User{
			Username:  req.Username,
			FirstName: req.FirstName,
			LastName:  req.LastName,
			Email:     req.Email,
			Password:  req.Password,
		})

		if err != nil {
			return signupResponse{Err: err}, err
		}

		token, err := s.GenerateToken(User{Username: user.Username})

		return signupResponse{Token: token, Err: err}, nil
	}
}
