// Function to display the search results
function displaySearchResults(data) {
    var searchResultsDiv = document.getElementById('searchResults');
  
    // Clear previous search results
    searchResultsDiv.innerHTML = '';
  
    // Extract and display the search results
    if (data.items && data.items.length > 0) {
      data.items.forEach(item => {
        if (item.pagemap && item.pagemap.cse_image && item.pagemap.cse_image.length > 0) {
          // Display image result
          var imageResultDiv = document.createElement('div');
          imageResultDiv.className = 'imageResult';
          var image = document.createElement('img');
          image.src = item.pagemap.cse_image[0].src;
          var link = document.createElement('a');
          link.href = item.link;
          link.textContent = item.title;
          imageResultDiv.appendChild(image);
          imageResultDiv.appendChild(link);
          searchResultsDiv.appendChild(imageResultDiv);
        } else {
          // Display regular search result
          var resultDiv = document.createElement('div');
          resultDiv.className = 'searchResult';
          resultDiv.innerHTML = `<h3><a href="${item.link}" target="_blank">${item.title}</a></h3><p>${item.snippet}</p>`;
          searchResultsDiv.appendChild(resultDiv);
        }
      });
    } else {
      searchResultsDiv.innerHTML = 'No results found.';
    }
  }
  