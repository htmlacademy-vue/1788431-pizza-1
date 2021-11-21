import { SET_ENTITY } from "@/store/mutations-types";
import users from "@/static/users";
import pizza from "@/static/pizza";
import misc from "@/static/misc";

export const authenticateUser = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Auth",
      entity: "user",
      value: users[0],
    },
    { root: true }
  );
  store.commit(
    SET_ENTITY,
    {
      module: "Auth",
      entity: "isAuthenticated",
      value: true,
    },
    { root: true }
  );
};

export const fillPizzaData = (store) => {
  store.commit("Builder/setData", {
    doughs: pizza.dough,
    sauces: pizza.sauces,
    sizes: pizza.sizes,
    ingredients: pizza.ingredients,
  });
  store.commit("Builder/setDefaults");
};

export const fillMiscData = (store) => {
  store.commit("Cart/setMiscData", misc);
};

export const pizzaData1 = {
  id: 1,
  pizzaName: "pizza",
  selectedDoughId: 1,
  selectedSauceId: 1,
  selectedSizeId: 1,
  selectedIngredients: { 1: 2, 2: 1 },
  price: 458,
  count: 1,
  humanize: {
    dough: "на тонком тесте",
    sauce: "томатный",
    size: "23 см",
    ingredients: "грибы, чеддер",
  },
};

export const pizzaData2 = {
  id: 2,
  pizzaName: "pizza",
  selectedDoughId: 1,
  selectedSauceId: 1,
  selectedSizeId: 1,
  selectedIngredients: { 1: 2, 2: 1 },
  price: 458,
  count: 1,
  humanize: {
    dough: "на тонком тесте",
    sauce: "томатный",
    size: "23 см",
    ingredients: "грибы, чеддер",
  },
};

export const orderData1 = {
  id: 1,
  phone: "",
  userId: "12e9c73e-7711-44d7-9546-4b59e9838120",
  addressId: null,
  address: "адрес",
  orderPizzas: [
    {
      id: 1,
      name: "pizza",
      quantity: 1,
      sauceId: 1,
      doughId: 1,
      sizeId: 1,
      orderId: 1,
      ingredients: [
        { id: 1, quantity: 1, pizzaId: 1, ingredientId: 1 },
        { id: 2, quantity: 2, pizzaId: 1, ingredientId: 2 },
      ],
      price: 467,
      humanize: {
        dough: "на тонком тесте",
        sauce: "томатный",
        size: "23 см",
        ingredients: "грибы, чеддер",
      },
    },
  ],
  orderMisc: [
    {
      id: 1,
      quantity: 1,
      orderId: 1,
      miscId: 1,
      price: 56,
      name: "Cola-Cola 0,5 литра",
      code: "cola",
      totalPrice: 56,
    },
  ],
  price: 523,
};

export const orderData2 = {
  id: 1,
  phone: "",
  userId: "12e9c73e-7711-44d7-9546-4b59e9838120",
  addressId: null,
  orderPizzas: [],
  orderMisc: [],
  price: 0,
};
