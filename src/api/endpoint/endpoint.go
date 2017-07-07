package endpoint

import (
	"context"
)

// Endpoint represent a single RPC method from https://github.com/go-kit/kit/blob/master/endpoint/endpoint.go
type Endpoint func(ctx context.Context, request interface{}) (response interface{}, err error)
