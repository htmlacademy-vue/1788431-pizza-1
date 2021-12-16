import { shallowMount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import Cart from "@/views/Cart.vue";
import {
  fillPizzaData,
  pizzaData1,
  fillAddressesData,
  addressData1,
  fillMiscData,
  authenticateUser,
} from "@/common/testHelpers";
import Vue from "vue";

describe("Cart.vue", () => {
  let actions;
  let store;
  let wrapper;
  let stubs = ["router-link"];

  const createComponent = (options) => {
    wrapper = shallowMount(Cart, options);
  };

  beforeEach(() => {
    actions = {
      Cart: {
        fetchMiscData: jest.fn(),
        resetCart: jest.fn(),
      },
      Orders: {
        create: jest.fn(),
      },
      Addresses: {
        fetch: jest.fn(),
      },
      App: {
        showThanx: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    authenticateUser(store);
    fillPizzaData(store);
    fillMiscData(store);
    fillAddressesData(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ store, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("show message if cart is empty", () => {
    createComponent({ store, stubs });
    expect(wrapper.find('[data-test="cart-message"]').exists()).toBeTruthy();
  });

  it("do not show pizza list if cart is empty", () => {
    createComponent({ store, stubs });
    expect(wrapper.find('[data-test="cart-pizza-list"]').exists()).toBeFalsy();
  });

  it("do not show message if cart is not empty", () => {
    store.commit("Cart/addPizza", pizzaData1);
    createComponent({ store, stubs });
    expect(wrapper.find('[data-test="cart-message"]').exists()).toBeFalsy();
  });

  it("show pizza list if cart is not empty", () => {
    store.commit("Cart/addPizza", pizzaData1);
    createComponent({ store, stubs });
    expect(wrapper.find('[data-test="cart-pizza-list"]').exists()).toBeTruthy();
  });

  it("render address in address selector", () => {
    createComponent({ store, stubs });
    // заберу сам + новый адрес + ранее сохраненный адрес = 3 пункта
    expect(wrapper.findAll('[data-test="cart-address"] option').length).toBe(3);
    expect(
      wrapper.findAll('[data-test="cart-address"] option').at(2).text()
    ).toBe(addressData1.name);
  });

  it("do not show new address form", () => {
    createComponent({ store, stubs });
    expect(
      wrapper.find('[data-test="cart-address-form"]').exists()
    ).toBeFalsy();
  });

  it("show address form if new address selected", async () => {
    createComponent({ store, stubs });
    await wrapper
      .find('[data-test="cart-address"] option[value="new"]')
      .setSelected();
    expect(
      wrapper.find('[data-test="cart-address-form"]').exists()
    ).toBeTruthy();
  });

  it("do not show address form if existent address selected", async () => {
    createComponent({ store, stubs });
    await wrapper
      .find(
        '[data-test="cart-address"] option[value="' + addressData1.id + '"]'
      )
      .setSelected();
    expect(
      wrapper.find('[data-test="cart-address-form"]').exists()
    ).toBeFalsy();
  });

  it("show zero price", async () => {
    createComponent({ store, stubs });
    expect(wrapper.find('[data-test="cart-price"]').text()).toBe("Итого: 0 ₽");
  });

  it("show correct price when misc added", async () => {
    store.commit("Cart/changeMisc", { miscId: 1, delta: 1 });
    createComponent({ store, stubs });
    expect(wrapper.find('[data-test="cart-price"]').text()).toBe("Итого: 56 ₽");
  });

  it("show correct price when pizza and misc added", async () => {
    store.commit("Cart/addPizza", pizzaData1);
    store.commit("Cart/changeMisc", { miscId: 1, delta: 1 });
    createComponent({ store, stubs });
    expect(wrapper.find('[data-test="cart-price"]').text()).toBe(
      "Итого: 514 ₽"
    );
  });

  it("disable order button if no one pizza or misc in the cart", async () => {
    createComponent({ store, stubs });
    expect(
      wrapper.find('[data-test="cart-order-button"]').attributes("disabled")
    ).toBe("disabled");
  });

  it("enable order button if no any pizza in the cart", async () => {
    store.commit("Cart/addPizza", pizzaData1);
    createComponent({ store, stubs });
    expect(
      wrapper.find('[data-test="cart-order-button"]').attributes("disabled")
    ).toBeFalsy();
  });

  it("create order on order button click", async () => {
    store.commit("Cart/addPizza", pizzaData1);
    createComponent({ store, stubs });
    await wrapper.find('[data-test="cart-order-button"]').trigger("click");
    await Vue.nextTick();
    expect(actions.Orders.create).toHaveBeenCalled();
  });

  it("show thanx on order button click", async () => {
    store.commit("Cart/addPizza", pizzaData1);
    createComponent({ store, stubs });
    await wrapper.find('[data-test="cart-order-button"]').trigger("click");
    await Vue.nextTick();
    expect(actions.App.showThanx).toHaveBeenCalled();
  });

  it("reset cart on order button click", async () => {
    store.commit("Cart/addPizza", pizzaData1);
    createComponent({ store, stubs });
    await wrapper.find('[data-test="cart-order-button"]').trigger("click");
    await Vue.nextTick();
    expect(actions.Cart.resetCart).toHaveBeenCalled();
  });

  it("pass new address data on create order", async () => {
    createComponent({ store, stubs });
    await wrapper
      .find(
        '[data-test="cart-address"] option[value="' + addressData1.id + '"]'
      )
      .setSelected();
    expect(
      wrapper.find('[data-test="cart-address-form"]').exists()
    ).toBeFalsy();

    store.commit("Cart/addPizza", pizzaData1);
    createComponent({ store, stubs });
    await wrapper
      .find('[data-test="cart-address"] option[value="new"]')
      .setSelected();
    await wrapper.find('[data-test="cart-address-street"]').setValue("street");
    await wrapper
      .find('[data-test="cart-address-building"]')
      .setValue("building");
    await wrapper.find('[data-test="cart-order-button"]').trigger("click");
    expect(actions.Orders.create.mock.calls[0][1].address.street).toBe(
      "street"
    );
    expect(actions.Orders.create.mock.calls[0][1].address.building).toBe(
      "building"
    );
    expect(actions.Orders.create.mock.calls[0][1].address.flat).toBeFalsy();
  });
});
