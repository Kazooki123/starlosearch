use aes::Aes256;
use block_modes::block_padding::Pkcs7;
use block_modes::{BlockMode, Cbc};
use rand::Rng;
use std::error::Error;
use hex;

type Aes256Cbc = Cbc<Aes256, Pkcs7>;

// Function to generate a random encryption key
fn generate_key() -> [u8; 32] {
    let mut key = [0u8; 32];
    let mut rng = rand::thread_rng();
    rng.fill(&mut key);
    key
}

// Function to encrypt data using AES-256 in CBC mode
pub fn encrypt_data(data: &[u8], key: &[u8]) -> Result<String, Box<dyn Error>> {
    let iv = generate_key();
    let cipher = Aes256Cbc::new_var(key, &iv)?;
    let ciphertext = cipher.encrypt_vec(data);

    // Combine the IV and ciphertext into a single string
    let mut result = iv.to_vec();
    result.extend_from_slice(&ciphertext);
    
    // Return the encrypted data as a hex-encoded string
    Ok(hex::encode(result))
}

// Function to decrypt data using AES-256 in CBC mode
pub fn decrypt_data(encrypted_data: &str, key: &[u8]) -> Result<Vec<u8>, Box<dyn Error>> {
    let encrypted_bytes = hex::decode(encrypted_data)?;
    let iv = &encrypted_bytes[..16];
    let ciphertext = &encrypted_bytes[16..];

    let cipher = Aes256Cbc::new_var(key, iv)?;
    let decrypted_data = cipher.decrypt_vec(ciphertext)?;

    Ok(decrypted_data)
}
