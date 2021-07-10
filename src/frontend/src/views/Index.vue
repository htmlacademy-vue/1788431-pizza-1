<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>

            <div class="sheet__content dough">
              <label
                v-for="dough in doughs"
                v-bind:key="dough.name"
                class="dough__input"
                :class="dough.style"
              >
                <input
                  type="radio"
                  name="dough"
                  :value="dough.value"
                  class="visually-hidden"
                  v-model="selectedDough"
                />
                <b>{{ dough.name }}</b>
                <span>{{ dough.description }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="content__diameter">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>

            <div class="sheet__content diameter">
              <label
                v-for="size in sizes"
                v-bind:key="size.value"
                class="diameter__input"
                :class="size.style"
              >
                <input
                  type="radio"
                  name="diameter"
                  :value="size.value"
                  class="visually-hidden"
                  v-model="selectedSize"
                />
                <span>{{ size.name }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="content__ingridients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингридиенты
            </h2>

            <div class="sheet__content ingridients">
              <div class="ingridients__sauce">
                <p>Основной соус:</p>

                <label
                  v-for="sauce in sauces"
                  v-bind:key="sauce.name"
                  class="radio ingridients__input"
                >
                  <input
                    type="radio"
                    name="sauce"
                    :value="sauce.value"
                    v-model="selectedSauce"
                  />
                  <span>{{ sauce.name }}</span>
                </label>
              </div>

              <div class="ingridients__filling">
                <p>Начинка:</p>

                <ul class="ingridients__list">
                  <li
                    v-for="ingredient in ingredients"
                    v-bind:key="ingredient.name"
                    class="ingridients__item"
                  >
                    <span class="filling" :class="ingredient.style">{{
                      ingredient.name
                    }}</span>

                    <div class="counter counter--orange ingridients__counter">
                      <button
                        type="button"
                        class="
                          counter__button
                          counter__button--disabled
                          counter__button--minus
                        "
                      >
                        <span class="visually-hidden">Меньше</span>
                      </button>
                      <input
                        type="text"
                        name="counter"
                        class="counter__input"
                        value="0"
                      />
                      <button
                        type="button"
                        class="counter__button counter__button--plus"
                      >
                        <span class="visually-hidden">Больше</span>
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
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

export default {
  name: "Index",
  data() {
    return {
      doughs: pizza.dough.map((dough) => this.normalizeDough(dough)),
      selectedDough: this.getDefaultDoughValue(),
      ingredients: pizza.ingredients.map((ingredient) =>
        this.normalizeIngredient(ingredient)
      ),
      sauces: pizza.sauces.map((sauce) => this.normalizeSauce(sauce)),
      selectedSauce: this.getDefaultSauceValue(),
      sizes: pizza.sizes.map((size) => this.normalizeSize(size)),
      selectedSize: this.getDefaultSizeValue(),
    };
  },

  methods: {
    normalizeDough(dough) {
      return {
        ...dough,
        style: "dough__input--" + dough.value,
      };
    },
    getDefaultDoughValue() {
      const defaultDough = pizza.dough.find((dough) => dough.default);
      return defaultDough ? defaultDough.value : null;
    },
    normalizeIngredient(ingredient) {
      return {
        ...ingredient,
        style: "filling--" + ingredient.value,
      };
    },
    normalizeSauce(sauce) {
      debugger;
      return {
        ...sauce,
      };
    },
    getDefaultSauceValue() {
      const defaultSauce = pizza.sauces.find((sauce) => sauce.default);
      return defaultSauce ? defaultSauce.value : null;
    },
    normalizeSize(size) {
      return {
        ...size,
        style: "diameter__input--" + size.value,
      };
    },
    getDefaultSizeValue() {
      const defaultSize = pizza.sizes.find((size) => size.default);
      return defaultSize ? defaultSize.value : null;
    },
  },
};
</script>

<style lang="scss"></style>
