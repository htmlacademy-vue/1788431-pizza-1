<template>
  <div
    id="app"
    class="app"
  >
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
@import "./assets/scss/scaffolding.scss";

.app {
  min-height: 100vh;

  > div {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
}
</style>
