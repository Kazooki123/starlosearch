// notification.js

// Send a notification token to the server
async function sendTokenToServer(token) {
    // Use fetch or other AJAX methods to send the token to your server
    // Example using fetch:
    try {
      const response = await fetch('/save-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
      });
      if (response.ok) {
        console.log(Token sent to server:', token);
      } else {
        console.error('Error sending token to server:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending token to server:', error);
    }
  }
  
  // Get the current registration token
  messaging.getToken({ vapidKey: 'BJ7OWqX8g8A2eOM9EDs99S2z4PKTqqh-TFUIr4LkPiMlWLPLDioA4Bf6eVbVMr15LKZ8eHqnzOU69dN7nmovlnE' }).then((currentToken) => {
    if (currentToken) {
      sendTokenToServer(currentToken);
    } else {
      console.log('No registration token available.');
    }
  }).catch((err) => {
    console.error('An error occurred while retrieving token:', err);
  });
  
  // Handle incoming messages
  messaging.onMessage((payload) => {
    console.log('Message received:', payload);
    // Display the notification to the user
    // You can use the payload to customize the notification
  });
  