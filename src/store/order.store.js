import { defineStore } from "pinia";
import OrderService from "@/services/order.service";

export const useOrderStore = defineStore("order",{
    state: () => {
        return {
            orders: []
        }
    },
    actions: {
        async createOrder(id){
            try {
                const result = await OrderService.createOrder(id);
                return result.message;
            } catch (error) {
                console.log("Error create orders data: ",error);
            }  
        },
        async fetchOrderData() {
            try {
                this.orders = await OrderService.getOrder();
            } catch (error) {
                console.log("Error get orders data: ",error);
            }
        },

        async switchState(id, state) {
            try {
                const result = await OrderService.changeStatus(id, state);
                if(result.message==="Duyệt thành công"){
                    let newState ;
                    if(state==="notApprove"){
                        newState = "Không duyệt"
                    }
                    else if(state==="approve"){
                        newState = "Đã mượn"
                    }
                    else if(state==="giveBack"){
                        newState = "Đã trả"
                    }else if (state==="Overdue"){
                        newState = "Quá hạn"
                    }
                    this.orders.forEach((order) => {
                        if(order._id === id){
                            order.trangthai = newState;
                        }
                    });
                }
                return result.message;
                
            } catch (error) {
                console.log("Error change status data: ",error);
            }
        }
    },
    persist: {
        storage: sessionStorage
    }
}) 