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
  },
};
