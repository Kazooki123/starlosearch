// Function to open the Elixe message box
function openElixe() {
  const discordMessageBox = document.getElementById("discordMessageBox");
  discordMessageBox.style.display = "block";
}

// Function to close the Elixe message box
function closeElixe() {
  const discordMessageBox = document.getElementById("discordMessageBox");
  discordMessageBox.style.display = "none";
}

// Function to send a message to Elixe
function sendMessageToElixe() {
  // Here, you would implement your code to send the message to Elixe using elixe.js
  // For example, you can use AJAX or fetch to send the message to your server
  // Once the message is sent, you can call closeElixe() to hide the chat box
  closeElixe();
}

// Get the "Send" button element
const sendButton = document.getElementById("discordSendButton");

// Add a click event listener to the "Send" button
sendButton.addEventListener("click", sendMessageToElixe);