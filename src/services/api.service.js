import axios from "axios";

export default (baseURL) => {
    const instance = axios.create({
        baseURL,
        withCredentials: true
    });

    instance.interceptors.request.use((config)=> {
        if(config.data instanceof FormData) {
            delete config.headers["Content-Type"];
        } else {
            config.headers["Content-Type"] = "application/json"
            config.headers["Accept"] = "application/json";
        }
        return config;
    });

    return instance;
};