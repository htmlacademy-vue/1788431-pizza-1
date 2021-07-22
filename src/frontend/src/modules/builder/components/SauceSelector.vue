<template>
  <div class="ingridients__sauce">
    <p>Основной соус:</p>

    <label
      v-for="sauce in normalizedSauces"
      :key="sauce.name"
      class="radio ingridients__input"
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
export default {
  name: "SauceSelector",
  props: {
    sauces: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      normalizedSauces: this.sauces.map((sauce) => this.normalizeSauce(sauce)),
      selectedSauce: this.getDefaultSauceValue(),
    };
  },

  methods: {
    normalizeSauce(sauce) {
      return {
        ...sauce,
      };
    },
    getDefaultSauceValue() {
      const defaultSauce = this.sauces.find((sauce) => sauce.default);
      return defaultSauce ? defaultSauce.value : null;
    },
  },

  watch: {
    selectedSauce(newSauce) {
      this.$emit("change", newSauce);
    },
  },
};
</script>
