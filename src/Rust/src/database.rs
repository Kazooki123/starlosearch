use surreal_db::client::Client;
use surreal_db::results::DBResult;
use std::env;

pub struct Database {
    client: Client,
}

impl Database {
    pub fn new() -> Self {
        let db_url = env::var("DB_URL").unwrap();
        let client = Client::new(&db_url).unwrap();
        Database { client }
    }

    pub fn fetch_data_for_security(&self) -> DBResult {
        self.client.fetch("security")
    }
}