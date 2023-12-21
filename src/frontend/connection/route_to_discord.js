const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

// Endpoint to receive messages from frontend and send to Elixe bot
app.post("/send-message", (req, res) => {
  const { message } = req.body; // Assuming you are sending the message in the request body

  // Process the message and send it to the Elixe bot using client

  // Send a response back to the frontend
  res.json({ response: "Message sent successfully!" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// Function to send a message to Elixe bot
function sendMessageToElixe(message) {
    fetch("http://localhost:3000/send-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.response); // Server's response
        // Here you can show the response in your HTML chat box
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  }
  