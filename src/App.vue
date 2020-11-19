<template>
  <div class="app">
    <AppHeader></AppHeader>
    <router-view></router-view>
  </div>
</template>

<script>
import AppHeader from "@/views/AppHeader.vue";

export default {
  components: {
    AppHeader
  }
};
</script>

<style>
@import "../src/css/common.css";
@import "../src/css/reset.css";
</style>
