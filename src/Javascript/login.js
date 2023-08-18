// login.js
let usersData;

function fetchUsersData() {
  fetch('Assets/data/Json/data.json')
    .then((response) => response.json())
    .then((data) => {
      usersData = data;
    })
    .catch((error) => {
      console.error("Error fetching users data:", error);
    });
}

function login() {
  // Ensure usersData is loaded before attempting to log in
  if (!usersData) {
    alert("Users data is not loaded. Please try again later.");
    return;
  }

  const usernameInput = document.getElementById("username").value;
  const passwordInput = document.getElementById("password").value;

  // Check if the username and password match in the usersData object
  if (usersData.hasOwnProperty(usernameInput)) {
    const userData = usersData[usernameInput];
    if (userData.password === passwordInput) {
      alert("Login successful!");
      // Redirect to the search engine homepage or perform other actions here
    } else {
      alert("Incorrect password. Please try again.");
    }
  } else {
    alert("Username not found. Please try again or create a new account.");
  }
}

// Call the fetchUsersData function when the page loads
window.addEventListener("load", fetchUsersData);