package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	// Define the port to listen on
	port := 8080

	// Set up the server
	http.HandleFunc("/", handleHome)

	fmt.Printf("Server started on port %d\n", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", port), nil))
}

func handleHome(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello, World!")
}
