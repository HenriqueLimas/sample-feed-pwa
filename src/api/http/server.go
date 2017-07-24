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
	endpoint     endpoint.Endpoint
	decode       DecodeRequestFunc
	logger       log.Logger
	errorEncoder ErrorEncoder
}

// Headerer headers interface
type Headerer interface {
	Headers() http.Header
}

// StatusCoder status coder interface
type StatusCoder interface {
	StatusCode() int
}

// ErrorEncoder function type for error encoders
type ErrorEncoder func(ctx context.Context, err error, w http.ResponseWriter)

// NewServer create a new server
func NewServer(
	endpoint endpoint.Endpoint,
	decode DecodeRequestFunc,
	logger log.Logger,
) *Server {
	s := &Server{
		endpoint:     endpoint,
		decode:       decode,
		logger:       logger,
		errorEncoder: DefaultErrorEncoder,
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
		s.errorEncoder(ctx, err, w)
		return
	}

	response, err := s.endpoint(ctx, request)
	if err != nil {
		s.logger.Println(err)
		s.errorEncoder(ctx, err, w)
		return
	}

	err = encodeResponse(ctx, w, response)
	if err != nil {
		s.logger.Println(err)
		s.errorEncoder(ctx, err, w)
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

// DefaultErrorEncoder default error encoder
func DefaultErrorEncoder(_ context.Context, err error, w http.ResponseWriter) {
	contentType, body := "text/plain; charset=utf-8", []byte(err.Error())
	if marshaler, ok := err.(json.Marshaler); ok {
		if jsonBody, marshalErr := marshaler.MarshalJSON(); marshalErr == nil {
			contentType, body = "application/json; charset=utf-8", jsonBody
		}
	}
	w.Header().Set("Content-Type", contentType)
	if headerer, ok := err.(Headerer); ok {
		for k := range headerer.Headers() {
			w.Header().Set(k, headerer.Headers().Get(k))
		}
	}
	code := http.StatusInternalServerError
	if sc, ok := err.(StatusCoder); ok {
		code = sc.StatusCode()
	}
	w.WriteHeader(code)
	w.Write(body)
}
