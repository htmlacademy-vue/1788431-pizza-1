import {
  DAY_IN_MILLISEC,
  TAG_SEPARATOR
} from '@/common/constants';
import timeStatuses from '@/common/enums/timeStatuses';
import taskStatuses from '@/common/enums/taskStatuses';

// Получение тегов из строки тегов.
export const getTagsArrayFromString = tags => {
  const array = tags.split(TAG_SEPARATOR);
  return array.slice(1, array.length);
};

// Нормализация статуса по времени.
export const getTimeStatus = dueDate => {
  if (!dueDate) {
    return '';
  }
  const currentTime = +new Date();
  const taskTime = Date.parse(dueDate);
  const timeDelta = taskTime - currentTime;
  if (timeDelta > DAY_IN_MILLISEC) {
    return '';
  }
  return timeDelta < 0 ? timeStatuses.deadline : timeStatuses.expired;
};

// Нормализация задачи.
export const normalizeTask = task => {
  return {
    ...task,
    status: task.statusId ? taskStatuses[task.statusId] : '',
    timeStatus: getTimeStatus(task.dueDate)
  };
};
