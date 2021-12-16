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
        class="layout__address"
        :key="addressIndex"
        data-test="user-data-address"
      >
        <div class="sheet address-form">
          <div class="address-form__header">
            <b>{{ addressItem.name }}</b>
            <div class="address-form__edit">
              <button
                @click="onEditAddressClick(addressItem.id)"
                type="button"
                class="icon"
                data-test="user-data-address-edit"
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
        <AddressForm
          :address="addressItem"
          @save="onSaveAddress($event)"
          data-test="user-data-address-form"
        ></AddressForm>
      </div>
    </template>

    <div class="layout__button">
      <button
        type="button"
        class="button button--border"
        @click="onCreateAddressClick"
        data-test="user-data-add-address"
      >
        Добавить новый адрес
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AddressForm from "@/modules/user-data/components/AddressForm";

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
  created() {
    this.fetch();
  },
};
</script>

<style lang="scss"></style>
