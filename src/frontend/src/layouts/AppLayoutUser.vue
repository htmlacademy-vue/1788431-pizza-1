<template>
  <div>
    <AppNotifications />
    <Header />
    <main class="layout">
      <div class="layout__sidebar sidebar">
        <router-link
          to="/"
          class="logo layout__logo"
        >
          <img
            src="@/assets/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </router-link>

        <router-link
          to="/orders"
          class="layout__link"
        >
          История заказов
        </router-link>
        <router-link
          to="/profile"
          class="layout__link"
        >
          Мои данные
        </router-link>
      </div>

      <div class="layout__content">
        <slot />
      </div>
    </main>
  </div>
</template>

<script>
import Header from "@/components/HeaderComponent";

export default {
  name: "AppLayoutUser",
  components: {
    Header,
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/logo.scss";

.router-link-active {
  background-color: rgba(65, 182, 25, 0.1);
}
</style>
