<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <RadioButton
        name="diameter"
        :items="normalizedSizes"
        mainStyle="diameter"
        :initValue="selectedSize"
        @change="onChange"
      ></RadioButton>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";

export default {
  name: "SizeSelector",
  props: {
    sizes: {
      type: Array,
      required: true,
    },
  },

  components: { RadioButton },

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
        style: "diameter__input diameter__input--" + size.value,
      };
    },
    getDefaultSizeValue() {
      const defaultSize = this.sizes.find((size) => size.default);
      return defaultSize ? defaultSize.value : null;
    },
    onChange(size) {
      this.$emit("change", size);
    },
  },
};
</script>
