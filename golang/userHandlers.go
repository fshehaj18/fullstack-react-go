package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"strconv"

	"github.com/golang-sample-project/models"
	"github.com/julienschmidt/httprouter"
)
type Student struct {
    Name string
    Age  int
}

type UserPayload struct {
	ID        string	`json:"id"`	
	FirstName string	`json:"first_name"`
	LastName  string	`json:"last_name"`
	Email     string	`json:"email"`
}
func (app *application) getOneUser(w http.ResponseWriter, r *http.Request) {
	params := httprouter.ParamsFromContext(r.Context())
	id, err := strconv.Atoi(params.ByName("id"))
	if err != nil{
		app.logger.Print(errors.New("invalid parameter"))
		
		return
	}
	app.logger.Println("id is", id)
	user, err := app.models.DB.Get(id)
	err = app.writeJSON(w, http.StatusOK, user, "user")
	if err != nil {
		app.errorJSON(w, err)
		return 
	}
}
func (app *application) getAllUsers(w http.ResponseWriter, r *http.Request) {
	users, err := app.models.DB.All()

	if err != nil {
		app.errorJSON(w, err)
	}
	err = app.writeJSON(w, http.StatusOK, users, "users")
	if err != nil {
		return 
	}
}

func (app *application) postUser(w http.ResponseWriter, r *http.Request) {
	var user models.User
	var payload UserPayload
	type jsonResp struct {
		OK bool `json:"ok"`
	}

	err := json.NewDecoder(r.Body).Decode(&payload)
	ok := jsonResp{ OK: true,}
	err = app.writeJSON(w, http.StatusOK, ok, "response")
	user.FirstName = payload.FirstName
	user.LastName = payload.LastName
	user.Email = payload.Email
	if err != nil {
		return
	}
	err = app.models.DB.AddUser(user)
	err = app.writeJSON(w, http.StatusOK, user, "user")
}

func (app *application) putUser(w http.ResponseWriter, r *http.Request) {
	params := httprouter.ParamsFromContext(r.Context())
		id, err := strconv.Atoi(params.ByName("id"))
	
	var user models.User
	var payload UserPayload
	type jsonResp struct {
		OK bool `json:"ok"`
	}
	err = json.NewDecoder(r.Body).Decode(&payload)
	ok := jsonResp{ OK: true,}
	err = app.writeJSON(w, http.StatusOK, ok, "response")
	user.FirstName = payload.FirstName
	user.LastName = payload.LastName
	user.Email = payload.Email
	if err != nil {
		app.errorJSON(w, err)
		return
	}
	fmt.Println(id)
	err = app.models.DB.UpdateUser(user, id)
	err = app.writeJSON(w, http.StatusOK, user, "user")
}

	func (app *application) deleteUser(w http.ResponseWriter, r *http.Request) {
		inString := fmt.Sprintf("%s", r.Context().Value("params"))
		id, err := strconv.Atoi(inString)
		fmt.Println(inString)
		if err != nil{
			app.logger.Print(errors.New("invalid parameter"))
			
			return
		}
		type jsonResp struct {
			OK bool `json:"ok"`
		}
		
		app.models.DB.DeleteUser(id)
	
		if err != nil {
			app.errorJSON(w, err)
		}
		
	}