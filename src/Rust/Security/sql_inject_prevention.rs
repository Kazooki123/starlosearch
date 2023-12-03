use sqlx::prelude::*;
use sqlx::sqlite::SqlitePool;

#[tokio::main]
async fn main() -> Result<(), sqlx::Error>{
    // Create a connection pool to your database
    let pool = SqlitePool::connect("sqlite:SearchEngineDB.db").await?;

    // User input
    let user_input = "input_from_user";

    // Use a prepared statement
    let query = sqlx::query("SELECT * FROM users WHERE username = ?")
        .bind(user_input)
        .fetch_all(&pool)
        .await?

    // Process the query results here:

    Ok(())
}