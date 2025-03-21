<template>
    <div class="background-custom ">
        <div class="overlay d-flex align-items-center ">
            <div class="container">
                <div class="row d-flex justify-content-center ">
                    <div class="col-5">
                        <div class=" p-5 rounded rounded-4 overlay2 text-white" style="width: 100%; height: auto;">
                            <h3 class="text-center fw-bold">ĐĂNG KÝ TÀI KHOẢN</h3>
                            <RegisterForm @submit:register="createAccount" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>

<style scoped>
.overlay{
    width: 100%;
    height: 100%;
    
    background-color: rgba(255, 255, 255, 0);
}
.overlay2{
    margin: 0;
    padding: 0;
    background: transparent;
    backdrop-filter: blur(10px);
}
.background-custom{
    margin: 0;
    padding: 0;
    height: 100vh;
    width: 100vw;
    background-image: url('../assets/backgroundBanner.jpg'); /* Đường dẫn ảnh */
}
</style>

<script>
import AuthService from "@/services/auth.service";
import RegisterForm from "@/components/RegisterForm.vue";
export default{
    components: {
        RegisterForm,
    },
    methods: {
        async createAccount(data){
            try {
                await AuthService.create(data);
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>