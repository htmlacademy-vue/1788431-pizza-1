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
export default {
  name: "SauceSelector",
  props: {
    sauces: {
      type: Array,
      required: true,
    },
    initValue: {
      type: String,
    },
  },

  data() {
    return {
      normalizedSauces: this.sauces.map((sauce) => this.normalizeSauce(sauce)),
      selectedSauce: this.initValue,
    };
  },

  methods: {
    normalizeSauce(sauce) {
      return {
        ...sauce,
      };
    },
  },

  watch: {
    selectedSauce(newSauce) {
      this.$emit("change", newSauce);
    },
  },
};
</script>
