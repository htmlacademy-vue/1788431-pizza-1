<template>
  <section class="desk">
    <div class="desk__header">
      <div class="desk__header-top">
        <h1 class="desk__title">Design Coffee Lab</h1>
        <button class="desk__add" type="button" @click="addColumn">
          Добавить столбец
        </button>
      </div>
      <div class="desk__filters">
        <div class="desk__user-filter">
          <ul class="user-filter">
            <li
              v-for="user in users"
              :key="user.id"
              :title="user.name"
              class="user-filter__item"
              :class="{ active: filters.users.some((id) => id === user.id) }"
              @click="$emit('applyFilters', { item: user.id, entity: 'users' })"
            >
              <a class="user-filter__button">
                <img
                  :src="user.avatar"
                  alt="Аватар юзера"
                  width="24"
                  height="24"
                />
              </a>
            </li>
          </ul>
        </div>
        <div class="desk__meta-filter">
          <ul class="meta-filter">
            <li
              v-for="{ value, label } in statuses"
              :key="value"
              class="meta-filter__item"
              :class="{ active: filters.statuses.some((s) => s === value) }"
              @click="
                $emit('applyFilters', { item: value, entity: 'statuses' })
              "
            >
              <a
                class="meta-filter__status"
                :class="`meta-filter__status--${value}`"
                :title="label"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-if="columns.length" ref="columns" class="desk__columns">
      <DeskColumn
        v-for="column in columns"
        :key="column.id"
        :column="column"
        :tasks="tasks"
        :filters="filters"
        @update="updateColumn"
        @delete="deleteColumn"
        @updateTasks="$emit('updateTasks', $event)"
      />
    </div>
    <p v-else class="desk__emptiness">Пока нет ни одной колонки</p>
  </section>
</template>

<script>
import columns from "@/static/columns.json";
import users from "@/static/users.json";
import taskStatuses from "@/common/enums/taskStatuses";
import { statuses } from "@/common/constants";
import DeskColumn from "@/modules/columns/components/DeskColumn";
import { uniqueId } from "lodash";

export default {
  name: "IndexHome",
  components: { DeskColumn },
  props: {
    tasks: {
      type: Array,
      required: true,
    },
    filters: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      columns,
      users,
      statuses,
      taskStatuses,
      newColumnTitle: "Новый столбец",
    };
  },
  // Добавим методы манипулирования данными
  methods: {
    addColumn() {
      this.columns = [
        ...this.columns,
        { id: uniqueId("column_"), title: this.newColumnTitle },
      ];
    },
    updateColumn(column) {
      const index = this.columns.findIndex(({ id }) => id === column.id);
      if (~index) {
        this.columns.splice(index, 1, column);
      }
    },
    deleteColumn(id) {
      this.columns = this.columns.filter((column) => column.id !== id);
    },
  },
};
</script>

<style lang="scss" scoped></style>
