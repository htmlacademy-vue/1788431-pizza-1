<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>

    <label
      v-for="sauce in normalizedSauces"
      :key="sauce.name"
      class="radio ingredients__input"
    >
      <input
        type="radio"
        name="sauce"
        :value="sauce.value"
        v-model="selectedSauce"
      />
      <span>{{ sauce.name }}</span>
    </label>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "SauceSelector",

  computed: {
    ...mapGetters("Builder", ["sauces", "selectedSauceValue"]),
    normalizedSauces() {
      const sauces = this.sauces;
      return sauces.map((sauce) => this.normalizeSauce(sauce));
    },
    selectedSauce: {
      get() {
        return this.selectedSauceValue;
      },
      set(sauce) {
        this.saveSauceValue(sauce);
      },
    },
  },

  methods: {
    ...mapActions("Builder", ["saveSauceValue"]),
    normalizeSauce(sauce) {
      return {
        ...sauce,
      };
    },
  },
};
</script>
