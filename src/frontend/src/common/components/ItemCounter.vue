<template>
  <div class="counter counter--orange" :class="additionalClass">
    <button
      type="button"
      class="counter__button counter__button--disabled counter__button--minus"
      @click="onMinus"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input type="text" name="counter" class="counter__input" :value="value" />
    <button
      type="button"
      class="counter__button counter__button--plus"
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
    },
    initValue: {
      type: Number,
    },
  },

  data() {
    return {
      value: this.initValue || 0,
    };
  },

  methods: {
    onMinus() {
      const newValue = this.value - 1;
      if (newValue >= 0) {
        this.value = newValue;
        this.emit();
      }
    },
    onPlus() {
      this.value = this.value + 1;
      this.emit();
    },
    emit() {
      this.$emit("change", this.value);
    },
  },
};
</script>
