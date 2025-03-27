<template>
    <h3 class="text-center fw-bold">QUÊN MẬT KHẨU</h3>
     <div class="mt-3">
        <Form @submit="submit" :validation-schema="emailFormSchema">
            <div class="form-group mb-4">
                <label for="email">Hãy nhập G-mail tài khoản</label>
                <Field name="email" id="email" type="email" class="form-custom" v-model="email.email"/>
                <ErrorMessage name="email" class="error-feedback" />
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
            email: yup
                .string()
                .required("E-mail phải có giá trị")
                .email("E-mail không đúng")
                .max(50, "E-mail tối đa 50 ký tự"),
        })
        return{
            email: {},
            emailFormSchema,
        }
    },
    methods: {
        submit(){
            // console.log(this.email);
            this.$emit("submit:email", this.email);
        }
    }
}
</script>