import { shallowMount } from "@vue/test-utils";
import AppLayout from "@/layouts/AppLayout";
import { generateMockStore } from "@/store/mocks";
import AppNotifications from "@/common/components/AppNotifications";

const mocks = {
  $store: {
    state: {
      notifications: [],
    },
  },
  $route: {
    meta: {
      layout: "",
    },
  },
};

const stubs = {
  AppNotifications,
};

describe("AppLayout", () => {
  let wrapper;
  let store;
  const createComponent = (options) => {
    wrapper = shallowMount(AppLayout, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ store, mocks, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });
});
