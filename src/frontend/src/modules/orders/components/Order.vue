<template>
  <section class="sheet order">
    <div class="order__wrapper">
      <div class="order__number">
        <b>Заказ #{{ order.id }}</b>
      </div>

      <div class="order__sum">
        <span>Сумма заказа: {{ order.price }} ₽</span>
      </div>

      <div class="order__button">
        <button
          type="button"
          class="button button--border"
          @click="onDeleteClick"
        >
          Удалить
        </button>
      </div>
      <div class="order__button">
        <button type="button" class="button" @click="onRepeatClick">
          Повторить
        </button>
      </div>
    </div>

    <ul class="order__list">
      <li
        v-for="pizza in order.orderPizzas"
        :key="pizza.id"
        class="order__item"
      >
        <div class="product">
          <img
            src="@/assets/img/product.svg"
            class="product__img"
            width="56"
            height="56"
            alt="Капричоза"
          />
          <div class="product__text">
            <h2>{{ pizza.name }}</h2>
            <ul>
              <li>{{ pizza.humanize.size }}, {{ pizza.humanize.dough }}</li>
              <li>Соус: {{ pizza.humanize.sauce }}</li>
              <li>Начинка: {{ pizza.humanize.ingredients }}</li>
            </ul>
          </div>
        </div>

        <p class="order__price">{{ pizza.price }} ₽</p>
      </li>
    </ul>

    <ul class="order__additional">
      <li v-for="misc in order.orderMisc" :key="misc.id">
        <span class="order-misc" :class="misc.code"></span>
        <p>
          <span>{{ misc.name }}</span>
          <b
            >{{ misc.totalPrice }} ₽ ({{ misc.quantity }} * {{ misc.price }})</b
          >
        </p>
      </li>
    </ul>

    <p v-if="order.address" class="order__address">
      Адрес доставки: {{ order.address }}
    </p>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Order",
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState("Addresses", {
      addresses: (state) => state.addresses,
    }),
  },
  methods: {
    ...mapActions("Orders", ["delete", "repeat"]),
    async onDeleteClick() {
      await this.delete(this.order.id);
      this.$notifier.success("Заказ удален");
    },
    async onRepeatClick() {
      await this.repeat(this.order);
      this.$notifier.success("Заказ продублирован");
    },
  },
};
</script>

<style lang="scss">
.order-misc {
  display: inline-block;
  width: 20px !important;
  height: 30px !important;
  background-repeat: no-repeat;
  background-size: contain;
}
.cola {
  background-image: url("~@/assets/img/cola.svg");
}
.sauce {
  background-image: url("~@/assets/img/sauce.svg");
}
.potato {
  background-image: url("~@/assets/img/potato.svg");
}
</style>
