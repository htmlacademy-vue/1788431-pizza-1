<template>
  <main class="content">
    <form
      action="#"
      method="post"
    >
      <div class="content__wrapper">
        <h1 class="title title--big">
          Конструктор пиццы
        </h1>

        <DoughSelector />

        <SizeSelector />

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингридиенты
            </h2>

            <div class="sheet__content ingredients">
              <SauceSelector />

              <IngredientsSelector />
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              v-model="pizzaName"
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
              data-test="builder-name"
            />
          </label>

          <PizzaView />

          <div class="content__result">
            <PriceCounter />
            <button
              type="button"
              class="button"
              :class="{ 'button--disabled': !orderAllowed }"
              :disabled="!orderAllowed"
              data-test="builder-to-cart"
              @click="onToCartClick"
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
import DoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import SizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import SauceSelector from "@/modules/builder/components/BuilderSauceSelector";
import IngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import PriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import PizzaView from "@/modules/builder/components/BuilderPizzaView";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "BuilderView",
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
      default: 0,
    },
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
  async created() {
    await this.fetchData();
    if (this.pizzaIdToEdit) {
      const pizzaData = this.getPizzaDataById(this.pizzaIdToEdit);
      await this.loadDataFromCart(pizzaData);
    } else {
      this.resetValues();
    }
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
