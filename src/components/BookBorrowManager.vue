<template>
    <div class="m-3 ms-4 rounded-3 overflow-hidden" >
        <table class="table table-striped ">
        <thead>
            <tr class="text-center">
                <th scope="col">Mã đọc giả</th>
                <th scope="col">Mã sách</th>
                <th scope="col">Ngày mượn</th>
                <th scope="col">Ngày trả</th>
                <th scope="col">Trạng thái</th>
                <th scope="col">Duyệt</th>
            </tr>
        </thead>
        <tbody class="table-group-divider">
            <tr class="text-center"
                v-for="(order, index) in orderStore.orders"
                :key="order._id"
                >
                <td>{{ order.madocgia }}</td>
                <td>{{ order.masach }}</td>
                <td>{{ order.ngaymuon }}</td>
                <td>{{ order.ngaytra }}</td>
                <td>{{ order.trangthai }}</td>
                <td>
                    <div class="d-flex justify-content-center">
                        <div class="btn ">
                            <i class="fa-solid fa-square-check fa-xl" style="color: #04e600;" @click="switchState(order._id, 'approve')"></i>
                        </div>
                        <div class="btn ">
                            <i class="fa-solid fa-square-xmark fa-xl" style="color: #ff0000;" @click="switchState(order._id, 'notApprove')"></i>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center">
                        <div class="btn">
                            <i class="fa-solid fa-window-restore fa-xl" style="color: #005eff;" @click="switchState(order._id, 'giveBack')"></i>
                        </div>
                        <div class="btn">
                            <i class="fa-solid fa-clock fa-xl" style="color: #ff0000;" @click="switchState(order._id, 'Overdue')"></i>
                        </div>
                    </div>
                </td>
            </tr>
        </tbody>
        </table>
    </div>
</template>

<script>
import { useOrderStore } from '@/store/order.store';
export default{
    created(){
        this.orderStore = useOrderStore();
        this.orderStore.fetchOrderData();
    },
    methods: {
        async switchState(id, state){
            const reslt = await this.orderStore.switchState(id, state);
            alert(reslt);
        }
    }
}
</script>