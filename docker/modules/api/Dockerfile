FROM golang:1.8

WORKDIR /go/src/api
COPY . /go

RUN go-wrapper download   # "go get -d -v ./..."
RUN go-wrapper install    # "go install -v ./..."
