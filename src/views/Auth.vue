<template>
    <div class="background-custom ">
        <div class="overlay d-flex align-items-center ">
            <div class="container">
                <div class="row d-flex justify-content-center ">
                    <div class="col-5">
                        <div class=" p-5 rounded rounded-4 overlay2 text-white" style="width: 100%; max-height: 80vh; overflow-y: auto;">
                            <router-view 
                            @submit:register="createAccount" 
                            @submit:login="logIn" 
                            @submit:email="sendRequest"
                            @submit:password="resetPassword"
                            />
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
.overlay2::-webkit-scrollbar {
  width: 5px;
  background: traưnsparent; /* Làm trong suốt */
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
import { useUserStore } from "@/store/user.store";
export default{
    components: {
        RegisterForm,
    },
    methods: {
        async createAccount(data){
            try {
                const result = await AuthService.create(data);
                alert(result.message);
                if(result.message==="Tạo tài khoản thành công"){
                    alert("Vui lòng truy cập Gmail để kích hoạt tài khoản")
                    this.$router.push({name:"login"});
                }
            } catch (error) {
                console.log(error)
                alert("Đã có lỗi xảy ra, vui lòng thử lại");
            }
        },
        async logIn(data){
            try {
                const message = await AuthService.logIn(data);
                if(message.message === "Đăng nhập thành công"){
                    this.userStore = useUserStore();
                    await this.userStore.fetchUserData();
                    this.$router.push({name:"home"});
                }else{ 
                    alert(message.message);
                }
            } catch (error) {
                console.log(error)
                alert("Đã có lỗi xảy ra, vui lòng thử lại");
            }
        },
        async forgotPassword(data){
            try {
                await AuthService.forgotPassword(data)
            } catch (error) {
                console.log(error)
                alert("Đã có lỗi xảy ra, vui lòng thử lại");
            }
        },
        async sendRequest(data){
            try {
                const result = await AuthService.sendRequest(data);
                console.log(result.success);
                if(result.success){
                    this.$router.push({name:'noitification'})
                }
            } catch (error) {
                console.log(error)
                alert("Đã có lỗi xảy ra, vui lòng thử lại");
            }
        },
        async resetPassword(data){
            try {
                const result = await AuthService.resetPassword(data);
                if(result.message==="Đổi mật khẩu thành công"){
                    alert(result.message);
                    this.$router.push({name:'login'});
                }
            } catch (error) {
                console.log(error)
                alert("Đã có lỗi xảy ra, vui lòng thử lại");
            }
        },
    }
}
</script>