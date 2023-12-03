use std::collections::HashMap;

pub fn brute_force_prevention(username: &str, password: &str) -> bool {
    // Check if the username and password are in the database.
    let database = HashMap::new();
    if !database.contains_key(username) || database.get(username) != Some(password) {
        return false;
    }

    // Check if the username and password have been seen in the past 5 minutes.
    let recent_attempts = HashMap::new();
    if recent_attempts.contains_key(username) && recent_attempts.get(username) == Some(password) {
        return false;
    }

    // Add the username and password to the recent attempts map.
    recent_attempts.insert(username, password);

    // Return true if the username and password have not been seen in the past 5 minutes.
    true
}