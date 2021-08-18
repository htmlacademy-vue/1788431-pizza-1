<template>
  <p>Итого: {{ totalPrice }} ₽</p>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "PriceCounter",

  computed: {
    ...mapGetters("Builder", [
      "doughs",
      "sauces",
      "sizes",
      "ingredients",
      "selectedDoughValue",
      "selectedSauceValue",
      "selectedSizeValue",
      "selectedIngredients",
    ]),
    totalPrice() {
      const selectedDough = this.doughs.find(
        (dough) => dough.value === this.selectedDoughValue
      );
      const selectedSauce = this.sauces.find(
        (sauce) => sauce.value === this.selectedSauceValue
      );
      const selectedSize = this.sizes.find(
        (size) => size.value === this.selectedSizeValue
      );

      let ingredientsPrice = 0;
      for (const selectedIngredientValue in this.selectedIngredients) {
        const count = this.selectedIngredients[selectedIngredientValue];
        const ingredient = this.ingredients.find(
          (ingredient) => ingredient.value === selectedIngredientValue
        );
        ingredientsPrice += ingredient.price * count;
      }

      return (
        (selectedDough.price + selectedSauce.price + ingredientsPrice) *
        selectedSize.multiplier
      );
    },
  },

  methods: {},
};
</script>
