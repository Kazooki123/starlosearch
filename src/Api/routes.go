package main

import (
	"fmt"
	"net/http"
)

func handleAbout(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "This is the about page.")
}

func handleContact(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Contact us at contact@example.com")
}

func handleAPI(w http.ResponseWriter, r *http.Request) {
	// Implement your API logic here
}

func setupRoutes() {
	http.HandleFunc("/about", handleAbout)
	http.HandleFunc("/contact", handleContact)
	http.HandleFunc("/api", handleAPI)
}
