package database

import (
	"github.com/gocql/gocql"
	"golang.org/x/crypto/bcrypt"

	"github.com/HenriqueLimas/sample-feed-pwa/src/api/auth"
)

type userRepository struct {
	DB *gocql.Session
}

const hashNumber = 14

func (user *userRepository) FindUserByEmailAndPassword(email string, password string) (*users.User, error) {
	passwordHashed, err := bcrypt.GenerateFromPassword([]byte(password), hashNumber)
	if err != nil {
		return nil, fmt.Errorf("Couldn't hash password %v", err)
	}

	var found = false

	query := "SELECT user_id,username,name,email,registration_date FROM users_by_email_password WHERE email=? AND  password=? LIMIT 1"

	iterable := user.DB.Query(query, email, passwordHashed).Iter()
	for iterable.MapScan(m) {
		found = true
		user := users.User{
			UserID:           m["user_id"].(string),
			Username:         m["username"].(string),
			Name:             m["name"].(string),
			Email:            m["email"].(string),
			RegistrationDate: m["registration_date"].(string),
		}
	}

	if !found {
		return nil, fmt.Errorf("Couldn't found the user")
	}

	return &user, nil
}
