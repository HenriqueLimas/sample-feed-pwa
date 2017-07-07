# sample-feed-pwa
A sample feed pwa (Work in progress)

## Pre-requesite

- Node
- Go
  - gorilla/mux -> Install with `go get -u github.com/gorilla/mux`
- Docker (coming soon)

## Install

Clone the repo:

```
git clone https://github.com/HenriqueLimas/sample-feed-pwa.git
```

## Setup
Access the app folder and Install dependencies:

```
cd sample-feed-pwa
npm install
```

## Run
Run the dev server:

```
npm run dev
```

In another terminal, access the app folder and run the api

```
cd sample-feed-pwa
go   run src/api/main.go
```
