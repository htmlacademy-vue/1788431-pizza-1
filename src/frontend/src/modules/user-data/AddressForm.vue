<template>
  <form method="post" class="address-form address-form--opened sheet">
    <div class="address-form__header">
      <b>Адрес №1</b>
    </div>

    <div class="address-form__wrapper">
      <div class="address-form__input">
        <AppInput
          ref="name"
          v-model="address.name"
          name="name"
          class="input"
          placeholder="Название адреса*"
          :error-text="validations.name.error"
        />
      </div>
      <div class="address-form__input">
        <AppInput
          ref="street"
          v-model="address.street"
          name="street"
          class="input"
          placeholder="Введите название улицы*"
          :error-text="validations.street.error"
        />
      </div>
      <div class="address-form__input address-form__input--size--normal">
        <AppInput
          ref="building"
          v-model="address.building"
          name="building"
          class="input"
          placeholder="Дом*"
          :error-text="validations.building.error"
        />
      </div>
      <div class="address-form__input address-form__input--size--small">
        <AppInput
          ref="flat"
          v-model="address.flat"
          name="addr-apartment"
          class="input"
          placeholder="Квартира"
        />
      </div>
      <div class="address-form__input">
        <AppInput
          ref="comment"
          v-model="address.comment"
          name="comment"
          class="input"
          placeholder="Введите комментарий"
        />
      </div>
    </div>

    <div class="address-form__buttons">
      <button
        v-if="address.id"
        type="button"
        class="button button--transparent"
        @click="onDeleteAddressClick(address)"
      >
        Удалить
      </button>
      <button
        type="submit"
        class="button"
        @click.prevent="onSaveAddressClick(address)"
      >
        Сохранить
      </button>
    </div>
  </form>
</template>

<script>
import { validator } from "@/common/mixins";
import { mapActions } from "vuex";

export default {
  name: "AddressForm",
  props: ["address"],
  mixins: [validator],
  data() {
    return {
      validations: {
        name: {
          error: "",
          rules: ["required"],
        },
        street: {
          error: "",
          rules: ["required"],
        },
        building: {
          error: "",
          rules: ["required"],
        },
      },
    };
  },
  watch: {
    "address.name"() {
      this.$clearValidationErrors();
    },
    "address.street"() {
      this.$clearValidationErrors();
    },
    "address.building"() {
      this.$clearValidationErrors();
    },
  },
  methods: {
    ...mapActions("Addresses", ["delete"]),
    async onDeleteAddressClick(address) {
      this.delete(address);
      this.$notifier.success("Адрес удален");
    },
    async onSaveAddressClick(address) {
      if (
        !this.$validateFields(
          {
            name: address.name,
            street: address.street,
            building: address.building,
          },
          this.validations
        )
      ) {
        return;
      }
      this.$emit("save", address);
    },
  },
};
</script>

<style scoped></style>
