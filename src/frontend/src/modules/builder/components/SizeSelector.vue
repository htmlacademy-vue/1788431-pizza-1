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
import { mapActions, mapGetters } from "vuex";
import RadioButton from "@/common/components/RadioButton";

export default {
  name: "SizeSelector",

  components: { RadioButton },

  computed: {
    ...mapGetters("Builder", ["sizes", "selectedSizeValue"]),
    normalizedSizes() {
      const sizes = this.sizes;
      return sizes.map((size) => this.normalizeSize(size));
    },
    selectedSize() {
      return this.selectedSizeValue;
    },
  },

  methods: {
    ...mapActions("Builder", ["saveSizeValue"]),
    normalizeSize(size) {
      return {
        ...size,
        style: "diameter__input diameter__input--" + size.value,
      };
    },
    onChange(size) {
      this.saveSizeValue(size);
    },
  },
};
</script>
