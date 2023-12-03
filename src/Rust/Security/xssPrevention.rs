use std::io::Read;

fn main() {
    let mut buffer = String::new();
    std::io::stdin().read_to_string(&mut buffer).unwrap();

    // Parse the HTML document.
    let document = html5ever::parse_document(buffer.as_bytes()).unwrap();

    // Find all the script tags.
    let scripts = document.query_selector_all("script").unwrap();

    // For each script tag, check if it contains any malicious code.
    for script in scripts {
        let content = script.inner_html();
        if content.contains("alert") {
            // The script tag contains malicious code. Remove it from the document.
            script.remove();
        }
    }

    // Serialize the HTML document to a string.
    let serialized = html5ever::serialize(document, Default::default()).unwrap();

    // Print the serialized HTML document to stdout.
    println!("{}", serialized);
}