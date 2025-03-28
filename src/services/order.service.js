import createApiClient from "./api.service";

class OrderService{
    constructor(baseURL = "/api/orders") {
        this.api = createApiClient(baseURL);
    }

    async createOrder(id) {
        document.body.style.cursor = "wait";
        try{
            return (await this.api.get(`/create/${id}`)).data;
        }finally{
            document.body.style.cursor = "default";
        }
    }

    async getOrder() {
        document.body.style.cursor = "wait";
        try{
            return (await this.api.get("/")).data;
        }finally{
            document.body.style.cursor = "default";
        }
    }
    async changeStatus(id, state){
        document.body.style.cursor = "wait";
        try{
            return (await this.api.get(`/state/${state}/${id}`)).data;
        }finally{
            document.body.style.cursor = "default";
        }
    }

    async fetchOrdersByUserId(userId){
        document.body.style.cursor = "wait";
        try{
            return (await this.api.get(`/${userId}`)).data;
        }finally{
            document.body.style.cursor = "default";
        }
    }

    async deleteOrder(id){
        document.body.style.cursor = "wait";
        try{
            return (await this.api.delete(`/${id}`)).data;
        }finally{
            document.body.style.cursor = "default";
        }
    }
}

export default new OrderService()