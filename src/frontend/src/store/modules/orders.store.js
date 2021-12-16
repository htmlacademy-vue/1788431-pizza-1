import Vue from "vue";
import { processOrders } from "@/common/builderHelpers";
import map from "lodash/map";
import pick from "lodash/pick";

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
    async create(context, { userId, phone, address, pizzas, misc }) {
      const orderData = { userId, phone, address, pizzas, misc };
      await this.$api.orders.post(orderData);
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
    async delete({ dispatch }, orderId) {
      await this.$api.orders.delete(orderId);
      await dispatch("fetch");
    },
    async repeat({ dispatch, rootGetters, rootState }, order) {
      const newOrder = {
        userId: rootState.Auth.user.id,
        phone: order.phone,
        pizzas: map(order.orderPizzas, (pizza) => {
          const newPizza = pick(pizza, [
            "doughId",
            "name",
            "orderId",
            "quantity",
            "sauceId",
            "sizeId",
          ]);

          newPizza.ingredients = map(pizza.ingredients, (ingredient) =>
            pick(ingredient, ["ingredientId", "quantity"])
          );

          return newPizza;
        }),
        misc: map(order.orderMisc, (misc) =>
          pick(misc, ["miscId", "quantity"])
        ),
        address: order.addressId
          ? rootGetters["Addresses/getById"](order.addressId)
          : null,
      };

      dispatch("create", newOrder);
    },
  },
};
