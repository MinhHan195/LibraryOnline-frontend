<template>
    <div class="position-fixed bg-dark pe-2" style="height: 100%;">
        <div class="mt-3 d-flex flex-column align-items-center">
            <div class="rounded-circle" style="height: 70px; width: 70px; overflow: hidden;">
                <img src="../assets/avatar_placeholder.png" alt="" class="img-fluid">
            </div>
            <p class="fw-bold mb-1 mt-1">{{ userStore.user.hoten }}</p>
            <p class="mb-0">Chào mừng bạn trở lại</p>
        </div>
        <hr>
        <table class="table-side-bar-custom">
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
</template>

<style scoped>
.table-side-bar-custom{
    margin-left: 20px;
}
.list-group-custom{
    color: rgb(255, 255, 255);
    border-radius: 0;
    height: 60px;
    text-align: left;
}
.list-group-custom:hover{
    color: #ff9800;
    cursor: pointer;
}
.list-group-custom-active{
    color: #ff9800;
}
</style>

<script>
import { useUserStore } from '@/store/user.store';
import { number } from 'yup';
export default{
    data(){
        return{
            activeIndex: -1,
            menuItems: [
                { label: "Lịch sử mượn sách", icon: "fa-solid fa-clock-rotate-left fa-lg me-2", action: "borrowBook" },
                { label: "Thêm mới sách", icon: "fa-solid fa-plus fa-lg me-2", action: "addBook" },
                { label: "Quản lý sách hiện có", icon: "fa-solid fa-book fa-lg me-2", action: "listBook" },
                { label: "Quản lý người dùng", icon: "fa-solid fa-users fa-lg me-2", action: "users" },
                { label: "Trang chủ", icon: "fa-solid fa-house fa-lg me-2", action: "home" }
            ]
        }
    },
    created(){
        this.userStore = useUserStore();
    }, 
    methods: {
        addBook(){
            this.$router.push({name:"addbook"});
        },
        listBook(){
            this.$router.push({name:"listbook"});
        },
        borrowBook(){
            this.$router.push({name:"bookborrow"});
        },
        users(){
            this.$router.push({name:"users"});
        },
        home(){
            this.$router.push({name: "home"})
        },
        setActive(index, action){
            this.activeIndex = index;
            if (action && typeof this[action] === "function") {
                this[action]();
            }
        }
    }
}
</script>