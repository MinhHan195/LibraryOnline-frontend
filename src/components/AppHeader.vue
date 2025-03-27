<template>
    <nav class="navbar-custom shadow-sm w-100">
        <div class="d-flex flex-column container h-100">
            <div class="d-flex justify-content-between w-100">
                <div>
                    <a href="/">
                        <img src="../assets/logo.svg" alt="WorkFind" height="60px">
                    </a>
                </div>
                <div class="d-flex">
                    <div class="d-flex mt-4">
                        <router-link :to="{name: 'home'}" class="nav-link">
                            TRANG CHỦ
                        </router-link> 
                        <router-link :to="{name: ''}" class="nav-link ms-5">
                            YÊU THÍCH
                        </router-link>
                    </div>
                     <div class="border-secondary ms-5 mt-3">
                        <UserDropdown />
                    </div>
                </div>
            </div>
            <div class="row flex-grow-1 d-flex flex-column justify-content-center">
                <div class="col-8 ">
                    <div class="text-quote text-center">
                        <i class="fa-solid fa-quote-left fa-2xl"></i>
                        <h2>Sách Là Liều Thuốc Cho Tâm Hồn</h2>
                        <i class="fa-solid fa-quote-right fa-2xl"></i>
                    </div>
                    <p class="mb-0">Chào mừng bạn đến với Library Online,</p>
                    <p>Nơi bạn có thể tìm kiếm và đăng ký mượn bất cứ cuốn sách yêu thích nào của bạn.</p>
                    <div class="w-50">
                        <InputSearch v-model="searchText" @submit="submit" />
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.navbar-custom{
    color: white;
    height: 400px;
    /* background-color: rgb(77, 22, 2); */
    padding: 0;
    margin: 0;
    background-image: url('../assets/background-header.png');
}
.nav-link:hover{
    color: #ff9800;
}
.text-quote{
    width: 90%;
    padding: 10px;
    margin-bottom: 10px;
    border: 4px solid #ff9800;
    color: #ff9800;
}
.fa-quote-left{
    position: absolute;
    left: 200px;
    top: 138px;
}
.fa-quote-right{
    position: absolute;
    top: 207px;
    left: 770px;
}
</style>

<script>
import UserDropdown from '@/components/UserDropdown.vue';
import InputSearch from './InputSearch.vue';
import { useUserStore } from '@/store/user.store';
export default {
    created(){
        this.userStore = useUserStore();
    },
    components: {
        UserDropdown,
        InputSearch,
    },
    props:{
        text: {type: String, default: ""},
    },
    data(){
        return {
            searchText: text,
        }
    },
    emits:["submit"],
    data() {
        return {
            userData: {}
        }
    },
    methods: {
        async getUser() {
            try {
                
            } catch (error) {
                console.log(error);
            }
        },
        submit() {
            console.log(this.searchText)
            this.$emit("submit");
        }
    }
}
</script>