package auth

import (
	"net/http"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
)

// Service authentication Service
type Service interface {
	Middleware(next http.Handler) http.Handler
	GenerateToken(user interface{}) (string, error)
	AddUser(user interface{}) (*User, error)
}

type service struct {
	secret []byte
	users  Repository
}

// UserClaims claims for user
type UserClaims struct {
	Username string `json:"username"`
	jwt.StandardClaims
}

func (a *service) Middleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

	})
}

func (a *service) GenerateToken(user interface{}) (string, error) {
	userToGenerate := user.(User)

	mapClaims := UserClaims{
		userToGenerate.Username,
		jwt.StandardClaims{
			ExpiresAt: time.Now().AddDate(0, 0, 7).Unix(),
			Issuer:    "user",
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, mapClaims)

	return token.SignedString(a.secret)
}

func (a *service) AddUser(user interface{}) (*User, error) {
	userToAdd := user.(User)

	return a.users.AddUser(userToAdd)
}

// NewService create a new authentication
func NewService(secret string, users Repository) Service {
	return &service{
		secret: []byte(secret),
		users:  users,
	}
}
