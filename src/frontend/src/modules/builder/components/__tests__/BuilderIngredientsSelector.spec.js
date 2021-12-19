import { mount } from "@vue/test-utils";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector.vue";
import { generateMockStore } from "@/store/mocks";
import { fillPizzaData } from "@/common/testHelpers";
import pizza from "@/static/pizza";
import Vue from "vue";

describe("BuilderIngredientsSelector.vue", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = mount(BuilderIngredientsSelector, options);
  };

  beforeEach(() => {
    actions = {};
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

  it("should render all ingredients", () => {
    createComponent({ store });
    const ingredientsCount = pizza.ingredients.length;
    expect(wrapper.findAll("ul.ingredients__list li").length).toBe(
      ingredientsCount
    );
  });

  it("all ingredients should be zero", () => {
    createComponent({ store });
    wrapper
      .findAll("ul.ingredients__list li input")
      .wrappers.forEach((ingredient) => {
        expect(ingredient.element.value).toBe("0");
      });
  });

  it("can select ingredient", async () => {
    createComponent({ store });
    wrapper
      .findAll('ul.ingredients__list li [data-test="increase"]')
      .at(0)
      .trigger("click");
    await Vue.nextTick();
    wrapper
      .findAll("ul.ingredients__list li input")
      .wrappers.forEach((ingredient, index) => {
        expect(ingredient.element.value).toBe(index === 0 ? "1" : "0");
      });
  });

  it("can select ingredient 3 times only", async () => {
    createComponent({ store });
    wrapper
      .findAll('ul.ingredients__list li [data-test="increase"]')
      .at(1)
      .trigger("click");
    await Vue.nextTick();
    wrapper
      .findAll('ul.ingredients__list li [data-test="increase"]')
      .at(1)
      .trigger("click");
    await Vue.nextTick();
    wrapper
      .findAll('ul.ingredients__list li [data-test="increase"]')
      .at(1)
      .trigger("click");
    await Vue.nextTick();
    wrapper
      .findAll('ul.ingredients__list li [data-test="increase"]')
      .at(1)
      .trigger("click");
    await Vue.nextTick();
    wrapper
      .findAll("ul.ingredients__list li input")
      .wrappers.forEach((ingredient, index) => {
        expect(ingredient.element.value).toBe(index === 1 ? "3" : "0");
      });
  });
});
