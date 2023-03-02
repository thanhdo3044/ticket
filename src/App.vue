<script>
import { ref, onMounted } from 'vue'
import socket from "./plugins/socket.js"


export default {
  setup() {
    const username = ref("")
    const isLoggedIn = ref(false)
    let users = ref([]);
    const selectedUserToSend = ref([])
    const message = ref("")

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
        socket.emit("privateMessage",{
          message:message.value,
          to:this.selectedUserToSend.userId,
        })
        
        
    }

    onMounted(() => {
      // console.log('Component mounted')
      socket.on("getUsers", (data) => {
        // console.log("get users", data);
        data.forEach(user => {
          user.self = user.userId === socket.id
        });
        users.value = data.sort((a, b) => {
          if (a.self) return -1;
          if (b.self) return 1;
          if (a.username < b.username) return -1;
          return a.username < b.username ? 1 : 0;
        })
        console.log('users: ', users.value);
      })

      socket.on("userJustConneted", (data) => {
        users.value.push(data);
        console.log("users jusr connected: ", users.value);
      })

      socket.on("privateMessafeToReceiver",({message,from}) => {
        for(let i=0; i<users.value.length; i++){
          const user = users.value[i];
          if(user.userId === from){
            user.message.push({
              message,
              isSelf:false,
            })
            if(user !== selectedUserToSend.value.userId){
              user.isHasNewMessage = true;
              break;
            }
          }
        }
      })

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
          <span> </span>
        </button>
      </li>
      </ul>
    </div>

    <div>
        Name main
        <span>{{ selectedUserToSend.username }}</span>
    </div>
    <div>
        main message
        <span>
            <div v-for="message in selectedUserToSend.messages" :key="JSON.stringify(message)">
              {{ message.isSelf ?"You" : selectedUserToSend.username }}
            </div>
            <h6>{{ message.message }}</h6>
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
