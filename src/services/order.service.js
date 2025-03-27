import createApiClient from "./api.service";

class OrderService{
    constructor(baseURL = "/api/orders") {
        this.api = createApiClient(baseURL);
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
}

export default new OrderService()