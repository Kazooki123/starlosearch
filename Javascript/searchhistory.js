// searchhistory.js

// Function to save a search query to the search history
function saveSearchQuery(query) {
    // Retrieve the existing search history from localStorage
    let searchHistory = getSearchHistory();
  
    // Add the new search query to the search history array
    searchHistory.push(query);
  
    // Save the updated search history back to localStorage
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }
  
  // Function to get the search history from localStorage
  function getSearchHistory() {
    // Retrieve the search history from localStorage
    let searchHistory = localStorage.getItem('searchHistory');
  
    // Check if search history exists
    if (searchHistory) {
      // Parse the search history JSON string into an array
      return JSON.parse(searchHistory);
    } else {
      // If search history does not exist, return an empty array
      return [];
    }
  }
  
  // Function to clear the search history
  function clearSearchHistory() {
    // Remove the search history from localStorage
    localStorage.removeItem('searchHistory');
  }  