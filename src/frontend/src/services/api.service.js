import JwtService from "@/services/jwt.service";
import axios from "@/plugins/axios";
import resources from "@/common/enums/resources";

class BaseApiService {
  constructor(notifier) {
    if (!axios.$notifier) {
      axios.$notifier = notifier;
    }
  }
}

export class AuthApiService extends BaseApiService {
  constructor(notifier) {
    super(notifier);
  }

  setAuthHeader() {
    const token = JwtService.getToken();
    axios.defaults.headers.common["Authorization"] = token
      ? `Bearer ${token}`
      : "";
  }

  async login(params) {
    const { data } = await axios.post("login", params);
    return data;
  }

  async logout() {
    const { data } = await axios.delete("logout");
    return data;
  }

  async getMe() {
    const { data } = await axios.get("whoAmI");
    return data;
  }
}

export class ReadOnlyApiService extends BaseApiService {
  #resource;

  constructor(resource, notifier) {
    super(notifier);
    this.#resource = resource;
  }

  async query(config = {}) {
    const { data } = await axios.get(this.#resource, config);
    return data;
  }

  async get(id, config = {}) {
    const { data } = await axios.get(`${this.#resource}/${id}`, config);
    return data;
  }
}

export class CrudApiService extends ReadOnlyApiService {
  #resource;

  constructor(resource, notifier) {
    super(resource, notifier);
    this.#resource = resource;
  }

  async post(entity) {
    const { data } = await axios.post(this.#resource, entity);
    return data;
  }

  async put(entity) {
    const { data } = await axios.put(`${this.#resource}/${entity.id}`, entity);
    return data;
  }

  async delete(id) {
    const { data } = await axios.delete(`${this.#resource}/${id}`);
    return data;
  }
}

export class AddressesApiService extends CrudApiService {
  constructor(notifier) {
    super(resources.ADDRESSES, notifier);
  }
}

export class SaucesApiService extends ReadOnlyApiService {
  constructor(notifier) {
    super(resources.SAUCES, notifier);
  }
}
export class SizesApiService extends ReadOnlyApiService {
  constructor(notifier) {
    super(resources.SIZES, notifier);
  }
}
export class DoughsApiService extends ReadOnlyApiService {
  constructor(notifier) {
    super(resources.DOUGHS, notifier);
  }
}
export class IngredientsApiService extends ReadOnlyApiService {
  constructor(notifier) {
    super(resources.INGREDIENTS, notifier);
  }
}
export class MiscApiService extends ReadOnlyApiService {
  constructor(notifier) {
    super(resources.MISC, notifier);
  }
}

export class OrdersApiService extends CrudApiService {
  constructor(notifier) {
    super(resources.ORDERS, notifier);
  }
}
