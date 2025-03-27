import { defineStore } from "pinia";
import BookService from "@/services/book.service";

export const useBookStore = defineStore("book",{
    state: () => {
        return {
            books: []
        }
    },
    actions: {
        async create(data){
            try {
                const result = await BookService.create(data);
                if(result.document){
                    this.books.push(result.document);
                }
                return result.message;
            } catch (error) {
                console.log("Error create book: ",error);
            }
        },
        async fetchBookData() {
            try {
                this.books = await BookService.getAll();
            } catch (error) {
                console.log("Error get books data: ",error);
            }
        },
        findById(id){
            return this.books.find(book => book._id === id);
        },

        async updateBook(data) {
            try {
                const result = await BookService.update(data);
                if(result.message === "Cập nhật thành công"){
                    this.books.forEach(book => {
                    if(book._id === result.document._id){
                        book = result.document
                    }
                    })
                }
                return result.message;
            } catch (error) {
                console.log("Có lỗi trong khi cập nhật thông tin sách")
            }
        },
        
        async deleteBook(id){
            try {
                const resutl = await BookService.deleteBook(id);
                if(resutl.message === "Xóa thành công"){
                    for(let item in this.books){
                        if(item._id == id){
                            const index = this.books.indexOf(item);
                            this.books.splice(index,1);
                        }
                    }
                }
                return resutl.message;
            } catch (error) {
                console.log("Có lỗi trong khi xóa sách")
            }
        }
    },
    persist: {
        storage: sessionStorage
    }
})