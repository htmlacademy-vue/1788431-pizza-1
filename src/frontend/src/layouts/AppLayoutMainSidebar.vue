<template>
  <AppDrop
    class="backlog"
    :class="{ 'backlog--hide': backlogIsHidden }"
    @drop="moveTask"
  >
    <button class="backlog__title" @click="backlogIsHidden = !backlogIsHidden">
      <span> Бэклог </span>
    </button>
    <div class="backlog__content">
      <div class="backlog__scroll">
        <div class="backlog__collapse">
          <div class="backlog__user">
            <div class="backlog__account">
              <img
                src="/public/user6.jpg"
                alt="Ваш аватар"
                width="32"
                height="32"
              />
              Игорь Пятин
            </div>

            <div class="backlog__counter">
              {{ sidebarTasks.length }}
            </div>
          </div>

          <div class="backlog__target-area">
            <TaskCard
              v-for="task in sidebarTasks"
              :key="task.id"
              :task="task"
              class="backlog__task"
            />
          </div>
        </div>
      </div>
    </div>
  </AppDrop>
</template>

<script>
import AppDrop from "@/common/components/AppDrop";
import taskStatuses from "@/common/enums/taskStatuses";
import TaskCard from "@/modules/tasks/components/TaskCard";
import { addActive, getTargetColumnTasks } from "@/common/helpers";
import { cloneDeep } from "lodash";

export default {
  name: "AppLayoutMainSidebar",
  components: { TaskCard, AppDrop },
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
      taskStatuses,
      backlogIsHidden: false,
    };
  },
  computed: {
    sidebarTasks() {
      return this.tasks
        .filter((task) => !task.columnId)
        .sort((a, b) => a.sortOrder - b.sortOrder);
    },
  },
  // Добавим обработчик для переноски задач
  methods: {
    moveTask(active, toTask) {
      // Note: prevent update if task is not moving
      if (toTask && active.id === toTask.id) {
        return;
      }
      const toColumnId = this.column ? this.column.id : null;
      const targetColumnTasks = getTargetColumnTasks(toColumnId, this.tasks);
      const activeClone = cloneDeep({ ...active, columnId: toColumnId });
      const resultTasks = addActive(activeClone, toTask, targetColumnTasks);
      const tasksToUpdate = [];
      resultTasks.forEach((task, index) => {
        if (task.sortOrder !== index || task.id === active.id) {
          const newTask = cloneDeep({ ...task, sortOrder: index });
          tasksToUpdate.push(newTask);
        }
      });
      this.$emit("updateTasks", tasksToUpdate);
    },
  },
};
</script>

<style lang="scss" scoped></style>
