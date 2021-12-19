<template>
  <p>Итого: {{ price }} ₽</p>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "BuilderPriceCounter",

  computed: {
    ...mapGetters("Builder", ["price"]),
  },

  methods: {},
};
</script>
