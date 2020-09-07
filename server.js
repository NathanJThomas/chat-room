const express = require('express'); 
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

// explicitly create server in order to pass it to socket.io
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

io.on('connection', socket => {

    socket.on('message', msg => {
        io.emit(msg.chatId, { username: msg.username, msg: msg.msg });
    })


    socket.on('disconnect', () => console.log('A user disconnected'));
});


app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/chat', (req, res) => {
    if(req.query.username && req.query.chatId && req.query.username !== "" && req.query.chatId !== "") {
        res.sendFile(path.join(__dirname, 'public', 'chat.html'));
    } else {
        res.redirect('/login');
    }
})


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Listening to PORT: ${PORT}`));