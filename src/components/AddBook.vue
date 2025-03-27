<template>
  <BookForm :bookData="{}" @submit="createBook" />
</template>

<script>
import BookForm from "@/components/BookForm.vue";
import { useBookStore } from "@/store/book.store";

export default {
  components: {
    BookForm,
  },
  methods: {
    async createBook(data){
        try {
          let formData = new FormData();
          for(let key in data){
            formData.append(key, data[key]);
          }
          this.bookStore = useBookStore();
          const result = await this.bookStore.create(formData);
          alert(result);
          if(result==="Thêm sách thành công"){
            this.$router.push({name: "listbook"});
          }
        } catch (error) {
          console.log(error);
        }
    }
  },
};
</script>
