<template>
    <div class="container px-5" style="height: 90vh;">
        <div class="shadow bg-body-tertiary rounded h-100 mx-5 p-3">
            <div class="row mx-4">
                <div class="col-4 rounded-3" style="overflow: hidden;">
                    <img src="../assets/avatar_placeholder.png" alt="" class="img-thumbnail" style="width: 100%;">
                </div>
                <div class="col-8 text-black" style="max-height: 80vh; overflow-y: auto; color: black !important;">
                    <RegisterForm :userData="userStore.user" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import RegisterForm from '@/components/RegisterForm.vue';
import { useUserStore } from '@/store/user.store';

export default{
    created(){
        this.userStore = useUserStore();
    },
    components: {
        RegisterForm,
    }
}
</script>