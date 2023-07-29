// Note that use your own OpenAI API KEY to work this code.
// Function to process user's message and get chatbot's response
async function processUserMessage(message) {
  try {
    // Replace 'YOUR_API_KEY' with your actual OpenAI API key
    const apiKey = 'YOUR_API_KEY';

    // Set up the headers for the API request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    };

    // Set up the data for the API request
    const data = JSON.stringify({
      model: 'gpt-3.5-turbo', // Specify the language model you want to use (e.g., gpt-3.5-turbo)
      prompt: message,
      max_tokens: 100 // Adjust the number of tokens to control the response length
    });

    // Make the API request to OpenAI
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', data, { headers });

    // Extract the chatbot's response from the API response
    const chatbotResponse = response.data.choices[0].text;

    appendChatbotMessage(chatbotResponse); // Display the chatbot's response in the chatbox
  } catch (error) {
    console.error('Error processing user message:', error);
    // Handle any errors that might occur during chatbot response generation
  }
}

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
