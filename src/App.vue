<!-- <script>


import { log } from 'console'
import { ref } from 'vue'
import socket from "./plugins/socket.js"

export default {
  setup(){
  const idName = ref("")
  const isLoggedIn = ref(false)
  const user = ref([]);

  function onSubmitLogin() {
    console.log("running");
    isLoggedIn.value = true;
    socket.auth = {
      id: idName.value
    };
    socket.connect();
    socket.on("getUsers", (data) => {
      // console.log("get users", data);
      data.forEach(user => {
        user.self = user.userId === socket.id 
      });
    })
  }
  // onMounted(() => {
  //   socket.on("getUsers", (data) => {
  //     console.log("get users", data);
  //   })
  // })
  onMounted(()=>{
    console.log("running");
  })
  
  return {
    idName,
    user,
    onSubmitLogin,
    onMounted,
  }
}
}


</script> -->

<template>
  <nav>
    <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    <!-- <router-link to="/ticket">Tiket</router-link> -->
    <!-- <router-link to="/departmentticket">About</router-link>
      <router-link to="/contentticket">About</router-link> -->
    <!-- <button type="button" @click="onMounted"> Click </button> -->
  </nav>

  <!-- <div>
    <form @submit.prevent="onSubmitLogin">
      <input v-model="idName" type="text" />
      <button type="submit">Login</button>
    </form>

  </div> -->

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
