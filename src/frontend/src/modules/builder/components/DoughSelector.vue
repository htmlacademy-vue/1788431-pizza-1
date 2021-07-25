<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <label
          v-for="dough in normalizedDoughs"
          :key="dough.name"
          class="dough__input"
          :class="dough.style"
        >
          <input
            type="radio"
            name="dough"
            :value="dough.value"
            class="visually-hidden"
            v-model="selectedDough"
          />
          <b>{{ dough.name }}</b>
          <span>{{ dough.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DoughSelector",
  props: {
    doughs: {
      type: Array,
      required: true,
    },
    initValue: {
      type: String,
    },
  },

  data() {
    return {
      normalizedDoughs: this.doughs.map((dough) => this.normalizeDough(dough)),
      selectedDough: this.initValue,
    };
  },

  methods: {
    normalizeDough(dough) {
      return {
        ...dough,
        style: "dough__input--" + dough.value,
      };
    },
  },

  watch: {
    selectedDough(newDough) {
      this.$emit("change", newDough);
    },
  },
};
</script>
