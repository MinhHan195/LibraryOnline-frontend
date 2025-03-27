<template>
    <BookForm :bookData="book" @submit="updateBook" @delete="deleteBook" />
</template>

<script>
import BookForm from '@/components/BookForm.vue';
import { useBookStore } from '@/store/book.store';
export default{
    created(){
        this.bookStore = useBookStore();
        this.book = this.bookStore.findById(this.$route.params.id);
    },
    components: {
        BookForm,
    },
    methods: {
        async updateBook(data){
            try {
                let formData = new FormData();
                for(let key in data){
                    formData.append(key, data[key]);
                }
                this.bookStore = useBookStore();
                const result = await this.bookStore.updateBook(formData);
                alert(result);
                if(result === "Cập nhật thành công"){
                    this.$router.push({name: "listbook"});
                }
            } catch (error) {
                console.log(error)
            }
        },

        async deleteBook(id){
            try {
                const confirm = window.confirm("Bạn có muốn xóa sách?")
                if(confirm){
                    const result = await this.bookStore.deleteBook(id);
                    alert(result);
                    if(result === "Xóa thành công"){
                        this.$router.push({name: "listbook"});
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
    },
}
</script>   