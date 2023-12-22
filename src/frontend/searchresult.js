// Function to check if search query contains NSFW keywords
function containsNSFWKeywords(query) {
  const nsfwKeywords = ["nsfw", "Nsfw", "adult", "explicit", "inappropriate", "porn", "r34", "rule34", "Hentai", "hentai", "pussy", "loli", "cum", "penis", "p0rn", "XXX", "xxx", "xvideos", "pornhub", "xhamster"]; 

  query = query.toLowerCase();
  for (const keyword of nsfwKeywords) {
    if (query.includes(keyword)) {
      return true;
    }
  }
  return false;
}

// Function to display the search results
function displaySearchResults(data) {
  var searchResultsDiv = document.getElementById('searchResults');

  // Clear previous search results
  searchResultsDiv.innerHTML = '';

  // Extract and display the search results
  if (data.items && data.items.length > 0) {
    data.items.forEach(item => {
      // Check for NSFW keywords
      if (containsNSFWKeywords(item.title) || containsNSFWKeywords(item.snippet)) {
        // Display a message for NSFW content
        var nsfwMessageDiv = document.createElement('div');
        nsfwMessageDiv.className = 'nsfwMessage';
        nsfwMessageDiv.textContent = 'This result contains NSFW content and has been filtered.';
        searchResultsDiv.appendChild(nsfwMessageDiv);
      } else {
        // Display regular search result or image result
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
      }
    });
  } else {
    searchResultsDiv.innerHTML = 'No results found.';
  }
}

// Function to display the image results
function displayImageResults(data) {
  var searchResultsDiv = document.getElementById('searchResults');

  // Clear previous search results
  searchResultsDiv.innerHTML = '';

  // Extract and display the image results
  if (data.items && data.items.length > 0) {
    data.items.forEach(item => {
      // Check for NSFW keywords
      if (containsNSFWKeywords(item.title) || containsNSFWKeywords(item.snippet)) {
        // Display a message for NSFW content
        var nsfwMessageDiv = document.createElement('div');
        nsfwMessageDiv.className = 'nsfwMessage';
        nsfwMessageDiv.textContent = 'This image contains NSFW content and has been filtered.';
        searchResultsDiv.appendChild(nsfwMessageDiv);
      } else {
        // Display the image result
        var imageResultDiv = document.createElement('div');
        imageResultDiv.className = 'imageResult';
        var image = document.createElement('img');
        image.src = item.link;
        var link = document.createElement('a');
        link.href = item.link;
        link.textContent = item.title;
        imageResultDiv.appendChild(image);
        imageResultDiv.appendChild(link);
        searchResultsDiv.appendChild(imageResultDiv);
      }
    });
  } else {
    searchResultsDiv.innerHTML = 'No image results found.';
  }
}

// Function to display the video results from both APIs
function displayVideoResults(data, source) {
  var searchResultsDiv = document.getElementById('searchResults');

  // Create a new section for the results from this source
  var section = document.createElement('div');
  section.className = 'api-results';

  // Set a title for the section based on the source
  var sectionTitle = document.createElement('h2');
  sectionTitle.textContent = `Results from ${source}`;
  section.appendChild(sectionTitle);

  // Clear previous search results for this source
  section.innerHTML = '';

  // Extract and display the video results
  if (data.items && data.items.length > 0) {
    data.items.forEach(item => {
      var videoResultDiv = document.createElement('div');
      videoResultDiv.className = 'videoResult';
      var videoThumbnail = document.createElement('img');
      videoThumbnail.src = item.snippet.thumbnails.default.url;
      var videoLink = document.createElement('a');
      videoLink.href = `https://www.youtube.com/watch?v=${item.id.videoId}`;
      videoLink.textContent = item.snippet.title;
      videoResultDiv.appendChild(videoThumbnail);
      videoResultDiv.appendChild(videoLink);
      section.appendChild(videoResultDiv);
    });
  } else {
    section.innerHTML = 'No video results found.';
  }

  // Add the section to the search results div
  searchResultsDiv.appendChild(section);
}

// Usage example:
// When displaying results from the Google API:
// displayVideoResults(dataFromGoogleAPI, 'Google');

// When displaying results from the YouTube API:
// displayVideoResults(dataFromYouTubeAPI, 'YouTube');