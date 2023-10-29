package main

import (
	"net/http"
	"github.com/gorilla/mux"
)

func routes() {
	r := mux.NewRouter()

	r.HandleFunc("/search", SearchHandler).Methods("GET")
	r.HandleFunc("/generate", GenerateAPIKeyHandler).Methods("POST")

	// Start the HTTP Server
	port := ":8080"
	http.Handle("/", r)
	http.ListenAndServe(port, nil)

}

func SearchHandler(w http.ResponseWriter, r *http.Request) {
	apiKey := r.Header.Get("API-Key")
}

func GenerateAPIKeyHandler(w http.ResponseWriter, r *http.Request) {

}
