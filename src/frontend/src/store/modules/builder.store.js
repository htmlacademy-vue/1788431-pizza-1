import Vue from "vue";
import builderData from "@/static/pizza.json";
import {
  getDefaultDoughValue,
  getDefaultSauceValue,
  getDefaultSizeValue,
} from "@/common/builderHelpers";
import { MAX_SAME_INGREDIENTS } from "@/common/constants";

export default {
  namespaced: true,
  state: {
    doughs: [],
    sauces: [],
    sizes: [],
    ingredients: [],
    selectedDoughValue: null,
    selectedSauceValue: null,
    selectedSizeValue: null,
    selectedIngredients: {},
    pizzaName: null,
    price: 0,
    humanize: {
      dough: null,
      sauce: null,
      size: null,
      ingredients: null,
    },
  },
  getters: {
    doughs(state) {
      return state.doughs;
    },
    sauces(state) {
      return state.sauces;
    },
    sizes(state) {
      return state.sizes;
    },
    ingredients(state) {
      return state.ingredients;
    },
    selectedDoughValue(state) {
      return state.selectedDoughValue;
    },
    selectedSauceValue(state) {
      return state.selectedSauceValue;
    },
    selectedSizeValue(state) {
      return state.selectedSizeValue;
    },
    selectedIngredients(state) {
      return state.selectedIngredients;
    },
    getPizzaName(state) {
      return state.pizzaName;
    },
    orderAllowed(state) {
      return (
        state.pizzaName &&
        state.selectedDoughValue &&
        state.selectedSauceValue &&
        state.selectedSizeValue
      );
    },
    price(state) {
      const selectedDough = state.doughs.find(
        (dough) => dough.value === state.selectedDoughValue
      );
      const selectedSauce = state.sauces.find(
        (sauce) => sauce.value === state.selectedSauceValue
      );
      const selectedSize = state.sizes.find(
        (size) => size.value === state.selectedSizeValue
      );

      let ingredientsPrice = 0;
      for (const selectedIngredientValue in state.selectedIngredients) {
        const count = state.selectedIngredients[selectedIngredientValue];
        const ingredient = state.ingredients.find(
          (ingredient) => ingredient.value === selectedIngredientValue
        );
        ingredientsPrice += ingredient.price * count;
      }

      return (
        (selectedDough.price + selectedSauce.price + ingredientsPrice) *
        selectedSize.multiplier
      );
    },
    humanize(state) {
      const humanizedDoughs = {
        light: "на тонком тесте",
        large: "на толстом тесте",
      };
      state.humanize.dough = humanizedDoughs[state.selectedDoughValue];

      state.humanize.sauce = state.sauces.find(
        (sauce) => sauce.value === state.selectedSauceValue.toLowerCase()
      ).name;

      state.humanize.size = state.sizes.find(
        (size) => size.value === state.selectedSizeValue
      ).name;

      let humanizedIngredients = [];
      for (const selectedIngredientValue in state.selectedIngredients) {
        const count = state.selectedIngredients[selectedIngredientValue];
        if (count > 0) {
          const ingredient = state.ingredients.find(
            (ingredient) => ingredient.value === selectedIngredientValue
          );
          humanizedIngredients.push(ingredient.name.toLowerCase());
        }
      }
      state.humanize.ingredients = humanizedIngredients.join(", ");

      return state.humanize;
    },
    pizzaData(state, getters) {
      return {
        pizzaName: state.pizzaName,
        selectedDoughValue: state.selectedDoughValue,
        selectedSauceValue: state.selectedSauceValue,
        selectedSizeValue: state.selectedSizeValue,
        selectedIngredients: state.selectedIngredients,
        price: getters.price,
        count: 1,
        humanize: getters.humanize,
      };
    },
  },
  mutations: {
    setData(state, { dough, sauces, sizes, ingredients }) {
      state.doughs = dough;
      state.sauces = sauces;
      state.sizes = sizes;
      state.ingredients = ingredients;
      state.selectedDoughValue = getDefaultDoughValue(dough);
      state.selectedSauceValue = getDefaultSauceValue(sauces);
      state.selectedSizeValue = getDefaultSizeValue(sizes);
    },
    setDoughValue(state, doughValue) {
      state.selectedDoughValue = doughValue;
    },
    setSauceValue(state, sauceValue) {
      state.selectedSauceValue = sauceValue;
    },
    setSizeValue(state, sizeValue) {
      state.selectedSizeValue = sizeValue;
    },
    setIngredient(state, { ingredientValue, value }) {
      Vue.set(state.selectedIngredients, ingredientValue, value);
    },
    setPizzaName(state, pizzaName) {
      state.pizzaName = pizzaName;
    },
  },
  actions: {
    fetchData({ commit }) {
      commit("setData", builderData);
    },
    saveDoughValue({ commit }, doughValue) {
      commit("setDoughValue", doughValue);
    },
    saveSauceValue({ commit }, sauceValue) {
      commit("setSauceValue", sauceValue);
    },
    saveSizeValue({ commit }, sizeValue) {
      commit("setSizeValue", sizeValue);
    },
    changeIngredient({ commit, state }, { ingredientValue, delta }) {
      const currentCount = state.selectedIngredients[ingredientValue] || 0;
      if (delta > 0 && currentCount >= MAX_SAME_INGREDIENTS) {
        return;
      }
      if (delta < 0 && currentCount === 0) {
        return;
      }
      const value = currentCount + delta;
      commit("setIngredient", { ingredientValue, value });
    },
    savePizzaName({ commit }, pizzaName) {
      commit("setPizzaName", pizzaName);
    },
  },
};
