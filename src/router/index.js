import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Register from "@/views/Register.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: Register,
    },
    // {
    //     path:"/register",
    //     name:"register",
    //     component: Register,
    // }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;