<template>
  <div class="sign-form">
    <a href="#" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </a>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form>
      <div class="sign-form__input">
        <label class="input">
          <span>E-mail</span>
          <input
            type="email"
            name="email"
            placeholder="example@mail.ru"
            v-model="email"
          />
        </label>
      </div>

      <div class="sign-form__input">
        <label class="input">
          <span>Пароль</span>
          <input
            type="password"
            name="password"
            placeholder="***********"
            v-model="password"
          />
        </label>
      </div>
      <button class="button" @click.prevent="onSubmit">Авторизоваться</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "SignIn",
  data: () => ({
    email: "",
    password: "",
  }),
  methods: {
    ...mapActions("Auth", ["login"]),
    async onSubmit() {
      await this.login({ email: this.email, password: this.password });
      await this.$router.push("/");
    },
  },
};
</script>

<style lang="scss"></style>
