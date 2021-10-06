<template>
  <header class="header">
    <div class="header__logo">
      <router-link to="/" class="logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link to="/cart">{{ totalPrice }} ₽</router-link>
    </div>
    <div class="header__user">
      <router-link v-if="!isAuthenticated" to="/sign-in" class="header__login"
        ><span>Войти</span></router-link
      >
      <template v-if="isAuthenticated">
        <router-link to="/user-data">
          <picture>
            <img :src="user.avatar" :alt="user.name" width="32" height="32" />
          </picture>
          <span>{{ user.name }}</span>
        </router-link>
        <a @click="onLogoutClick" class="header__logout"><span>Выйти</span></a>
      </template>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";

export default {
  name: "Header",
  computed: {
    ...mapGetters("Cart", ["totalPrice"]),
    ...mapState("Auth", {
      isAuthenticated: (state) => state.isAuthenticated,
      user: (state) => state.user,
    }),
  },
  methods: {
    ...mapActions("Auth", ["logout"]),
    async onLogoutClick() {
      await this.logout();
      await this.$router.push("/sign-in");
    },
  },
};
</script>
