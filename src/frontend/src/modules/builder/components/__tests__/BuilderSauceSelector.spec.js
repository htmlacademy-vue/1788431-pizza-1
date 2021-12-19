import { shallowMount } from "@vue/test-utils";
import BuilderSauceSelector from "@/modules/builder/components/BuilderSauceSelector.vue";
import { generateMockStore } from "@/store/mocks";
import { fillPizzaData } from "@/common/testHelpers";
import pizza from "@/static/pizza";

describe("BuilderSauceSelector.vue", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = shallowMount(BuilderSauceSelector, options);
  };

  beforeEach(() => {
    actions = {
      Builder: {
        saveSauceId: jest.fn(),
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

  it("should render sauces", () => {
    createComponent({ store });
    expect(wrapper.findAll("input").length).toBe(pizza.sauces.length);
  });

  it("should be selected default sauce", () => {
    createComponent({ store });
    expect(wrapper.findAll("input").at(0).element.checked).toBe(true);
    expect(wrapper.findAll("input").at(1).element.checked).toBe(false);
  });

  it("should be selected right sauce", () => {
    store.commit("Builder/setSauceId", pizza.sauces[1].id);
    createComponent({ store });
    expect(wrapper.findAll("input").at(0).element.checked).toBe(false);
    expect(wrapper.findAll("input").at(1).element.checked).toBe(true);
  });

  it("can select sauce", () => {
    createComponent({ store });
    wrapper.findAll("input").at(1).trigger("click");
    expect(actions.Builder.saveSauceId).toHaveBeenCalledWith(
      expect.any(Object),
      2
    );
  });
});
