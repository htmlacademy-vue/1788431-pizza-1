<template>
  <div v-if="notifications.length" class="notification__wrapper">
    <div
      v-for="({ text, type }, i) in notifications"
      :key="i"
      :class="`notification notification--${type}`"
    >
      <span>{{ text }}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Notifications",
  computed: {
    ...mapState(["notifications"]),
  },
};
</script>

<style lang="scss" scoped>
.notification {
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  padding: 20px;

  text-align: center;

  color: #ffffff;
  border-bottom: 2px solid transparent;

  &__wrapper {
    position: fixed;
    z-index: 9999;
    top: 61px;
    right: 0;

    width: 420px;
    padding: 10px;
  }

  &--info {
    border-color: #1e88e5;
    background: #b2ebf2;
  }

  &--error {
    border-color: #e53935;
    background: #e57373;
  }

  &--success {
    border-color: #38a413;
    background: #8cb97c;
  }

  &--warning {
    border-color: #ff9800;
    background: #ed6300;
  }
}
</style>
