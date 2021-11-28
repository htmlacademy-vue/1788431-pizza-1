import { mount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import SignIn from "@/views/SignIn.vue";
import $validator from "@/common/mixins/validator";

describe("SignIn.vue", () => {
  let actions;
  let store;
  let wrapper;
  let mocks = {
    $router: {
      push: jest.fn(),
    },
    $validator,
  };

  const createComponent = (options) => {
    wrapper = mount(SignIn, options);
  };

  beforeEach(() => {
    actions = {
      Auth: { login: jest.fn() },
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

  it("should validate fields before signin", async () => {
    createComponent({ store, mocks });
    const spyValidateFields = jest.spyOn(wrapper.vm, "$validateFields");
    await wrapper.find('[data-test="signin-button"]').trigger("click");
    expect(spyValidateFields).toHaveBeenCalled();
  });

  it("should not sign in if fields is empty", async () => {
    createComponent({ store, mocks });
    await wrapper.find('[data-test="signin-button"]').trigger("click");
    expect(actions.Auth.login).not.toHaveBeenCalled();
  });

  it("should sign in", async () => {
    createComponent({ store, mocks });
    await wrapper
      .find('[data-test="signin-email"] input')
      .setValue("email@email.ru");
    await wrapper
      .find('[data-test="signin-password"] input')
      .setValue("password");
    await wrapper.find('[data-test="signin-button"]').trigger("click");
    expect(actions.Auth.login).toHaveBeenCalledWith(expect.any(Object), {
      email: "email@email.ru",
      password: "password",
    });
  });

  it("should not sign in if email is incorrect", async () => {
    createComponent({ store, mocks });
    await wrapper
      .find('[data-test="signin-email"] input')
      .setValue("email@email");
    await wrapper
      .find('[data-test="signin-password"] input')
      .setValue("password");
    await wrapper.find('[data-test="signin-button"]').trigger("click");
    expect(actions.Auth.login).not.toHaveBeenCalled();
  });

  it("should not sign in if no password typed", async () => {
    createComponent({ store, mocks });
    await wrapper
      .find('[data-test="signin-email"] input')
      .setValue("email@email.ru");
    await wrapper.find('[data-test="signin-button"]').trigger("click");
    expect(actions.Auth.login).not.toHaveBeenCalled();
  });
});
