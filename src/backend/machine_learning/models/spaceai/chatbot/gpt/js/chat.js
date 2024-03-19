document.getElementById('send-btn').addEventListener('click', function() {
    var userInput = document.getElementById('user-input').value;
    fetch('http://127.0.0.1:5000/chatbot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userInput }),
    })
    .then(response => response.json())
    .then(data => {
        var chatArea = document.getElementById('chat-area');
        chatArea.innerHTML += '<div>User: ' + userInput + '</div>';
        chatArea.innerHTML += '<div>SpaceAI:' + data.response + '</div>';
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});