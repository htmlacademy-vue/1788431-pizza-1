<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          v-for="size in sizes"
          :key="size.value"
          class="diameter__input"
          :class="size.style"
        >
          <input
            type="radio"
            name="diameter"
            :value="size.value"
            class="visually-hidden"
            v-model="selectedSize"
          />
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SizeSelector",
  props: {
    sizes: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      normalizedSizes: this.sizes.map((size) => this.normalizeSize(size)),
      selectedSize: this.getDefaultSizeValue(),
    };
  },

  methods: {
    normalizeSize(size) {
      return {
        ...size,
        style: "diameter__input--" + size.value,
      };
    },
    getDefaultSizeValue() {
      const defaultSize = this.sizes.find((size) => size.default);
      return defaultSize ? defaultSize.value : null;
    },
  },
};
</script>
