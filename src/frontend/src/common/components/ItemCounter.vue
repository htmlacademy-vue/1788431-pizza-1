<template>
  <div
    class="counter"
    :class="additionalClass"
  >
    <button
      type="button"
      class="counter__button counter__button--disabled counter__button--minus"
      data-test="decrease"
      @click="onMinus"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="value"
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :class="additionalButtonClass"
      data-test="increase"
      @click="onPlus"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ItemCounter",
  props: {
    additionalClass: {
      type: String,
      default: "",
    },
    additionalButtonClass: {
      type: String,
      default: "",
    },
    value: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
  },

  methods: {
    onMinus() {
      const newValue = this.value - 1;
      if (newValue >= 0) {
        this.$emit("change", -1);
      }
    },
    onPlus() {
      const newValue = this.value + 1;
      if (this.max && newValue > this.max) {
        return;
      }
      this.$emit("change", 1);
    },
  },
};
</script>
