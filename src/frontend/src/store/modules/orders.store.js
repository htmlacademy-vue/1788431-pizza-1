import Vue from "vue";

export default {
  namespaced: true,
  state: {
    orders: [],
  },

  getters: {},

  mutations: {
    set(state, data) {
      state.orders = Vue.set(state, "orders", data.orders);
    },
  },

  actions: {
    async create({ commit }, { userId, phone, address, pizzas, misc }) {
      const orderData = { userId, phone, address, pizzas, misc };
      await this.$api.orders.post(orderData);
      const orders = await this.$api.orders.query();
      commit("set", { orders: orders });
    },
  },
};
