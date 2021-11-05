<template>
  <transition name="slide" mode="out-in">
    <component :is="layout">
      <slot />
    </component>
  </transition>
</template>

<script>
import Thanx from "@/views/Thanx";
const defaultLayout = "AppLayoutMain";

export default {
  name: "AppLayout",
  components: { Thanx },
  computed: {
    layout() {
      const layout = this.$route.meta.layout || defaultLayout;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>

<style scoped lang="scss">
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s;
}
.slide-enter {
  opacity: 0;
  margin-left: 200px;
}
.slide-enter-to {
  opacity: 1;
  margin-left: 0;
}
.slide-leave-to {
  opacity: 0;
  margin-left: -200px;
}
</style>
