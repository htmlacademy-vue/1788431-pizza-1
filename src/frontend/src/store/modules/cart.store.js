export default {
  namespaced: true,
  state: {
    pizzas: [
      {
        pizzaName: "111",
        selectedDoughValue: "light",
        selectedSauceValue: "creamy",
        selectedSizeValue: "small",
        selectedIngredients: {
          olives: 2,
          jalapeno: 1,
        },
        price: 555,
        count: 1,
        humanize: {
          dough: "ddd",
          sauce: "sss",
          size: "eee",
          ingredients: "iii",
        },
      },
    ],
  },
  getters: {
    pizzasCount(state) {
      return state.pizzas.length;
    },
    pizzas(state) {
      return state.pizzas;
    },
  },
  mutations: {
    addPizza(state, pizzaData) {
      const existantPizzaIndex = state.pizzas.findIndex(
        (pizza) => pizza.pizzaName === pizzaData.pizzaName
      );

      if (existantPizzaIndex !== -1) {
        state.pizzas[existantPizzaIndex] = Object.assign(
          {},
          state.pizzas[existantPizzaIndex],
          pizzaData
        );
      } else {
        state.pizzas.push(pizzaData);
      }
    },
    changeCount(state, { pizzaName, delta }) {
      const existantPizzaIndex = state.pizzas.findIndex(
        (pizza) => pizza.pizzaName === pizzaName
      );
      if (existantPizzaIndex === -1) {
        return;
      }
      if (delta < 0 && state.pizzas[existantPizzaIndex].count === 0) {
        return;
      }

      state.pizzas[existantPizzaIndex].count += delta;
    },
  },
  actions: {
    addPizza({ commit }, pizzaData) {
      commit("addPizza", pizzaData);
    },
    changeCount({ commit }, { pizzaName, delta }) {
      commit("changeCount", { pizzaName, delta });
    },
  },
};
