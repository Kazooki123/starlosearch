use serde::{Serialize, Deserialize};
use warp::{Filter, Rejection, Reply};
use sqlx::{SqlitePool, Error};
use jsonwebtoken::{encode, decode, Header, Algorithm, EncodingKey, DecodingKey, Validation};

#[derive(Serialize, Deserialize)]
struct Claims {
    sub: i32,
    exp: usize,
}

#[derive(Serialize, Deserialize)]
struct LoginRequest {
    name: String,
    password: String,
}

#[derive(Serialize, Deserialize)]
struct LogoutRequest {
    token: String,
}

#[derive(Serialize, Deserialize)]
struct LoginResponse {
    token: String,
}

#[derive(Serialize, Deserialize)]
struct LogoutResponse {
    status: String,
}

#[derive(Debug)]
enum AuthError {
    InvalidRequest,
    InvalidCredentials,
    JwtError(jsonwebtoken::errors::Error),
    DbError(sqlx::Error),
}

impl warp::reject::Reject for AuthError {}

impl warp::reply::Reply for AuthError {
    fn into_response(self) -> warp::reply::Response {
        match self {
            AuthError::InvalidRequest => {
                warp::reply::with_status("Invalid login request", warp::http::StatusCode::BAD_REQUEST).into_response()
            }
            AuthError::InvalidCredentials =>{
                warp::reply::with_status("Invalid user name or password", warp::http::StatusCode::UNAUTHORIZED).into_response()
            }
            AuthError::JwtError(e) => {
                warp::reply::with_status(format!("JWT error:{}", e), warp::http::StatusCode::INTERNAL_SERVER_ERROR).into_response()
            }
            AuthError::DbError(e) => {
                warp::reply::with_status(format!("Database error: {}", e), warp::http::StatusCode::INTERNAL_SERVER_ERROR).into_response()
            }
        }
    }
}

async fn login_handler(login_request:LoginRequest, pool:SqlitePool) -> Result<impl Reply, Rejection> {
    if login_request.name.is_empty() || login_request.password.is_empty() {
        return Err(warp::reject::custom(AuthError::InvalidRequest));
    }

    let user = sqlx::query!("SELECT id FROM users WHERE username = ? AND password = ?", login_request.name, login_request.password)
        .fetch_one(&pool)
        .await
        .map_err(|e| warp::reject::custom(AuthError::DbError(e)))?;

    if let Some(user) = user {
        let claims = Claims {
            sub: user.id,
            exp: chrono::Utc::now().timestamp() as usize + 3600,
        };
        let token = encode_token(&claims)?;

        // Return the login response as JSON
        let response = LoginResponse { token };
        Ok(warp::reply::json(&response))
    } else {
        Err(warp::reject::custom(AuthError::InvalidCredentials))
    }
}

async fn logout_handler(logout_request: LogoutRequest, pool: SqlitePool) -> impl Result<impl Reply, Rejection> {
    if logout_request.token.is_empty() {
        return  Err(warp::reject::custom(AuthError::InvalidRequest));
    }

    let claims = decode_token(&logout_request.token)?;

    let mut new_claims = claims.clone();
    new_claims.exp = 0;

    let new_token = encode_token(&new_claims)?;

    sqlx::query!("UPDATE users SET token = ? WHERE id = ?", new_token, claims.sub)
        .execute(&pool)
        .await
        .map_err(|e| warp::reject::custom(AuthError::DbError(e)))?;

    let response = LogoutResponse { status: "Logged out successfully".to_string() };
    Ok(warp::reply::json(&response)) 
}

async fn verify_token(token: String) -> Result<i32, Rejection> {
    let claims = decode_token(&token)?;

    Ok(claims.sub)
}

fn encode_token(claims: &Claims) -> Result<String, AuthError> {
    let secret = std::env::var("JWT_SECRET").unwrap_or_else(|_| "secret".to_string());
    
    let header = Header::new(Algorithm::HS256);

    encode(&header, &claims, &EncodingKey::from_secret(secret.as_ref()))
        .map_err(|e| AuthError::JwtError(e))
}

fn decode_token(token: &str) ->Result<Claims, AuthError> {
    let secret = std::env::var("JWT_SECRET").unwrap_or_else(|_| "secret".to_string());

    let validation = Validation::new(Algorithm::HS256);

    decode::<Claims>(token, &DecodingKey::from_secret(secret.as_ref()), &validation)
        .map(|data| data.claims)
        .map_err(|e| AuthError::JwtError(e))
}

fn extract_login_request() -> impl Filter<Extract = (LoginRequest,), Error = Rejection> + Copy {
    warp::body::json()
}

fn extract_token() -> impl Filter<Extract = (String,), Error = Rejection> + Copy {
    warp::header::<String>("authorization")
        .and_then(|value: String| async move {
            let prefix = "Bearer ";
            if value.starts_with(prefix) {
                let token = value[prefix.len()..].to_string();
                Ok(token)
            } else {
                Err(warp::reject::custom(AuthError::InvalidRequest))
            }
        })
}

let logout_route = warp::path!("logout")
    .and(warp::post())
    .and(with_db(pool.clone()))
    .and(extract_logout_request())
    .and_then(logout_handler)
    .recover(handle_rejection);

fn extract_logout_request() -> impl Filter<Extract = (LogoutResponse,), Error = Rejection> + Copy {
    warp::body::json()
}

fn verify_token_filter() -> impl Filter<Extract = (i32,), Error = Rejection> + Copy {
    extract_token()
        .and_then(|token: String| async move {
            verify_token(token).await
        })
}

fn with_db(pool: SqlitePool) -> impl Filter<Extract = (SqlitePool,), Error = Rejection> + Clone {
    warp::any().map(move || pool.clone())
}

pub fn routes(pool: SqlitePool) -> impl Filter<Extract = impl Reply, Error = Rejection> + Clone {
    let login_route = warp::path!("login")
        .and(warp::post())
        .and(with_db(pool.clone()))
        .and(extract_login_request())
        .and_then(login_handler)
        .recover(handle_rejection);

    let hello_route = warp::path("hello")
        .and(warp::get())
        .and(verify_token_filter())
        .map(|user_id| format!("Hello, user {}!", user_id))
        .recover(handle_rejection);

    login_route.or(hello_route)
}