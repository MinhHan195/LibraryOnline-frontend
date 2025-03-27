<template>
    <div class="row p-0 m-0" style="height: 100vh;">
        <div class="col-2 bg-dark text-white m-0">
            <SideBarAdmin/>
        </div>
        <div class="col-10 ps-0 bg-body-secondary">
            <div class="bg-dark text-white pe-4 pt-2 header-custom" style="width: 100%; height: 40px;">
                <div class="custom-button" @click="logout">
                    <i class="fa-solid fa-arrow-right-from-bracket fa-flip-horizontal fa-xl"></i>
                    <span class="ms-2">Đăng xuất</span>
                </div>
            </div>
            <div class="pt-5">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<style scoped>
.custom-button:hover {
    cursor: pointer;
    color: #ff9800;
  }
.header-custom{
    position: fixed;
    z-index: 0;
    
}
.custom-button{
    position: absolute;
    left:  1150px;
}
</style>

<script>
import SideBarAdmin from "@/components/SideBarAdmin.vue";
import { useUserStore } from "@/store/user.store";
export default{
    created() {
        this.userStore = useUserStore()
    },
    components: {
        SideBarAdmin,
    },
    methods: {
        logout(){
            this.userStore.$reset();
            this.$router.push({name:"home"});
        }
    }

}
</script>


