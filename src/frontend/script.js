function search() {
  // Get the user's search query once
  const searchQuery = document.getElementById("searchInput").value;

  // Define pre-generated answers
  const answers = {
    "why is the sky blue?":
      "The sky appears blue because of how sunlight interacts with Earth's atmosphere. When sunlight enters the atmosphere, tiny air molecules scatter the different colors of light. Blue light has a shorter wavelength and is scattered more easily than other colors, reaching our eyes from all directions and making the sky appear blue.",
    // Add more questions and answers as needed
  };

  // Get the search result element
  const generativeAnswerBoxElement = document.getElementById(
    "generativeAnswerBox"
  );

  // Check for a pre-generated answer
  if (answers.hasOwnProperty(searchQuery.toLowerCase())) {
    generativeAnswerBoxElement.textContent = answers[question.toLowerCase()];
  } else {
    searchResultElement.textContent =
      "Sorry, I don't have an answer for that question yet.";
  }

  fetch(
    `https://www.googleapis.com/customsearch/v1?key=AIzaSyBkc8B7LNvNoJPv6LOVveEE2T_zpSvG_uQ&cx=03d9c25b28b784a57&q=${searchQuery}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Received data:", data);
      displaySearchResults(data, searchQuery);
    })
    .catch((error) => {
      console.error("Error:", error);
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
