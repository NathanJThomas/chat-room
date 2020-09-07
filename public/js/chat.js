const searchParams = new URLSearchParams(window.location.search);
document.querySelector('.active').innerText = searchParams.get('chatId');

const socket = io();

// send message to server
document.getElementById('send').addEventListener('submit', e => {
    e.preventDefault();
    
    const newMsg = document.getElementById('new-message');
    
    socket.emit('message', {
        username: searchParams.get('username'),
        chatId: searchParams.get('chatId'),
        msg: newMsg.value
    });

    newMsg.value = "";
})

// retrieve messages from server and display
socket.on(searchParams.get('chatId'), msg => {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message');
    const msgAuthor = document.createElement('p');
    msgAuthor.classList.add('message-author');
    msgAuthor.innerText = msg.username;
    msgDiv.appendChild(msgAuthor);
    const msgText = document.createElement('p');
    msgText.classList.add('message-text');
    msgText.innerText = msg.msg;
    msgDiv.appendChild(msgText);

    const messages = document.getElementById('messages')
    messages.appendChild(msgDiv);
    messages.scrollTop = messages.scrollHeight;

})
