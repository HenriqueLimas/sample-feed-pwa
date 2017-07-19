package auth

// User type
type User struct {
	UserID           string `json:"user_id"`
	Username         string `json:"username"`
	Name             string `json:"name"`
	Email            string `json:"email"`
	RegistrationDate string `json:"registration_date"`
}
