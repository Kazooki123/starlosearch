// src/JavaScript/connection/Routes/route_to_ruby.js

// Function to send log signals to Ruby logging system
function sendLogSignal(logMessage) {
    // Make an AJAX request to your Ruby route or endpoint
    // You might need to adjust the URL and method according to your setup
    $.ajax({
      url: '../../../Ruby/Logs/route.rb',  // Replace with your Ruby endpoint URL
      method: 'POST',
      data: { message: logMessage },
      success: function(response) {
        console.log('Log signal sent successfully:', response);
      },
      error: function(error) {
        console.error('Error sending log signal:', error);
      }
    });
  }
  