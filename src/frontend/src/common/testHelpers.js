import { SET_ENTITY } from "@/store/mutations-types";
import users from "@/static/users";
import pizza from "@/static/pizza";

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
