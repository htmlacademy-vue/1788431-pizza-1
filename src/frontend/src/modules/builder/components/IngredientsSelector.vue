<template>
  <div class="ingridients__filling">
    <p>Начинка:</p>

    <ul class="ingridients__list">
      <li
        v-for="ingredient in normalizedIngredients"
        :key="ingredient.name"
        class="ingridients__item"
      >
        <span class="filling" :class="ingredient.style">{{
          ingredient.name
        }}</span>

        <ItemCounter additionalClass="ingridients__counter"></ItemCounter>
      </li>
    </ul>
  </div>
</template>

<script>
import ItemCounter from "@/common/components/ItemCounter";
export default {
  name: "IngredientsSelector",
  props: {
    ingredients: {
      type: Array,
      required: true,
    },
  },
  components: { ItemCounter },

  data() {
    return {
      normalizedIngredients: this.ingredients.map((ingredient) =>
        this.normalizeIngredient(ingredient)
      ),
    };
  },

  methods: {
    normalizeIngredient(ingredient) {
      return {
        ...ingredient,
        style: "filling--" + ingredient.value,
      };
    },
  },
};
</script>
