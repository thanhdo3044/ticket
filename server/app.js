const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const config = require('./config');
const bodyParser = require('body-parser');
const server = http.createServer(app);
const { Server } = require("socket.io");

app.use(cors());
app.use(bodyParser.json());

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
    
    const username = socket.handshake.auth && socket.handshake.auth.username;

    if(!username) return next(new Error("invalid user idName or no fill username"));
    socket.username = username;
    next();
})

io.on('connection', (socket,next) => {
    console.log('a user connected',socket.handshake.auth);

    const users =[]
    for(let [id,socket] of io.of("/").sockets){
         users.push({
            userId: id,
            username: socket.username,
         })
         console.log(users.username);
    }
    // console.log(users);
    socket.emit('getUsers',users);

    socket.broadcast.emit("userJustConneted",{
        userId:socket.id,
        username:socket.username,
    })

    socket.on("privateMessage", ({message,to})=>{
        console.log("message 12423",to, message);
        socket.to(to).emit("privateMessageToReceiver",{
            message,
            from:socket.id,
        })
    })

    socket.on("privateMessage",({message,to})=>{
        console.log("userID: ",to,message);
        socket.to(to).emit("privateMessafeToReceiver",{
            message,
            from:socket.id, 
        })
        
    })

    socket.on('disconnect', () =>{
        socket.broadcast.emit("userDisconnect",socket.id);
        console.log(`user disconnected`);
    });
 
});


// app.use(express.json());
// app.use(cors());
// app.use(bodyParser.json());

server.listen(config.port, () => {
    console.log('listening on *:3111',config.port);
});
