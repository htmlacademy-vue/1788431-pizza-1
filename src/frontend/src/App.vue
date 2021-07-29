<template>
  <div id="app">
    <AppLayout></AppLayout>

    <router-view />
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout.vue";

export default {
  name: "App",
  components: { AppLayout },
};
</script>

<style lang="scss">
@import "./assets/scss/app.scss";
</style>
