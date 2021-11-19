import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
//import { SET_ENTITY } from "@/store/mutations-types";
//import users from "@/static/users";
//import columns from "@/static/columns";
//import { STATUSES } from "@/common/constants";
import Builder from "@/views/Builder.vue";
//import AppIcon from "@/common/components/AppIcon";
//import { authenticateUser } from "@/common/helpers";

const localVue = createLocalVue();
//localVue.component("AppIcon", AppIcon);
localVue.use(Vuex);

/*const createColumns = (store) => {
  store.commit(SET_ENTITY, {
    module: "Columns",
    entity: "columns",
    value: columns,
  });
};*/

describe("Builder.vue", () => {
  const stubs = ["router-view"];

  let actions;
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(Builder, options);
  };

  beforeEach(() => {
    actions = {
      /*Columns: {
        post: jest.fn(),
        put: jest.fn(),
        delete: jest.fn(),
      },*/
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });
});

// Список элементов для тестирования
/*
  + :class="{'desk--rubber': isUserAuthorized}"
  + v-if="getUserAttribute('isAdmin')"
  + @click="addColumn"
  + v-for="user in users"
  + :class="{ active: filters.users.some(id => id === user.id) }"
  + @click="filterTasks(user.id, 'users')"
  + v-for="({ value, label }) in statuses"
  + :class="{ active: filters.statuses.some(s => s === value) }"
  + @click="filterTasks(value, 'statuses')"
  + :class="`meta-filter__status--${value}`"
  + v-if="columns.length"
  + v-for="column in columns"
  + @update="put($event)"
  + @delete="deleteColumn"
  + v-else ... class="desk__emptiness"
  + ...mapActions('Columns', ['post', 'put', 'delete']),
  + ...mapMutations('Tasks'...),
*/

// Данные из тест хранилища
/*
  ...mapState(['users']),
  ...mapState('Auth', ['user']),
  ...mapState('Columns', ['columns']),
  ...mapState('Tasks', ['filters']),
  ...mapGetters('Auth', ['getUserAttribute']),
 */
