use std::io;

fn main() -> io::Result<()> {
    // Create a new search engine.
    let mut search_engine = SearchEngine::new()?;

    // Loop forever, handling errors as they occur.
    loop {
        // Get the user's query.
        let query = match search_engine.get_query() {
            Ok(query) => query,
            Err(e) => {
                println!("Error getting query: {}", e);
                continue;
            },
        };

        // Search for the query.
        let results = match search_engine.search(&query) {
            Ok(results) => results,
            Err(e) => {
                println!("Error searching: {}", e);
                continue;
            },
        };

        // Print the results.
        for result in results {
            println!("{}", result);
        }
    }
}