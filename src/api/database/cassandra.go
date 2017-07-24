package database

import "github.com/gocql/gocql"

// Timeuuid function to generate an UUID
func Timeuuid() gocql.UUID {
	return gocql.TimeUUID()
}

// InitCassandra function to start the cassandra database
func InitCassandra(keyspace string, address string) (*gocql.Session, error) {
	cluster := gocql.NewCluster(address)
	cluster.Keyspace = keyspace
	cluster.ProtoVersion = 4
	return cluster.CreateSession()
}
