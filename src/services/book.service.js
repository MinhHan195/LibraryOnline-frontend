import createApiClient from "./api.service";

class BookService{
    constructor(baseURL = "/api/books") {
        this.api = createApiClient(baseURL);
    }

    async create(data){
        document.body.style.cursor = "wait";
        try{
            return (await this.api.post("/",data)).data;
        }finally{
            document.body.style.cursor = "default";
        }
    }

    async getAll(){
        document.body.style.cursor = "wait";
        try{
            return (await this.api.get("/")).data;
        }finally{
            document.body.style.cursor = "default";
        }
    }

    async update(data){
        document.body.style.cursor = "wait";
        try{
            return (await this.api.post("/edit", data)).data;
        }finally{
            document.body.style.cursor = "default";
        }
    }

    async deleteBook(id){
        document.body.style.cursor = "wait";
        try{
            return (await this.api.delete(`/delete/${id}`)).data;
        }finally{
            document.body.style.cursor = "default";
        }
    }
}

export default new BookService();   