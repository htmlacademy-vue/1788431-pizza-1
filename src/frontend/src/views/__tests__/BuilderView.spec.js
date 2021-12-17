import { shallowMount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import BuilderView from "@/views/BuilderView.vue";
import { fillPizzaData, pizzaData1 } from "@/common/testHelpers";
import Vue from "vue";

describe("BuilderView.vue", () => {
  let actions;
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(BuilderView, options);
  };

  beforeEach(() => {
    actions = {
      Builder: {
        fetchData: jest.fn(),
        savePizzaName: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    fillPizzaData(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should save pizza name", () => {
    createComponent({ store });
    wrapper.find('[data-test="builder-name"]').setValue("n");
    expect(actions.Builder.savePizzaName).toHaveBeenCalledWith(
      expect.any(Object),
      "n"
    );
  });

  it("disable to-cart button on empty pizza", () => {
    createComponent({ store });
    expect(
      wrapper.find('[data-test="builder-to-cart"]').attributes("disabled")
    ).toBe("disabled");
  });
});

describe("BuilderView.vue", () => {
  let store;
  let wrapper;
  let actions;

  const mocks = {
    $notifier: {
      success: jest.fn(),
    },
  };

  const createComponent = (options) => {
    wrapper = shallowMount(BuilderView, options);
  };

  beforeEach(() => {
    actions = {
      Cart: {
        addPizza: jest.fn(),
      },
      Builder: {
        fetchData: jest.fn(),
        resetValues: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    fillPizzaData(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("disable to-cart button if name typed and no ingredients selected", async () => {
    createComponent({ store });
    wrapper.find('[data-test="builder-name"]').setValue("n");
    await Vue.nextTick();
    expect(
      wrapper.find('[data-test="builder-to-cart"]').attributes("disabled")
    ).toBe("disabled");
  });

  it("disable to-cart button if ingredients selected and no name typed", async () => {
    createComponent({ store });
    store.dispatch("Builder/changeIngredient", { ingredientId: 1, delta: 1 });
    await Vue.nextTick();
    expect(
      wrapper.find('[data-test="builder-to-cart"]').attributes("disabled")
    ).toBe("disabled");
  });

  it("enable to-cart button if ingredients selected and name typed", async () => {
    createComponent({ store });
    store.dispatch("Builder/changeIngredient", {
      ingredientId: 1,
      delta: 1,
    });
    wrapper.find('[data-test="builder-name"]').setValue("n");
    await Vue.nextTick();
    expect(
      wrapper.find('[data-test="builder-to-cart"]').attributes("disabled")
    ).toBeFalsy();
  });

  it("save pizza when click on to-cart button", async () => {
    createComponent({ store, mocks });
    store.dispatch("Builder/changeIngredient", {
      ingredientId: 1,
      delta: 1,
    });
    wrapper.find('[data-test="builder-name"]').setValue("n");
    await Vue.nextTick();
    await wrapper.find('[data-test="builder-to-cart"]').trigger("click");

    expect(actions.Cart.addPizza).toHaveBeenCalledWith(expect.any(Object), {
      count: 1,
      humanize: expect.any(Object),
      id: 1,
      pizzaName: "n",
      price: 383,
      selectedDoughId: 1,
      selectedIngredients: { 1: 1 },
      selectedSauceId: 1,
      selectedSizeId: 1,
    });

    expect(actions.Builder.resetValues).toHaveBeenCalled();

    expect(mocks.$notifier.success).toHaveBeenCalled();
  });
});

describe("BuilderView.vue on created", () => {
  let store;
  let wrapper;
  let actions;

  const createComponent = (options) => {
    wrapper = shallowMount(BuilderView, options);
  };

  beforeEach(() => {
    actions = {
      Builder: {
        fetchData: jest.fn(),
        resetValues: jest.fn(),
        loadDataFromCart: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    fillPizzaData(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("reset and fetch if no pizzaIdToEdit passed", async () => {
    createComponent({ store });
    expect(actions.Builder.fetchData).toHaveBeenCalled();
    await Vue.nextTick();
    expect(actions.Builder.resetValues).toHaveBeenCalled();
    expect(actions.Builder.loadDataFromCart).not.toHaveBeenCalled();
  });

  it("load pizza data and fetch if pizzaIdToEdit passed", async () => {
    store.commit("Cart/addPizza", pizzaData1);
    createComponent({
      store,
      propsData: {
        pizzaIdToEdit: pizzaData1.id,
      },
    });
    expect(actions.Builder.fetchData).toHaveBeenCalled();
    await Vue.nextTick();
    expect(actions.Builder.loadDataFromCart).toHaveBeenCalledWith(
      expect.any(Object),
      pizzaData1
    );
    await Vue.nextTick();
    expect(actions.Builder.resetValues).not.toHaveBeenCalled();
  });
});
