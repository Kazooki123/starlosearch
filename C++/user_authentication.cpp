#include <iostream>
#include <string>
#include <unordered_map>

using namespace std;

// User data structure to store username and password
struct UserData {
    string username;
    string password;
};

// Database to store user data (you can use a database in a real-world application)
unordered_map<string, UserData> usersDatabase;

// Function to register a new user
void registerUser() {
    string username, password;

    cout << "Enter a username: ";
    cin >> username;

    // Check if the username already exists in the database
    if (usersDatabase.find(username) != usersDatabase.end()) {
        cout << "Username already exists. Please choose a different username." << endl;
        return;
    }

    cout << "Enter a password: ";
    cin >> password;

    // Store the user data in the database
    UserData user;
    user.username = username;
    user.password = password;
    usersDatabase[username] = user;

    cout << "User registered successfully!" << endl;
}

// Function to perform user login
bool loginUser() {
    string username, password;

    cout << "Enter your username: ";
    cin >> username;

    // Check if the username exists in the database
    if (usersDatabase.find(username) == usersDatabase.end()) {
        cout << "Username not found. Please try again." << endl;
        return false;
    }

    cout << "Enter your password: ";
    cin >> password;

    // Check if the password matches the stored password for the username
    UserData user = usersDatabase[username];
    if (user.password != password) {
        cout << "Incorrect password. Please try again." << endl;
        return false;
    }

    cout << "Login successful!" << endl;
    return true;
}

int main() {
    int choice;

    while (true) {
        cout << "User Authentication Menu:" << endl;
        cout << "1. Register" << endl;
        cout << "2. Login" << endl;
        cout << "3. Exit" << endl;
        cout << "Enter your choice: ";
        cin >> choice;

        switch (choice) {
            case 1:
                registerUser();
                break;
            case 2:
                if (loginUser()) {
                    // Redirect the user to the search engine or perform other actions on successful login
                    cout << "Redirecting to the search engine..." << endl;
                    // ... Add your search engine logic here ...
                    // For simplicity, we are exiting the program after successful login
                    return 0;
                }
                break;
            case 3:
                cout << "Exiting..." << endl;
                return 0;
            default:
                cout << "Invalid choice. Please try again." << endl;
                break;
        }
    }

    return 0;
}
