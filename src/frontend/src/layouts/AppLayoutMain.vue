<template>
  <div>
    <Header></Header>
    <slot />
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  name: "AppLayoutMain",
  components: {
    Header,
  },
};
</script>
