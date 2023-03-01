import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import axios from 'axios'
import VueAxios from 'vue-axios'

// import VueSocketIO from 'vue-3-socket.io'
// import SocketIO from "socket.io-client"

// const socketConnections = SocketIO("http://localhost:3111", {
//     autoConnect: true 
// });

const app = createApp(App).use(router)
app.use(Antd)
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)
// app.use(new VueSocketIO({
//     debug: true,
//     connection: socketConnections,

// }))
app.mount('#app')
