<template >
    <div class="user-view-tickter" id="viewticket">
        <RemoverTicker />
        <div class="title-uers-tickter">
            <a-row>
                <a-col>
                    <p>Các ticket </p>
                </a-col>
                <a-col class="title-uers-tickter-svg">
                    <!--  -->
                    <button @click="this.$router.push('/departmentticket')">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-plus-lg"
                            viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                        </svg>
                    </button>
                </a-col>
            </a-row>
        </div>
        <div class="sucess-uers-ticket">
            <a-row>
                <a-col><a-button class="sucess-uers-ticket-button " @click="success" :class="{opacity}" > Hoàn thành</a-button></a-col>
                <a-col><a-button class="sucess-uers-ticket-button unsucess ">Chưa hoàn thành </a-button> </a-col>
            </a-row>
        </div>
        <div class="content-uers-tickter" >
            <Success title=" quyasn dinh sais tria j so " start="12/12/2022" end="202020" name="La Minh Phuong" count="50" :handle=true evaluate='QT' />
            <Success title=" quyasn dinh sais tria j so " start="12/12/2022" end="202020" name="La Minh Phuong" count="50" :handle=false evaluate='TB' />
            <Success title=" quyasn dinh sais tria j so " start="12/12/2022" end="202020" name="La Minh Phuong" count="50" :handle=true evaluate="KQT"/>

        </div>

        <MessageTicker />

    </div>
</template>

<script>

import RemoverTicker from "../../components/RemoverTicker.vue";
import MessageTicker from "../../components/MessageTicker.vue";
import Success from "../../components/SuccessTicker.vue";



export default {
    name:'ViewTicker',
    el:'#viewticket',
    components: {
        RemoverTicker,
        MessageTicker,
        Success,
    }
}

// const data ={
    // title: "Các ticket",
    // stast : "12/12/2002",
    // end:"12/12/2022",
    // list:["1","2","3","4","5","6","7","8","9","10"]
// }

</script>

<style scoped>
.user-view-tickter {
    margin-top: 31px;
    margin-left: 20px;
}

/* .remover-uers-ticker svg {
    width: 30px;
} */

.title-uers-tickter {
    display: flex;
    justify-content: left;
    align-items: start;
}

.title-uers-tickter-svg {
    position: absolute;
    right: 0;
    margin-right: 16px;
}

.title-uers-tickter-svg svg {
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.title-uers-tickter-svg button {
    border-color: transparent;
    border-radius: 10%;
    color: #EBEBEB;
    background-color: #0BB588;
}

.title-uers-tickter p {
    font-size: 32px;
}

.sucess-uers-ticket {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
}

.sucess-uers-ticket-button {
    border-radius: 18px;
    color: #fff;
    background-color: #7CB305;
    font-size: 20px;
    padding: 5px 18px;
    height: 38px;
    opacity: 50%;
}

.unsucess {
    background-color: #CF1322;
    margin-left: 14px;
}
.opacity{
    opacity: 100%;
}

.content-time {
    margin-left: 10px;
    margin-bottom: 10px;
    font-size: 10px
}

.time-right {
    position: absolute;
    right: 0;
    margin-right: 26px;
}

.content-uers {
    border-radius: 15px;
    color: #fff;
    background-color: #F5222D;
    margin-left: 10px;
    border-color: transparent;
}

.color-primay {
    background-color: #1677FF;
}

.content-uers-tickter-card {
    background-color: #EBEBEB;
    border-radius: 5px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-top: 5px;
    margin-right: 16px;
}

.content-uers-tickter-card-content {
    margin-left: 7px;
    font-size: 15px;
    font-weight: 500;
}

.content-uers-tickter-card-key-button {
    color: black;
    border: 1px solid #C45353;
    border-radius: 16px;
    margin-left: 4px;
    background-color: #EBEBEB;
}
</style>