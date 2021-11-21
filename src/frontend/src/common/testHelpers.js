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
