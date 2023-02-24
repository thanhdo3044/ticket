<template>
    <div class="user-view-tickter">
        <div @click="this.$router.push('/ticket') ">
            <RemoverTicker />
        </div>
        <div class="title-uers-tickter">
            <a-row>
                <a-col>
                    <p>Tạo ticket </p>
                </a-col>

            </a-row>
        </div>
        <div class="department-tickter">
            <a-row>
                <a-col>
                    <p>Chọn phòng ban để gửi ticket</p>
                </a-col>
            </a-row>
            <a-row>
                <a-col>
                    <div hoverable class="department-ticker-cart" >
                        <p>Phòng Số Hóa Dữ Liệu </p>
                    </div>
                </a-col>
                <a-col>
                    <div hoverable class="department-ticker-cart" >
                        <p>Phòng Số Hóa Dữ Liệu </p>
                    </div>
                </a-col>
                <a-col>
                    <div hoverable class="department-ticker-cart" >
                        <p>Phòng Số Hóa Dữ Liệu </p>
                    </div>
                </a-col>
                <a-col>
                    <div hoverable class="department-ticker-cart" >
                        <p>Phòng Số Hóa Dữ Liệu </p>
                    </div>
                </a-col>
            </a-row>
        </div>
        <div class="button-uers-tickter">
            <a-row>
                <a-col :pull="1"><a-button class="button-uers-tickter-color" @click="this.$router.push('/')" >Hủy</a-button></a-col>
                <a-col><a-button class="button-uers-tickter-color color-button-ticker" @click="this.$router.push('/contentticket')"  >Tiếp</a-button></a-col>
            </a-row>
        </div>
    </div>
</template>

<script>

import RemoverTicker from "../../components/RemoverTicker.vue";

export default {

    components: {
        RemoverTicker
    },
    methods: {
        removeTicker() {

        }
    }



}

</script>

<style scoped>
.user-view-tickter {
    margin-top: 31px;
    margin-left: 20px;
}

.title-uers-tickter p {
    font-size: 32px;
}
.department-ticker-cart{
    width: 185px;
    height: 185px;
    background-color: #D9D9D9;
    border-radius:10px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 20px;
    padding-left: 10px;
    padding-right: 10px;
    margin-right: 20px;
    margin-top: 20px;
}
.button-uers-tickter{
    position: absolute;
    right: 0;
    bottom: 0;
    margin-right: 16px;
}
.button-uers-tickter-color{
    color: #000;
    font-size: 20px;
    width: 116px;
    height: 47px;
}
.color-button-ticker{
    background-color: #0BB588;
    color: #fff;
}
</style>