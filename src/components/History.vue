<template>
    <div class="container">
        <div class="m-3 ms-4 rounded-3 overflow-hidden" >
            <table class="table table-striped ">
            <thead>
                <tr class="text-center">
                    <th scope="col">Hình bìa</th>
                    <th scope="col">Tên sách</th>
                    <th scope="col">Ngày mượn</th>
                    <th scope="col">Ngày trả</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Xóa</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr class="text-center"
                    v-for="(order, index) in orderStore.ordersUser"
                    :key="order._id"
                    >
                    <td>
                        <div style="height: 100px; width: auto;">
                            <img :src="order.imageUrl" alt="" style="height: 100%;">
                        </div>
                    </td>
                    <td class="fw-bold">{{ order.tensach }}</td>
                    <td>{{ order.ngaymuon }}</td>
                    <td>{{ order.ngaytra }}</td>
                    <td>{{ order.trangthai }}</td>
                    <td>
                        <div>
                            <i class="fa-solid fa-trash fa-xl" style="color: #ff0000;" @click="deleteOrder(order._id, order.tensach)"></i>
                        </div>
                    </td>
                </tr>
            </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { useOrderStore } from '@/store/order.store';
import { useUserStore } from '@/store/user.store';
export default{
    created(){
        this.userStore = useUserStore();
        this.orderStore = useOrderStore();
        this.orderStore.fetchOrdersByUserId(this.userStore.user._id);
        // console.log(this.orderStore.ordersUser);
    },
    methods: {
        async deleteOrder(id, name){
            const confirm = window.confirm(`Bạn muốn xóa đơn đăng ký mượn sách "${name}"?`)
            if(confirm){
                const result = await this.orderStore.deleteOrder(id);
                alert(result);
                this.$router.push({name: "history"})
            }
        }
    }
}
</script>