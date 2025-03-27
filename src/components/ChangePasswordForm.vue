<template>
    <h3 class="text-center fw-bold">ĐỔI MẬT KHẨU</h3>
     <div class="mt-3">
        <Form @submit="submit" :validation-schema="emailFormSchema">
            <div class="form-group mb-4">
                <label for="password">Mật khẩu mới</label>
                <Field name="password" id="password" type="password" class="form-custom" v-model="passwordData.newPassword"/>
                <ErrorMessage name="password" class="error-feedback" />
            </div>
            <div class="form-group mb-4">
                <label for="confirmPassword">Xác nhận mật khẩu mới</label>
                <Field name="confirmPassword" id="confirmPassword" type="password" class="form-custom" v-model="passwordData.confirmNewPassword"/>
                <ErrorMessage name="confirmPassword" class="error-feedback" />
            </div>
            <div class="form-group">
                <button class="btn">Xác nhận</button>
            </div>
        </Form>
    </div>
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
export default{
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:login","submit:register","submit:email","submit:password"],
    data(){
        const emailFormSchema = yup.object().shape({
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
            passwordData: { userId: this.$route.query.id},
            emailFormSchema,
        }
    },
    methods: {
        submit(){
            this.$emit("submit:password", this.passwordData);
        }
    },
}
</script>