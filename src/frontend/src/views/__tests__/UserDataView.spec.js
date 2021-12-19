import { shallowMount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import UserDataView from "@/views/UserDataView.vue";
import { authenticateUser, fillAddressesData } from "@/common/testHelpers";
import Vue from "vue";
import AddressForm from "@/modules/user-data/components/UserDataAddressForm";

describe("UserDataView.vue", () => {
  let actions;
  let store;
  let wrapper;
  let mocks = {
    $notifier: {
      success: jest.fn(),
    },
  };

  const createComponent = (options) => {
    wrapper = shallowMount(UserDataView, options);
  };

  beforeEach(() => {
    actions = {
      Addresses: {
        fetch: jest.fn(),
        save: jest.fn(),
        deleteUnsaved: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    authenticateUser(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("show user avatar", async () => {
    createComponent({ store });
    expect(
      wrapper.find('[data-test="user-data-avatar"]').attributes("src")
    ).toBe("/public/img/users/user@2x.jpg");
    expect(
      wrapper.find('[data-test="user-data-avatar"]').attributes("srcset")
    ).toBe("/public/img/users/user@4x.jpg");
  });

  it("show user name", async () => {
    createComponent({ store });
    expect(wrapper.find('[data-test="user-data-name"]').text()).toBe(
      "Вася Пупкин"
    );
  });

  it("show phone", async () => {
    createComponent({ store });
    expect(wrapper.find('[data-test="user-data-phone"]').text()).toBe(
      "+777 777 777"
    );
  });

  it("show empty address list", async () => {
    createComponent({ store });
    expect(wrapper.findAll('[data-test="user-data-address"]').length).toBe(0);
  });

  it("show address in address list", async () => {
    fillAddressesData(store);
    createComponent({ store });
    expect(wrapper.findAll('[data-test="user-data-address"]').length).toBe(1);
    expect(wrapper.find('[data-test="user-data-address"]').text()).toContain(
      "name"
    );
    expect(wrapper.find('[data-test="user-data-address"]').text()).toContain(
      "street, house, flat"
    );
    expect(wrapper.find('[data-test="user-data-address"]').text()).toContain(
      "comment"
    );
  });

  it("do not show address form", async () => {
    createComponent({ store });
    expect(
      wrapper.find('[data-test="user-data-address-form"]').exists()
    ).toBeFalsy();
  });

  it("show address form after add address button click", async () => {
    createComponent({ store });
    await wrapper.find('[data-test="user-data-add-address"]').trigger("click");
    expect(
      wrapper.find('[data-test="user-data-address-form"]').exists()
    ).toBeTruthy();
  });

  it("save address", async () => {
    createComponent({ store, mocks });
    await wrapper.find('[data-test="user-data-add-address"]').trigger("click");
    await wrapper
      .findComponent(AddressForm)
      .vm.$emit("save", { param: "value" });
    expect(actions.Addresses.save).toHaveBeenCalledWith(expect.any(Object), {
      param: "value",
    });
    await Vue.nextTick();
    expect(mocks.$notifier.success).toHaveBeenCalled();
  });

  it("edit address", async () => {
    fillAddressesData(store);
    createComponent({ store, mocks });
    await wrapper.find('[data-test="user-data-address-edit"]').trigger("click");
    expect(actions.Addresses.deleteUnsaved).toHaveBeenCalled();
    expect(
      wrapper.find('[data-test="user-data-address-form"]').exists()
    ).toBeTruthy();
  });
});
