package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
	"github.com/pascaldekloe/jwt"
	"golang.org/x/crypto/bcrypt"
)

type Credentials struct {
	Username string	`json:"username"`
	Password string	`json:"password"`
}

func ( app *application)login(w http.ResponseWriter, r *http.Request) {
	fmt.Println(r.Context())
	var creds Credentials
	err := json.NewDecoder(r.Body).Decode(&creds)
	var validUser, _ = app.models.DB.GetByEmail(creds.Username)
	if err != nil {
		app.errorJSON(w, err)
		return
	}

	hashedPasswrod := validUser.Password
	err = bcrypt.CompareHashAndPassword([]byte(hashedPasswrod), []byte(creds.Password))
	if err != nil {
		return
	}
	var claims jwt.Claims
	claims.Subject = fmt.Sprint(validUser.ID)
	claims.Issued = jwt.NewNumericTime(time.Now())
	claims.NotBefore = jwt.NewNumericTime(time.Now())
	claims.Expires = jwt.NewNumericTime(time.Now().Add(24 * time.Hour))
	claims.Issuer = "mydomain.com"
	claims.Audiences = []string{"mydomain.com"}

	jwtBytes, err := claims.HMACSign(jwt.HS256, []byte(app.config.jwt.secret))

	if err != nil {
		return
	}

	app.writeJSON(w, http.StatusOK, string(jwtBytes), "response")
	return
}