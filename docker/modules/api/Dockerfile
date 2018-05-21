FROM golang:1.8

WORKDIR /go/src/github.com/HenriqueLimas/sample-feed-pwa/src/api
COPY . /go/src/github.com/HenriqueLimas/sample-feed-pwa

RUN mkdir -p $GOPATH/src/golang.org/x/ && cd $GOPATH/src/golang.org/x/ && git clone https://github.com/golang/crypto.git
RUN go-wrapper download   # "go get -d -v ./..."
RUN go-wrapper install    # "go install -v ./..."
RUN go get github.com/pilu/fresh

CMD go-wrapper run
