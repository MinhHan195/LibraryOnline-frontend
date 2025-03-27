<template>
    <div class="m-3 ms-4 rounded-3 overflow-hidden" >
        <table class="table table-striped ">
        <thead>
            <tr class="text-center">
                <th scope="col">Mã đọc giả</th>
                <th scope="col">Họ tên</th>
                <th scope="col">Email</th>
                <th scope="col">Ngày sinh</th>
                <th scope="col">Giới tính</th>
                <th scope="col">Địa chỉ</th>
                <th scope="col">Số điện thoại</th>
                <th scope="col">Xóa</th>
            </tr>
        </thead>
        <tbody class="table-group-divider">
            <tr class="text-center"
            v-for="(user, index) in userStore.listUsers"
            :key="user._id"
            >
                <td>{{ user._id }}</td>
                <td>{{ user.hoten }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.ngaysinh }}</td>
                <td>{{ user.gioitinh }}</td>
                <td>{{ user.diachi }}</td>
                <td>{{ user.sodienthoai }}</td>
                <td>
                    <div>
                        <i class="fa-solid fa-trash fa-xl" style="color: #ff0000;" @click="deleteUser(user._id, user.hoten)"></i>
                    </div>
                </td>
            </tr>
        </tbody>
        </table>
    </div>
</template>

<script>
import { useUserStore } from '@/store/user.store';
export default{
    created(){
        this.userStore = useUserStore();
        this.userStore.fetchListUsers();
    },
    methods: {
        async deleteUser(id, name){
            const confirm = window.confirm(`Bạn có muốn xóa user ${name} (id: ${id})?`);
            if(confirm){
                const result = await this.userStore.deleteUser(id);
                alert(result);
            }
        }
    }
}
</script>