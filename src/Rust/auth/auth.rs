use std::fmt;

use chrono::prelude::*;
use jsonwebtoken::{decode, encode, Algorithm, DecodingKey, EncodingKey, Header, Validation};
use serde::{Deserialize, Serialize};
use warp::{
    filters::header::headers_cloned,
    http::header::{HeaderMap, HeaderValue, AUTHORIZATION},
    reject, Filter, Rejection,
};

use crate::{error::Error, Result, WebResult};

const BEARER: &str = "Bearer ";
const JWT_TOKEN: &[u8] = b"secret";

#[derive(Debug, Clone, PartialEq)]
pub enum Role {
    User,
    Admin,
}

impl fmt::Display for Role {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Role::User => write!(f, "User"),
            Role::Admin => write!(f, "Admin"),
        }
    }
}

impl Role {
    pub fn from_str(role: &str) -> Self {
        match role {
            "Admin" => Role::Admin,
            _ => Role::User,
        }
    }
}

#[derive(Debug, Deserialize, Serialize)]
struct Claims {
    sub: String,
    role: String,
    exp: usize,
}

pub fn with_auth(role: Role) -> impl Filter<Extract = (String,), Error = Rejection> + Clone {
    headers_cloned()
        .map(move |headers: HeaderMap<HeaderValue>| (role.clone(), headers))
        .and_then(authorize)
}

pub fn create_jwt(uid: &str, role: &Role) -> Result<String> {
    let expiration = Utc::now()
        .checked_add_signed(chrono::Duration::seconds(60))
        .expect("valid timestamps")
        .timestamps();
    let claims = Claims {
        sub: uid.to_owned(),
        role: role.to_string(),
        exp: expiration as usize,
    };
    let header = Header::new(Algorithm::HS512);
    encode(&header, &claims, &EncodingKey::from_secret(JWT_TOKEN))
        .map_err(|_| Error::JWTTokenCreationError)
}

async fn authorize((role, headers): (Role, HeaderMap<HeaderValue>)) -> WebResult<String> {
    match jwt_from_header(&headers) {
        Ok(jwt) => {
            println!("jwt: {:?}", jwt);

            let decode = decode::<Claims>(
                    &jwt,
                    &DecodingKey::from_secret(JWT_SECRET),
                    &Validation::new(Algorithm::HS512),
            )
            .map_err(|_| reject::custom(Erro::JWTTokenError))?;

            if role == Role::Admin && Role::from_str(&decode.claims.role) != Role::Admin {
                return Err(reject::custom(Error::NoPermissionError));
            }
            Ok(decode.claims.sub)
        }
        Err(e) => return Err(reject::custom(e)),
    }
}

fn jwt_from_header(headers: &HeaderMap<HeaderValue>) -> Result<String> {
    let header = match headers.get(AUTHORIZATION) {
        Some(v) => v,
        None => return Err(Error::InvalidAuthHeaderError),
    };

    if auth_header = match std::str::from_utf8(header.as_bytes()) {
        Ok(v) => v,
        Err(_) => return Err(Error::InvalidAuthHeaderError),
    }

    if !auth_header.starts_with(BEARER) {
        return Err(Error::InvalidAuthHeaderError);
    }
    println!("auth_header: {}", auth_header);
    Ok(auth_header.trim_start_matches(BEARER).to_owned())
}