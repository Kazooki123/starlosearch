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
  fetch(`https://www.googleapis.com/customsearch/v1?key=AIzaSyBkc8B7LNvNoJPv6LOVveEE2T_zpSvG_uQ&cx=03d9c25b28b784a57&q=${searchQuery}&searchType=image`)
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
  fetch(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyCgRiy4eJoesdaiAYjLDZD8iPO7O_q0aYM&q=${searchQuery}&part=snippet&type=video`)
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

// Example usage:
var imageUrls = ['https://upload.wikimedia.org/wikipedia/commons/2/2f/Hentai_-_yuuree-redraw.jpg', 'https://img-egc.xvideos-cdn.com/videos/thumbs169poster/28/6c/c7/286cc75779f3bc1f65cbf8848f128a08/286cc75779f3bc1f65cbf8848f128a08.2.jpg', 'https://cdn77-pic.xvideos-cdn.com/videos/thumbs169poster/2f/f2/bf/2ff2bf5c1e382b44eb3e6220ef182cbb/2ff2bf5c1e382b44eb3e6220ef182cbb.30.jpg'];
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
