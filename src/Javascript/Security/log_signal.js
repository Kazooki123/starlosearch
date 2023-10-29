// src/JavaScript/Security/log_signal.js

// Import the route_to_ruby module
import { sendLogSignal } from '../Connection/Routes/route_to_ruby';

// Log a message when a search is performed
function logSearchAction(query) {
  const logMessage = `User performed a search: ${query}`;
  sendLogSignal(logMessage);
}

// Add event listener to trigger log signal when search button is clicked
document.getElementById('searchButton').addEventListener('click', function() {
  const searchQuery = document.getElementById('searchInput').value;
  logSearchAction(searchQuery);
});
