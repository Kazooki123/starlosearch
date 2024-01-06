// Import the redis crate
extern crate redis;

// Use the redis::Commands trait
use redis::Commands;

// Define a function that performs some operations on Redis
fn do_something() -> redis::RedisResult<()> {
    // Create a client object
    let client = redis::Client::open("redis-10875.c302.asia-northeast1-1.gce.cloud.redislabs.com")?;

    // Get a connection from the client
    let mut con = client.get_connection()?;

    // Set a key-value pair
    let _: () = con.set("HELLO", "WELCOME")?;

    // Get the value of the key
    let value: String = con.get("HELLO")?;

    // Print the value
    println!("The value of my_key is {}", value);

    // Delete the key
    let _: () = con.del("HELLO")?;

    // Check if the key exists
    let exists: bool = con.exists("HELLO")?;

    // Print the result
    println!("Does HELLO exist? {}", exists);

    // Return Ok(())
    Ok(())
}

// Call the function and handle errors
fn main() {
    match do_something() {
        Ok(_) => println!("Done"),
        Err(e) => println!("Error: {}", e),
    }
}
