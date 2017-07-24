package database

import (
	"fmt"
	"log"
	"time"

	"github.com/gocql/gocql"
	"golang.org/x/crypto/bcrypt"

	"github.com/HenriqueLimas/sample-feed-pwa/src/api/auth"
)

type userRepository struct {
	DB     *gocql.Session
	logger *log.Logger
}

// NameType type for the name in the db
type NameType struct {
	First string `cql:"first_name"`
	Last  string `cql:"last_name"`
}

const hashNumber = 14

func generateEncryptedPassword(password string) (string, error) {
	generated, err := bcrypt.GenerateFromPassword([]byte(password), hashNumber)
	if err != nil {
		return "", err
	}

	return string(generated), nil
}

func (user *userRepository) FindUserByEmailAndPassword(email string, password string) (*auth.User, error) {
	var userFound auth.User

	passwordHashed, err := generateEncryptedPassword(password)
	if err != nil {
		return nil, fmt.Errorf("Couldn't hash password %v", err)
	}

	var found = false

	query := "SELECT user_id,username,name,email,registration_date FROM users_by_email_password WHERE email=? AND  password=? LIMIT 1"

	iterable := user.DB.Query(query, email, passwordHashed).Iter()
	userFromDb := map[string]interface{}{}

	for iterable.MapScan(userFromDb) {
		found = true
		name := userFromDb["name"].(NameType)
		userFound = auth.User{
			UserID:           userFromDb["user_id"].(string),
			Username:         userFromDb["username"].(string),
			FirstName:        name.First,
			LastName:         name.Last,
			Email:            userFromDb["email"].(string),
			RegistrationDate: userFromDb["registration_date"].(string),
		}
	}

	if !found {
		return nil, fmt.Errorf("Couldn't found the user")
	}

	return &userFound, nil
}

func (user *userRepository) AddUser(userToAdd auth.User) (*auth.User, error) {
	queryUsers := "INSERT INTO users (user_id, username, name, email, password) VALUES (?, ?, ?, ?, ?)"
	queryUsersByUsername := "INSERT INTO users_by_username (user_id, username, name, email, password) VALUES (?, ?, ?, ?, ?)"
	queryUsersByEmailPassword := "INSERT INTO users_by_email_password (user_id, username, name, email, password) VALUES (?, ?, ?, ?, ?)"

	userID := Timeuuid()
	name := NameType{
		First: userToAdd.FirstName,
		Last:  userToAdd.LastName,
	}

	passwordHashed, err := generateEncryptedPassword(userToAdd.Password)

	if err != nil {
		return nil, fmt.Errorf("Couldn't hash password %v", err)
	}

	if err = user.DB.Query(queryUsers, userID, userToAdd.Username, name, userToAdd.Email, passwordHashed).Exec(); err != nil {
		return nil, fmt.Errorf("Couldn't add the user on \"users\" table %v", err)
	}

	if err = user.DB.Query(queryUsersByUsername, userID, userToAdd.Username, name, userToAdd.Email, passwordHashed).Exec(); err != nil {
		return nil, fmt.Errorf("Couldn't add the user on \"users_by_username\" table %v", err)
	}

	if err = user.DB.Query(queryUsersByEmailPassword, userID, userToAdd.Username, name, userToAdd.Email, passwordHashed).Exec(); err != nil {
		return nil, fmt.Errorf("Couldn't add the user on \"users_by_email_password\" table %v", err)
	}

	userAdded := auth.User{
		Username:         userToAdd.Username,
		FirstName:        name.First,
		LastName:         name.Last,
		Email:            userToAdd.Email,
		Password:         passwordHashed,
		RegistrationDate: time.Unix(userID.Timestamp(), 0).String(),
	}

	return &userAdded, nil
}

// NewUserRepository create a new user Repository
func NewUserRepository(db *gocql.Session, logger *log.Logger) auth.Repository {
	r := &userRepository{
		DB:     db,
		logger: logger,
	}

	return r
}
