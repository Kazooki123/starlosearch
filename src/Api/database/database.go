package main

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

var db *sql.DB

func init() {
	dbUser := "root"
	dbPass := "Waliffuyy1964"
	dbName := "SearchEngineDB"
	dbHost := "localhost"
	dbPort := "3306"

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", dbUser, dbPass, dbHost, dbPort, dbName)

	var err error
	db, err = sql.Open("mysql", dsn)
	if err != nil {
		log.Fatal(err)
	}

	err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}
}

func insertData() {
	_, err := db.Exec("INSERT INTO your_table (column1, column2) VALUES (?, ?)")
	if err != nil {
		log.Fatal(err)
	}
}

func queryData() {
	rows, err := db.Query("SELECT * FROM your_table")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	for rows.Next() {
		var column1, column2 string
		err := rows.Scan(&column1, &column2)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println(column1, column2)
	}
}

func main() {
	insertData()
	queryData()
}