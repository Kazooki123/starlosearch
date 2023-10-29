const connection = require('./mysql-connector');

function getAllUsers(callback) {
    const query = 'SELECT * FROM users';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error executing MySQl query:', err);
            callback(err, null);
            return;
        }
        callback(null, results);
    });
}

// An example function to perform an INSERT query
function createUser(username, email, callback) {
    const query = 'INSERT INTO users (username, email) VALUES (?, ?)';

    connection.query(query, [username, email], (err, results) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            callback(err, null);
            return;
        }
        callback(null, results.insertId)
    });
}

module.exports = {
    getAllUsers,
    createUser
};