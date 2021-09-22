<template>
  <div class="content__constructor">
    <div
      class="pizza"
      :class="pizzaFoundationStyle"
      @drop.stop="onDrop"
      @dragover.prevent
      @dragenter.prevent
    >
      <div class="pizza__wrapper">
        <div
          v-for="ingredientStyle of pizzaIngredientStyles"
          :key="ingredientStyle"
          :class="ingredientStyle"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { DRAG_DATA_NAME } from "@/common/constants";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "PizzaView",

  computed: {
    ...mapGetters("Builder", [
      "selectedDoughValue",
      "selectedSauceValue",
      "selectedIngredients",
    ]),
    pizzaFoundationStyle() {
      const dough = { light: "small", large: "big" }[this.selectedDoughValue];
      const sauce = this.selectedSauceValue;
      return "pizza--foundation--" + dough + "-" + sauce;
    },
    pizzaIngredientStyles() {
      const styles = [];

      for (const ingredient in this.selectedIngredients) {
        const count = this.selectedIngredients[ingredient];
        if (count > 0) {
          styles.push("pizza__filling pizza__filling--" + ingredient);
        }
        if (count > 1) {
          styles.push(
            "pizza__filling pizza__filling--" +
              ingredient +
              " pizza__filling--second"
          );
        }
        if (count > 2) {
          styles.push(
            "pizza__filling pizza__filling--" +
              ingredient +
              " pizza__filling--third"
          );
        }
      }

      return styles;
    },
  },

  methods: {
    ...mapActions("Builder", ["changeIngredient"]),
    onDrop(event) {
      const ingredientValue = event.dataTransfer.getData(DRAG_DATA_NAME);
      if (ingredientValue) {
        this.changeIngredient({ ingredientValue, delta: 1 });
      }
    },
  },
};
</script>
