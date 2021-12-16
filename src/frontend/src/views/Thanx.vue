<template>
  <div class="popup">
    <a class="close" @click="close" data-test="thanx-close">
      <span class="visually-hidden">Закрыть попап</span>
    </a>
    <div class="popup__title">
      <h2 class="title">Спасибо за заказ</h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button">
      <a class="button" @click="close" data-test="thanx-ok">Отлично, я жду!</a>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Thanx",
  computed: {
    ...mapState("Auth", {
      isAuthenticated: (state) => state.isAuthenticated,
    }),
  },
  methods: {
    ...mapActions("App", ["hideThanx"]),
    async close() {
      this.hideThanx();
      if (this.isAuthenticated) {
        await this.$router.push({ name: "Orders" });
      } else {
        await this.$router.push({ name: "Builder" });
      }
    },
  },
};
</script>

<style scoped></style>
