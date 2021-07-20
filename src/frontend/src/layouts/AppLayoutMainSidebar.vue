<template>
  <div class="backlog">
    <button class="backlog__title">
      <span>
        Бэклог
      </span>
    </button>
    <div class="backlog__content">
      <div class="backlog__scroll">
        <div class="backlog__collapse">
          <div class="backlog__user">
            <div class="backlog__account">
              // Благодаря прокси дев сервера мы берём /public изображения
              // с сервера, запущенного на порту 3000.
              // В этом случае мы выбрали user6.jpg в качестве заглушки.
              <img
                src="/public/user6.jpg"
                alt="Ваш аватар"
                width="32"
                height="32"
              />
              Игорь Пятин
            </div>

            // выводим количество задач в шаблоне
            <div class="backlog__counter">
              {{ sidebarTasks.length }}
            </div>
          </div>

          // в цикле выводим список задач
          <div class="backlog__target-area">
            <div
              v-for="task in sidebarTasks"
              :key="task.id"
              class="backlog__task"
            >
              <div class="task">
                // если есть назначенный пользователь — выводим информацию о нём
                <div
                  v-if="task.user"
                  class="task__user"
                >
                  <div class="task__avatar">
                    // src и alt — динамические атрибуты. Берём значения из объекта юзера
                    <img
                      :src="task.user.avatar"
                      :alt="task.user.name"
                      width="20"
                      height="20"
                    />
                  </div>
                  {{ task.user.name }}
                </div>

                // статусы по важности и по времени с динамическими классами
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

                // Добавляем динамический класс для заголовка задачи, если
                // в задаче не указан ответственный пользователь
                <h5
                  class="task__title"
                  :class="{ 'task__title--first': !task.user }"
                >
                  {{ task.title }}
                </h5>

                <ul
                  v-if="task.tags && task.tags.length"
                  class="task__tags"
                >
                  // список тегов задачи. Список статический.
                  // Поэтому можем использовать индекс в качестве ключа.
                  <li
                    v-for="(tag, index) in task.tags"
                    :key="index"
                  >
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
    </div>
  </div>
</template>
<script>
// Список задач, из которого достанем задачи для сайдбара.
import tasks from '@/static/tasks.json';
// Вспомогательные функции для нормализации задач и тегов задач.
import { normalizeTask, getTagsArrayFromString } from '@/common/helpers';

export default {
  name: 'AppLayoutMainSidebar',
  data() {
    return {
      // получаем нормализованные задачи
      tasks: tasks.map(task => normalizeTask(task)),
      backlogIsHidden: false
    };
  },
  computed: {
    // Выбираем только задачи без id колонки (у нас это именно задачи сайдбара).
    // Нормализуем список тегов.
    // Сортируем задачи по их порядку внутри колонки.
    sidebarTasks() {
      return this.tasks
        .filter(task => !task.columnId)
        .map(task => ({
          ...task,
          tags: getTagsArrayFromString(task.tags)
        }));
    }
  }
};
</script>

// Обратите внимание на импорт scss файла со стилями для задач.
// Мы оставили его в отдельном файле, так как позже у задач будет отдельный компонент.
// @import — синтаксис импорта в scss
// Знак тильды "~" — это символ, который указывает на то,
// что следующее за ним значение будет alias.
// Знак "@" — это алиас из webpack, который мы используем для замены на "src"
// В результате стили будут импортированы из "src/assets/..."
<style lang="scss" scoped>
//@import "~@/assets/scss/blocks/task.scss";
</style>
