<template>
    <div>
        <a-row type="flex" class="content-uers-tickter-card">
            <a-row class="content-time ">
                <a-col>{{ start }}</a-col>
                <a-col class="time-right">{{ end }}</a-col>
            </a-row>
            <a-row>
                <a-col :flex="2" class="content-uers-tickter-card-content">
                <p>{{ title }} </p>
            </a-col>
            <a-col :flex="2">
                <a-row class="content-uers-tickter-card-key">
                    <a-col>
                        <a-button v-if="evaluate=='QT'" danger class="content-uers">
                            Quạn trọng
                        </a-button>
                        <a-button v-if="evaluate=='TB'" danger class="content-uers color-orgin">
                            Trung bình
                        </a-button>
                        <a-button v-if="evaluate=='KQT'" danger class="content-uers color-yellow">
                            Thấp
                        </a-button>
                    </a-col>
                    <a-col>
                        <a-button v-if="handle == true" class="content-uers color-primay" >
                            Đang xử lý
                        </a-button>
                        <a-button v-else class="content-uers color-gray ">
                            Đã xử lý
                        </a-button>
                    </a-col>
                    <a-col>
                        <a-badge :count= "count" :number-style="{ fontSize: '9px', backgroundColor: '#EBEBEB',color: '#F5222D', boxShadow: '0 0 0 1px #F5222D', }">
                            <a-button class="content-uers-tickter-card-key-button"> {{ name }}</a-button>
                        </a-badge>
                    </a-col>
                </a-row>
            </a-col>
            </a-row>
        </a-row>
    </div>
</template>
<script>

export default {
    name:"SuccessTicket",
    props:{
        start:String,
        end:String,
        title:String,
        name:String,
        count:String,
        handle:String,
        evaluate:String,
    },
    
}
</script>
<style>

.hide-time{
    display: none;
}
.content-uers{
    border-radius: 15px;
    color: #fff;
    background-color: #F5222D;
    margin-left: 10px;
    border-color: transparent;
}
.color-primay{
    background-color: #1677FF;
}
.color-gray{
    background-color: #A0D911;
    /* color: #fff;
    border-color: transparent; */
}
.color-orgin{
    background-color: #FA541C;
}
.color-yellow{
    background-color: #FA8C16;
}
.content-time {
    margin-left: 10px;
    margin-bottom: 10px;
    font-size:10px
}

.time-right {
    position: absolute;
    right: 0;
    margin-right: 26px;
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

/* .content-uers-tickter-card-key {
    justify-content: right;
    align-items: flex-end;
    text-align: right;
} */

.content-uers-tickter-card-key-button {
    color: black;
    border: 1px solid #F5222D;
    border-radius: 16px;
    margin-left: 4px;
    background-color: #EBEBEB;
}

</style>