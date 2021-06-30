<template>
  <div id="app">
    <div class="main">
      <div class="main__wrapper">
        <div class="main__header">
          <img
            src="@/assets/img/logo.svg"
            width="300"
            height="47"
            alt="V!U!E! Pizza"
          />
        </div>
        <h1>Добро пожаловать!</h1>
        <p>
          Это проект V!U!E! Pizza для обучения на профессиональном
          онлайн‑курсе<br />
          <b>«Vue.js для опытных разработчиков».</b>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
