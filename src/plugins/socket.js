import SocketIO from "socket.io-client"

// const URL = SocketIO("http://localhost:3111");

const socket = SocketIO("http://localhost:3111", {
    autoConnect: false, 
});
// const socket = SocketIO(URL,{
//     autoConnect:false,
// });
export default socket;