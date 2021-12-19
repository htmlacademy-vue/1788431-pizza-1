import { shallowMount } from "@vue/test-utils";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector.vue";
import { generateMockStore } from "@/store/mocks";
import { fillPizzaData } from "@/common/testHelpers";
import pizza from "@/static/pizza";

describe("BuilderDoughSelector.vue", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = shallowMount(BuilderDoughSelector, options);
  };

  beforeEach(() => {
    actions = {
      Builder: {
        saveDoughId: jest.fn(),
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

  it("should render doughs", () => {
    createComponent({ store });
    expect(wrapper.findAll("input").length).toBe(pizza.dough.length);
  });

  it("should be selected default dough", () => {
    createComponent({ store });
    expect(wrapper.findAll("input").at(0).element.checked).toBe(true);
    expect(wrapper.findAll("input").at(1).element.checked).toBe(false);
  });

  it("should be selected right dough", () => {
    store.commit("Builder/setDoughId", pizza.dough[1].id);
    createComponent({ store });
    expect(wrapper.findAll("input").at(0).element.checked).toBe(false);
    expect(wrapper.findAll("input").at(1).element.checked).toBe(true);
  });

  it("can select dough", () => {
    createComponent({ store });
    wrapper.findAll("input").at(1).trigger("click");
    expect(actions.Builder.saveDoughId).toHaveBeenCalledWith(
      expect.any(Object),
      2
    );
  });
});
