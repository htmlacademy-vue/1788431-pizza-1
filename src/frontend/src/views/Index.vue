<template>
  <section class="desk">
    <div class="desk__header">
      <div class="desk__header-top">
        <h1 class="desk__title">Design Coffee Lab</h1>
        <button class="desk__add" type="button">Добавить столбец</button>
      </div>
      // Блок фильтров.
      <div class="desk__filters">
        <div class="desk__user-filter">
          <ul class="user-filter">
            // Отрисовываем аватарки пользователей для фильтров.
            <li
              v-for="user in users"
              :key="user.id"
              :title="user.name"
              class="user-filter__item"
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
          // Блок фильтров по статусам
          <ul class="meta-filter">
            // Используем деструктуризацию для доступа к свойствам статуса.
            <li
              v-for="{ value, label } in statuses"
              :key="value"
              class="meta-filter__item"
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
    // Если колонок нет - мы покажем доп информацию ниже.
    <div v-if="columns.length" ref="columns" class="desk__columns">
      // Отрисовываем список колонок
      <div v-for="column in columns" :key="column.id" class="column">
        <h2 class="column__name">
          <span>{{ column.title }}</span>
        </h2>

        <div class="column__target-area">
          // Отрисовываем задачи для каждой колонки.
          <div
            v-for="task in columnTasks[column.id]"
            :key="task.id"
            class="column__task"
          >
            <div class="task">
              // Если у задачи есть ответственный - выводим информацию о нем
              <div v-if="task.user" class="task__user">
                <div class="task__avatar">
                  <img
                    :src="task.user.avatar"
                    :alt="task.user.name"
                    width="20"
                    height="20"
                  />
                </div>
                {{ task.user.name }}
              </div>

              // Назначаем динамические классы для статусов.
              <div class="task__statuses">
                <span
                  v-if="task.status"
                  class="task__status"
                  :class="`task__status--${task.status}`"
                />
                <span
                  v-if="task.timeStatus"
                  class="task__status"
                  :class="`task__status--${task.timeStatus}`"
                />
              </div>

              <h5
                class="task__title"
                :class="{ 'task__title--first': !task.user }"
              >
                {{ task.title }}
              </h5>

              // Отрисовываем список тегов внутри задачи.
              <ul v-if="task.tags && task.tags.length" class="task__tags">
                <li v-for="(tag, index) in task.tags" :key="index">
                  <span class="task__tag">
                    {{ tag }}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p v-else class="desk__emptiness">Пока нет ни одной колонки</p>
  </section>
</template>
<script>
// Импортируем JSON данные и статусы для фильтров.
import columns from "@/static/columns.json";
import tasks from "@/static/tasks.json";
import users from "@/static/users.json";
import { statuses } from "@/common/constants";
import { getTagsArrayFromString, normalizeTask } from "@/common/helpers";
import taskStatuses from "@/common/enums/taskStatuses";

export default {
  name: "IndexHome",
  data() {
    return {
      columns,
      tasks: tasks.map((task) => normalizeTask(task)),
      users,
      statuses,
      taskStatuses,
    };
  },
  computed: {
    // Получаем список задач для колонок в формате объекта
    // (ключ - id колонки, значение - массив задач колонки)
    columnTasks() {
      return this.tasks
        .filter(({ columnId }) => columnId)
        .reduce((accumulator, task) => {
          task.tags = getTagsArrayFromString(task.tags);
          if (accumulator[task.columnId]) {
            accumulator[task.columnId] = [...accumulator[task.columnId], task];
          } else {
            accumulator[task.columnId] = [task];
          }
          return accumulator;
        }, {});
    },
  },
};
</script>

// Импортируем стили фильтров, колонок и задач отдельными файлами // Позже они
будут вынесены в отдельные компоненты
<style lang="scss" scoped>
//@import "~@/assets/scss/blocks/meta-filter.scss";
//@import "~@/assets/scss/blocks/user-filter.scss";
//@import "~@/assets/scss/blocks/column.scss";
//@import "~@/assets/scss/blocks/task.scss";
</style>
