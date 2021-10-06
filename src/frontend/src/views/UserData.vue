<template>
  <div>
    <div class="layout__title">
      <h1 class="title title--big">Мои данные</h1>
    </div>

    <div class="user">
      <picture>
        <source
          type="image/webp"
          :srcset="avatar + '@2x.webp 1x, ' + avatar + '@4x.webp 2x'"
        />
        <img
          :src="avatar + '@2x.jpg'"
          :srcset="avatar + '@4x.jpg'"
          :alt="user.name"
          width="72"
          height="72"
        />
      </picture>
      <div class="user__name">
        <span>{{ user.name }}</span>
      </div>
      <p class="user__phone">
        Контактный телефон: <span>{{ user.phone }}</span>
      </p>
    </div>

    <template v-for="(addressItem, addressIndex) in addresses">
      <div
        v-if="addressItem.id && addressItem.id !== editAddressId"
        class="layout__address"
        :key="addressIndex"
      >
        <div class="sheet address-form">
          <div class="address-form__header">
            <b>{{ addressItem.name }}</b>
            <div class="address-form__edit">
              <button
                @click="onEditAddressClick(addressItem.id)"
                type="button"
                class="icon"
              >
                <span class="visually-hidden">Изменить адрес</span>
              </button>
            </div>
          </div>
          <p>{{ humanizeAddress(addressItem) }}</p>
          <small>{{ addressItem.comment }}</small>
        </div>
      </div>
      <div
        v-if="!addressItem.id || addressItem.id === editAddressId"
        class="layout__address"
        :key="addressIndex"
      >
        <form method="post" class="address-form address-form--opened sheet">
          <div class="address-form__header">
            <b>Адрес №1</b>
          </div>

          <div class="address-form__wrapper">
            <div class="address-form__input">
              <label class="input">
                <span>Название адреса*</span>
                <input
                  v-model="addressItem.name"
                  type="text"
                  name="addr-name"
                  placeholder="Введите название адреса"
                  required
                />
              </label>
            </div>
            <div class="address-form__input address-form__input--size--normal">
              <label class="input">
                <span>Улица*</span>
                <input
                  v-model="addressItem.street"
                  type="text"
                  name="addr-street"
                  placeholder="Введите название улицы"
                  required
                />
              </label>
            </div>
            <div class="address-form__input address-form__input--size--small">
              <label class="input">
                <span>Дом*</span>
                <input
                  v-model="addressItem.building"
                  type="text"
                  name="addr-house"
                  placeholder="Введите номер дома"
                  required
                />
              </label>
            </div>
            <div class="address-form__input address-form__input--size--small">
              <label class="input">
                <span>Квартира</span>
                <input
                  v-model="addressItem.flat"
                  type="text"
                  name="addr-apartment"
                  placeholder="Введите № квартиры"
                />
              </label>
            </div>
            <div class="address-form__input">
              <label class="input">
                <span>Комментарий</span>
                <input
                  v-model="addressItem.comment"
                  type="text"
                  name="addr-comment"
                  placeholder="Введите комментарий"
                />
              </label>
            </div>
          </div>

          <div class="address-form__buttons">
            <button
              type="button"
              class="button button--transparent"
              @click="onDeleteAddressClick(addressItem)"
            >
              Удалить
            </button>
            <button
              type="submit"
              class="button"
              @click.prevent="onSaveAddressClick(addressItem)"
            >
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </template>

    <div class="layout__button">
      <button
        type="button"
        class="button button--border"
        @click="onCreateAddressClick"
      >
        Добавить новый адрес
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "UserData",
  data() {
    return { showEditForm: false, editAddressId: null };
  },
  computed: {
    ...mapState("Auth", {
      isAuthenticated: (state) => state.isAuthenticated,
      user: (state) => state.user,
    }),
    ...mapState("Addresses", {
      addresses: (state) => state.addresses,
    }),
    avatar() {
      return this.user.avatar.replace(/(.*)\.[^.]+/, "$1");
    },
  },
  methods: {
    ...mapActions("Addresses", [
      "fetch",
      "create",
      "deleteUnsaved",
      "save",
      "delete",
    ]),
    onEditAddressClick(addressId) {
      this.deleteUnsaved();
      this.editAddressId = addressId;
    },
    onAddAddressClick() {
      this.address = {};
      this.showEditForm = true;
    },
    async onDeleteAddressClick(address) {
      this.delete(address);
    },
    onCreateAddressClick() {
      this.create(this.user.id);
    },
    async onSaveAddressClick(address) {
      await this.save(address);
      this.editAddressId = null;
    },
    humanizeAddress(address) {
      let addr = address.street + ", " + address.building;

      if (address.flat) {
        addr += ", " + address.flat;
      }

      return addr;
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style lang="scss"></style>
