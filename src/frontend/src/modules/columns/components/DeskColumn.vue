<template>
  <AppDrop class="column" @drop="moveTask">
    <h2 class="column__name">
      <span v-if="!isInputShowed">
        {{ columnTitle }}
      </span>

      <input
        v-else
        ref="title"
        v-model="columnTitle"
        type="text"
        class="column__input"
        name="column_title"
        @blur="updateInput"
      />

      <AppIcon v-if="!isInputShowed" class="icon--edit" @click="showInput" />
      <AppIcon
        v-if="!isInputShowed && !columnTasks.length"
        class="icon--trash"
        @click="$emit('delete', column.id)"
      />
    </h2>

    <div class="column__target-area">
      <TaskCard
        v-for="task in columnTasks"
        :key="task.id"
        :task="task"
        class="column__task"
        @drop="moveTask($event, task)"
      />
    </div>
  </AppDrop>
</template>

<script>
import AppDrop from "@/common/components/AppDrop";
import TaskCard from "@/modules/tasks/components/TaskCard";
import AppIcon from "@/common/components/AppIcon";
import { getTargetColumnTasks, addActive } from "@/common/helpers";
import { cloneDeep } from "lodash";

export default {
  name: "DeskColumn",
  components: {
    AppDrop,
    TaskCard,
    AppIcon,
  },
  props: {
    column: {
      type: Object,
      required: true,
    },
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
      columnTitle: this.column.title,
      isInputShowed: false,
    };
  },
  computed: {
    columnTasks() {
      return this.tasks
        .filter((task) => task.columnId === this.column.id)
        .sort((a, b) => a.sortOrder - b.sortOrder);
    },
  },

  methods: {
    async showInput() {
      this.isInputShowed = true; // показываем input
      await this.$nextTick(); // ждем обновления DOM
      this.$refs.title.focus(); // делаем фокус на элемент input
    },
    updateInput() {
      this.isInputShowed = false;
      if (this.column.title === this.columnTitle) {
        return;
      }
      this.$emit("update", {
        ...this.column,
        title: this.columnTitle,
      });
    },
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
