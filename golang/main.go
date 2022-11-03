package main

import (
	"context"
	"database/sql"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	_ "github.com/go-sql-driver/mysql"
	"github.com/golang-sample-project/models"
	_ "github.com/golang-sample-project/models"
	_ "github.com/lib/pq"
)
type config struct {
	port int
	env string
	db struct {
		dsn string
	}
	jwt struct {
		secret string
	}
}
type AppStatus struct{
	Status string
	Environment string
	Version string
}
type application struct {
	config config
	logger *log.Logger
	models models.Models
}
func main() {
	var cfg config
// }
	flag.IntVar(&cfg.port, "port", 8080, "Server port")
	flag.StringVar(&cfg.env, "env", "development", "App environmenr")
	flag.StringVar(&cfg.db.dsn, "dsn", "root:fridi@tcp(localhost:3307)/user-management-system", "connection started")
	flag.StringVar(&cfg.jwt.secret, "jwt-secret", "2dce505d96a53c5768052ee90f3df2055657518dad489160df9913f66042e160", "secret")
	flag.Parse()

	logger := log.New(os.Stdout, "", log.Ldate|log.Ltime)
	db, err := openDB(cfg)

	if err != nil {
		logger.Fatal(err)
	}
	defer db.Close()
	app := &application{
		config: cfg,
		logger: logger,
		models: models.NewModels(db),
	}
	srv := &http.Server{
		Addr: fmt.Sprintf(":%d", cfg.port),
		Handler: app.routes(),
		IdleTimeout: time.Minute,
		ReadTimeout: 10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}
	err = srv.ListenAndServe()
	if err != nil{
		log.Println(err.Error())
	}

}
func openDB(cfg config) (*sql.DB, error) {
	db, err := sql.Open("mysql", cfg.db.dsn)
	if err != nil {
		return nil, err
	}
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	err = db.PingContext(ctx)
	if err != nil {
		return nil, err
	}
	return db, nil
}