// Import the Appwrite SDK for Node.js
import { Appwrite } from 'node-appwrite';

// Initialize the Appwrite SDK with your project ID and API key
const appwrite = new Appwrite();
appwrite
  .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
  .setProject('65785f2247857902b2ec') // Your project ID
 .setKey('dcfaf4e7fd2ef1064d6a3fae779bb8f57e6ccb5eda3030e5ab39ba65caa3a835e8988e84a1bd87462d9e51fbae132946c219c533de00ac219241ff254e44dd92b9a872d3b21d5b6b32de1dc9fa57dd1936b5932b218affbb6060015e7fcf0949d2a398a1c1124ff7a2ce55d274b1beeedb50e8989ead8e4281196296eb647637') // Your secret API key
;

// Get the environment variables from Appwrite
appwrite.functions.getEnvironmentVariables()
  .then(function (response) {
    // Assign the environment variables to local variables
    const GOOGLE_API_KEY = response['GOOGLE_API_KEY'];
    const GOOGLE_API_ENGINE = response['GOOGLE_API_ENGINE'];
    const YOUTUBE_API_KEY = response['YOUTUBE_API_KEY'];

    // Use the local variables in your search function
    function search() {
      var searchQuery = document.getElementById('searchInput').value;
      
      fetch(`https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_API_ENGINE}&q=${searchQuery}`)
        .then(response => response.json())
        .then(data => {
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
    fetch(`https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_API_ENGINE}&q=${searchQuery}&searchType=image`)
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

    fetch(`https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_API_ENGINE}&q=${searchQuery}&searchType=video`)
      .then(response => response.json())
      .then(data => {
      displayVideoResults(data);
    });

    // Make a GET request to the YouTube Data API to fetch video search results
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&q=${searchQuery}&part=snippet&type=video`)
      .then(response => response.json())
      .then(data => {
      // Process the API response and display the video results
      displayVideoResults(data);
      })
})
  .catch(function (error) {
    // Handle any errors
    console.error(error);
  });
