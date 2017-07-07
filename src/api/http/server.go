package http

import (
	"context"
	"encoding/json"
	"errors"
	"log"
	"net/http"

	"github.com/HenriqueLimas/sample-feed-pwa/src/api/endpoint"
)

// Server implements http.Handler
type Server struct {
	endpoint endpoint.Endpoint
	decode   DecodeRequestFunc
	logger   log.Logger
}

// NewServer create a new server
func NewServer(
	endpoint endpoint.Endpoint,
	decode DecodeRequestFunc,
	logger log.Logger,
) *Server {
	s := &Server{
		endpoint: endpoint,
		decode:   decode,
		logger:   logger,
	}

	return s
}

// ErrInvalidArgument error for invalid arguments
var ErrInvalidArgument = errors.New("invalid argument")

// ErrUnknown is used when a cargo could not be found.
var ErrUnknown = errors.New("unknown cargo")

// ServeHTTP implements http.Handler
func (s Server) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	request, err := s.decode(ctx, r)
	if err != nil {
		s.logger.Println(err)
		return
	}

	response, err := s.endpoint(ctx, request)
	if err != nil {
		s.logger.Println(err)
		return
	}

	err = encodeResponse(ctx, w, response)
	if err != nil {
		s.logger.Println(err)
		return
	}
}

// DecodeRequestFunc function to decode request
type DecodeRequestFunc func(context.Context, *http.Request) (request interface{}, err error)

func encodeResponse(ctx context.Context, w http.ResponseWriter, response interface{}) error {
	if e, ok := response.(errorer); ok && e.error() != nil {
		encodeError(e.error(), w)
		return nil
	}
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	return json.NewEncoder(w).Encode(response)
}

type errorer interface {
	error() error
}

func encodeError(err error, w http.ResponseWriter) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")

	switch err {
	case ErrUnknown:
		w.WriteHeader(http.StatusNotFound)
	case ErrInvalidArgument:
		w.WriteHeader(http.StatusBadRequest)
	default:
		w.WriteHeader(http.StatusInternalServerError)
	}

	json.NewEncoder(w).Encode(map[string]interface{}{
		"error": err.Error(),
	})
}
