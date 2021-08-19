<template>
  <ul class="cart-list sheet">
    <li
      v-for="(pizza, pizzaIndex) in pizzas"
      :key="pizzaIndex"
      class="cart-list__item"
    >
      <div class="product cart-list__product">
        <img
          src="@/assets/img/product.svg"
          class="product__img"
          width="56"
          height="56"
          alt="Капричоза"
        />
        <div class="product__text">
          <h2>{{ pizza.pizzaName }}</h2>
          <ul>
            <li>{{ pizza.humanize.size }}, {{ pizza.humanize.dough }}</li>
            <li>Соус: {{ pizza.humanize.sauce }}</li>
            <li>Начинка: {{ pizza.humanize.ingredients }}</li>
          </ul>
        </div>
      </div>

      <ItemCounter
        additionalClass="cart-list__counter"
        additionalButtonClass="counter__button--orange"
        :value="pizza.count"
        @change="onChange(pizza.pizzaName, $event)"
      ></ItemCounter>

      <div class="cart-list__price">
        <b>{{ pizza.price * pizza.count }} ₽</b>
      </div>

      <div class="cart-list__button">
        <button type="button" class="cart-list__edit">Изменить</button>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ItemCounter from "@/common/components/ItemCounter";

export default {
  name: "PizzasList",
  components: {
    ItemCounter,
  },

  computed: {
    ...mapGetters("Cart", ["pizzas"]),
  },

  methods: {
    ...mapActions("Cart", ["changeCount"]),
    onChange(pizzaName, delta) {
      this.changeCount({ pizzaName, delta });
    },
  },
};
</script>
