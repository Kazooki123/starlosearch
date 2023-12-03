use argon2::Config;

const SALT_LENGTH: usize = 16;
const HASH_LENGTH: usize = 32;

pub fn hash_password(password: &str) -> String {
    let salt = rand::thread_rng().gen::<[u8; SALT_LENGTH]>();
    let config = Config::default();
    let hash = argon2::hash_encoded(password.as_bytes(), &salt, &config).unwrap();
    hash
}

pub fn verify_password(hash: &str, password: &str) -> bool {
    argon2::verify_encoded(hash, password.as_bytes()).unwrap_or(false)
}
