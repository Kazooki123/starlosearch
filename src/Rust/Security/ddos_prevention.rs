use redis::{Client, Commands};
use limiter::{Limiter, KeyedRateLimiter};
use std::net::SocketAddr;
use std::sync::{Arc, Mutex};
use warp::{Filter, Reply};

#[tokio::main]
async fn main() {
    // Create a Redis client
    let client = Client::open("redis://127.0.0.1/").expect("Failed to connect to Redis");

    // Create a limiter and wrap it in an Arc and Mutex for shared state
    let limiter = Arc::new(Mutex::new(KeyedRateLimiter::for_ip("rate_limit", 10, 60)));

    // Define a filter that checks rate limiting for each request
    let rate_limit_filter = warp::any()
        .and(warp::addr::remote())
        .map(move |addr: Option<SocketAddr>| {
            // Get the IP address from the request
            let ip = addr.map(|addr| addr.ip());

            // Lock the limiter
            let mut limiter = limiter.lock().unwrap();

            // Check if the IP address has exceeded the rate limit
            if let Some(ip) = ip {
                if let Some(remaining) = limiter.check_key(&ip) {
                    if remaining > 0 {
                        return warp::reply::with_status(
                            warp::reply::html(format!("Remaining requests: {}", remaining)),
                            warp::http::StatusCode::OK,
                        );
                    }
                }
            }

            // If the rate limit is exceeded, return a rate limit exceeded response
            warp::reply::with_status(
                warp::reply::html("Rate Limit Exceeded"),
                warp::http::StatusCode::TOO_MANY_REQUESTS,
            )
        });

    // Combine the rate limit filter with your application's routes
    let routes = rate_limit_filter.or(your_app_routes());

    warp::serve(routes).run(([127, 0, 0, 1], 5501)).await;
}