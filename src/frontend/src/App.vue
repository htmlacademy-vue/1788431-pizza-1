<template>
  <div id="app">
    <AppLayout>
      <router-view />
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout.vue";
import { setAuth } from "@/common/helpers";

export default {
  name: "App",
  components: { AppLayout },
  created() {
    if (this.$jwt.getToken()) {
      setAuth(this.$store);
    }
  },
};
</script>

<style lang="scss">
@import "./assets/scss/app.scss";
</style>
