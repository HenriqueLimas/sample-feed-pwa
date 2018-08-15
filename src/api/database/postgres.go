package database

import (
	"database/sql"
	"strings"
)

// InitPostgres init the postgres connection
func InitPostgres(address string) (*sql.DB, error) {
	return sql.Open("postgres", address)
}

// Row return an array of string representing data of the array
func Row(src interface{}) []string {
	srcString := string(src.([]byte))[:]
	return strings.Split(strings.Trim(srcString, "()"), ",")
}
