<template>
    <h3 class="text-center fw-bold">ĐĂNG NHẬP</h3>
     <div class="mt-3">
        <Form @submit="submit" :validation-schema="logInFormSchema">
            <div class="form-group mb-4">
                <label for="email">E-mail</label>
                <Field name="email" id="email" type="email" class="form-custom" v-model="userLogInData.email"/>
                <ErrorMessage name="email" class="error-feedback" />
            </div>
            <div class="form-group mb-4">
                <label for="password">Mật khẩu</label>
                <Field name="password" id="password" type="password" class="form-custom" v-model="userLogInData.password" @keyup.enter="submit"/>
                <ErrorMessage name="password" class="error-feedback" />
            </div>
            <div class="form-group">
                <button class="btn">Đăng nhập</button>
            </div>
        </Form>
    </div>
    <p class="text-center mt-4">Bạn chưa có tài khoản? <router-link :to="{name: 'register'}">Đăng ký</router-link></p>
    <p class="text-center mt-2"><router-link :to="{name: 'forgotpassword'}">Quên mật khẩu</router-link></p>
</template>

<style scoped>
label{
    margin-bottom: 3px;
}
.btn{
    width: 100%;
    color: white;
    border: 0;
    background-color: rgb(135, 36, 0);
} 
.error-feedback{
    color: red;
}
.form-custom{
    width: 100%;
    color: white;
    background: transparent;
    border: none; 
    border-bottom: 3px solid white; 
    border-radius: 0%;
    outline: none;
}
</style>

<script>
import * as yup from "yup";
import {Form, Field, ErrorMessage} from "vee-validate";
import AuthService from "@/services/auth.service";
export default{
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:login","submit:register","submit:email","submit:password"],
    data(){
        const logInFormSchema = yup.object().shape({
            email: yup
                .string()
                .required("E-mail phải có giá trị")
                .email("E-mail không đúng")
                .max(50, "E-mail tối đa 50 ký tự"),
            password: yup
                .string()
                .required("Mật khẩu không được trống")
                .min(6,"Mật khẩu phải ít nhất 6 ký tự")
                .max(30, "Mật khẩu tối đa 30 ký tự"),
        })
        return{
            userLogInData: {},
            logInFormSchema,
        }
    },
    methods: {
        submit(){
            // console.log(this.userLogInData);
            this.$emit("submit:login", this.userLogInData);
        },

        async activeAccount(token, id){
            try {
                const result = await AuthService.activeAccount(token, id);
                if(result.message==="successful"){
                    alert("Kích hoạt tài khoản thành công") 
                }
            } catch (error) {
                console.log(error)
            }
        }
    },
    async mounted(){
        if(this.$route.query.token && this.$route.query.id){
            await this.activeAccount(this.$route.query.token,this.$route.query.id);
        }
    }
}
</script>