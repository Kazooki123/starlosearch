use sha2::{Digest, Sha256};
use std::io::prelude::*;
use std::net::{TcpListener, TcpStream};

fn handle_client(mut stream: TcpStream) {
    let mut buffer = [0; 1024];
    stream.read(&mut buffer).unwrap();

    let get = b"GET / HTTP/1.1\r\n";

    if buffer.starts_with(get) {
        let password = b"mypassword";
        let mut hasher = Sha256::new();
        hasher.update(password);
        let hash = hasher.finalize();
        let hash_string = format!("{:x}", hash);

        let response = format!(
            "HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n<html>
                    <head><title>Login Page</title></head>
                    <body><h1>Login</h1>
                    <form method=\"POST\" action=\"/login\">
                        <label for=\"username\">Username:</label><br>
                        <input type=\"text\" id=\"username\" name=\"username\"><br>
                        <label for=\"password\">Password:</label><br>
                        <input type=\"password\" id=\"password\" name=\"password\"><br>
                        <input type=\"submit\" value=\"Submit\">
                    </form>
                    <p>Password hash: {}</p>
                    </body>
                    </html>",
            hash_string
        );

        stream.write(response.as_bytes()).unwrap();
        stream.flush().unwrap();
    }
}

fn main() {
    let listener = TcpListener::bind("127.0.0.1:7878").unwrap();

    for stream in listener.incoming() {
        let stream = stream.unwrap();
        handle_client(stream);
    }
}