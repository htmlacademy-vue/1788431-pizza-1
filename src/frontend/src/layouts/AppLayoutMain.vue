<template>
  <div>
    <AppNotifications />
    <Header />
    <slot />
    <transition name="popup">
      <Thanx
        v-if="showThanx"
        data-test="layout-thanx"
      />
    </transition>
  </div>
</template>

<script>
import Header from "@/components/HeaderComponent";
import Thanx from "@/views/ThanxView";
import { mapState } from "vuex";

export default {
  name: "AppLayoutMain",
  components: {
    Thanx,
    Header,
  },

  computed: {
    ...mapState("App", {
      showThanx: (state) => state.showThanx,
    }),
  },
};
</script>

<style lang="scss" scoped>
.popup {
  transition: all 0.5s;
}
.popup-enter-to,
.popup-leave {
  margin-top: 0;
}
.popup-enter,
.popup-leave-to {
  margin-top: -150vh;
}
</style>
