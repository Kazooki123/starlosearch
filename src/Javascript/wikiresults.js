// Use the DOMContentLoaded event to run the code after the page is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Select the search button and the input field
    const searchButton = document.querySelector('.fa-magnifying-glass');
    const searchInput = document.querySelector('.search-input');

    // Add a click event listener to the search button
    searchButton.addEventListener('click', function() {
        // Get the search term from the input field
        const searchTerm = searchInput.value;

        // Construct the Wikipedia API URL with the search term
        const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchTerm}&format=json&origin=*`;

        // Use the fetch API to get the data from the Wikipedia API
        fetch(wikiUrl)
            .then(response => response.json()) // Parse the response as JSON
            .then(data => processResult(data)) // Pass the data to the processResult function
            .catch(error => console.error(error)); // Handle any errors
    });
});

// Define the processResult function that takes the data as a parameter
function processResult(data) {
    // Select the results container element
    const resultsContainer = document.querySelector('.results-container');

    // Clear any previous results
    resultsContainer.innerHTML = '';

    // Loop through the search results in the data
    for (let result of data.query.search) {
        // Get the title and the snippet of each result
        const title = result.title;
        const snippet = result.snippet;

        // Create a new div element for each result
        const resultDiv = document.createElement('div');
        resultDiv.className = 'result';

        // Create a new h2 element for the title
        const titleH2 = document.createElement('h2');
        titleH2.textContent = title;

        // Create a new p element for the snippet
        const snippetP = document.createElement('p');
        snippetP.innerHTML = snippet;

        // Append the title and the snippet to the result div
        resultDiv.appendChild(titleH2);
        resultDiv.appendChild(snippetP);

        // Append the result div to the results container
        resultsContainer.appendChild(resultDiv);
    }
}
