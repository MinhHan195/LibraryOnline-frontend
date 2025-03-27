import createApiClient from "./api.service";

class AuthService {
    constructor(baseURL = "/api/accounts") {
        this.api = createApiClient(baseURL);
    }

    async create(data) {
        document.body.style.cursor = "wait";
        try{
            return (await this.api.post("/",data)).data;
        }finally{
            document.body.style.cursor = "default";
        }
    }

    async logIn(data) {
        document.body.style.cursor = "wait";
        try{
            return (await this.api.post("/login",data)).data;
        }finally{
            document.body.style.cursor = "default";
        }
    }

    async sendRequest(data){
        document.body.style.cursor = "wait";
        try{
            return (await this.api.post("/reset/reset_request",data)).data;
        }finally{
            document.body.style.cursor = "default";
        }
    }

    async resetPassword(data){
        document.body.style.cursor = "wait";
        try{
            return (await this.api.post("/reset/password",data)).data;
        }finally{
            document.body.style.cursor = "default";
        }
    }

    async activeAccount(token, id){
        document.body.style.cursor = "wait";
        try{
            return (await this.api.get("/verify?token="+token+"&id="+id)).data.finaly();
        }finally{
            document.body.style.cursor = "default";
        }
    }

    async getUser(){
        document.body.style.cursor = "wait";
        try{
            return (await this.api.get("/login")).data;
        }finally{
            document.body.style.cursor = "default";
        }
    }

    async getListUser(){
        document.body.style.cursor = "wait";
        try{
            return (await this.api.get("/")).data;
        }finally{
            document.body.style.cursor = "default";
        }
    }

    async deleteUser(id){
        document.body.style.cursor = "wait";
        try{
            return (await this.api.delete(`/${id}`)).data;
        }finally{
            document.body.style.cursor = "default";
        }
    }

}

export default new AuthService();       