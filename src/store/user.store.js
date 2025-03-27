import { defineStore } from "pinia";
import AuthService from "@/services/auth.service";

export const useUserStore = defineStore("user",{
    state: () => {
        return {
            user: {},
            isLogged: false
        }
    },
    actions: {
        async fetchUserData() {
            try {
                this.user = await AuthService.getUser();
                this.isLogged = true;
            } catch (error) {
                console.log("Error get user data: ",error);
            }
        },
    },
    persist: {
        storage: sessionStorage
    }
})