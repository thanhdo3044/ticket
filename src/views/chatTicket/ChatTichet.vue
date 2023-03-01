<template>
    <div class="chat">
        <div class="chat-user">
            <a-avatar :size="52">
                <template #icon>
                    <UserOutlined />
                </template>
            </a-avatar>
            <p>Tên người dùng</p>
            <input type="text" v-model="username" />
        </div>
        <div class="mess" id="mess" >
            <div class="chat-user chat-mess " v-for="message in messages" :key="message">
                <span><a-avatar :size="24">
                        <template #icon>
                            <UserOutlined />
                        </template>
                    </a-avatar>
                    <p>{{ message.username }}</p>
                </span>
                <p>{{ message.username }}</p>
            </div>

        </div>
        <div class="input-chat">
            <form @submit.prevent="handlMess">
                <a-input-search v-model:value="message" placeholder="Tin nhắn" enter-button="Gửi" />
            </form>
        </div>
    </div>
</template>

<script>
import { UserOutlined } from '@ant-design/icons-vue';
import { defineComponent,ref } from 'vue';
export default defineComponent({
    components: {
        UserOutlined,
    },
    setup(){
        const username = ref('username');
        const messages = ref([]);
        const message = ref([]);
        const handlMess = (value) => {
            message.value = value;
        }
        return{
            username,
            messages,
            message,
            handlMess,
        }
    }
});
</script>

<style>
.chat {
    margin-top: 16px;
    margin-left: 16px;
    margin-right: 16px;
}
.chat-user{
    display: flex;
    align-items: center;
    justify-content: start;
    margin-bottom: 8px;
    
}
.chat-mess{
    margin-left: 5px;
    padding-top: 5px;
}
.chat-mess p{
    margin-top: 16px;
}
.mess {
    background: #d9d9d93f;
    min-height: 500px;
    margin-bottom: 5px;
    border-radius: 5%;

}

.input-chat {
    /* position: absolute; */
    bottom: 0;
}


</style>