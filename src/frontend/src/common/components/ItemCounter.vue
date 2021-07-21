<template>
  <div class="counter counter--orange" :class="additionalClass">
    <button
      type="button"
      class="counter__button counter__button--disabled counter__button--minus"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input type="text" name="counter" class="counter__input" value="0" />
    <button type="button" class="counter__button counter__button--plus">
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
  },

  data() {
    return {};
  },

  methods: {},
};
</script>
