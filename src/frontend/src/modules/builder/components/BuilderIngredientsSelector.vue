<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>

    <ul class="ingredients__list">
      <li
        v-for="ingredient in normalizedIngredients"
        :key="ingredient.name"
        class="ingredients__item"
      >
        <span
          class="filling"
          :class="ingredient.style"
          :draggable="true"
          @dragstart.self="onDrag($event, ingredient)"
          @dragover.prevent
          @dragenter.prevent
        >
          {{ ingredient.name }}
        </span>

        <ItemCounter
          additional-class="counter--orange ingredients__counter"
          :value="selectedIngredients[ingredient.id]"
          :max="max"
          @change="onChange(ingredient.id, $event)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import ItemCounter from "@/common/components/ItemCounter";
import { MAX_SAME_INGREDIENTS, DRAG_DATA_NAME } from "@/common/constants";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "BuilderIngredientsSelector",
  components: { ItemCounter },

  data() {
    return {
      max: MAX_SAME_INGREDIENTS,
    };
  },

  computed: {
    ...mapGetters("Builder", ["ingredients", "selectedIngredients"]),
    normalizedIngredients() {
      const ingredients = this.ingredients;
      return ingredients.map((ingredient) =>
        this.normalizeIngredient(ingredient)
      );
    },
  },

  methods: {
    ...mapActions("Builder", ["changeIngredient"]),
    normalizeIngredient(ingredient) {
      return {
        ...ingredient,
        style: "filling--" + ingredient.value,
        count: this.selectedIngredients[ingredient.id],
      };
    },

    onChange(ingredientId, delta) {
      this.changeIngredient({ ingredientId, delta });
    },

    onDrag(event, ingredient) {
      event.dataTransfer.setData(DRAG_DATA_NAME, ingredient.id);
    },
  },
};
</script>
