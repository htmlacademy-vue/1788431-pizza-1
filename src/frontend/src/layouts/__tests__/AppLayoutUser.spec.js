import { RouterLinkStub, shallowMount } from "@vue/test-utils";
import AppLayoutUser from "@/layouts/AppLayoutUser";
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
  RouterLink: RouterLinkStub,
};

describe("AppLayoutUser.vue", () => {
  let wrapper;
  let store;
  const createComponent = (options) => {
    wrapper = shallowMount(AppLayoutUser, options);
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
