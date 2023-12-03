// Function to handle the search request
function search() {
  var searchQuery = document.getElementById('searchInput').value;

  // Make a GET request to the Google Search API
 // Replace "YOUR_API_KEY" to your actual Google Search API key
  fetch(`https://www.googleapis.com/customsearch/v1?key={GOOGLE_API_KEY}&cx={GOOGLE_API_ENGINE}&q=${searchQuery}`)
    .then(response => response.json())
    .then(data => {
      // Process the API response and display the search results
      displaySearchResults(data);
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
  fetch(`https://www.googleapis.com/customsearch/v1?key={GOOGLE_API_KEY}&cx={GOOGLE_API_ENGINE}&q=${searchQuery}&searchType=image`)
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

  fetch('https://www.googleapis.com/customsearch/v1?key={GOOGLE_API_KEY}&cx={GOOGLE_API_ENGINE}&q=${searchQuery}&searchType=video')
  .then(response => response.json())
  .then(data => {
    displayVideoResults(data);
  });

  // Make a GET request to the YouTube Data API to fetch video search results
  fetch(`https://www.googleapis.com/youtube/v3/search?key={YOUTUBE_API_KEY}&q=${searchQuery}&part=snippet&type=video`)
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

function sendImageRecognitionRequest(urls) {
  fetch('src/Python/fastapi_web.py', {
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
var imageUrls = ['jhs:///'];
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
