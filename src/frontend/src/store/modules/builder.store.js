import Vue from "vue";
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
    selectedDoughId: null,
    selectedSauceId: null,
    selectedSizeId: null,
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
    selectedDoughId(state) {
      return state.selectedDoughId;
    },
    selectedSauceId(state) {
      return state.selectedSauceId;
    },
    selectedSizeId(state) {
      return state.selectedSizeId;
    },
    selectedIngredients(state) {
      return state.selectedIngredients;
    },
    getPizzaName(state) {
      return state.pizzaName;
    },
    orderAllowed(state) {
      let hasIngredients = false;

      for (const ingredientId in state.selectedIngredients) {
        if (state.selectedIngredients[ingredientId] > 0) {
          hasIngredients = true;
          break;
        }
      }

      return (
        state.pizzaName &&
        state.selectedDoughId &&
        state.selectedSauceId &&
        hasIngredients &&
        state.selectedSizeId
      );
    },
    price(state) {
      const selectedDough = state.doughs.find(
        (dough) => dough.id === state.selectedDoughId
      );
      const selectedSauce = state.sauces.find(
        (sauce) => sauce.id === state.selectedSauceId
      );
      const selectedSize = state.sizes.find(
        (size) => size.id === state.selectedSizeId
      );

      let ingredientsPrice = 0;
      for (const selectedIngredientId in state.selectedIngredients) {
        const count = state.selectedIngredients[selectedIngredientId];
        const ingredient = state.ingredients.find(
          (ingredient) => ingredient.id === +selectedIngredientId
        );
        ingredientsPrice += ingredient.price * count;
      }

      return (
        (selectedDough?.price + selectedSauce?.price + ingredientsPrice) *
        selectedSize?.multiplier
      );
    },
    humanize(state) {
      const humanizedDoughs = {
        light: "на тонком тесте",
        large: "на толстом тесте",
      };
      const humanize = {};
      humanize.dough = humanizedDoughs[state.selectedDoughId];

      humanize.sauce = state.sauces
        .find((sauce) => sauce.id === state.selectedSauceId)
        .name.toLowerCase();

      humanize.size = state.sizes.find(
        (size) => size.id === state.selectedSizeId
      ).name;

      let humanizedIngredients = [];
      for (const selectedIngredientId in state.selectedIngredients) {
        const count = state.selectedIngredients[selectedIngredientId];
        if (count > 0) {
          const ingredient = state.ingredients.find(
            (ingredient) => ingredient.id === +selectedIngredientId
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
        selectedDoughId: state.selectedDoughId,
        selectedSauceId: state.selectedSauceId,
        selectedSizeId: state.selectedSizeId,
        selectedIngredients: state.selectedIngredients,
        price: getters.price,
        count: state.count,
        humanize: getters.humanize,
      };
    },
    getIngredientById: (state) => (id) => {
      return state.ingredients.find((ingredient) => ingredient.id === +id);
    },
  },
  mutations: {
    setData(state, { doughs, sauces, sizes, ingredients }) {
      state.doughs = doughs;
      state.sauces = sauces;
      state.sizes = sizes;
      state.ingredients = ingredients;
    },
    setDefaults(state) {
      state.id = state.lastId + 1;
      state.lastId++;

      state.selectedDoughId = state.doughs[0]?.id;
      state.selectedSauceId = state.sauces[0]?.id;
      state.selectedSizeId = state.sizes[0]?.id;
      Vue.set(state, "selectedIngredients", {});
      state.pizzaName = "";
      state.count = 1;
    },
    setDoughId(state, doughId) {
      state.selectedDoughId = doughId;
    },
    setSauceId(state, sauceId) {
      state.selectedSauceId = sauceId;
    },
    setSizeId(state, sizeId) {
      state.selectedSizeId = sizeId;
    },
    setIngredient(state, { ingredientId, value }) {
      Vue.set(state.selectedIngredients, ingredientId, value);
    },
    setPizzaName(state, pizzaName) {
      state.pizzaName = pizzaName;
    },
    setDataFromCart(state, pizzaData) {
      state.id = pizzaData.id;
      state.selectedDoughId = pizzaData.selectedDoughId;
      state.selectedSizeId = pizzaData.selectedSizeId;
      state.selectedSauceId = pizzaData.selectedSauceId;
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
    async fetchData({ commit }) {
      const sauces = await this.$api.sauces.query();
      const sizes = await this.$api.sizes.query();
      const doughs = await this.$api.dough.query();
      const ingredients = await this.$api.ingredients.query();
      const reg = new RegExp(".*/([^.]+).svg");
      for (const index in ingredients) {
        ingredients[index].value = ingredients[index].image.replace(reg, "$1");
      }
      commit("setData", { sauces, sizes, doughs, ingredients });
      commit("setDefaults");
    },
    saveDoughId({ commit }, doughId) {
      commit("setDoughId", doughId);
    },
    saveSauceId({ commit }, sauceId) {
      commit("setSauceId", sauceId);
    },
    saveSizeId({ commit }, sizeId) {
      commit("setSizeId", sizeId);
    },
    changeIngredient({ commit, state }, { ingredientId, delta }) {
      const currentCount = state.selectedIngredients[ingredientId] || 0;
      if (delta > 0 && currentCount >= MAX_SAME_INGREDIENTS) {
        return;
      }
      if (delta < 0 && currentCount === 0) {
        return;
      }
      const value = currentCount + delta;
      commit("setIngredient", { ingredientId, value });
    },
    savePizzaName({ commit }, pizzaName) {
      commit("setPizzaName", pizzaName);
    },
    loadDataFromCart({ commit }, pizzaData) {
      commit("setDataFromCart", pizzaData);
    },
    resetValues({ commit }) {
      commit("setDefaults");
    },
  },
};
