import { shallowMount } from "@vue/test-utils";
import DoughSelector from "@/modules/builder/components/DoughSelector.vue";
import { generateMockStore } from "@/store/mocks";
import { fillPizzaData } from "@/common/testHelpers";

describe("DoughSelector.vue", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = shallowMount(DoughSelector, options);
  };

  beforeEach(() => {
    actions = {
      Builder: {
        saveDoughId: jest.fn(),
      },
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

  it("should render doughs", () => {
    fillPizzaData(store);
    createComponent({ store });
    expect(wrapper.findAll("input").length).toBe(2);
  });

  it("should be selected default dough", () => {
    fillPizzaData(store);
    createComponent({ store });
    expect(wrapper.find("input").element.value).toBe("1");
  });

  it("can select dough", () => {
    fillPizzaData(store);
    createComponent({ store });
    wrapper.findAll("input").at(1).trigger("click");
    expect(actions.Builder.saveDoughId).toHaveBeenCalledWith(
      expect.any(Object),
      2
    );
  });
});
