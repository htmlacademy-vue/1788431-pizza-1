import { mount, RouterLinkStub } from "@vue/test-utils";
import CartPizzasList from "@/modules/cart/components/CartPizzasList.vue";
import { generateMockStore } from "@/store/mocks";
import { pizzaData1, pizzaData2 } from "@/common/testHelpers";
import Vue from "vue";

describe("CartPizzasList.vue", () => {
  let wrapper;
  let store;
  let stubs = {
    RouterLink: RouterLinkStub,
  };

  const createComponent = (options) => {
    wrapper = mount(CartPizzasList, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ store, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("do not show any pizza", () => {
    createComponent({ store, stubs });
    expect(wrapper.findAll('[data-test="list-item"]').length).toBe(0);
  });

  it("show one pizza", () => {
    store.commit("Cart/addPizza", pizzaData1);
    createComponent({ store, stubs });
    expect(wrapper.findAll('[data-test="list-item"]').length).toBe(1);
  });

  it("show two pizzas", () => {
    store.commit("Cart/addPizza", pizzaData1);
    store.commit("Cart/addPizza", pizzaData2);
    createComponent({ store, stubs });
    expect(wrapper.findAll('[data-test="list-item"]').length).toBe(2);
  });

  it("show right pizza data", () => {
    store.commit("Cart/addPizza", pizzaData1);
    createComponent({ store, stubs });
    expect(wrapper.find('[data-test="name"]').text()).toBe(
      pizzaData1.pizzaName
    );
    expect(wrapper.find('[data-test="size"]').text()).toContain(
      pizzaData1.humanize.size
    );
    expect(wrapper.find('[data-test="size"]').text()).toContain(
      pizzaData1.humanize.dough
    );
    expect(wrapper.find('[data-test="ingredients"]').text()).toContain(
      pizzaData1.humanize.ingredients
    );
    expect(wrapper.find('[data-test="price"]').text()).toContain(
      pizzaData1.price
    );
  });

  it("increase pizzas count", async () => {
    store.commit("Cart/addPizza", pizzaData1);
    createComponent({ store, stubs });
    wrapper.find('[data-test="increase"]').trigger("click");
    await Vue.nextTick();
    expect(wrapper.find('[data-test="price"]').text()).toContain(
      pizzaData1.price * 2
    );
  });

  it("route to pizza edit", async () => {
    store.commit("Cart/addPizza", pizzaData1);
    createComponent({ store, stubs });
    expect(wrapper.findComponent(RouterLinkStub).props().to).toStrictEqual({
      name: "Builder",
      params: { pizzaIdToEdit: pizzaData1.id },
    });
  });
});
