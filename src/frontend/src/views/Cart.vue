<template>
  <form action="test.html" method="post" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div v-if="!pizzasCount" class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div>

        <template v-if="pizzasCount">
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
                    <li>
                      {{ pizza.humanize.size }}, {{ pizza.humanize.dough }}
                    </li>
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

        <div class="cart__additional">
          <ul class="additional-list">
            <li
              v-for="misc in miscData"
              :key="misc.id"
              class="additional-list__item sheet"
            >
              <p class="additional-list__description">
                <span class="misc" :class="misc.code"></span>
                <span>{{ misc.name }} ({{ misc.price || 0 }} ₽)</span>
              </p>

              <div class="additional-list__wrapper">
                <ItemCounter
                  additionalClass="additional-list__counter"
                  additionalButtonClass="counter__button--orange"
                  :value="misc.count"
                  @change="onMiscChange(misc.id, $event)"
                ></ItemCounter>

                <div class="additional-list__price">
                  <b>{{ misc.totalPrice || 0 }} ₽</b>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="cart__form">
          <div class="cart-form">
            <label class="cart-form__select">
              <span class="cart-form__label">Получение заказа:</span>

              <select name="test" class="select">
                <option value="1">Заберу сам</option>
                <option value="2">Новый адрес</option>
                <option value="3">Дом</option>
              </select>
            </label>

            <label class="input input--big-label">
              <span>Контактный телефон:</span>
              <input type="text" name="tel" placeholder="+7 999-999-99-99" />
            </label>

            <div class="cart-form__address">
              <span class="cart-form__label">Новый адрес:</span>

              <div class="cart-form__input">
                <label class="input">
                  <span>Улица*</span>
                  <input type="text" name="street" />
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Дом*</span>
                  <input type="text" name="house" />
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Квартира</span>
                  <input type="text" name="apartment" />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <section class="footer">
      <div class="footer__more">
        <router-link to="/" class="button button--border button--arrow"
          >Хочу еще одну</router-link
        >
      </div>
      <p class="footer__text">
        Перейти к конструктору<br />чтоб собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b>Итого: {{ totalPrice }} ₽</b>
      </div>

      <div class="footer__submit">
        <button type="submit" class="button">Оформить заказ</button>
      </div>
    </section>
  </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ItemCounter from "@/common/components/ItemCounter";

export default {
  name: "Cart",
  components: {
    ItemCounter,
  },
  computed: {
    ...mapGetters("Cart", ["pizzasCount", "pizzas", "totalPrice", "miscData"]),
  },
  created() {
    this.fetchMiscData();
  },
  methods: {
    ...mapActions("Cart", ["changeCount", "fetchMiscData", "changeMisc"]),
    onChange(pizzaName, delta) {
      this.changeCount({ pizzaName, delta });
    },
    onMiscChange(miscId, delta) {
      this.changeMisc({ miscId, delta });
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
.misc {
  display: inline-block;
  width: 39px !important;
  height: 60px !important;
  background-repeat: no-repeat;
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
