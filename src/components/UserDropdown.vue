<template>
    <div>
        <div class="d-flex align-items-center justify-content-center border border-secondary rounded-pill p-1 column-gap-2 custom-button" 
        @click="toggleDropdown"
        style="height: 40px;">
            <div class="rounded-circle " style="height: 30px; width: 30px; overflow: hidden;">
                <img src="../assets/avatar_placeholder.png" alt="avatar placeholder" class="img-fluid">
            </div>
            <span v-if="!userDataCheck" class="fw-medium">Đăng nhập</span>
            <span v-else class="fw-medium">{{ userStore.user.hoten }}</span>
            <i class="fa-duotone fa-solid fa-caret-down me-1"></i>
    </div>
    <div v-if="isOpen && !userDataCheck" class="border border-secondary rounded-2 position-absolute mt-2 z-3 bg-blur" style="right: 113px;">
        <div class="d-flex ">
            <div class="m-2">
                <button type="button " class="btn btn-warning rounded-pill" @click="login">Đăng nhập</button>
            </div>
            <div class="m-2">
                <button type="button" class="btn btn-outline-warning rounded-pill" @click="signin">Đăng ký</button>
            </div>
        </div>
    </div>
    <div v-if="isOpen && userDataCheck" class="border border-secondary rounded-2 position-absolute mt-2 z-3 bg-blur" style="right: 113px;">
        <div class="p-3">
            <div class="d-flex column-gap-4 custom-button" @click="user">
                <div class="rounded-circle " style="height: 50px; width: 50px; overflow: hidden;">
                    <img src="../assets/avatar_placeholder.png" alt="avatar placeholder" class="img-fluid">
                </div>
                <div>
                    <b v-if="!userDataCheck" class="text-primary">Tên người dùng</b>
                    <b v-else class="text-primary">{{ userStore.user.hoten }}</b>
                    <p>Tài khoản</p>
                </div>
            </div>
            <hr class="p-0 m-0">
            <div class="bg-transparent">
                <table class="table table-borderless">
                    <tbody>
                        <tr class="custom-button">
                            <td><i class="fa-solid fa-heart fa-xl" style="color: #03abfd;"></i></td>
                            <td><span class="ms-1 fw-medium">Sách đã lưu</span></td>
                        </tr>
                        <tr class="custom-button" @click="history">
                            <td><i class="fa-solid fa-paper-plane fa-xl" style="color: #03abfd;"></i></td>
                            <td><span class="ms-1 fw-medium">Lịch sử mượn sách</span></td>
                        </tr>
                        <tr class="custom-button" v-if="userStore.user.role==='admin'" @click="admin">
                            <td><i class="fa-solid fa-user-tie fa-xl" style="color: #03abfd;"></i></td>
                            <td><span class="ms-1 fw-medium">Quản lý</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <hr>
            <div>
                <div class="custom-button" @click="logout">
                    <i class="fa-solid fa-arrow-right-from-bracket fa-flip-horizontal fa-xl"></i>
                    <span class="ms-2">Đăng xuất</span>
                </div>
            </div>
        </div>
        
    </div>
    
    </div>
</template>

<style scoped>
  .custom-button:hover {
    /* outline: 1px solid #03abfd; */
    box-shadow: 0 0 5px #ff9800;
    cursor: pointer;
  }
  .bg-blur{
    background: transparent;
    backdrop-filter: blur(10px);
  }

  td{
    background-color: transparent !important;
    color: white !important;
  }

</style>

<script>
import { useUserStore } from '@/store/user.store';
export default{
    created(){
        this.userStore = useUserStore();
    },
    data(){
        return {
            isOpen: false
        };
    },
    computed: {
        userDataCheck(){
            return Object.keys(this.userStore.user).length !== 0;
        },
    },
    methods: {
        toggleDropdown() {
            this.isOpen = !this.isOpen;
        },
        login() {
            this.$router.push({name:"login"});
        },
        signin() {
            this.$router.push({name:"register"});
        },
        logout(){
            this.userStore.$reset();
            this.$router.push({name:"home"});
        },
        admin(){
            this.$router.push({name:"bookborrow"})
        },
        user(){
            this.$router.push({name:"userinf"})
        },
        history(){
            this.$router.push({name: "history"})
        }
    }
}
</script>