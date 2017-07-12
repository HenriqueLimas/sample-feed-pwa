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
}

type service struct {
	secret []byte
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

// NewService create a new authentication
func NewService(secret string) Service {
	return &service{
		secret: []byte(secret),
	}
}
