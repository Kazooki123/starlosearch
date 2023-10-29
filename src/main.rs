// src/main.rs
use serde::{Serialize, Deserialize};
use warp::{Filter, Reply};

mod auth;
use auth::{AuthPayloadExt, AuthConfigExt, encode_token};

#[derive(Serialize, Deserialize, sqlx::FromRow)]
struct User {
    id: i32,
    name: String,
    password: String,
}

#[derive(Serialize, Deserialize)]
struct LoginRequest {
    name: String,
    password: String,
}

#[derive(Serialize, Deserialize)]
struct LoginResponse {
    token: String,
}

fn extract_login_request() -> impl Filter<Extract = (LoginRequest,), Error = warp::Rejection> + Copy {
    warp::body::json()
} 

fn handle_login_request(pool::sqlx::Pool<sqlx::Sqlite>, config: auth::AuthConfig) -> impl Filter<Extract = impl Reply, Error = warp::Rejection> + Clone {
    extract_login_request()
        .and_then(move |login_request: LoginRequest| {
            let pool = pool.clone();
            let config = config.clone();
            async move {
                let user = sqlx::query_as::<_, User>("SELECT * FROM users WHERE username = ? AND password = ?")
                    .bind(&login_request.name)
                    .bind(&login_request.password)
                    .fetch_one(&pool)
                    .await
                    .map_err(|e| warp::reject::custom(auth::AuthError::DbError(e)))?;
                Ok(user)
            }
        })
        // Generate a JWT token for the user
        .and_then(move |user:User| {
            let config = config.clone();
            async move {
                let payload = auth::AuthPayload::new(user.id, 3600);
                let token = auth::encode_token(&payload, &config)?;
                Ok(token)
            }
        })
        // Return the login response as JSON
        .map(|token:String| {
            let response = LoginResponse{ token };
            warp::reply::json(&response)
        })
}

fn routes(pool: sqlx::Pool<sqlx::Sqlite>, config: auth::AuthConfig) -> impl Filter<Extract = impl Reply, Error = warp::Rejection> + Clone {
    let login_route = warp::post()
        .and(warp::path("login"))
        .and(handle_login_request(pool, config))

        // Add more routes if needed

        // Return the combined routes(login_route)
}

#[tokio::main]
async fn main() {
    let pool = sqlx::SqlitePool::connect("sqlite://users.db")
        .await
        .expect("Failed to connect to the database");

    let config = auth::AuthConfig::new("secret");

    let routes = routes(pool, config);

    warp::serve(routes)
        .run(([127, 0, 0, 1], 8000))
        .await;
}