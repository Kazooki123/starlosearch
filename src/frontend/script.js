function search() {
  // Get the user's search query once
  const searchQuery = document.getElementById("searchInput").value;

  // Define question (lowercase search query) before using it
  const question = searchQuery.toLowerCase();

  const searchResultsElement = document.getElementById("searchResults");

  // Define pre-generated answers (NOTE: THIS IS A TEST TO LEARN MY STEPS ON HOW TO IMPLEMENT A.I GENERATED ANSWERS INTO MY SEARCH ENGINE SYSTEMS. EVENTUALLY THIS CODE MIGHT BE REMOVED OR MODIFIED, DEPENDING ON PLANS THAT MIGHT CHANGE THROUGH MONTHS OR YEARS)
  const answers = {
    "why is the sky blue?":
      "The sky appears blue because of how sunlight interacts with Earth's atmosphere. When sunlight enters the atmosphere, tiny air molecules scatter the different colors of light. Blue light has a shorter wavelength and is scattered more easily than other colors, reaching our eyes from all directions and making the sky appear blue.",
    "why am i single?": "Because you're afraid to talk to girls.",
    "how to confess to my crush?": "Just tell her ¯_(ツ)_/¯",
  };

  // Get the search result element
  const generativeAnswerBoxElement = document.getElementById(
    "generativeAnswerBox"
  );

  if (answers.hasOwnProperty(question)) {
    generativeAnswerBoxElement.textContent = answers[question];
  } else {
    searchResultsElement.textContent =
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

async function loadSearchResultPage() {
  var mainContent = document.getElementById("mainContent");

  try {
    let response = await fetch("../../search-result.html");
    if (response.ok) {
      let html = await response.text();
      let newElement = document.createElement("div");
      newElement.innerHTML = html;
      
      mainContent.parentNode.replaceChild(newElement, mainContent);
    } else {
      console.error("Error:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Function to handle the image button click
function viewImages() {
  var searchQuery = document.getElementById("searchInput").value;

  // Make a GET request to the Google Search API with searchType set to "image"
  fetch(
    `https://www.googleapis.com/customsearch/v1?key=AIzaSyBkc8B7LNvNoJPv6LOVveEE2T_zpSvG_uQ&cx=03d9c25b28b784a57&q=${searchQuery}&searchType=image`
  )
    .then((response) => response.json())
    .then((data) => {
      // Process the API response and display the image results
      displayImageResults(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  addHistoryItem(searchQuery);
}

// Function to handle the video button click
function viewVideos() {
  var searchQuery = document.getElementById("searchInput").value;

  fetch(
    `https://www.googleapis.com/customsearch/v1?key=AIzaSyBkc8B7LNvNoJPv6LOVveEE2T_zpSvG_uQ&cx=03d9c25b28b784a57&q=${searchQuery}&searchType=video`
  )
    .then((response) => response.json())
    .then((data) => {
      displayVideoResults(data);
    });

  // Make a GET request to the YouTube Data API to fetch video search results
  fetch(
    `https://www.googleapis.com/youtube/v3/search?key=AIzaSyCgRiy4eJoesdaiAYjLDZD8iPO7O_q0aYM&q=${searchQuery}&part=snippet&type=video`
  )
    .then((response) => response.json())
    .then((data) => {
      // Process the API response and display the video results
      displayVideoResults(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  addHistoryItem(searchQuery);
}