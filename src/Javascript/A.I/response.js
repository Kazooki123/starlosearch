// Responses for the chatbot
const responses = {
    greetings: ["Hello!", "Hi there!", "Hey!"],
    questions: ["How can I assist you?", "What can I help you with?", "Feel free to ask me anything."],
    farewell: ["Goodbye!", "See you later!", "Take care!"],
    default: ["I'm here to help!", "I'm still learning, but I'll do my best to assist you."]
  };
  
  // Function to get a random response from the provided array
  function getRandomResponse(category) {
    if (responses.hasOwnProperty(category)) {
      const categoryResponses = responses[category];
      const randomIndex = Math.floor(Math.random() * categoryResponses.length);
      return categoryResponses[randomIndex];
    }
    return "I'm not sure what to say.";
  }
  
  // Function to get a response based on user input
  function getResponse(userInput) {
    const lowerCaseInput = userInput.toLowerCase();
    
    if (lowerCaseInput.includes("hello")) {
      return getRandomResponse(responses.greetings);
    } else if (lowerCaseInput.includes("how are you")) {
      return getRandomResponse(responses.default);
    } else if (lowerCaseInput.includes("goodbye")) {
      return getRandomResponse(responses.farewell);
    } else {
      return getRandomResponse(responses.default);
    }
  }
  
  export { getResponse };