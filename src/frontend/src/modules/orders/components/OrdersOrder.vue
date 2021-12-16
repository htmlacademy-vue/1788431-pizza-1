<template>
  <section class="sheet order">
    <div class="order__wrapper">
      <div class="order__number" data-test="order-number">
        <b>Заказ #{{ order.id }}</b>
      </div>

      <div class="order__sum">
        <span data-test="order-price">Сумма заказа: {{ order.price }} ₽</span>
      </div>

      <div class="order__button">
        <button
          type="button"
          class="button button--border"
          @click="onDeleteClick"
          data-test="order-delete"
        >
          Удалить
        </button>
      </div>
      <div class="order__button">
        <button
          type="button"
          class="button"
          @click="onRepeatClick"
          data-test="order-repeat"
        >
          Повторить
        </button>
      </div>
    </div>

    <ul class="order__list">
      <li
        v-for="pizza in order.orderPizzas"
        :key="pizza.id"
        class="order__item"
        data-test="order-pizza"
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
            <h2 data-test="order-pizza-name">{{ pizza.name }}</h2>
            <ul>
              <li data-test="order-pizza-size">
                {{ pizza.humanize.size }}, {{ pizza.humanize.dough }}
              </li>
              <li data-test="order-pizza-sauce">
                Соус: {{ pizza.humanize.sauce }}
              </li>
              <li data-test="order-pizza-ingredients">
                Начинка: {{ pizza.humanize.ingredients }}
              </li>
            </ul>
          </div>
        </div>

        <p class="order__price" data-test="order-pizza-price">
          {{ pizza.price }} ₽
        </p>
      </li>
    </ul>

    <ul class="order__additional">
      <li
        v-for="misc in order.orderMisc"
        :key="misc.id"
        data-test="order-miscs"
      >
        <span class="order-misc" :class="misc.code"></span>
        <p>
          <span data-test="order-misc-name">{{ misc.name }}</span>
          <b data-test="order-misc-price"
            >{{ misc.totalPrice }} ₽ ({{ misc.quantity }} * {{ misc.price }})</b
          >
        </p>
      </li>
    </ul>

    <p v-if="order.address" class="order__address" data-test="order-address">
      Адрес доставки: {{ order.address }}
    </p>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "OrdersOrder",
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
