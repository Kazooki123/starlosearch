package main

import (
	"crypto/rand"
	"encoding/base64"
	"fmt"
)

// GenerateAPIKey generates a random API key of the specified length.
func GenerateAPIKey(length int) (string, error) {
	if length <= 0 {
		return "", fmt.Errorf("length must be greater than 0")
	}

	// Generate a random byte slice with the specified length
	randomBytes := make([]byte, length)
	_, err := rand.Read(randomBytes)
	if err != nil {
		return "", err
	}

	// Encode the random byte slice to a base64 string
	apiKey := base64.URLEncoding.EncodeToString(randomBytes)

	return apiKey, nil
}
