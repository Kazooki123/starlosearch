package main

import (
    "encoding/json"
    "fmt"
    "net/http"
    "github.com/gorilla/mux"
    "github.com/rs/cors"
    "math/rand"
    "time"
)

type APIKey struct {
    Key  string `json:"key"`
    Name string `json:"name"`
}

const letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
const keyLength = 32

func main() {
    router := mux.NewRouter()

    // Define your API routes
    router.HandleFunc("/generate", GenerateAPIKeyHadler).Methods("GET")

    // Use CORS middleware
    c := cors.New(cors.Options{
        AllowedOrigins: []string{"*"},
        AllowedMethods: []string{"GET"},
    })

    // Create a handler with CORS middleware
    handler := c.Handler(router)

    // Start the HTTP Server
    port := 8080
    fmt.Printf("Server is running on port %d...\n", port)
    http.ListenAndServe(fmt.Sprintf(":%d", port), handler)
}

func GenerateAPIKeyHadler(w http.ResponseWriter, r *http.Request) {
    // Generate a random API Key
    apiKey := GenerateAPIKey()

    // Create an APIKey struct
    apiKeyData := APIKey{
        Key:  apiKey,
        Name: "API Key",
    }

    // Convert APIKey to JSON
    apiKeyJSON, err := json.Marshal(apiKeyData)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    // Set CORS headers
    w.Header().Set("Content-Type", "application/json")
    w.Write(apiKeyJSON)
}

func GenerateAPIKey() string {
    rand.Seed(time.Now().UnixNano())
    b := make([]byte, keyLength)
    for i := range b {
        b[i] = letterBytes[rand.Intn(len(letterBytes))]
    }
    return string(b)
}