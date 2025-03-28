<template>
    <div class="row shadow-lg bg-body-tertiary rounded-2" style="max-height: 330px; overflow: hidden;">
        <div class="col-6 bg-dark p-0 m-0" style="height: 330px;">
            <img :src="book.imageUrl" alt="" style="width: 100%;">
        </div>
        <div class="col-6 p-0 detail-custom" style="position: relative;">
            <div class="p-2 ms-2 d-flex flex-column justify-content-between" style="height: 100%;">
                <div class="detail-custom">   
                    <p class="fw-bold fs-5 text-uppercase" style="color: #ff9800;">{{ book.tensach }}</p>
                    <p><span class="fw-bold">Tác giả: </span>{{ book.tacgia }}</p>
                    <p><span class="fw-bold">Giá: </span>{{ book.dongia }} VNĐ</p>
                    <p><span class="fw-bold">Năm xuất bản: </span>{{ book.namxuatban }}</p>
                    <p><span class="fw-bold">Nhà xuất bản: </span>{{ book.nhaxuatban }}</p>
                </div>
                <div class="text-end">
                    <span class="fw-light total">Còn {{ book.soquyenconlai }} quyển</span>
                </div>
            </div>
            <div v-if="userStore.isLogged" class="overlay d-flex justify-content-center align-items-center">
                <button type="button" class="btn btn-info" @click="createOrder(book._id)">Đăng ký mượn</button>
            </div>
            <div v-else class="overlay d-flex flex-column justify-content-center align-items-center">
                <button type="button" class="btn btn-primary mb-2" @click="goToLogin">Đăng nhập</button>
                <button type="button" class="btn btn-secondary mt-2" @click="goToSignUp">Đăng ký</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.overlay {
    padding: 0;
    margin: 0;
    position: absolute;
    width: 100%;
    background: linear-gradient(to top, #ff9800 55%, transparent);
    top: 350px;
    height: 70%;
    transition: top 0.5s ease-in-out;
}

.detail-custom:hover .overlay{
    padding: 0;
    margin: 0;
    position: absolute;
    width: 100%;
    background: linear-gradient(to top,  #ff9800 55%, transparent);
    top:100px;
    height: 70%;
    transition: top 0.5s ease-in-out;
}

.btn{
height: 40px;
width: auto;
color: white;
}
</style>

<script>
import { useUserStore } from '@/store/user.store';
export default{
    created(){
        this.userStore = useUserStore()
    },
    props:{
        book: {type: Object, default: {}}
    },
    emits:["registerOrder"],
    methods: {
        createOrder(id) {
            this.$emit("registerOrder", id);
        },
        goToLogin(){
            this.$router.push({name: "login"})
        },
        goToSignUp(){
            this.$router.push({name: "register"})
        }
    }
}
</script>