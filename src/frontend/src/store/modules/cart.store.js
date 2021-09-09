import miscData from "@/static/misc.json";
import Vue from "vue";

export default {
  namespaced: true,
  state: {
    miscData: [],
    pizzas: [],
  },
  getters: {
    pizzasCount(state) {
      return state.pizzas.length;
    },
    pizzas(state) {
      return state.pizzas;
    },
    totalPrice(state) {
      const pizzasPrice = state.pizzas.reduce(
        (sum, pizza) => sum + pizza.count * pizza.price,
        0
      );
      const miscPrice = state.miscData.reduce(
        (sum, misc) => sum + (misc.count || 0) * misc.price,
        0
      );
      return pizzasPrice + miscPrice;
    },
    miscData(state) {
      return state.miscData;
    },
    getPizzaDataById(state) {
      return (id) => {
        return state.pizzas.find((pizza) => pizza.id === id);
      };
    },
  },
  mutations: {
    addPizza(state, pizzaData) {
      const existantPizzaIndex = state.pizzas.findIndex(
        (pizza) => pizza.id === pizzaData.id
      );

      if (existantPizzaIndex > -1) {
        state.pizzas[existantPizzaIndex] = Object.assign(
          {},
          state.pizzas[existantPizzaIndex],
          pizzaData
        );
      } else {
        state.pizzas.push(pizzaData);
      }

      state.pizzas = [...state.pizzas];
    },
    changeCount(state, { id, delta }) {
      const existantPizzaIndex = state.pizzas.findIndex(
        (pizza) => pizza.id === id
      );
      if (existantPizzaIndex === -1) {
        return;
      }
      if (delta < 0 && state.pizzas[existantPizzaIndex].count === 0) {
        return;
      }

      state.pizzas[existantPizzaIndex].count += delta;
    },
    setMiscData(state, miscData) {
      state.miscData = miscData;
    },
    changeMisc(state, { miscId, delta }) {
      const misc = state.miscData.find((misc) => misc.id === miscId);
      const currentMiscCount = misc.count || 0;
      if (delta < 0 && currentMiscCount === 0) {
        return;
      }
      const newCount = currentMiscCount + delta;
      Vue.set(misc, "count", newCount);
      Vue.set(misc, "totalPrice", newCount * misc.price);
    },
  },
  actions: {
    addPizza({ commit }, pizzaData) {
      commit("addPizza", pizzaData);
    },
    changeCount({ commit }, { id, delta }) {
      commit("changeCount", { id, delta });
    },
    fetchMiscData({ commit }) {
      commit("setMiscData", miscData);
    },
    changeMisc({ commit }, { miscId, delta }) {
      commit("changeMisc", { miscId, delta });
    },
  },
};
