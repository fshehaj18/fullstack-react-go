package models

import "database/sql"

type Models struct {
	DB DBModel
}

func NewModels(db *sql.DB) Models {
	return Models{
		DB: DBModel{DB: db},
	}
}

type User struct {
	ID        int		`json:"id"`	
	FirstName string	`json:"first_name"`
	LastName  string	`json:"last_name"`
	Email     string	`json:"email"`
	Password  string	`json:"password"`
}

type Role struct {
	RoleId   int		`json:"roleId"`			
	RoleName string		`json:"roleName"`	
}