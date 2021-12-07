export default {
  namespaced: true,
  state: {
    showThanx: false,
  },

  getters: {},

  mutations: {
    showThanx(state) {
      state.showThanx = true;
    },
    hideThanx(state) {
      state.showThanx = false;
    },
  },

  actions: {
    showThanx({ commit }) {
      commit("showThanx");
    },
    hideThanx({ commit }) {
      commit("hideThanx");
    },
  },
};
