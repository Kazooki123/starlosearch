// Music recognition functionality using ACRCloud API
async function recognizeMusic(audioBlob) {
  const host = "identify-ap-southeast-1.acrcloud.com";
  const accessKey = "358a5bc6ab10d13711178f92eb7ad82e"; // Replace with your ACRCloud Access Key
  const secretKey = "ly28AlapiiuOZEhoSZ9pLiqVhjSQ0KjpchukI9kw"; // Replace with your ACRCloud Secret Key

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "access-key": accessKey,
      "signature-version": "1",
      signature: "", // Leave empty for now
    },
    body: JSON.stringify({
      sample: audioBlob, // The audio data
    }),
  };

  // Calculate the signature using the secret key
  const timestamp = Math.floor(Date.now() / 1000);
  const signatureOrigin = `POST\n/v1/identify\n${timestamp}\napplication/json`;
  const hmac = CryptoJS.HmacSHA1(signatureOrigin, secretKey);
  const signature = hmac.toString(CryptoJS.enc.Base64);
  options.headers.signature = signature;

  // Send the request to ACRCloud
  try {
    const response = await fetch(`${host}/v1/identify`, options);
    const result = await response.json();
    console.log(result);
    return result; // You can process the recognition result here
  } catch (error) {
    console.error(error);
  }
}

// Function to start music recognition
async function startMusicRecognition() {
  const recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onresult = async (event) => {
    const audioBlob = event.results[0][0].transcript;
    const recognitionResult = await recognizeMusic(audioBlob);
    // Process the recognition result here

    // Call the search function if the result is a song name or artist
    if (recognitionResult && recognitionResult.status.code === 0) {
      const songName = recognitionResult.metadata.music[0].title;
      document.getElementById("searchInput").value = songName;
      search(); // Call the search function to perform the search
    }
  };

  recognition.start();
}

// Attach the music recognition to the microphone icon
const microphoneIcon = document.querySelector(".microphone-icon");
microphoneIcon.addEventListener("click", startMusicRecognition);
