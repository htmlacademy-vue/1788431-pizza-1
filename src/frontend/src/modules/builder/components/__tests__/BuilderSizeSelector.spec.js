import { shallowMount } from "@vue/test-utils";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector.vue";
import { generateMockStore } from "@/store/mocks";
import { fillPizzaData } from "@/common/testHelpers";
import pizza from "@/static/pizza";

describe("BuilderSizeSelector.vue", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = shallowMount(BuilderSizeSelector, options);
  };

  beforeEach(() => {
    actions = {
      Builder: {
        saveSizeId: jest.fn(),
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

  it("should render sizes", () => {
    createComponent({ store });
    expect(wrapper.findAll("input").length).toBe(pizza.sizes.length);
  });

  it("should be selected default size", () => {
    createComponent({ store });
    expect(wrapper.findAll("input").at(0).element.checked).toBe(true);
    expect(wrapper.findAll("input").at(1).element.checked).toBe(false);
    expect(wrapper.findAll("input").at(2).element.checked).toBe(false);
  });

  it("should be selected right size", () => {
    store.commit("Builder/setSizeId", pizza.sizes[2].id);
    createComponent({ store });
    expect(wrapper.findAll("input").at(0).element.checked).toBe(false);
    expect(wrapper.findAll("input").at(1).element.checked).toBe(false);
    expect(wrapper.findAll("input").at(2).element.checked).toBe(true);
  });

  it("can select size", () => {
    createComponent({ store });
    wrapper.findAll("input").at(1).trigger("click");
    expect(actions.Builder.saveSizeId).toHaveBeenCalledWith(
      expect.any(Object),
      2
    );
  });
});
