<template>
  <header class="header">
    <div class="header__logo">
      <a class="logo">
        <img
          src="@/assets/img/logo.svg"
          alt="VueWork logo"
          width="147"
          height="23"
        />
      </a>
    </div>
    <div>
      <form action="#" class="header__search">
        <input
          :value="filters.search"
          type="search"
          name="search"
          required
          placeholder="Поиск"
          @input="
            $emit('applyFilters', {
              item: $event.target.value,
              entity: 'search',
            })
          "
        />
        <button type="submit">Найти</button>
      </form>
    </div>
  </header>
</template>

<script>
export default {
  name: "AppLayoutHeader",
  props: {
    filters: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
