<template>
  <p>Итого: {{ totalPrice }} ₽</p>
</template>

<script>
export default {
  name: "ItemCounter",
  props: {
    sizes: Array,
    size: String,
    doughs: Array,
    dough: String,
    sauces: Array,
    sauce: String,
    ingredients: Array,
    selectedIngredients: Object,
  },

  computed: {
    totalPrice() {
      const selectedDough = this.doughs.find(
        (dough) => dough.value === this.dough
      );
      const selectedSauce = this.sauces.find(
        (sauce) => sauce.value === this.sauce
      );
      const selectedSize = this.sizes.find((size) => size.value === this.size);

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
