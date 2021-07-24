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
          additionalClass="ingredients__counter"
          :value="selectedIngredients[ingredient.value]"
          :max="max"
          @change="onChange(ingredient.value, $event)"
        ></ItemCounter>
      </li>
    </ul>
  </div>
</template>

<script>
import ItemCounter from "@/common/components/ItemCounter";
import { MAX_SAME_INGREDIENTS, DRAG_DATA_NAME } from "@/common/constants";

export default {
  name: "IngredientsSelector",
  props: {
    ingredients: {
      type: Array,
      required: true,
    },
    selectedIngredients: {
      type: Object,
      required: true,
    },
  },
  components: { ItemCounter },

  data() {
    return {
      normalizedIngredients: this.ingredients.map((ingredient) =>
        this.normalizeIngredient(ingredient)
      ),
      max: MAX_SAME_INGREDIENTS,
    };
  },

  methods: {
    normalizeIngredient(ingredient) {
      return {
        ...ingredient,
        style: "filling--" + ingredient.value,
        count: 0,
      };
    },
    onChange(ingredientValue, delta) {
      this.$emit("change", ingredientValue, delta);
    },
    onDrag(event, ingredient) {
      event.dataTransfer.setData(DRAG_DATA_NAME, ingredient.value);
    },
  },
};
</script>
