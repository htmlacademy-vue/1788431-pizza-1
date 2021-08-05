<template>
  <div>
    <Header></Header>
    <main class="layout">
      <div class="layout__sidebar sidebar">
        <div style="height: 90px"></div>

        <a class="layout__link layout__link--active" href="/orders"
          >История заказов</a
        >
        <a class="layout__link" href="/user-data">Мои данные</a>
      </div>

      <div class="layout__content">
        <slot />
      </div>
    </main>
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  name: "AppLayoutUser",
  components: {
    Header,
  },
};
</script>
