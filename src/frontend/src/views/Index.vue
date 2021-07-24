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

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингридиенты
            </h2>

            <div class="sheet__content ingredients">
              <SauceSelector
                :sauces="pizza.sauces"
                :initValue="selectedSauceValue"
                @change="onSauceChange"
              ></SauceSelector>

              <IngredientsSelector
                :ingredients="pizza.ingredients"
                :selectedIngredients="selectedIngredients"
                @change="onIngredientChange(...arguments)"
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

          <PizzaView
            :sauce="selectedSauceValue"
            :dough="selectedDoughValue"
            :selectedIngredients="selectedIngredients"
            @drop="onIngredientDrop($event)"
          ></PizzaView>

          <div class="content__result">
            <PriceCounter
              :sizes="pizza.sizes"
              :sauces="pizza.sauces"
              :doughs="pizza.dough"
              :ingredients="pizza.ingredients"
              :size="selectedSizeValue"
              :sauce="selectedSauceValue"
              :dough="selectedDoughValue"
              :selectedIngredients="selectedIngredients"
            ></PriceCounter>
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
import PriceCounter from "@/modules/builder/components/PriceCounter";
import PizzaView from "@/modules/builder/components/PizzaView";
import {
  getDefaultDoughValue,
  getDefaultSauceValue,
  getDefaultSizeValue,
} from "@/common/builderHelpers";
import { MAX_SAME_INGREDIENTS } from "@/common/constants";

export default {
  name: "Index",
  components: {
    DoughSelector,
    SizeSelector,
    SauceSelector,
    IngredientsSelector,
    PriceCounter,
    PizzaView,
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
    onIngredientChange(ingredientValue, delta) {
      this.changeIngredient(ingredientValue, delta);
    },
    onIngredientDrop(ingredientValue) {
      this.changeIngredient(ingredientValue, +1);
    },
    changeIngredient(ingredientValue, delta) {
      const currentCount = this.selectedIngredients[ingredientValue] || 0;
      if (delta > 0 && currentCount >= MAX_SAME_INGREDIENTS) {
        return;
      }
      if (delta < 0 && currentCount === 0) {
        return;
      }
      this.$set(
        this.selectedIngredients,
        ingredientValue,
        currentCount + delta
      );
    },
  },
};
</script>

<style lang="scss"></style>
