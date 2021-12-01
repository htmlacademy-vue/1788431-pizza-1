import { shallowMount } from "@vue/test-utils";
import AppLayoutEmpty from "@/layouts/AppLayoutEmpty";
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

describe("AppLayoutEmpty", () => {
  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppLayoutEmpty, options);
  };

  it("is rendered", () => {
    createComponent({ stubs, mocks });
    expect(wrapper.exists()).toBeTruthy();
  });
});
