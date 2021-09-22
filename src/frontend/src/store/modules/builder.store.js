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
    lastId: 0,
    id: null,
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
      let hasIngredients = false;

      for (const ingredientValue in state.selectedIngredients) {
        if (state.selectedIngredients[ingredientValue] > 0) {
          hasIngredients = true;
          break;
        }
      }

      return (
        state.pizzaName &&
        state.selectedDoughValue &&
        state.selectedSauceValue &&
        hasIngredients &&
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
      const humanize = {};
      humanize.dough = humanizedDoughs[state.selectedDoughValue];

      humanize.sauce = state.sauces
        .find((sauce) => sauce.value === state.selectedSauceValue)
        .name.toLowerCase();

      humanize.size = state.sizes.find(
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
      humanize.ingredients = humanizedIngredients.join(", ");

      return humanize;
    },
    pizzaData(state, getters) {
      return {
        id: state.id,
        pizzaName: state.pizzaName,
        selectedDoughValue: state.selectedDoughValue,
        selectedSauceValue: state.selectedSauceValue,
        selectedSizeValue: state.selectedSizeValue,
        selectedIngredients: state.selectedIngredients,
        price: getters.price,
        count: state.count,
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
    },
    setDefaultValues(state) {
      state.id = state.lastId + 1;
      state.lastId++;

      state.selectedDoughValue = getDefaultDoughValue(state.doughs);
      state.selectedSauceValue = getDefaultSauceValue(state.sauces);
      state.selectedSizeValue = getDefaultSizeValue(state.sizes);
      Vue.set(state, "selectedIngredients", {});
      state.pizzaName = "";
      state.count = 1;
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
    setDataFromCart(state, pizzaData) {
      state.id = pizzaData.id;
      state.selectedDoughValue = pizzaData.selectedDoughValue;
      state.selectedSizeValue = pizzaData.selectedSizeValue;
      state.selectedSauceValue = pizzaData.selectedSauceValue;
      state.selectedIngredients = Object.assign(
        {},
        state.selectedIngredients,
        pizzaData.selectedIngredients
      );
      state.pizzaName = pizzaData.pizzaName;
      state.count = pizzaData.count;
    },
  },
  actions: {
    fetchData({ commit }) {
      commit("setData", builderData);
      commit("setDefaultValues");
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
    loadDataFromCart({ commit }, pizzaData) {
      commit("setDataFromCart", pizzaData);
    },
    resetValues({ commit }) {
      commit("setDefaultValues");
    },
  },
};
