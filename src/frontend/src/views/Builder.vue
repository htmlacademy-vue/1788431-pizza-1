<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <DoughSelector></DoughSelector>

        <SizeSelector></SizeSelector>

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингридиенты
            </h2>

            <div class="sheet__content ingredients">
              <SauceSelector></SauceSelector>

              <IngredientsSelector></IngredientsSelector>
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
              v-model="pizzaName"
              data-test="builder-name"
            />
          </label>

          <PizzaView></PizzaView>

          <div class="content__result">
            <PriceCounter></PriceCounter>
            <button
              type="button"
              class="button"
              :class="{ 'button--disabled': !orderAllowed }"
              :disabled="!orderAllowed"
              @click="onToCartClick"
              data-test="builder-to-cart"
            >
              Готовьте!
            </button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import DoughSelector from "@/modules/builder/components/DoughSelector";
import SizeSelector from "@/modules/builder/components/SizeSelector";
import SauceSelector from "@/modules/builder/components/SauceSelector";
import IngredientsSelector from "@/modules/builder/components/IngredientsSelector";
import PriceCounter from "@/modules/builder/components/PriceCounter";
import PizzaView from "@/modules/builder/components/PizzaView";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Builder",
  components: {
    DoughSelector,
    SizeSelector,
    SauceSelector,
    IngredientsSelector,
    PriceCounter,
    PizzaView,
  },
  props: {
    pizzaIdToEdit: {
      type: Number,
    },
  },
  async created() {
    if (this.pizzaIdToEdit) {
      const pizzaData = this.getPizzaDataById(this.pizzaIdToEdit);
      await this.loadDataFromCart(pizzaData);
    } else {
      this.resetValues();
    }
    await this.fetchData();
  },
  computed: {
    ...mapGetters("Builder", ["getPizzaName", "orderAllowed", "pizzaData"]),
    ...mapGetters("Cart", ["getPizzaDataById"]),
    pizzaName: {
      get() {
        return this.getPizzaName;
      },
      set(pizzaName) {
        this.savePizzaName(pizzaName);
      },
    },
  },
  methods: {
    ...mapActions("Builder", [
      "fetchData",
      "savePizzaName",
      "loadDataFromCart",
      "resetValues",
    ]),
    ...mapActions("Cart", ["addPizza"]),
    onToCartClick() {
      this.addPizza(this.pizzaData);
      this.resetValues();
      this.$notifier.success("Пицца добавлена в корзину");
    },
  },
};
</script>

<style lang="scss"></style>
