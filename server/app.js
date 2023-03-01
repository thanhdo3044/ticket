const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    allowEIO3:true,    
    cors: {
        origin: "*",
        // methods: ["GET", "POST","OPTIONS"],
        // credentials:true,
    },
    transports: ["websocket","polling"],
});

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

io.use(( socket,next)=>{
    
    const idName = socket.handshake.auth;
    if(!idName) return next(new Error("invalid user idName or no fill idName"));
    socket.idName = idName;
    next();
})

io.on('connection', (socket,next) => {
    console.log('a user connected',socket.handshake.auth);

    const users =[]
    for(let [id,socket] of io.of("/").sockets){
         users.push({
            userID: id,
            users: socket.idName,

         })
    }
    socket.emit('getUsers',users);

    socket.on('disconnect', () =>{
        console.log(`user disconnected`);
    });
 
});

server.listen(3111, () => {
    console.log('listening on *:3111');
});