<template>
  <div class="sheet__content" :class="mainStyle">
    <label v-for="item in items" :key="item.id" :class="item.style">
      <input
        type="radio"
        :name="name"
        :value="item.id"
        class="visually-hidden"
        v-model="id"
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
    initId: {
      type: Number,
    },
    mainStyle: {
      type: String,
    },
  },

  data() {
    return {
      id: this.initId || null,
    };
  },

  watch: {
    id(newId) {
      this.$emit("change", newId);
    },
  },
};
</script>
