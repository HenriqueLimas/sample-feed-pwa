package auth

// User type
type User struct {
	UserID           string `json:"user_id"`
	Username         string `json:"username"`
	FirstName        string `json:"first_name"`
	LastName         string `json:"last_name"`
	Email            string `json:"email"`
	Password         string
	RegistrationDate string `json:"registration_date"`
}

// Repository interface to call user data
type Repository interface {
	FindUserByEmailAndPassword(email string, password string) (*User, error)
	AddUser(user User) (*User, error)
}
