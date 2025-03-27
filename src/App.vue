<script>
import AppHeader from './components/AppHeader.vue';
export default{
  components: {
    AppHeader,
  }
}
</script>

<template>
  <div id="app">
    <div>
      <router-view />
    </div>
  </div>
</template>

<style>
.page {
  margin: 0;
  padding: 0;
}
</style>
