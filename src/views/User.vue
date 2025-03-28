<template>
    <div class="row p-0 m-0" style="height: 100vh;">
        <div class="col-2 text-white m-0" style="background-color: #ff9800;">
            <div class="position-fixed d-flex flex-column align-items-center justify-content-between" style="height: 100%;">
                <div class="mt-1">
                    <img src="../assets/logo2.svg" alt="" style="width: 230px;" class="mb-5">
                    <table class="table-side-bar-custom ms-3">
                        <tbody>
                            <tr
                            v-for="(item, index) in menuItems"
                            :key="index"
                            :class="['list-group-custom mt-4', { 'list-group-custom-active': activeIndex === index }]"
                            @click="setActive(index, item.action)"
                            >
                                <td><i :class="item.icon"></i></td>
                                <td><span>{{ item.label }}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="d-flex border-top border-2 pt-4 pb-3 custom-button" @click="userInf">
                    <div class="rounded-circle me-3" style="height: 60px; width: 60px; overflow: hidden;">
                        <img src="../assets/avatar_placeholder.png" alt="" style="height: 100%;">
                    </div>
                    <div>
                        <span class="fw-bold ">{{ userStore.user.hoten }}</span>
                        <p>Tài khoản</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-10 ps-0 bg-body-secondary">
            <div class="p-4">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<style scoped>
.custom-button:hover {
    cursor: pointer;
    color: #412700;
  }
.list-group-custom{
    color: rgb(255, 255, 255);
    border-radius: 0;
    height: 60px;
    text-align: left;
}
.list-group-custom:hover{
    color: #412700;
    cursor: pointer;
}
.list-group-custom-active{
    color: #412700;
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
            activeIndex: -1,
            menuItems: [
                { label: "Lịch sử mượn sách", icon: "fa-solid fa-clock-rotate-left fa-lg me-2", action: "history" },
                { label: "Danh sách yêu thích", icon: "fa-solid fa-heart fa-lg me-2", action: "" },
                { label: "Trang chủ", icon: "fa-solid fa-house fa-lg me-2", action: "goHome" }
            ]
        }
    },
    methods: {
        setActive(index, action){
            this.activeIndex = index;
            if (action && typeof this[action] === "function") {
                this[action]();
            }
        },
        goHome(){
            this.$router.push({name: "home"})
        },
        userInf(){
            this.$router.push({name: "userinf"})
        },
        history(){
            this.$router.push({name: "history"})
        }
    }
}
</script>