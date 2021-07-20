<template>
  <AppDrop @drop="$emit('drop', $event)">
    <AppDrag :transfer-data="task">
      <div class="task" @click="$emit('click', task.id)">
        <div v-if="task.user" class="task__user">
          <div class="task__avatar">
            <img
              :src="task.user.avatar"
              alt="Аватар пользователя"
              width="20"
              height="20"
            />
          </div>
          {{ task.user.name }}
        </div>
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
        <h5 class="task__title" :class="{ 'task__title--first': !task.user }">
          {{ task.title }}
        </h5>
        <TaskCardTags v-if="task.tags && task.tags.length" :tags="task.tags" />
      </div>
    </AppDrag>
  </AppDrop>
</template>

<script>
import AppDrag from "@/common/components/AppDrag";
import AppDrop from "@/common/components/AppDrop";
import TaskCardTags from "@/modules/tasks/components/TaskCardTags";

export default {
  name: "TaskCard",
  components: {
    AppDrag,
    AppDrop,
    TaskCardTags,
  },

  props: {
    task: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
