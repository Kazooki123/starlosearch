function search() {
  var searchQuery = document.getElementById('searchInput').value;

  fetch(`https://www.googleapis.com/customsearch/v1?key=AIzaSyBkc8B7LNvNoJPv6LOVveEE2T_zpSvG_uQ&cx=03d9c25b28b784a57&q=${searchQuery}`)
        .then(response => response.json())
        .then(data => {
          displaySearchResults(data, searchQuery);
        })
        .catch(error => {
          console.error('Error:', error);
        });
  addHistoryItem(searchQuery);
}

// Function to handle the image button click
function viewImages() {
  var searchQuery = document.getElementById('searchInput').value;

  // Make a GET request to the Google Search API with searchType set to "image"
  fetch(`https://www.googleapis.com/customsearch/v1?key=AIzaSyBkc8B7LNvNoJPv6LOVveEE2T_zpSvG_uQ&cx=03d9c25b28b784a57&q=${searchQuery}&searchType=image`)
        .then(response => response.json())
        .then(data => {
          // Process the API response and display the image results
          displayImageResults(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
      addHistoryItem(searchQuery);
}

// Function to handle the video button click
function viewVideos() {
  var searchQuery = document.getElementById('searchInput').value;

  fetch(`https://www.googleapis.com/customsearch/v1?key=AIzaSyBkc8B7LNvNoJPv6LOVveEE2T_zpSvG_uQ&cx=03d9c25b28b784a57&q=${searchQuery}&searchType=video`)
    .then(response => response.json())
    .then(data => {
      displayVideoResults(data);
    });

  // Make a GET request to the YouTube Data API to fetch video search results
  fetch(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyCgRiy4eJoesdaiAYjLDZD8iPO7O_q0aYM&q=${searchQuery}&part=snippet&type=video`)
    .then(response => response.json())
    .then(data => {
      // Process the API response and display the video results
       displayVideoResults(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
    addHistoryItem(searchQuery);
}
