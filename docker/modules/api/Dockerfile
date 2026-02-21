FROM golang:1.25

WORKDIR /app/src/api
COPY . /app
RUN GOBIN=/usr/local/bin go install github.com/pilu/fresh@latest

CMD go run
