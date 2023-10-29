const clearButton = document.getElementById('clearButton');
const historyList = document.getElementById('historyList');

// Display search history
const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
history.forEach((query) => {
  const listItem = document.createElement('li');
  listItem.textContent = query;
  historyList.appendChild(listItem);
});

function addHistoryItem(searchQuery) {
  const searchHistory = getSearchHistory();

  // Add the new search query to the search history
  searchHistory.push(searchQuery);

  // Save the updated search history to local storage
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

function getSearchHistory() {
  const searchHistoryJSON = localStorage.getItem('searchHistory');
  return searchHistoryJSON ? JSON.parse(searchHistoryJSON) : [];
}

function displaySearchHistory() {
  const historyList = document.getElementById('historyList');

  // Get the search history from local storage
  const searchHistory = getSearchHistory();

  // Clear the history list
  clearButton.addEventListener('click', () => {
    localStorage.removeItem('searchHistory');
    historyList.innerHTML = '';
  });

  // Display each search query in the history list
  searchHistory.forEach(query => {
    const historyItem = document.createElement('li');
    historyItem.textContent = query;
    historyList.appendChild(historyItem);
  });
}