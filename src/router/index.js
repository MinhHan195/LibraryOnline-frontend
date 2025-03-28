import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path:"/auth",
        component: () => import("@/views/Auth.vue"),
        children: [
            {
                path:"/register",
                name:"register",
                component: () => import("@/components/RegisterForm.vue"),
            },
            {
                path:"/login",
                name:"login",
                component: () => import("@/components/LogInForm.vue"),
            },
            {
                path:"/forgotpassword",
                name:"forgotpassword",
                component: () => import("@/components/ForgotPasswordForm.vue"),
            },
            {
                path:"/noitification",
                name:"noitification",
                component: () => import("@/components/NotificationSendRequest.vue"),
            },
            {
                path:"/resetpassword",
                name:"resetpassword",
                component: () => import("@/components/ChangePasswordForm.vue"),
            },
        ]
    },
    {
        path:"/admin",
        name: "admin",
        component: () => import("@/views/Admin.vue"),
        children: [
            {
                path: "/admin/addbook",
                name: "addbook",
                component: () => import("@/components/AddBook.vue")
            },
            {
                path: "/admin/listbook",
                name: "listbook",
                component: () => import("@/components/ListBookManager.vue")
            },
            {
                path: "/admin/edit/:id",
                name: "edit",
                component: () => import("@/components/EditBook.vue")
            },
            {
                path: "/admin/bookborrow",
                name: "bookborrow",
                component: () => import("@/components/BookBorrowManager.vue")
            },
            {
                path: "/admin/users",
                name: "users",
                component: () => import("@/components/UsersManager.vue")
            }
        ]
    },
    {
        path: "/user",
        name: "user",
        component: () => import("@/views/User.vue"),
        children: [
            {
                path: "/user/information",
                name: "userinf",
                component: () => import("@/components/UserInf.vue")
            },
            {
                path: "/user/history",
                name: "history",
                component: () => import("@/components/History.vue")
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;