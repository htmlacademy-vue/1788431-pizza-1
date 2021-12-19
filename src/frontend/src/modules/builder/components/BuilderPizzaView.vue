<template>
  <div class="content__constructor">
    <div
      class="pizza"
      :class="pizzaFoundationStyle"
      @drop.stop="onDrop"
      @dragover.prevent
      @dragenter.prevent
    >
      <transition-group
        name="ingredient"
        tag="div"
        class="pizza__wrapper"
      >
        <div
          v-for="ingredientStyle of pizzaIngredientStyles"
          :key="ingredientStyle"
          class="ingredient"
          :class="ingredientStyle"
        />
      </transition-group>
    </div>
  </div>
</template>

<script>
import { DRAG_DATA_NAME } from "@/common/constants";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "BuilderPizzaView",

  computed: {
    ...mapGetters("Builder", [
      "selectedDoughId",
      "selectedSauceId",
      "selectedIngredients",
      "getIngredientById",
    ]),

    pizzaFoundationStyle() {
      return (
        "pizza--foundation--" +
        this.selectedDoughId +
        "-" +
        this.selectedSauceId
      );
    },

    pizzaIngredientStyles() {
      const styles = [];

      for (const ingredientId in this.selectedIngredients) {
        const ingredient = this.getIngredientById(ingredientId);
        const count = this.selectedIngredients[ingredientId];
        if (count > 0) {
          styles.push("pizza__filling pizza__filling--" + ingredient.value);
        }
        if (count > 1) {
          styles.push(
            "pizza__filling pizza__filling--" +
              ingredient.value +
              " pizza__filling--second"
          );
        }
        if (count > 2) {
          styles.push(
            "pizza__filling pizza__filling--" +
              ingredient.value +
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
      const ingredientId = event.dataTransfer.getData(DRAG_DATA_NAME);
      if (ingredientId) {
        this.changeIngredient({ ingredientId, delta: 1 });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.ingredient {
  transition: all 1s;
}
.ingredient-enter,
.ingredient-leave-to {
  opacity: 0;
}
.ingredient-enter-to {
  opacity: 1;
}
</style>
