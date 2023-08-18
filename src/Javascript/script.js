// Function to handle the search request
function search() {
  var searchQuery = document.getElementById('searchInput').value;

  // Make a GET request to the Google Search API
 // Replace "YOUR_API_KEY" to your actual Google Search API key
  fetch(`https://www.googleapis.com/customsearch/v1?key=YOUR_API_KEY&cx=YOUR_ENGINE_ID&q=${searchQuery}`)
    .then(response => response.json())
    .then(data => {
      // Process the API response and display the search results
      displaySearchResults(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Function to handle the image button click
function viewImages() {
  var searchQuery = document.getElementById('searchInput').value;

  // Make a GET request to the Google Search API with searchType set to "image"
  fetch(`https://www.googleapis.com/customsearch/v1?key=YOUR_API_KEY&cx=YOUR_ENGINE_ID&q=${searchQuery}&searchType=image`)
    .then(response => response.json())
    .then(data => {
      // Process the API response and display the image results
      displayImageResults(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Function to handle the video button click
function viewVideos() {
  var searchQuery = document.getElementById('searchInput').value;

  // Make a GET request to the YouTube Data API to fetch video search results
  // Replace YOUTUBE_KEY with the Youtube Data API key
  fetch(`https://www.googleapis.com/youtube/v3/search?key=YOUTUBE_KEY&q=${searchQuery}&part=snippet&type=video`)
    .then(response => response.json())
    .then(data => {
      // Process the API response and display the video results
      displayVideoResults(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function sendImageRecognitionRequest(urls) {
  fetch('/image_recognition', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ image_urls: urls }),
  })
    .then(response => response.json())
    .then(data => {
      // Handle the recognition results
      console.log(data.result);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Note: You can remove this code due to it's error functionality, updates coming soon about this code
// Feel free to remove it
// Example usage:
var imageUrls = ['url1', 'url1', 'url3'];
sendImageRecognitionRequest(imageUrls);

// Function to perform image recognition using TensorFlow.js
async function performImageRecognition(imageUrl) {
  const model = await mobilenet.load();
  const img = document.createElement("img");
  img.src = imageUrl;
  img.onload = async () => {
    const predictions = await model.classify(img);
    console.log(predictions);
    // You can display the image recognition results in the console or elsewhere in your UI
  };
}

// Get the history link element
var historyLink = document.getElementById("historyLink");

// Get the search history section
var searchHistory = document.getElementById("searchHistory");

// Add a click event listener to the history link
historyLink.addEventListener("click", function () {
  // Toggle the visibility of the search history section
  searchHistory.style.display =
    searchHistory.style.display === "none" ? "block" : "none";
});

// This use to load the search result page but it failed so 
// Remove this if you wish
function loadSearchResultPage() {
  var xhr = new XMLHttpRequest();
  var url = "search-result.html";
  xhr.open("GET", url, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      document.getElementById("mainContent").innerHTML = xhr.responseText;
    } else {
      console.error("Error loading search-result.html:", xhr.status);
    }
  };
  xhr.send();
}
