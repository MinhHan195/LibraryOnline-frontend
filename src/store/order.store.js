import { defineStore } from "pinia";
import OrderService from "@/services/order.service";

export const useOrderStore = defineStore("order",{
    state: () => {
        return {
            orders: [],
            ordersUser: []
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
        },

        async fetchOrdersByUserId(userId){
            try {
                this.ordersUser = await OrderService.fetchOrdersByUserId(userId);
            } catch (error) {
                console.log("Error get user's orders data: ",error);
            }
        },
        async deleteOrder(id){
            try {
                const result = await OrderService.deleteOrder(id);
                if(result.message === "Xóa thành công"){
                    for(let item in this.ordersUser){
                        if(item._id === id){
                            console.log(item)
                            const index = this.ordersUser.indexOf(item);
                            this.ordersUser.splice(index,1);
                        }   
                    }
                }
                return result.message;
            } catch (error) {
                console.log("Error delete orders data: ",error);
            }
        }
    },
    persist: {
        storage: sessionStorage
    }
}) 