<template>
    <h3 class="text-center fw-bold">ĐĂNG KÝ TÀI KHOẢN</h3>
     <div class="mt-3">
        <Form @submit="submit" :validation-schema="registerFormSchema">
            <div class="form-group mb-4">
                <label for="name">Họ và Tên</label>
                <Field name="name" id="name" type="text" class="form-custom" v-model="userRegistrationData.name" />
                <ErrorMessage name="name" class="error-feedback" />
            </div>
            <div class="form-group mb-4">
                <label for="email">E-mail</label>
                <Field name="email" id="email" type="email" class="form-custom" v-model="userRegistrationData.email"/>
                <ErrorMessage name="email" class="error-feedback" />
            </div>
            <div class="form-group mb-4">
                <label for="phone">Số điện thoại</label>
                <Field name="phone" id="phone" type="text" class="form-custom" v-model="userRegistrationData.phone"/>
                <ErrorMessage name="phone" class="error-feedback" />
            </div>
            <div class="form-group mb-4">
                <label for="password">Mật khẩu</label>
                <Field name="password" id="password" type="password" class="form-custom" v-model="userRegistrationData.password"/>
                <ErrorMessage name="password" class="error-feedback" />
            </div>
            <div class="form-group mb-4">
                <label for="confirmPassword">Xác nhận mật khẩu</label>
                <Field name="confirmPassword" id="confirmPassword" type="password" class="form-custom" v-model="userRegistrationData.confirmPassword"/>
                <ErrorMessage name="confirmPassword" class="error-feedback" />
            </div>
            <div class="form-group">
                <button class="btn">Đăng ký</button>
            </div>
        </Form>
    </div>
    <p class="text-center mt-4">Bạn đã có tài khoản? <router-link :to="{name: 'login'}">Đăng nhập</router-link></p>
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
import { ref } from "vue";
export default{
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:register","submit:login","submit:email","submit:password"],
    data(){
        const registerFormSchema = yup.object().shape({
            name: yup  
                .string()
                .required("Tên phải có giá trị")
                .min(2, "Tên phải có ít nhất 2 kí tự")
                .max(50, "Tên phải có nhiều nhất 50 ký tự"),
            email: yup
                .string()
                .required("E-mail phải có giá trị")
                .email("E-mail không đúng")
                .max(50, "E-mail tối đa 50 ký tự"),
            phone: yup
                .string()
                .required("Số điện thoại phải có giá trị")
                .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, "Số điện thoại không hợp lệ."),
            password: yup
                .string()
                .required("Mật khẩu không được trống")
                .min(6,"Mật khẩu phải ít nhất 6 ký tự")
                .max(30, "Mật khẩu tối đa 30 ký tự"),
            confirmPassword: yup
                .string()
                .required("Mật khẩu xác nhận không được trống")
                .oneOf([yup.ref("password")], "Mật khẩu xác nhận không khớp"),
        })
        return{
            userRegistrationData: {role: "user"},
            registerFormSchema,
        }
    },
    methods: {
        submit(){
            // console.log(this.userRegistrationData);
            this.$emit("submit:register", this.userRegistrationData);
        }
    }
}
</script>