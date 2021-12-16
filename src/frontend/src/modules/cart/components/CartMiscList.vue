<template>
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

          <div class="additional-list__price" data-test="price">
            <b>{{ misc.totalPrice || 0 }} ₽</b>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ItemCounter from "@/common/components/ItemCounter";

export default {
  name: "CartMiscList",
  components: {
    ItemCounter,
  },

  computed: {
    ...mapGetters("Cart", ["miscData"]),
  },

  methods: {
    ...mapActions("Cart", ["changeMisc"]),
    onMiscChange(miscId, delta) {
      this.changeMisc({ miscId, delta });
    },
  },
};
</script>
