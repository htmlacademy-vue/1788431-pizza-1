import { shallowMount } from "@vue/test-utils";
import AppInput from "@/common/components/AppInput.vue";

describe("AppInput.vue", () => {
  let wrapper;
  const propsData = {
    value: "123",
    name: "Email",
    type: "text",
    placeholder: "email",
  };

  const createComponent = (options) => {
    wrapper = shallowMount(AppInput, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({
      propsData: propsData,
    });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("show error", () => {
    createComponent({
      propsData: { ...propsData, ...{ errorText: "error" } },
    });
    expect(wrapper.find(".text-field__text").exists()).toBeTruthy();
    expect(wrapper.find(".text-field__text").text()).toBe("error");
  });

  it("don't show error", () => {
    createComponent({
      propsData: propsData,
    });
    expect(wrapper.find(".text-field__text").exists()).toBeFalsy();
  });

  it("emit input event", async () => {
    createComponent({
      propsData: propsData,
    });
    const input = wrapper.find("input");
    await input.trigger("input");
    expect(wrapper.emitted().input).toBeTruthy();
  });

  it("emits the current input value when typing", async () => {
    createComponent({ propsData });
    let input = wrapper.find("input");
    input.element.value = "test";
    await input.trigger("input");
    expect(wrapper.emitted().input[0][0]).toEqual("test");
  });

  it("name is prop name", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").attributes("name")).toBe(propsData.name);
  });

  it("type is prop type", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").attributes("type")).toBe(propsData.type);
  });

  it("placeholder is prop placeholder", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").attributes("placeholder")).toBe(
      propsData.placeholder
    );
  });
});
