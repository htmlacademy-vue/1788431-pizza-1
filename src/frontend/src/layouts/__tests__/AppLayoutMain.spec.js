import { RouterLinkStub, shallowMount } from "@vue/test-utils";
import AppLayoutMain from "@/layouts/AppLayoutMain";
import { generateMockStore } from "@/store/mocks";
import AppNotifications from "@/common/components/AppNotifications";
import Thanx from "@/views/ThanxView";
import Header from "@/components/HeaderComponent";
import Vue from "vue";

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
  Thanx,
  Header,
  RouterLink: RouterLinkStub,
};

describe("AppLayoutMain.vue", () => {
  let wrapper;
  let store;
  const createComponent = (options) => {
    wrapper = shallowMount(AppLayoutMain, options);
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

  it("do not show thanx", () => {
    createComponent({ store, mocks, stubs });
    expect(wrapper.find('[data-test="layout-thanx"]').exists()).toBeFalsy();
  });

  it("show thanx", async () => {
    createComponent({ store, mocks, stubs });
    store.commit("App/showThanx");
    await Vue.nextTick();
    expect(wrapper.find('[data-test="layout-thanx"]').exists()).toBeTruthy();
  });
});
