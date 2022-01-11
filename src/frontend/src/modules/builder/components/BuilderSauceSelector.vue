<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>

    <label
      v-for="sauce in normalizedSauces"
      :key="sauce.name"
      class="radio ingredients__input"
    >
      <input
        v-model="selectedSauce"
        type="radio"
        name="sauce"
        :value="sauce.id"
      />
      <span>{{ sauce.name }}</span>
    </label>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "BuilderSauceSelector",

  computed: {
    ...mapGetters("Builder", ["sauces", "selectedSauceId"]),
    normalizedSauces() {
      const sauces = this.sauces;
      return sauces.map((sauce) => this.normalizeSauce(sauce));
    },

    selectedSauce: {
      get() {
        return this.selectedSauceId;
      },

      set(sauce) {
        this.saveSauceId(sauce);
      },
    },
  },

  methods: {
    ...mapActions("Builder", ["saveSauceId"]),
    normalizeSauce(sauce) {
      return {
        ...sauce,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/blocks/ingredients.scss";
@import "~@/assets/scss/blocks/radio.scss";
</style>
