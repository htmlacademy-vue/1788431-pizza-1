import { shallowMount } from "@vue/test-utils";
import AppNotifications from "@/common/components/AppNotifications.vue";
import Vue from "vue";
import store from "@/store";
import { ADD_NOTIFICATION, DELETE_NOTIFICATION } from "@/store/mutations-types";

describe("AppNotofocations.vue", () => {
  const mocks = {
    $store: store,
  };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppNotifications, options);
  };

  afterEach(() => {
    wrapper.destroy();
    mocks.$store.state.notifications = [];
  });

  it("render on notification income", () => {
    mocks.$store.commit(ADD_NOTIFICATION, { text: "message", type: "success" });
    createComponent({ mocks });
    expect(wrapper.html()).toBeTruthy();
  });

  it("it doesn't render out when no notifications", () => {
    createComponent({ mocks });
    expect(wrapper.html()).toBeFalsy();
  });

  it("render success notification", () => {
    mocks.$store.commit(ADD_NOTIFICATION, { text: "message", type: "success" });
    createComponent({ mocks });
    expect(wrapper.html()).toContain("message");
    expect(wrapper.html()).toContain("notification--success");
  });

  it("render error notification", () => {
    mocks.$store.commit(ADD_NOTIFICATION, { text: "message", type: "error" });
    createComponent({ mocks });
    expect(wrapper.html()).toContain("message");
    expect(wrapper.html()).toContain("notification--error");
  });

  it("render two notifications", () => {
    mocks.$store.commit(ADD_NOTIFICATION, { text: "message", type: "success" });
    mocks.$store.commit(ADD_NOTIFICATION, { text: "message", type: "error" });
    createComponent({ mocks });
    expect(wrapper.findAll(".notification").length).toBe(2);
  });

  it("hide notification", async () => {
    mocks.$store.commit(ADD_NOTIFICATION, {
      text: "message",
      type: "success",
      id: 1,
    });
    mocks.$store.commit(ADD_NOTIFICATION, {
      text: "message",
      type: "success",
      id: 2,
    });
    createComponent({ mocks });
    mocks.$store.commit(DELETE_NOTIFICATION, 1);
    await Vue.nextTick();
    expect(wrapper.findAll(".notification").length).toBe(1);
  });
});
