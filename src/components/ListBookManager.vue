<template>
    <div class="m-3 ms-4 rounded-3 overflow-hidden" >
        <table class="table table-striped ">
        <thead>
            <tr class="text-center">
                <th scope="col">Ảnh bìa</th>
                <th scope="col">Tên sách</th>
                <th scope="col">Tác giả</th>
                <th scope="col">Đơn giá</th>
                <th scope="col">Số quyển</th>
                <th scope="col">Năm xuất bản</th>
                <th scope="col">Nhà xuất bản</th>
                <th scope="col">Mô tả</th>
                <th scope="col">Ngày thêm vào</th>
                <th scope="col">Chỉnh sửa</th>
            </tr>
        </thead>
        <tbody class="table-group-divider">
            <tr class="text-center"
            v-for="(book, index) in bookStore.books"
            :key="book._id"
            >
                <td>
                    <div style="height: 100px; width: auto;">
                        <img :src="book.imageUrl" alt="" style="height: 100%;">
                    </div>
                </td>
                <td class="fw-bold" style="width: 150px;">{{ book.tensach }}</td>
                <td>{{ book.tacgia }}</td>
                <td>{{ book.dongia }}</td>
                <td>{{ book.soquyen }}</td>
                <td>{{ book.namxuatban }}</td>
                <td style="width: 100px;">{{ book.nhaxuatban }}</td>
                <td style="width: 270px;">{{ book.motasach }}</td>
                <td style="width: 100px;">{{ book.dateTimeCreate }}</td>
                <td>
                    <div class="btn" @click="edit(book._id)">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </div>
                </td>
            </tr>
        </tbody>
        </table>
    </div>
</template> 

<style scoped>
.btn:hover{
    color: #ff9800;
}
</style>


<script>
import { useBookStore } from '@/store/book.store';
export default {
    created(){
        this.bookStore = useBookStore();
        this.bookStore.fetchBookData();
    },
    methods: {
        edit(id){
            this.$router.push({name: "edit", params: { id: id }});
        }
    }
}
</script>