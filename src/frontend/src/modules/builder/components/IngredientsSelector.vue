<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>

    <ul class="ingredients__list">
      <li
        v-for="ingredient in normalizedIngredients"
        :key="ingredient.name"
        class="ingredients__item"
      >
        <span class="filling" :class="ingredient.style">{{
          ingredient.name
        }}</span>

        <ItemCounter
          additionalClass="ingredients__counter"
          :initValue="ingredient.count"
          :max="3"
          @change="onChange(ingredient.value, $event)"
        ></ItemCounter>
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
      selectedIngredients: {},
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
    onChange(value, count) {
      this.selectedIngredients[value] = count;
      this.$emit("change", this.selectedIngredients);
    },
  },
};
</script>
