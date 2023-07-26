// Function to perform image recognition using TensorFlow.js
async function performImageRecognition(imageUrl) {
  const model = await mobilenet.load();
  const img = document.createElement('img');
  img.src = imageUrl;
  img.onload = async () => {
    const predictions = await model.classify(img);
    console.log(predictions);
    // You can display the image recognition results in the console or elsewhere in your UI
  };
}

// Autocomplete functionality
function autocomplete(inp, arr) {
    var currentFocus;
    inp.addEventListener("input", function(e) {
        var val = this.value;
        closeAllLists();
        if (!val) {
            return false;
        }
        currentFocus = -1;
        var a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                var b = document.createElement("DIV");
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function(e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) {
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    document.addEventListener("click", function(e) {
        closeAllLists(e.target);
    });
  }
  
// Function to handle the search request
function search() {
    var searchQuery = document.getElementById('searchInput').value;
  
    // Make a GET request to the Google Search API
    fetch(`https://www.googleapis.com/customsearch/v1?key=AIzaSyBkc8B7LNvNoJPv6LOVveEE2T_zpSvG_uQ&cx=03d9c25b28b784a57&q=${searchQuery}`)
      .then(response => response.json())
      .then(data => {
        // Process the API response and display the search results
        displaySearchResults(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

// Autocomplete data
var autocompleteData = [
    "Search query 1",
    "Search query 2",
    "Search query 3",
    // Add more autocomplete suggestions here
  ];
  
// Initialize autocomplete
autocomplete(document.getElementById("searchInput"), autocompleteData);
 
// Get the history link element
var historyLink = document.getElementById('historyLink');

// Get the search history section
var searchHistory = document.getElementById('searchHistory');

// Add a click event listener to the history link
historyLink.addEventListener('click', function() {
  // Toggle the visibility of the search history section
  searchHistory.style.display = (searchHistory.style.display === 'none') ? 'block' : 'none';
 });

function loadSearchResultPage() {
    var xhr = new XMLHttpRequest();
    var url = 'HTML/search-result.html';
    xhr.open('GET', url, true);
    xhr.onload = function () {
      if (xhr.status === 200) {
        document.getElementById('mainContent').innerHTML = xhr.responseText;
      } else {
        console.error('Error loading search-result.html:', xhr.status);
      }
    };
    xhr.send();
  }
  