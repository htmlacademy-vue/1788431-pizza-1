<template>
  <p>Итого: {{ price }} ₽</p>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "PriceCounter",

  computed: {
    ...mapGetters("Builder", ["price"]),
  },

  methods: {},
};
</script>
