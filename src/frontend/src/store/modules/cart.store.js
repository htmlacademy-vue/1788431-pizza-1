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
    pizzasForOrder(state) {
      const pizzas = [];
      for (const pizzaIndex in state.pizzas) {
        const pizza = state.pizzas[pizzaIndex];
        const ingredients = Object.keys(pizza.selectedIngredients).map(
          function (key) {
            return {
              ingredientId: +key,
              quantity: +pizza.selectedIngredients[key],
            };
          }
        );
        pizzas.push({
          name: pizza.pizzaName,
          sauceId: pizza.selectedSauceId,
          doughId: pizza.selectedDoughId,
          sizeId: pizza.selectedSizeId,
          quantity: pizza.count,
          ingredients: ingredients,
        });
      }
      return pizzas;
    },
    miscForOrder(state) {
      const misc = [];

      for (const miscIndex in state.miscData) {
        if (state.miscData[miscIndex].count) {
          misc.push({
            miscId: state.miscData[miscIndex].id,
            quantity: state.miscData[miscIndex].count,
          });
        }
      }

      return misc;
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
    async fetchMiscData({ commit }) {
      const miscData = await this.$api.misc.query();
      const reg = new RegExp(".*/([^.]+).svg");
      for (const index in miscData) {
        miscData[index].code = miscData[index].image.replace(reg, "$1");
      }
      commit("setMiscData", miscData);
    },
    changeMisc({ commit }, { miscId, delta }) {
      commit("changeMisc", { miscId, delta });
    },
  },
};
