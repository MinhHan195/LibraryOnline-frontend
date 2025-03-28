<style scoped>
option{
    background-color: transparent;
    color: black !important;
}
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

<template>
    <h3 class="text-center fw-bold" v-if="!userRegistrationData._id">ĐĂNG KÝ TÀI KHOẢN</h3>
    <h3 class="text-center fw-bold" v-else>THÔNG TIN NGƯỜI DÙNG</h3>
     <div class="mt-3">
        <div style="max-height: 100%; overflow-y: auto;" >
            <Form @submit="submit" :validation-schema="registerFormSchema">
                <div class="form-group mb-4">
                    <label class="fw-bold" for="hoten">Họ và Tên</label>
                    <Field name="hoten" id="hoten" type="text" class="form-custom" v-model="userRegistrationData.hoten" />
                    <ErrorMessage name="hoten" class="error-feedback" />
                </div>
                <div class="form-group mb-4">
                    <label class="fw-bold" for="email">E-mail</label>
                    <Field name="email" id="email" type="email" class="form-custom" v-model="userRegistrationData.email"/>
                    <ErrorMessage name="email" class="error-feedback" />
                </div>
                <div class="form-group mb-4">
                    <label class="fw-bold" for="ngaysinh">Ngày sinh</label>
                    <Field name="ngaysinh" id="ngaysinh" type="date" class="form-custom" v-model="userRegistrationData.ngaysinh"/>
                    <ErrorMessage name="ngaysinh" class="error-feedback" />
                </div>
                <div class="form-group mb-4">
                    <label class="fw-bold" for="gioitinh">Giới tính</label>
                    <Field as="select"  name="gioitinh" id="gioitinh" class="form-custom" v-model="userRegistrationData.gioitinh">
                        <option class="bg-transparent" value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                        <option value="Khác">Khác</option>
                    </Field>
                    <ErrorMessage name="gioitinh" class="error-feedback" />
                </div>
                <div class="form-group mb-4">
                    <label class="fw-bold" for="sodienthoai">Số điện thoại</label>
                    <Field name="sodienthoai" id="sodienthoai" type="text" class="form-custom" v-model="userRegistrationData.sodienthoai"/>
                    <ErrorMessage name="sodienthoai" class="error-feedback" />
                </div>
                <div class="form-group mb-4">
                    <label class="fw-bold" for="diachi">Địa chỉ</label>
                    <Field name="diachi" id="diachi" type="text" class="form-custom" v-model="userRegistrationData.diachi"/>
                    <ErrorMessage name="diachi" class="error-feedback" />
                </div>
                <div class="form-group mb-4" v-if="!userRegistrationData._id">
                    <label class="fw-bold" for="password">Mật khẩu</label>
                    <Field name="password" id="password" type="password" class="form-custom" v-model="userRegistrationData.password"/>
                    <ErrorMessage name="password" class="error-feedback" />
                </div>
                <div class="form-group mb-4" v-if="!userRegistrationData._id">
                    <label class="fw-bold" for="confirmPassword">Xác nhận mật khẩu</label>
                    <Field name="confirmPassword" id="confirmPassword" type="password" class="form-custom" v-model="userRegistrationData.confirmPassword"/>
                    <ErrorMessage name="confirmPassword" class="error-feedback" />
                </div>
                <div class="form-group" v-if="!userRegistrationData._id">
                    <button class="btn">Đăng ký</button>
                </div>
                <div class="form-group" v-else>
                    <button class="btn" style="background-color: #ff9800;">Lưu</button>
                </div>
            </Form>
        </div>
    </div>
    <p class="text-center mt-4" v-if="!userRegistrationData._id" >Bạn đã có tài khoản? <router-link :to="{name: 'login'}">Đăng nhập</router-link></p>
</template>

<script>
import * as yup from "yup";
import {Form, Field, ErrorMessage} from "vee-validate";
import { useUserStore } from "@/store/user.store";
export default{
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    props: {
        userData: {type: Object, default: {role: "user"}},
    },
    emits: ["submit:register","submit:login","submit:email","submit:password"],
    data(){
        const registerFormSchema = yup.object().shape({
            hoten: yup  
                .string()
                .required("Tên phải có giá trị")
                .min(2, "Tên phải có ít nhất 2 kí tự")
                .max(50, "Tên phải có nhiều nhất 50 ký tự"),
            email: yup
                .string()
                .required("E-mail phải có giá trị")
                .email("E-mail không đúng")
                .max(50, "E-mail tối đa 50 ký tự"),
            ngaysinh: yup
                .date()
                .required('Vui lòng chọn ngày')
                .typeError('Ngày không hợp lệ'),
            gioitinh: yup
                .string()
                .required("Vui lòng chọn giới tính"),
            sodienthoai: yup
                .string()
                .required("Số điện thoại phải có giá trị")
                .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, "Số điện thoại không hợp lệ."),
            diachi: yup
                .string()
                .required("Vui lòng nhập địa chỉ")
                .min(5, "Địa chỉ tối thiểu 5 ký tự")
                .max(100, "Địa chỉ nhập tối đa 100 ký tự"),
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
            userRegistrationData: this.userData,
            registerFormSchema,
        }
    },
    methods: {
        submit(){
            // console.log(this.userRegistrationData);
            this.$emit("submit:register", this.userRegistrationData);
        }
    },
    mounted(){
        console.log(this.userData);
    }
}
</script>