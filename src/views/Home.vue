<template>
    <div>
        <AppHeader />
    </div>
    <h1>home view</h1>
    <router-link :to="{name: 'admin'}">
        Admin
    </router-link>
    <div style="height: 900px;"></div>
</template>

<script>
import AppHeader from"@/components/AppHeader.vue";
import { useUserStore } from "@/store/user.store";
export default{
    created(){
        this.userStore = useUserStore();
        console.log(this.userStore.user);
    },
    components:{
        AppHeader,
    },
}
</script>