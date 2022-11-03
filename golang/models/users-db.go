package models

import (
	"context"
	"database/sql"
	"fmt"
	"time"
)

type DBModel struct {
	DB *sql.DB
}

func(m *DBModel) Get(id int) (*User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	var user User
	
	query := `select id, first_name, last_name, email from User where id=?`
	row := m.DB.QueryRowContext(ctx, query, id)
	err := row.Scan(
		&user.ID,
		&user.FirstName,
		&user.LastName,
		&user.Email,
	)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func(m *DBModel) GetByEmail(email string) (*User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	var user User
	
	query := `select id, first_name, last_name, email, password from User where email=?`
	row := m.DB.QueryRowContext(ctx, query, email)
	err := row.Scan(
		&user.ID,
		&user.FirstName,
		&user.LastName,	
		&user.Email,
		&user.Password,
	)
	
	if err != nil {
		return nil, err
	}
	
	return &user, nil
}

func(m *DBModel) All() ([]*User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `select id, first_name, last_name, email from User`
	rows, err := m.DB.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	var users []*User
	
	for rows.Next() {
		var user User
		err := rows.Scan(
			&user.ID,
			&user.FirstName,
			&user.LastName,
			&user.Email,
		)
		
		if err != nil {
			return nil, err
		}
		
		users = append(users, &user)
	}
	return users, nil
}

func(m *DBModel) UpdateUser(user User, id int) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	fmt.Println(id)
	stmt := `update User set first_name = ?, last_name = ?, email = ? where id=?`
	_, err := m.DB.ExecContext(ctx, stmt,
		user.FirstName,
		user.LastName,
		user.Email,
		116,
	)
	if err != nil {
		fmt.Println(err.Error())
		return nil
	}
	fmt.Printf("%+v\n", user)
	var users []*User
		
		users = append(users, &user)
	return nil
}

func(m *DBModel) DeleteUser(id int) (error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	stmt := `delete from User where id=?`
	_, err := m.DB.ExecContext(ctx, stmt, id)
	if err != nil {
		return nil
	}
	return nil
}

func(m *DBModel) AddUser(user User) error{
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	stmt := `insert into User( first_name, last_name, email, role_id) values( ?, ?, ?, 1)`
	_, err := m.DB.ExecContext(ctx, stmt,
		user.FirstName,
		user.LastName,
		user.Email,
	)
	if err != nil {
		return err
	}	
	return nil
}