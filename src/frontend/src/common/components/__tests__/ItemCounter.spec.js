import { shallowMount } from "@vue/test-utils";
import ItemCounter from "@/common/components/ItemCounter.vue";

describe("ItemCounter.vue", () => {
  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(ItemCounter, options);
  };

  const propsData = {
    value: 0,
    max: 3,
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("render", () => {
    createComponent({ propsData });
    expect(wrapper.html()).toBeTruthy();
  });

  it("show initial value", () => {
    createComponent({ propsData });
    expect(+wrapper.find("input").element.value).toBe(propsData.value);
  });

  it("increase value", () => {
    createComponent({ propsData });
    wrapper.find('[data-test="increase"]').trigger("click");
    expect(wrapper.emitted("change")[0][0]).toBe(1);
  });

  it("decrease value", () => {
    createComponent({ propsData: { value: 1 } });
    wrapper.find('[data-test="decrease"]').trigger("click");
    expect(wrapper.emitted("change")[0][0]).toBe(-1);
  });

  it("doesn't increase due to max value constraint", () => {
    createComponent({ propsData: { value: 3, max: 3 } });
    wrapper.find('[data-test="increase"]').trigger("click");
    expect(wrapper.emitted("change")).toBeFalsy();
  });

  it("doesn't decrease due to negative value constraint", () => {
    createComponent({ propsData: { value: 0 } });
    wrapper.find('[data-test="decrease"]').trigger("click");
    expect(wrapper.emitted("change")).toBeFalsy();
  });
});
