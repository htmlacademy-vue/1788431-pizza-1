<template>
  <form class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div v-if="!pizzasCount" class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div>

        <template v-if="pizzasCount">
          <PizzasList></PizzasList>
        </template>

        <Misc></Misc>

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
    <router-view></router-view>
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
        <button @click.prevent="onOrderClick" class="button">
          Оформить заказ
        </button>
      </div>
    </section>
  </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PizzasList from "@/modules/cart/components/PizzasList";
import Misc from "@/modules/cart/components/Misc";

export default {
  name: "Cart",
  components: {
    PizzasList,
    Misc,
  },
  computed: {
    ...mapGetters("Cart", ["pizzasCount", "totalPrice"]),
  },
  created() {
    this.fetchMiscData();
  },
  methods: {
    ...mapActions("Cart", ["fetchMiscData"]),
    onOrderClick() {
      this.$router.push({ name: "CartOrdered" });
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
