<style scoped>
.form-custom{
    width: 100%;
    background: transparent;
    border: none; 
    border-bottom: 1px solid black; 
    border-radius: 0%;
    outline: none;
}
.error-feedback{
    color: red;
}
.lable-custom{
  position: absolute;
  top: 0px;
  left: 0;
  transition: ease-in-out 0.5s;
}

.form-custom:focus~.lable-custom,
.form-custom:valid~.lable-custom{
  position: absolute;
  top: -25px;
  left: 0;
  transition: ease-in-out 0.5s;
}
.area{
  /* background-color: rgba(0, 0, 0, 0.17); */
  border: 1px solid black; 
}
.btn-custom{
  width: 100%;
  color: white;
  border: 0;
  background-color: rgb(30, 0, 255);
} 
.btn-custom:hover{
  width: 100%;
  border: 1px solid rgb(30, 0, 255);
  color: rgb(30, 0, 255);
}
</style>

<template>
    <div class="container">
    <div class="row">
        <div class="col-6 px-5 py-4" style="height: 92vh;">
            <div class="d-flex justify-content-center align-items-center" style="width: 100%; height: 100%; background-color: transparent; overflow: hidden;">
                <img v-if="imagUrlPreview" :src="imagUrlPreview" alt="" style="height: 100%;">
                <div v-else class="border border-dark border-5 d-flex justify-content-center align-items-center bg-white" style="width: 90%; height: 90%;">
                    <p class="fs-2"><i class="fa-solid fa-image fa-2xl"></i></p>
                </div>
            </div>
        </div>
      <div class="col-6 px-5 d-flex justify-content-center align-items-center rounded-2" style="max-height: 92vh;">
        <div class="rounded-3" style="width: 100%; max-height: 100%; overflow-y: auto;">
            <Form @submit="submit" :validation-schema="bookInFormSchema" style="max-height: 100%;">
                <div class="py-5 px-4 bg-white rounded-3" style="width: 100%;">
                    <h2  class="text-center fw-bold mb-4">THÔNG TIN SÁCH</h2  class="text-center fw-bold">
                    <Field type="hidden" name="imageUrl" v-model="formData.imageUrl"/>
                    <Field type="hidden" name="imagePublicId" v-model="formData.imagePublicId"/>
                    <Field type="hidden" name="_id" v-model="formData._id"/>
                    <Field type="hidden" name="imagePublicId" v-model="formData.imagePublicId"/>
                    <div class="form-group mb-5" style="position: relative !important;">
                        <Field type="file" name="image" id="image" accept="image/*" style="width: 100%;" required v-model="formData.image"/>
                        <ErrorMessage name="image" class="error-feedback" />
                    </div>
                    <div class="form-group mb-5" style="position: relative !important;">
                        <Field name="tensach" id="tensach" type="text" class="form-custom" required v-model="formData.tensach"/>
                        <ErrorMessage name="tensach" class="error-feedback" />
                        <label for="tensach" class="fw-bold lable-custom">Tên sách</label>
                    </div>
                    <div class="form-group mb-5" style="position: relative !important;">
                        <Field name="dongia" id="dongia" type="number" class="form-custom" required v-model="formData.dongia"/>
                        <ErrorMessage name="dongia" class="error-feedback" />
                        <label for="dongia" class="fw-bold lable-custom">Đơn giá</label>
                    </div>
                    <div class="form-group mb-5" style="position: relative !important;">
                        <Field name="soquyen" id="soquyen" type="number" class="form-custom" required v-model="formData.soquyen"/>
                        <ErrorMessage name="soquyen" class="error-feedback" />
                        <label for="soquyen" class="fw-bold lable-custom">Số quyển</label>
                    </div>
                    <div class="form-group mb-5" style="position: relative !important;">
                        <Field name="namxuatban" id="namxuatban" type="number" class="form-custom" required v-model="formData.namxuatban"/>
                        <ErrorMessage name="namxuatban" class="error-feedback" />
                        <label for="namxuatban" class="fw-bold lable-custom">Năm suất bản</label>
                    </div>
                    <div class="form-group mb-5" style="position: relative !important;">
                        <Field name="nhaxuatban" id="nhaxuatban" type="text" class="form-custom" required v-model="formData.nhaxuatban"/>
                        <ErrorMessage name="nhaxuatban" class="error-feedback" />
                        <label for="nhaxuatban" class="fw-bold lable-custom">Nhà xuất bản</label>
                    </div>
                    <div class="form-group mb-5" style="position: relative !important;">
                        <Field name="tacgia" id="tacgia" type="text" class="form-custom" required v-model="formData.tacgia"/>
                        <ErrorMessage name="tacgia" class="error-feedback" />
                        <label for="tacgia" class="fw-bold lable-custom">Tác giả</label>
                    </div>
                    <div class="form-group mb-5" style="position: relative !important;">
                        <label for="motasach" class="fw-bold ">Mô tả nội dung sách</label>
                        <Field name="motasach" id="motasach" type="textarea" as="textarea" class="form-custom area" rows="5" required v-model="formData.motasach"/>
                        <ErrorMessage name="motasach" class="error-feedback" />
                    </div>
                    <div class="form-group">
                        <button class="btn btn-custom">Lưu</button>
                        <div v-if="!isEmpty" class="d-flex mt-4">
                            <button type="button" class="ml-2 btn btn-danger flex-fill me-2" @click="deleteBook(formData._id)">Xóa</button>
                            <button type="button" class="ml-2 btn btn-danger flex-fill ms-2 " @click="cancel">Thoát</button>
                        </div>
                        
                    </div>
                </div>
            </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as yup from "yup";
