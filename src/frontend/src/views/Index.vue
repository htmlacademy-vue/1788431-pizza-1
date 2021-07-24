<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <DoughSelector
          :doughs="pizza.dough"
          :initValue="selectedDoughValue"
          @change="onDoughChange"
        ></DoughSelector>

        <SizeSelector
          :sizes="pizza.sizes"
          :initValue="selectedSizeValue"
          @change="onSizeChange"
        ></SizeSelector>

        <div class="content__ingridients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингридиенты
            </h2>

            <div class="sheet__content ingridients">
              <SauceSelector
                :sauces="pizza.sauces"
                :initValue="selectedSauceValue"
                @change="onSauceChange"
              ></SauceSelector>

              <IngredientsSelector
                :ingredients="pizza.ingredients"
                @change="onIngredientsChange"
              ></IngredientsSelector>
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
            />
          </label>

          <div class="content__constructor">
            <div class="pizza" :class="pizzaFoundationStyle">
              <div class="pizza__wrapper">
                <div class="pizza__filling pizza__filling--ananas"></div>
                <div class="pizza__filling pizza__filling--bacon"></div>
                <div class="pizza__filling pizza__filling--cheddar"></div>
              </div>
            </div>
          </div>

          <div class="content__result">
            <p>Итого: {{ price }} ₽</p>
            <button type="button" class="button button--disabled" disabled>
              Готовьте!
            </button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import pizza from "@/static/pizza.json";
import DoughSelector from "@/modules/builder/components/DoughSelector";
import SizeSelector from "@/modules/builder/components/SizeSelector";
import SauceSelector from "@/modules/builder/components/SauceSelector";
import IngredientsSelector from "@/modules/builder/components/IngredientsSelector";
import {
  getDefaultDoughValue,
  getDefaultSauceValue,
  getDefaultSizeValue,
} from "@/common/builderHelpers";

export default {
  name: "Index",
  components: {
    DoughSelector,
    SizeSelector,
    SauceSelector,
    IngredientsSelector,
  },
  data() {
    return {
      pizza: pizza,
      selectedDoughValue: getDefaultDoughValue(pizza.dough),
      selectedSauceValue: getDefaultSauceValue(pizza.sauces),
      selectedSizeValue: getDefaultSizeValue(pizza.sizes),
      selectedIngredients: {},
      ingredientsPrice: 0,
    };
  },
  computed: {
    price() {
      const selectedDough = pizza.dough.find(
        (dough) => dough.value === this.selectedDoughValue
      );
      const selectedSauce = pizza.sauces.find(
        (sauce) => sauce.value === this.selectedSauceValue
      );
      const selectedSize = pizza.sizes.find(
        (size) => size.value === this.selectedSizeValue
      );
      return (
        (selectedDough.price + selectedSauce.price + this.ingredientsPrice) *
        selectedSize.multiplier
      );
    },
    pizzaFoundationStyle() {
      const dough = { light: "small", large: "big" }[this.selectedDoughValue];
      return "pizza--foundation--" + dough + "-" + this.selectedSauceValue;
    },
  },
  methods: {
    onDoughChange(dough) {
      this.selectedDoughValue = dough;
    },
    onSizeChange(size) {
      this.selectedSizeValue = size;
    },
    onSauceChange(sauce) {
      this.selectedSauceValue = sauce;
    },
    onIngredientsChange(ingredients) {
      this.selectedIngredients = ingredients;
      this.updateIngredientsPrice();
    },
    updateIngredientsPrice() {
      let ingredientsPrice = 0;
      for (const selectedIngredientValue in this.selectedIngredients) {
        const count = this.selectedIngredients[selectedIngredientValue];
        const ingredient = pizza.ingredients.find(
          (ingredient) => ingredient.value === selectedIngredientValue
        );
        ingredientsPrice += ingredient.price * count;
      }
      this.ingredientsPrice = ingredientsPrice;
    },
  },
};
</script>

<style lang="scss"></style>
