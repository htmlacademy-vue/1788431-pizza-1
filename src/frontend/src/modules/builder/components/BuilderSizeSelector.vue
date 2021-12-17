<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">
        Выберите размер
      </h2>

      <div class="sheet__content diameter">
        <label
          v-for="size in normalizedSizes"
          :key="size.id"
          :class="size.style"
        >
          <input
            v-model="selectedSize"
            type="radio"
            name="diameter"
            :value="size.id"
            class="visually-hidden"
          />
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "BuilderSizeSelector",

  computed: {
    ...mapGetters("Builder", ["sizes", "selectedSizeId"]),
    normalizedSizes() {
      const sizes = this.sizes;
      return sizes.map((size) => this.normalizeSize(size));
    },
    selectedSize: {
      get() {
        return this.selectedSizeId;
      },
      set(size) {
        this.saveSizeId(size);
      },
    },
  },

  methods: {
    ...mapActions("Builder", ["saveSizeId"]),
    normalizeSize(size) {
      return {
        ...size,
        style: "diameter__input diameter__input--" + size.id,
      };
    },
  },
};
</script>
