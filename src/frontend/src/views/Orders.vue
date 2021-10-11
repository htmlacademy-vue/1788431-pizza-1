<template>
  <div>
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>
    <Order v-for="order in orders" :key="order.id" :order="order"></Order>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Order from "@/modules/orders/components/Order";

export default {
  name: "Orders",
  components: {
    Order,
  },
  computed: {
    ...mapState("Orders", {
      orders: (state) => state.orders,
    }),
  },
  methods: {
    ...mapActions("Orders", { fetchOrders: "fetch" }),
    ...mapActions("Addresses", { fetchAddresses: "fetch" }),
    ...mapActions("Builder", { fetchBuilderData: "fetchData" }),
    ...mapActions("Cart", { fetchMiscData: "fetchMiscData" }),
  },
  async created() {
    await this.fetchAddresses();
    await this.fetchBuilderData();
    await this.fetchMiscData();
    await this.fetchOrders();
  },
};
</script>
