import express from 'express'
import { router } from 'express-file-routing' 
import sqlite3 from 'sqlite3'

const app = express();
const port = 5501;

const db = new sqlite3.Database('userslogin.db');

app.use(urlencoded({ extended: true }));

app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err) => {
    if (err) {
      return res.status(500).send('Error creating user.');
    }
    res.redirect('../index.html')
  });
});

app.listen(port, () => {
  console.log('Server is running on port ${port}');
});

// Client-side logic:

document.querySelector('form').addEventListener('Submit', async (event) => {
  event.preventDefault();

  const username = document.querySelector('input[name="username"]').value;
  const password = document.querySelector('input[name="password"]').value;

  if (!username || !password) {
    alert('Username and password are required');
  } else {
    const response = await fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password}),
    });

    if (response.status === 200) {
      window.location.href = 'index.html';
    } else {
      alert('Sign-up failed. Please try again.');
    }
  }
});
