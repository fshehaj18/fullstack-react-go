package main

import (
	"context"
	"net/http"

	"github.com/julienschmidt/httprouter"
	"github.com/justinas/alice"
)

func (app *application) wrap(next http.Handler) httprouter.Handle {
	return func(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
		ctx := context.WithValue(r.Context(), "params", ps)
		if (len(ps) > 0) {
				ctx = context.WithValue(r.Context(), "params", ps[0].Value)
		}
		next.ServeHTTP(w, r.WithContext(ctx))
	}
}

func (app *application) routes() http.Handler{
	secure := alice.New(app.checkToken)
	router := httprouter.New()

	router.HandlerFunc(http.MethodGet, "/status", app.statusHandler)
	router.GET("/user/:id", app.wrap(secure.ThenFunc(app.getOneUser)))
	router.GET("/users", app.wrap(secure.ThenFunc(app.getAllUsers)))
	router.POST("/users", app.wrap(secure.ThenFunc(app.postUser)))
	router.HandlerFunc(http.MethodPost, "/login", app.login)
	router.PUT("/user/:id", app.wrap(secure.ThenFunc(app.putUser)))
	router.DELETE("/user/:id",  app.wrap(secure.ThenFunc(app.deleteUser)))
	// router.HandlerFunc(http.MethodDelete, "/user/:id", app.deleteUser)
	
	return app.enableCORS(router)
}