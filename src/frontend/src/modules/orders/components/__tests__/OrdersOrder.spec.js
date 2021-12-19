import { shallowMount } from "@vue/test-utils";
import OrdersOrder from "@/modules/orders/components/OrdersOrder.vue";
import { generateMockStore } from "@/store/mocks";
import { orderData1, orderData2 } from "@/common/testHelpers";

describe("OrdersOrder.vue", () => {
  let wrapper;
  let store;
  let propsData = {
    order: orderData1,
  };
  const mocks = {
    $notifier: {
      success: jest.fn(),
    },
    $router: {
      push: jest.fn(),
    },
  };
  const actions = {
    Orders: {
      delete: jest.fn(),
    },
    Cart: {
      repeatFromOrder: jest.fn(),
    },
  };

  const createComponent = (options) => {
    wrapper = shallowMount(OrdersOrder, options);
  };

  beforeEach(async () => {
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", async () => {
    createComponent({
      store,
      propsData,
    });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("show order id", () => {
    createComponent({
      store,
      propsData,
    });
    expect(wrapper.find('[data-test="order-number"]').text()).toBe(
      "Заказ #" + orderData1.id
    );
  });

  it("show price", () => {
    createComponent({
      store,
      propsData,
    });
    expect(wrapper.find('[data-test="order-price"]').text()).toBe(
      "Сумма заказа: " + orderData1.price + " ₽"
    );
  });

  it("show pizzas", () => {
    createComponent({
      store,
      propsData,
    });
    expect(wrapper.findAll('[data-test="order-pizza"]').length).toBe(
      orderData1.orderPizzas.length
    );
  });

  it("show pizzas name", () => {
    createComponent({
      store,
      propsData,
    });
    expect(wrapper.find('[data-test="order-pizza-name"]').text()).toBe(
      orderData1.orderPizzas[0].name
    );
  });

  it("show pizzas name", () => {
    createComponent({
      store,
      propsData,
    });
    expect(wrapper.find('[data-test="order-pizza-name"]').text()).toBe(
      orderData1.orderPizzas[0].name
    );
  });

  it("show pizzas humanize", () => {
    createComponent({
      store,
      propsData,
    });
    expect(wrapper.find('[data-test="order-pizza-size"]').text()).toContain(
      orderData1.orderPizzas[0].humanize.size
    );
    expect(wrapper.find('[data-test="order-pizza-size"]').text()).toContain(
      orderData1.orderPizzas[0].humanize.dough
    );
    expect(wrapper.find('[data-test="order-pizza-sauce"]').text()).toBe(
      "Соус: " + orderData1.orderPizzas[0].humanize.sauce
    );
    expect(wrapper.find('[data-test="order-pizza-ingredients"]').text()).toBe(
      "Начинка: " + orderData1.orderPizzas[0].humanize.ingredients
    );
  });

  it("show pizzas price", () => {
    createComponent({
      store,
      propsData,
    });
    expect(wrapper.find('[data-test="order-pizza-price"]').text()).toBe(
      orderData1.orderPizzas[0].price + " ₽"
    );
  });

  it("show miscs", () => {
    createComponent({
      store,
      propsData,
    });
    expect(wrapper.findAll('[data-test="order-pizza-price"]').length).toBe(
      orderData1.orderMisc.length
    );
  });

  it("show misc name", () => {
    createComponent({
      store,
      propsData,
    });
    expect(wrapper.find('[data-test="order-misc-name"]').text()).toBe(
      orderData1.orderMisc[0].name
    );
  });

  it("show misc price", () => {
    createComponent({
      store,
      propsData,
    });
    expect(wrapper.find('[data-test="order-misc-price"]').text()).toBe(
      "56 ₽ (1 * 56)"
    );
  });

  it("show order address", () => {
    createComponent({
      store,
      propsData,
    });
    expect(wrapper.find('[data-test="order-address"]').text()).toBe(
      "Адрес доставки: адрес"
    );
  });

  it("should not show order address", () => {
    createComponent({
      store,
      propsData: {
        order: orderData2,
      },
    });
    expect(wrapper.find('[data-test="order-address"]').exists()).toBeFalsy();
  });

  it("should call delete action", async () => {
    createComponent({
      store,
      propsData,
      mocks,
    });
    await wrapper.find('[data-test="order-delete"]').trigger("click");
    expect(actions.Orders.delete).toHaveBeenCalledWith(
      expect.any(Object),
      orderData1.id
    );
    expect(mocks.$notifier.success).toHaveBeenCalled();
  });

  it("should call repeatFromOrder action", async () => {
    createComponent({
      store,
      propsData,
      mocks,
    });
    await wrapper.find('[data-test="order-repeat"]').trigger("click");
    expect(actions.Cart.repeatFromOrder).toHaveBeenCalledWith(
      expect.any(Object),
      orderData1
    );
    expect(mocks.$notifier.success).toHaveBeenCalled();
  });
});
