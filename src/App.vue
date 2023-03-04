<script>
import { ref, onMounted,onUnmounted } from 'vue'
import socket from "./plugins/socket.js"


export default {
  setup() {
    const username = ref("")
    const isLoggedIn = ref(false)
    let users = ref([]);
    const selectedUserToSend = ref([])
    const message = ref("")
    // const messages = ref([])

    function onSubmitLogin() {
      console.log("running");
      isLoggedIn.value = true;
      socket.auth = {
        username: username.value
      };
      socket.connect();

    }
    function onSelectedUserToSend(user){
      selectedUserToSend.value=user
    }

    function onSendMessage(){
       if(message.value != null){
        socket.emit("privateMessage",{
          message:message.value,
          to:selectedUserToSend.value.userId,
        })
        console.log("running")
        if(!selectedUserToSend.value.messages)
          selectedUserToSend.value.messages =[];
          // console.log("messeage 1 run",selectedUserToSend.value.messages);
          selectedUserToSend.value?.messages.push({
            message:message.value,
            isSelf:true,
          })
        
        message.value = "";
       }
        
    }

    onMounted(() => {
      // console.log('Component mounted')
      socket.on("getUsers", (data) => {
        // console.log("get users", data);
        data.forEach(user => {
        user.connected = true;
          user.self = user.userId === socket.id
        });
        users.value = data.sort((a, b) => {
          if (a.self) return -1;
          if (b.self) return 1;
          if (a.username < b.username) return -1;
          return a.username < b.username ? 1 : 0;
        })
        // console.log('users: ', users.value);
      })

      socket.on("userJustConneted", (data) => {
        data.connected = true;
        users.value.push(data);
        // console.log("users jusr connected: ", users.value);
      })

      socket.on("privateMessafeToReceiver",({message,from}) => {
        // console.log("private message receiver: ", message,from);
        for(let i=0; i<users.value.length; i++){
          const user = users.value[i];
          if(user.userId === from){
            if(!user.messages) user.messages =[]
            user.messages.push({
              message, 
              isSelf:false,
            })
            if(user !== selectedUserToSend.value?.userId) user.isHasNewMessage = true;
              break;
            
          }
        }
      })

      socket.on("connect",()=>{
        users.value.forEach(user=>{
          if(user.isSelf) 
            user.connection = true;
        })
      })

      socket.on("disconnect",()=>{
        users.value.forEach(user=>{
          if(user.isSelf)
            user.connection = false;
        })
      })

      socket.on("userDisconnect",(id)=>{
        for(let i=0; i< users.value.length; i++){
          const user = users.value[i]

          if(user.userId ===id) {
            user.connected = false;
            break;
          }

        }
      })

    })

    onUnmounted(()=>{
      socket.off("getUsers")
      socket.off("userJustConneted")
      socket.off("privateMessafeToReceiver")
      socket.off("userdisconnect")
    })

    return {
      onSubmitLogin,
      username,
      isLoggedIn,
      selectedUserToSend,
      users,
      onSelectedUserToSend,
      onSendMessage,
      message,
      // messages,
    }
  }
}


</script>

<template>
  <nav>
    <!-- <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link> -->
    <!-- <router-link to="/ticket">Tiket</router-link> -->
    <!-- <router-link to="/departmentticket">About</router-link>
          <router-link to="/contentticket">About</router-link> -->
    <!-- <button type="button" @click="onMounted"> Click </button> -->
  </nav>

  <div>
    <form @submit.prevent="onSubmitLogin">
      <input v-model="username" type="text" />
      <button type="submit">Login</button>
    </form>

    <div>
      Friend list connected
      <ul>
        <li v-for="user in users" :key="user.userId">
        <button @click="onSelectedUserToSend(user)">
          <span>{{ user.username }}</span>
          <span style="color: blue;">{{ user.connected ? "On": "Off" }} </span>
        </button>
      </li>
      </ul>
    </div>

    <div>
        Name main
        <span>{{ selectedUserToSend.username }}</span>
    </div>
    <div style="background-color: aqua;">
        <span>
            <div v-for="message in selectedUserToSend.messages" :key="JSON.stringify(message)">
              {{ message.isSelf ?"You" : selectedUserToSend.username }}
              <h4>{{ message.message }}</h4>
            </div>
        </span>
    </div>

    <div>
      Messages share
      <form @submit.prevent="onSendMessage">
        <input type="text" v-model="message" />
        <button type="submit">Send</button>
      </form>
    </div>

  </div>


  <router-view />
</template>



<style>
#app {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000000;
}
</style>
