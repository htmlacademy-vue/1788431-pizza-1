import { shallowMount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import Orders from "@/views/orders/Index.vue";
import { fillOrdersData } from "@/common/testHelpers";
import Vue from "vue";

describe("Orders.vue", () => {
  let actions;
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(Orders, options);
  };

  beforeEach(() => {
    actions = {
      Orders: { fetch: jest.fn() },
      Addresses: { fetch: jest.fn() },
      Builder: { fetchData: jest.fn() },
      Cart: { fetchMiscData: jest.fn() },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should fetch addresses on create", async () => {
    createComponent({ store });
    expect(actions.Addresses.fetch).toHaveBeenCalled();
  });

  it("should fetch builder data on create", async () => {
    createComponent({ store });
    await Vue.nextTick();
    expect(actions.Builder.fetchData).toHaveBeenCalled();
  });

  it("should fetch misc data on create", async () => {
    createComponent({ store });
    await Vue.nextTick();
    await Vue.nextTick();
    expect(actions.Cart.fetchMiscData).toHaveBeenCalled();
  });

  it("should fetch orders data on create", async () => {
    createComponent({ store });
    await Vue.nextTick();
    await Vue.nextTick();
    await Vue.nextTick();
    expect(actions.Orders.fetch).toHaveBeenCalled();
  });

  it("should show empty list of orders", async () => {
    createComponent({ store });
    expect(wrapper.findAll('[data-test="orders-order"]').length).toBe(0);
  });

  it("should show orders list", async () => {
    fillOrdersData(store);
    createComponent({ store });
    expect(wrapper.findAll('[data-test="orders-order"]').length).toBe(1);
  });
});
