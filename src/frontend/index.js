// <THIS IS A TEST FILE TO CHECK IF IMPORT WORKS!<

// Import the fs module from Node.js
import fs from 'fs';

// Read the contents of a file called data.txt
fs.readFile('script.cjs', 'utf8', (err, data) => {
    // Handle any errors
    if (err) {
        console.error(err);
    } else {
        // Print the data to the console
        console.log(data);
    }
}); 
