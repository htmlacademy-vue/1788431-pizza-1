<template>
  <div class="sheet__content" :class="mainStyle">
    <label v-for="item in items" :key="item.value" :class="item.style">
      <input
        type="radio"
        :name="name"
        :value="item.value"
        class="visually-hidden"
        v-model="value"
      />
      <span>{{ item.name }}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    name: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    initValue: {},
    mainStyle: {
      type: String,
    },
  },

  data() {
    return {
      value: this.initValue || null,
    };
  },

  watch: {
    value(newValue) {
      this.$emit("change", newValue);
    },
  },
};
</script>
