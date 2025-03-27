<script>
export default {
    props: {
        modelValue: {type: String, default: ""},
    },
    emits: ["submit", "update:modelValue"],
    methods: {
        updateModelValue(e) {
            this.$emit("update:modelValue", e.target.value);
        },
        submit() {
            this.$emit("submit");
        },
    },
};
</script>

<template>
    <div class="input-group">
        <div class="input-group-append me-2">
            <button 
            class="btn btn-custom" 
            type="button" 
            @click="submit">
                <i class="fas fa-search" style="color: white;"></i>
            </button>
        </div>
        <input 
        type="text" 
        class="form-control rounded-2" 
        placeholder="Tìm kiếm quyển sách yêu thích của bạn" 
        :value="modelValue" 
        @input="updateModelValue" 
        @keyup.enter="submit"
        /> 
    </div>
</template>

<style scoped>
.btn-custom{
    background-color: #ff9800;
}
</style>