import createApiClient from "./api.service";

class AuthService {
    constructor(baseURL = "/api/accounts") {
        this.api = createApiClient(baseURL);
    }

    async create(data) {
        return (await this.api.post("/",data)).data;
    }
}

export default new AuthService();       