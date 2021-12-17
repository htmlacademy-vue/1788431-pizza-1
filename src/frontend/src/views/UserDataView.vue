<template>
  <div>
    <div class="layout__title">
      <h1 class="title title--big">
        Мои данные
      </h1>
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
          data-test="user-data-avatar"
        />
      </picture>
      <div class="user__name">
        <span data-test="user-data-name">{{ user.name }}</span>
      </div>
      <p class="user__phone">
        Контактный телефон:
        <span data-test="user-data-phone">{{ user.phone }}</span>
      </p>
    </div>

    <template v-for="(addressItem, addressIndex) in addresses">
      <div
        v-if="addressItem.id && addressItem.id !== editAddressId"
        :key="addressIndex"
        class="layout__address"
        data-test="user-data-address"
      >
        <div class="sheet address-form">
          <div class="address-form__header">
            <b>{{ addressItem.name }}</b>
            <div class="address-form__edit">
              <button
                type="button"
                class="icon"
                data-test="user-data-address-edit"
                @click="onEditAddressClick(addressItem.id)"
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
        :key="addressIndex"
        class="layout__address"
      >
        <AddressForm
          :address="addressItem"
          data-test="user-data-address-form"
          @save="onSaveAddress($event)"
        />
      </div>
    </template>

    <div class="layout__button">
      <button
        type="button"
        class="button button--border"
        data-test="user-data-add-address"
        @click="onCreateAddressClick"
      >
        Добавить новый адрес
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AddressForm from "@/modules/user-data/components/UserDataAddressForm";

export default {
  name: "UserDataView",
  components: { AddressForm },

  data() {
    return {
      editAddressId: null,
    };
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
  created() {
    this.fetch();
  },
  methods: {
    ...mapActions("Addresses", ["fetch", "create", "deleteUnsaved", "save"]),
    onEditAddressClick(addressId) {
      this.deleteUnsaved();
      this.editAddressId = addressId;
    },
    onCreateAddressClick() {
      this.create(this.user.id);
    },
    async onSaveAddress(address) {
      await this.save(address);
      this.editAddressId = null;
      this.$notifier.success("Адрес сохранен");
    },
    humanizeAddress(address) {
      let addr = address.street + ", " + address.building;

      if (address.flat) {
        addr += ", " + address.flat;
      }

      return addr;
    },
  },
};
</script>

<style lang="scss"></style>
