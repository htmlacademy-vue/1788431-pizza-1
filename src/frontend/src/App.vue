<template>
  <div id="app">
    <AppLayout></AppLayout>

    <Index></Index>
  </div>
</template>

<script>
import Index from "@/views/Index.vue";
import AppLayout from "@/layouts/AppLayout.vue";

export default {
  name: "App",
  components: { Index, AppLayout },
};
</script>

<style lang="scss">
@import "./assets/scss/app.scss";
</style>
