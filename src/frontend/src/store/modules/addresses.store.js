import Vue from "vue";

export default {
  namespaced: true,
  state: {
    addresses: [],
  },

  getters: {},

  mutations: {
    set(state, data) {
      state.addresses = Vue.set(state, "addresses", data.addresses);
    },
    create(state, userId) {
      const unsavedAddress = state.addresses.find((address) => !address.id);

      if (!unsavedAddress) {
        state.addresses.push({
          userId: userId,
          name: "",
          street: "",
          building: "",
          flat: "",
          comment: "",
        });
      }
    },
    deleteUnsaved(state) {
      const unsavedAddressIndex = state.addresses.findIndex(
        (address) => !address.id
      );
      if (unsavedAddressIndex > 0) {
        state.addresses.splice(unsavedAddressIndex, 1);
      }
    },
    delete(state, addressId) {
      state;
      addressId;
    },
  },

  actions: {
    async fetch({ commit }) {
      const addresses = await this.$api.addresses.query();
      commit("set", { addresses: addresses });
    },
    async save({ dispatch }, address) {
      if (address.id) {
        await this.$api.addresses.put(address);
      } else {
        await this.$api.addresses.post(address);
      }
      await dispatch("fetch");
    },
    create({ commit }, userId) {
      commit("create", userId);
    },
    deleteUnsaved({ commit }) {
      commit("deleteUnsaved");
    },
    async delete({ dispatch, commit }, address) {
      if (address.id) {
        await this.$api.addresses.delete(address.id);
        await dispatch("fetch");
      } else {
        commit("deleteUnsaved");
      }
    },
  },
};
