const mysql = require('mysql');

// Create a MYSQL Database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Waliffuyy1964',
    database: 'SearchEngineDB'
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

module.exports = connection;