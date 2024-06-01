import {
  ERROR,
  FETCH_TASKS,
  LOADING,
  READY,
  TASK_FETCH_REQUESTED,
} from "@/consts/general.consts";

export const fetchTasks = (type: string) => {
  return { type: TASK_FETCH_REQUESTED, payload: { type } };
};

export const fetchTasksStarted = () => {
  return { type: FETCH_TASKS, payload: { status: LOADING } };
};

export const fetchTasksSuccess = (tasks: Task[]) => {
  return { type: FETCH_TASKS, payload: { status: READY, tasks } };
};

export const fetchTasksError = () => {
  return { type: FETCH_TASKS, payload: { status: ERROR } };
};
