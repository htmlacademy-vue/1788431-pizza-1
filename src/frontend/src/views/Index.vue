<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <DoughSelector :doughs="pizza.dough"></DoughSelector>

        <SizeSelector :sizes="pizza.sizes"></SizeSelector>

        <div class="content__ingridients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингридиенты
            </h2>

            <div class="sheet__content ingridients">
              <SauceSelector :sauces="pizza.sauces"></SauceSelector>

              <IngredientsSelector
                :ingredients="pizza.ingredients"
              ></IngredientsSelector>
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
            />
          </label>

          <div class="content__constructor">
            <div class="pizza pizza--foundation--big-tomato">
              <div class="pizza__wrapper">
                <div class="pizza__filling pizza__filling--ananas"></div>
                <div class="pizza__filling pizza__filling--bacon"></div>
                <div class="pizza__filling pizza__filling--cheddar"></div>
              </div>
            </div>
          </div>

          <div class="content__result">
            <p>Итого: 0 ₽</p>
            <button type="button" class="button button--disabled" disabled>
              Готовьте!
            </button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import pizza from "@/static/pizza.json";
import DoughSelector from "@/modules/builder/components/DoughSelector";
import SizeSelector from "@/modules/builder/components/SizeSelector";
import SauceSelector from "@/modules/builder/components/SauceSelector";
import IngredientsSelector from "@/modules/builder/components/IngredientsSelector";

export default {
  name: "Index",
  components: {
    DoughSelector,
    SizeSelector,
    SauceSelector,
    IngredientsSelector,
  },
  data() {
    return {
      pizza: pizza,
    };
  },
};
</script>

<style lang="scss"></style>
