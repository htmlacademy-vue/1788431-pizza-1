import { shallowMount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import Thanx from "@/components/Thanx.vue";

describe("Thanx.vue", () => {
  let actions;
  let store;
  let wrapper;
  let mocks = {
    $router: {
      push: jest.fn(),
    },
  };

  const createComponent = (options) => {
    wrapper = shallowMount(Thanx, options);
  };

  beforeEach(() => {
    actions = {
      App: { hideThanx: jest.fn() },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should call hideThanx on close button click", async () => {
    createComponent({ store, mocks });
    await wrapper.find('[data-test="thanx-close"]').trigger("click");
    expect(actions.App.hideThanx).toHaveBeenCalled();
  });

  it("should route to orders page on close button click", async () => {
    createComponent({ store, mocks });
    await wrapper.find('[data-test="thanx-close"]').trigger("click");
    expect(mocks.$router.push).toHaveBeenCalledWith({ name: "Orders" });
  });

  it("should call hideThanx on ok button push", async () => {
    createComponent({ store, mocks });
    await wrapper.find('[data-test="thanx-ok"]').trigger("click");
    expect(actions.App.hideThanx).toHaveBeenCalled();
  });

  it("should route to orders page on ok button push", async () => {
    createComponent({ store, mocks });
    await wrapper.find('[data-test="thanx-ok"]').trigger("click");
    expect(mocks.$router.push).toHaveBeenCalledWith({ name: "Orders" });
  });
});
