package main

import (
    "encoding/json"
    "fmt"
    "net/http"
)

type SearchResult struct {
    Title       string `json:"title"`
    Link        string `json:"link"`
    DisplayLink string `json:"displayLink"`
    Snippet     string `json:"snippet"`
}

func main() {
    http.HandleFunc("/search-result", func(w http.ResponseWriter, r *http.Request) {
        query := r.URL.Query().Get("q") 
		
        // Simulate a search result based on the query
        result := SearchResult{
            Title:       "Jupiter - Wikipedia",
            Link:        "https://en.wikipedia.org/wiki/Jupiter",
            DisplayLink: "en.wikipedia.org",
            Snippet:     "Jupiter is the fifth planet, the stuff - volume the exploration....",
        }

        // Convert the search result to JSON
        resultJSON, err := json.Marshal(result)
        if err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }

        // Set response headers
        w.Header().Set("Content-Type", "application/json")

        // Write the JSON response
        w.Write(resultJSON)
    })

    // Start the HTTP Server
    port := 8080
    fmt.Printf("Server is running on port %d...\n", port)
    http.ListenAndServe(fmt.Sprintf(":%d", port), nil)
}