//THIS IS THE SERVER SIDE

const express = require('express');
const backSocket = require('socket.io');

//setup the app, invoke express function
const app = express();

//create server
const server = app.listen(5000, ()=>{
    console.log('listening to port 5000');
});

//Static files
app.use(express.static('public'));

//setup Socket in server, invoke socket function, take parameter of the server to work with
const io = backSocket(server);

io.on('connection', (socket)=>{
    console.log('made socket connection', socket.id);
    
    //listen to the chat msg sent from client-side
    socket.on('chat', (data)=>{
        //refers to all different sockets connecting the server
        io.sockets.emit('chat', data);
    });

    socket.on('typing', (data)=>{
        socket.broadcast.emit('typing', data);
    });
});
