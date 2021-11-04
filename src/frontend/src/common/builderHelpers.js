import each from "lodash/each";
import mapValues from "lodash/mapValues";
import keyBy from "lodash/keyBy";

export const humanizePizza = ({
  sauces,
  sizes,
  ingredients,
  doughId,
  sauceId,
  sizeId,
  selectedIngredients,
}) => {
  const humanizedDoughs = {
    1: "на тонком тесте",
    2: "на толстом тесте",
  };
  const humanize = {};
  humanize.dough = humanizedDoughs[doughId];

  humanize.sauce = sauces
    .find((sauce) => sauce.id === sauceId)
    .name.toLowerCase();

  humanize.size = sizes.find((size) => size.id === sizeId).name;

  let humanizedIngredients = [];
  for (const selectedIngredientId in selectedIngredients) {
    const count = selectedIngredients[selectedIngredientId];
    if (count > 0) {
      const ingredient = ingredients.find(
        (ingredient) => ingredient.id === +selectedIngredientId
      );
      humanizedIngredients.push(ingredient.name.toLowerCase());
    }
  }
  humanize.ingredients = humanizedIngredients.join(", ");

  return humanize;
};

export const pizzaPrice = ({
  doughs,
  sauces,
  sizes,
  ingredients,
  doughId,
  sauceId,
  sizeId,
  selectedIngredients,
}) => {
  const selectedDough = doughs.find((dough) => dough.id === doughId);
  const selectedSauce = sauces.find((sauce) => sauce.id === sauceId);
  const selectedSize = sizes.find((size) => size.id === sizeId);

  let ingredientsPrice = 0;
  for (const selectedIngredientId in selectedIngredients) {
    const count = selectedIngredients[selectedIngredientId];
    const ingredient = ingredients.find(
      (ingredient) => ingredient.id === +selectedIngredientId
    );
    if (ingredient) {
      ingredientsPrice += ingredient.price * count;
    }
  }

  return (
    (selectedDough?.price + selectedSauce?.price + ingredientsPrice) *
    selectedSize?.multiplier
  );
};

export const processOrders = ({
  orders,
  doughs,
  sauces,
  sizes,
  ingredients,
  misc,
}) => {
  each(orders, (order) => {
    let orderPrice = 0;

    each(order.orderPizzas, (pizza) => {
      if (!pizza.price) {
        return;
      }

      const selectedIngredients = mapValues(
        keyBy(pizza.ingredients, "ingredientId"),
        "quantity"
      );
      const price = pizzaPrice({
        doughs,
        sauces,
        sizes,
        ingredients,
        doughId: pizza.doughId,
        sauceId: pizza.sauceId,
        sizeId: pizza.sizeId,
        selectedIngredients,
      });
      pizza.price = price * pizza.quantity;
      orderPrice += pizza.price;

      pizza.humanize = humanizePizza({
        sauces,
        sizes,
        ingredients,
        doughId: pizza.doughId,
        sauceId: pizza.sauceId,
        sizeId: pizza.sizeId,
        selectedIngredients,
      });
    });

    each(order.orderMisc, (miscData) => {
      const misc_ = misc.find((misc) => misc.id === miscData.miscId);
      miscData.price = misc_.price;
      miscData.name = misc_.name;
      miscData.code = misc_.code;
      miscData.totalPrice = misc_.price * miscData.quantity;
      orderPrice += miscData.totalPrice;
    });

    order.price = orderPrice;

    if (order.addressId) {
      order.address = order.orderAddress.name;
    } else if (order.orderAddress) {
      order.address =
        order.orderAddress.street +
        ", " +
        order.orderAddress.building +
        ", " +
        order.orderAddress.flat;
    }
  });
};
