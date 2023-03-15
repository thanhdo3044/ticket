const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");


var admin = require('firebase-admin');

var serviceAccount = require("./chat-thanhdo-3041521-firebase-adminsdk-hkno0-b5fa12b644.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:'https://chat-thanhdo-3041521-default-rtdb.firebaseio.com/',
//   databaseAuthVariableOverride:null,
});
 
const db = admin.database();
const refMessage = db.ref('message');
const refUser = db.ref('user');
 

const io = new Server(server, {
    allowEIO3:true,    
    cors: {
        origin: "*",
        // methods: ["GET", "POST","OPTIONS"],
        // credentials:true,
    },
    transports: ["websocket","polling"],
});

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
        // admin.database().ref('privateMessageToReceiver'.push(message))
        if(message != null){
            refMessage.push({
            to:socket.id,
            username:socket.username,
            message: message,
        }).then(()=>{
            console.log("data is saced successfully");
        }).catch((error)=>{
            console.log("data could not be saved"+ error);
        })
        }
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


server.listen(3111, () => {
    console.log('listening on *:3111',3111);
});
