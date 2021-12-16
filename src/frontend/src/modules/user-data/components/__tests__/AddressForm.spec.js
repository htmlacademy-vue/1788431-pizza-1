import { createLocalVue, mount } from "@vue/test-utils";
import AddressForm from "@/modules/user-data/components/AddressForm.vue";
import AppInput from "@/common/components/AppInput.vue";
import { generateMockStore } from "@/store/mocks";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component("AppInput", AppInput);

describe("AddressForm.vue", () => {
  let wrapper;
  let store;
  let propsData = {
    address: {
      id: "id",
      name: "name",
      street: "street",
      building: "building",
      flat: "flat",
      comment: "comment",
    },
  };
  let propsDataEmpty = {
    address: {
      name: "",
      street: "",
      building: "",
      flat: "",
      comment: "",
    },
  };
  const mocks = {
    $notifier: {
      success: jest.fn(),
    },
  };
  const actions = {
    Addresses: {
      delete: jest.fn(),
    },
  };

  const createComponent = (options) => {
    wrapper = mount(AddressForm, options);
  };

  beforeEach(async () => {
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", async () => {
    createComponent({
      localVue,
      store,
      propsData,
    });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("show name", () => {
    createComponent({
      localVue,
      store,
      propsData,
    });
    expect(wrapper.find('[data-test="address-name"] input').element.value).toBe(
      propsData.address.name
    );
  });

  it("show street", () => {
    createComponent({
      localVue,
      store,
      propsData,
    });
    expect(
      wrapper.find('[data-test="address-street"] input').element.value
    ).toBe(propsData.address.street);
  });

  it("show building", () => {
    createComponent({
      localVue,
      store,
      propsData,
    });
    expect(
      wrapper.find('[data-test="address-building"] input').element.value
    ).toBe(propsData.address.building);
  });

  it("show flat", () => {
    createComponent({
      localVue,
      store,
      propsData,
    });
    expect(wrapper.find('[data-test="address-flat"] input').element.value).toBe(
      propsData.address.flat
    );
  });

  it("show comment", () => {
    createComponent({
      localVue,
      store,
      propsData,
    });
    expect(
      wrapper.find('[data-test="address-comment"] input').element.value
    ).toBe(propsData.address.comment);
  });

  it("should not show delete button on empty address", () => {
    createComponent({
      localVue,
      store,
      propsData: propsDataEmpty,
    });
    expect(wrapper.find('[data-test="address-delete"]').exists()).toBeFalsy();
  });

  it("should show delete button on filled address", () => {
    createComponent({
      localVue,
      store,
      propsData,
    });
    expect(wrapper.find('[data-test="address-delete"]').exists()).toBeTruthy();
  });

  it("should delete address", async () => {
    createComponent({
      localVue,
      store,
      propsData,
      mocks,
    });
    await wrapper.find('[data-test="address-delete"]').trigger("click");
    expect(actions.Addresses.delete).toHaveBeenCalledWith(
      expect.any(Object),
      propsData.address
    );
    expect(mocks.$notifier.success).toHaveBeenCalled();
  });

  it("should save address", async () => {
    createComponent({
      localVue,
      store,
      propsData,
    });
    await wrapper.find('[data-test="address-save"]').trigger("click");
    expect(wrapper.emitted().save).toBeTruthy();
  });

  it("should not save empty address", async () => {
    createComponent({
      localVue,
      store,
      propsData: propsDataEmpty,
    });
    await wrapper.find('[data-test="address-save"]').trigger("click");
    expect(wrapper.emitted().save).toBeFalsy();
  });

  it("should not render address validation errors", async () => {
    createComponent({
      localVue,
      store,
      propsData: propsDataEmpty,
    });
    expect(
      wrapper.find('[data-test="address-name"] [data-test="error"]').exists()
    ).toBeFalsy();
    expect(
      wrapper.find('[data-test="address-street"] [data-test="error"]').exists()
    ).toBeFalsy();
    expect(
      wrapper
        .find('[data-test="address-building"] [data-test="error"]')
        .exists()
    ).toBeFalsy();
  });

  it("render address validation error", async () => {
    createComponent({
      localVue,
      store,
      propsData: propsDataEmpty,
    });
    await wrapper.find('[data-test="address-save"]').trigger("click");
    expect(
      wrapper.find('[data-test="address-name"] [data-test="error"]').text()
    ).toBe("Поле обязательно для заполнения");
    expect(
      wrapper.find('[data-test="address-street"] [data-test="error"]').text()
    ).toBe("Поле обязательно для заполнения");
    expect(
      wrapper.find('[data-test="address-building"] [data-test="error"]').text()
    ).toBe("Поле обязательно для заполнения");
  });

  it("clear validation error", async () => {
    createComponent({
      localVue,
      store,
      propsData: propsDataEmpty,
    });
    // заполняем улицу и здание, но не заполняем название
    await wrapper.find('[data-test="address-street"] input').setValue("street");
    await wrapper
      .find('[data-test="address-building"] input')
      .setValue("building");
    // после попытки сохранения появляется ошибка
    await wrapper.find('[data-test="address-save"]').trigger("click");
    // вводим что-то в название адреса
    await wrapper.find('[data-test="address-name"] input').setValue("n");
    expect(
      wrapper
        .find('[data-test="address-building"] [data-test="error"]')
        .exists()
    ).toBeFalsy();
  });
});
