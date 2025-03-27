<template>
    <div>
        <AppHeader />
    </div>
    <div class="container" style="min-height: 130px;">
        <div class="row my-5">
            <div class="col-4 px-4 my-4"
            v-for="(book, index) in bookStore.books"
            :key="book._id"
            >
                <BookCard :book="book" @registerOrder="createOrder"/>
            </div>
        </div>
    </div>
    <div>
        <AppFooter/>
    </div>
</template>

<script>
import AppHeader from"@/components/AppHeader.vue";
import AppFooter from"@/components/AppFooter.vue";
import BookCard from "@/components/BookCard.vue";
import { useUserStore } from "@/store/user.store";
import { useBookStore } from "@/store/book.store";
import { useOrderStore } from "@/store/order.store";
export default{
    created(){
        this.userStore = useUserStore();
        this.bookStore = useBookStore();
        this.orderStore = useOrderStore();
        this.bookStore.fetchBookData()
    },
    components:{
        AppHeader,
        AppFooter,
        BookCard,
    },
    methods:{
        async createOrder(id){
            const result = await this.orderStore.createOrder(id);
            alert(result);
        }
    }
}
</script>