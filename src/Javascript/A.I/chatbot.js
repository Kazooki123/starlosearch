// Chatbot functionality
function sendMessage() {
  const userMessage = document.getElementById('userMessage').value;
  appendUserMessage(userMessage); // Display the user's message in the chatbox
  processUserMessage(userMessage); // Process the user's message and get a response
}

// Function to append user's message to the chatbox
function appendUserMessage(message) {
  const chatbox = document.getElementById('chatbotMessages');
  const userMessageElement = document.createElement('div');
  userMessageElement.className = 'user-message';
  userMessageElement.textContent = message;
  chatbox.appendChild(userMessageElement);
}

// Function to append chatbot's response to the chatbox
function appendChatbotMessage(message) {
  const chatbox = document.getElementById('chatbotMessages');
  const chatbotMessageElement = document.createElement('div');
  chatbotMessageElement.className = 'chatbot-message';
  chatbotMessageElement.textContent = message;
  chatbox.appendChild(chatbotMessageElement);
}

// Function to process the user's message and get a response
function processUserMessage(userMessage) {
  // You can implement your chatbot logic here to generate responses
  // For simplicity, let's select a random response from the 'greetings' category
  const randomGreeting = getRandomResponse('greetings');
  appendChatbotMessage(randomGreeting);
}

// Function to get a random response from a category
function getRandomResponse(category) {
  if (responses.hasOwnProperty(category)) {
    const categoryResponses = responses[category];
    const randomIndex = Math.floor(Math.random() * categoryResponses.length);
    return categoryResponses[randomIndex];
  }
  return chatbotMessageElement.innerHtml = "I'm not sure what to say.";
}