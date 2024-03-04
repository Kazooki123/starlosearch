// Define the search function
function search() {
  // Get the user's search query once
  var searchQuery = searchInput.value;

  // Check if the search query is empty
  if (searchQuery === "") {
    // Show a message to the user
    alert("Please enter something to search");
    // Exit the function
    return;
  }

  // Use the searchweb tool to get the search results from the web
  var webInfo = search_web(
    searchQuery +
      "&key=AIzaSyBkc8B7LNvNoJPv6LOVveEE2T_zpSvG_uQ&cx=03d9c25b28b784a57"
  );

  // Parse the webInfo string into a JSON object
  var webInfoObj = JSON.parse(webInfo);

  // Get the array of web search results
  var webResults = webInfoObj.web_search_results;

  // Check for a pre-generated answer
  switch (searchQuery.toLowerCase()) {
    case "why is the sky blue?":
      generativeAnswerBox.textContent =
        "The sky appears blue because of how sunlight interacts with Earth's atmosphere. When sunlight enters the atmosphere, tiny air molecules scatter the different colors of light. Blue light has a shorter wavelength and is scattered more easily than other colors, reaching our eyes from all directions and making the sky appear blue.";
      break;
    case "why am i single?":
      generativeAnswerBox.textContent = "Because you're afraid to talk to girls.";
      break;
    case "how to confess to my crush?":
      generativeAnswerBox.textContent = "Just tell her ¯_(ツ)/¯";
      break;
    default:
      // Get the first web search result
      var webResult = webInfoObj.web_search_results[0];

      // Get the title, snippet, and url of the web result
      var webTitle = webResult.title;
      var webSnippet = webResult.snippet;
      var webUrl = webResult.url;

      // Display the web information in the generativeAnswerBox div
      generativeAnswerBox.innerHTML = `
       <h3>${webTitle}</h3>
       <p>${webSnippet}</p>
       <a href="${webUrl}">Read more</a>
      `;
  }

  // Display the web search results in the searchResults div
  displaySearchResults(webResults, searchQuery);

  // Add the search query to the history
  addHistoryItem(searchQuery);

  // Load the search-result.html file into the mainContent div
  loadSearchResultPage();
}

function loadSearchResultPage() {
  var mainContent = document.getElementById("mainContent");

  var xhr = new XMLHttpRequest();

  xhr.open("GET", "../../search-result.html", true);


  xhr.responseType = "document";

  xhr.addEventListener("load", function () {
    if (xhr.status === 200) {
      var doc = xhr.response;

      mainContent.parentNode.replaceChild(doc, mainContent);
    }
  });

  xhr.send();
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
