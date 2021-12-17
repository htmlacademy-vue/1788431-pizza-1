<template>
  <div class="popup">
    <a
      class="close"
      data-test="thanx-close"
      @click="close"
    >
      <span class="visually-hidden">Закрыть попап</span>
    </a>
    <div class="popup__title">
      <h2 class="title">
        Спасибо за заказ
      </h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button">
      <a
        class="button"
        data-test="thanx-ok"
        @click="close"
      >Отлично, я жду!</a>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ThanxComponent",
  methods: {
    ...mapActions("App", ["hideThanx"]),
    async close() {
      this.hideThanx();
      await this.$router.push({ name: "Orders" });
    },
  },
};
</script>

<style scoped></style>