import {Form, Field, ErrorMessage} from "vee-validate";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    props: {
        bookData: {type: Object, default: {}},
    },
    data() {
        const bookInFormSchema = yup.object().shape({
        tensach: yup
            .string()
            .max(50, "Tên sách quá 50 ký tự")
            .required("Tên sách không được trống")
            .min(3, "Tên sách phải ít nhất 3 ký tự"),
        dongia: yup
            .number()
            .required('Vui lòng nhập đơn giá')
            .integer('Phải là số nguyên')
            .positive('Phải là số dương')
            .min(0, 'Đơn giá phải từ 0 trở lên'),
        soquyen: yup
            .number()
            .required('Vui lòng nhập số quyển')
            .integer('Phải là số nguyên')
            .positive('Phải là số dương')
            .min(0, 'Số quyển phải từ 0 trở lên'),
        namxuatban: yup
            .number()
            .required('Vui lòng nhập năm xuất bản')
            .integer('Phải là số nguyên')
            .positive('Phải là số dương')
            .min(1960, 'Năm phải từ 1960 trở lên'),
        nhaxuatban: yup
            .string()
            .required("Tên NXB không được trống")
            .min(3, "Tên NXB ít nhất 3 ký tự")
            .max(50, "Tên NXB tối đa 50 ký tự"),
        tacgia: yup
            .string()
            .required("Tên tác giả không được trống")
            .min(3, "Tên tác giả ít nhất 3 ký tự")
            .max(50, "Tên tác giả tối đa 50 ký tự"),
        motasach: yup   
            .string()
            .required("Hãy mô tả về sách")
            .max(100, "Mô tả tối đa 100 ký tự"),
        image: yup
            .mixed().nullable().when('imageUrl',{
                is: (value) => {
                    if(value){
                        return true;
                    }
                    return false;
                },
                then: (schema) => schema.notRequired(),
                otherwise: (schema) => schema   
                    .required('Vui lòng tải ảnh bìa của sách')
                    .test('fileType', 'Chỉ chấp nhận định dạng file hình ảnh', (value) => {
                        return value && Array.from(value).every((file) =>
                        ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)
                    );
                }),
            }),
            
        })
        return {
        formData: this.bookData,
        bookInFormSchema,
        imagUrlPreview: this.bookData.imageUrl,
        };
    },
    emits: ["submit", "delete"],
    watch:{
        "formData.image": function (newValue, oldValue){
            if(newValue instanceof File ){
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.imagUrlPreview = e.target.result;
                };
                reader.readAsDataURL(newValue);
            }
        }
    },
    computed: {
        isEmpty(){
            return Object.keys(this.bookData).length === 0;
        }
    },
    methods: {
        submit(){
            this.$emit("submit", this.formData);
        },
        deleteBook(id){
            this.$emit("delete", id);
        },
        cancel() {
            const reply = window.confirm('Bạn chưa lưu thay đổi! Bạn có muốn rời đi?')
            if (!reply) {
                return false
            }
            else this.$router.push({name: "listbook"});  
        }
    },
}


</script>