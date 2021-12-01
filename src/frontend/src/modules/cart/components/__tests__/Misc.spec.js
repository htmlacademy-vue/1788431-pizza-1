import { mount } from "@vue/test-utils";
import Misc from "@/modules/cart/components/Misc.vue";
import { generateMockStore } from "@/store/mocks";
import { fillMiscData } from "@/common/testHelpers";
import misc from "@/static/misc.json";
import Vue from "vue";

describe("Misc.vue", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = mount(Misc, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    fillMiscData(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("show all miscs", () => {
    createComponent({ store });
    expect(wrapper.findAll(".additional-list__item").length).toBe(misc.length);
  });

  it("show zero price", () => {
    createComponent({ store });
    wrapper
      .findAll('[data-test="price"]')
      .wrappers.forEach((wrapper) => expect(wrapper.text()).toBe("0 ₽"));
  });

  it("change price on misc increase and decrease", async () => {
    createComponent({ store });

    const miscs = wrapper.findAll('[data-test="price"]');

    wrapper.findAll('[data-test="increase"]').at(0).trigger("click");
    await Vue.nextTick();

    expect(miscs.at(0).text()).toBe(misc[0].price + " ₽");
    expect(miscs.at(1).text()).toBe("0 ₽");
    expect(miscs.at(2).text()).toBe("0 ₽");

    wrapper.findAll('[data-test="increase"]').at(1).trigger("click");
    await Vue.nextTick();

    expect(miscs.at(0).text()).toBe(misc[0].price + " ₽");
    expect(miscs.at(1).text()).toBe(misc[1].price + " ₽");
    expect(miscs.at(2).text()).toBe("0 ₽");

    wrapper.findAll('[data-test="decrease"]').at(0).trigger("click");
    await Vue.nextTick();

    expect(miscs.at(0).text()).toBe("0 ₽");
    expect(miscs.at(1).text()).toBe(misc[1].price + " ₽");
    expect(miscs.at(2).text()).toBe("0 ₽");
  });
});
