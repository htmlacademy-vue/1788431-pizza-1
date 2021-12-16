import resources from "@/common/enums/resources";
import {
  AuthApiService,
  ReadOnlyApiService,
  AddressesApiService,
  SaucesApiService,
  SizesApiService,
  DoughsApiService,
  IngredientsApiService,
  MiscApiService,
  OrdersApiService,
} from "@/services/api.service";
import { SET_ENTITY } from "@/store/mutations-types";

export const capitalize = (string) =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

export const setAuth = (store) => {
  store.$api.auth.setAuthHeader();
  store.dispatch("Auth/getMe");
  store.commit(SET_ENTITY, {
    module: "Auth",
    entity: "isAuthenticated",
    value: true,
  });
};

export const createResources = (notifier) => {
  return {
    [resources.USERS]: new ReadOnlyApiService(resources.USERS, notifier),
    [resources.AUTH]: new AuthApiService(notifier),
    [resources.ADDRESSES]: new AddressesApiService(
      resources.ADDRESSES,
      notifier
    ),
    [resources.SAUCES]: new SaucesApiService(resources.SAUCES, notifier),
    [resources.SIZES]: new SizesApiService(resources.SIZES, notifier),
    [resources.DOUGHS]: new DoughsApiService(resources.DOUGHS, notifier),
    [resources.INGREDIENTS]: new IngredientsApiService(
      resources.INGREDIENTS,
      notifier
    ),
    [resources.MISC]: new MiscApiService(resources.MISC, notifier),
    [resources.ORDERS]: new OrdersApiService(resources.ORDERS, notifier),
  };
};
