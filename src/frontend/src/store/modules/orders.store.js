import Vue from "vue";
import { processOrders } from "@/common/builderHelpers";

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
    async fetch({ commit, rootGetters }) {
      const orders = await this.$api.orders.query();
      processOrders({
        orders,
        doughs: rootGetters["Builder/doughs"],
        sauces: rootGetters["Builder/sauces"],
        sizes: rootGetters["Builder/sizes"],
        ingredients: rootGetters["Builder/ingredients"],
        misc: rootGetters["Cart/miscData"],
      });
      commit("set", { orders: orders });
    },
  },
};
