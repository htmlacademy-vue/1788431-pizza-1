<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">
        Выберите тесто
      </h2>

      <div class="sheet__content dough">
        <label
          v-for="dough in normalizedDoughs"
          :key="dough.name"
          class="dough__input"
          :class="dough.style"
        >
          <input
            v-model="selectedDough"
            type="radio"
            name="dough"
            :value="dough.id"
            class="visually-hidden"
          />
          <b>{{ dough.name }}</b>
          <span>{{ dough.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "BuilderDoughSelector",

  computed: {
    ...mapGetters("Builder", ["doughs", "selectedDoughId"]),
    normalizedDoughs() {
      const doughs = this.doughs;
      return doughs.map((dough) => this.normalizeDough(dough));
    },
    selectedDough: {
      get() {
        return this.selectedDoughId;
      },
      set(dough) {
        this.saveDoughId(dough);
      },
    },
  },

  methods: {
    ...mapActions("Builder", ["saveDoughId"]),
    normalizeDough(dough) {
      return {
        ...dough,
        style: "dough__input--" + dough.id,
      };
    },
  },
};
</script>
