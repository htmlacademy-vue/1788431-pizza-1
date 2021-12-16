import { shallowMount } from "@vue/test-utils";
import HeaderComponent from "@/components/HeaderComponent.vue";
import { generateMockStore } from "@/store/mocks";
import { authenticateUser } from "@/common/testHelpers";

describe("HeaderComponent.vue", () => {
  let wrapper;
  const stubs = ["router-link"];
  let store;
  let actions;

  const mocks = {
    $router: {
      push: jest.fn(),
    },
    $notifier: {
      success: jest.fn(),
    },
  };

  const createComponent = (options) => {
    wrapper = shallowMount(HeaderComponent, options);
  };

  beforeEach(() => {
    actions = {
      Auth: {
        logout: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ store, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("show zero price", () => {
    createComponent({ store, stubs });
    expect(wrapper.find(".header__cart").text()).toBe("0 ₽");
  });

  it("show price", () => {
    store.state.Cart.pizzas = [{ count: 2, price: 123 }];
    createComponent({ store, stubs });
    expect(wrapper.find(".header__cart").text()).toBe("246 ₽");
  });

  it("show login button", () => {
    createComponent({ store, stubs });
    expect(wrapper.find(".header__user").text()).toBe("Войти");
  });

  it("show logout button", () => {
    authenticateUser(store);
    createComponent({ store, stubs });
    expect(wrapper.find(".header__user").text()).toBe("Вася Пупкин Выйти");
  });

  it("calls logout on logout button click", async () => {
    authenticateUser(store);
    createComponent({ store, stubs, mocks });
    const logoutBtn = wrapper.find('[data-test="logout-btn"]');
    await logoutBtn.trigger("click");
    expect(actions.Auth.logout).toHaveBeenCalled();
    expect(mocks.$router.push).toHaveBeenCalledWith("/login");
  });
});
