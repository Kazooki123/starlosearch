function startVoiceSearch() {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
  
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      document.getElementById('searchInput').value = transcript;
      search(); // Call the search function to perform the search
    };
  
    recognition.start();
  }
  