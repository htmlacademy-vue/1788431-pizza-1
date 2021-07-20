<template>
  <div class="app-layout">
    <AppLayoutHeader />
    <div class="content">
      <AppLayoutMainSidebar />
      <IndexHome />
    </div>
  </div>
</template>

<script>
import AppLayoutMainSidebar from "@/layouts/AppLayoutMainSidebar";
import AppLayoutHeader from "@/layouts/AppLayoutHeader";
import IndexHome from "@/views/Index.vue";

export default {
  name: "AppLayout",
  components: {
    AppLayoutMainSidebar,
    AppLayoutHeader,
    IndexHome,
  },
};
</script>
