use jsonwebtoken::{encode, decode, Header, Validation, Algorithm, EncodingKey, DecodingKey};
use serde::{Serialize, Deserialize};
use std::time::{SystemTime, UNIX_EPOCH};
use std::error::Error;

#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    sub: String,
    exp: usize,
}

// Function to generate a JSON Web Token (JWT)
pub fn generate_jwt(secret: &str, subject: &str, expiration_seconds: u64) -> Result<String, Box<dyn Error>> {
    let exp = SystemTime::now().duration_since(UNIX_EPOCH)?.as_secs() + expiration_seconds;
    let claims = Claims {
        sub: subject.to_owned(),
        exp: exp as usize,
    };

    let encoding_key = EncodingKey::from_secret(secret.as_bytes());
    let token = encode(&Header::default(), &claims, &encoding_key)?;

    Ok(token)
}

// Function to validate and decode a JSON Web Token (JWT)
pub fn validate_and_decode_jwt(secret: &str, token: &str) -> Result<String, Box<dyn Error>> {
    let decoding_key = DecodingKey::from_secret(secret.as_bytes());
    let validation = Validation::new(Algorithm::default());
    let token_data = decode::<Claims>(token, &decoding_key, &validation)?;

    // Check if the token has expired
    let now = SystemTime::now().duration_since(UNIX_EPOCH)?.as_secs();
    if now > token_data.claims.exp as u64 {
        return Err("Token has expired".into());
    }

    Ok(token_data.claims.sub)
}
