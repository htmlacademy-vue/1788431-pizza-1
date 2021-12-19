import { shallowMount } from "@vue/test-utils";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView.vue";
import { generateMockStore } from "@/store/mocks";
import { fillPizzaData } from "@/common/testHelpers";
import pizza from "@/static/pizza";
import Vue from "vue";

describe("BuilderPizzaView.vue", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = shallowMount(BuilderPizzaView, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    fillPizzaData(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should not show any ingredient", () => {
    createComponent({ store });
    expect(wrapper.findAll(".ingredient").length).toBe(0);
  });

  it("should show ingredients", async () => {
    createComponent({ store });
    store.dispatch("Builder/changeIngredient", { ingredientId: 1, delta: 3 });
    await Vue.nextTick();
    expect(wrapper.findAll(".ingredient").length).toBe(3);
    expect(
      wrapper
        .find(
          ".pizza__filling--mushrooms:not(.pizza__filling--second):not(.pizza__filling--third)"
        )
        .exists()
    ).toBeTruthy();
    expect(
      wrapper
        .find(
          ".pizza__filling--mushrooms.pizza__filling--second:not(.pizza__filling--third)"
        )
        .exists()
    ).toBeTruthy();
    expect(
      wrapper
        .find(
          ".pizza__filling--mushrooms.pizza__filling--third:not(.pizza__filling--second)"
        )
        .exists()
    ).toBeTruthy();
  });

  it("should show default dough and sauce", async () => {
    createComponent({ store });
    expect(wrapper.findAll(".pizza--foundation--1-1").exists()).toBeTruthy();
  });

  it("should change dough", async () => {
    createComponent({ store });
    store.commit("Builder/setDoughId", pizza.dough[1].id);
    await Vue.nextTick();
    expect(wrapper.findAll(".pizza--foundation--2-1").exists()).toBeTruthy();
  });

  it("should change sauce", async () => {
    createComponent({ store });
    store.commit("Builder/setSauceId", pizza.sauces[1].id);
    await Vue.nextTick();
    expect(wrapper.findAll(".pizza--foundation--1-2").exists()).toBeTruthy();
  });

  it("should change sauce and dough", async () => {
    createComponent({ store });
    store.commit("Builder/setSauceId", pizza.sauces[1].id);
    store.commit("Builder/setDoughId", pizza.sauces[1].id);
    await Vue.nextTick();
    expect(wrapper.findAll(".pizza--foundation--2-2").exists()).toBeTruthy();
  });

  it("should increase ingredient on drop", async () => {
    createComponent({ store });
    wrapper
      .find(".pizza")
      .trigger("drop", { dataTransfer: { getData: () => 1 } });
    await Vue.nextTick();
    expect(
      wrapper
        .find(
          ".pizza__filling--mushrooms:not(.pizza__filling--second):not(.pizza__filling--third)"
        )
        .exists()
    ).toBeTruthy();
  });
});
