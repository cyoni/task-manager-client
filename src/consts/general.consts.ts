import { E_Priority } from "@/enums/general.enums";
export const UPDATE_TASKS = "UPDATE_TASKS";
export const DELETE_TASK = "DELETE_TASK";
export const LOADING = "LOADING";
export const DONE = "DONE";
export const ERROR = "ERROR";
export const READY = "READY";

export const NEW_POST_ACTION = "NEW_POST_ACTION";
export const UPDATE_TASK = "UPDATE_TASK";
export const FETCH_TASKS = "FETCH_TASKS";
export const UPDATE_SEARCH_TEXT = "UPDATE_SEARCH_TEXT";

export const TASK_FETCH_REQUESTED = "TASK_FETCH_REQUESTED";


export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const PRIOTITYSTYELS = {
  [E_Priority.HIGH]: "text-red-600",
  [E_Priority.MEDIUM]: "text-yellow-600",
  [E_Priority.LOW]: "text-blue-600",
};

export const tasksPage = {
  "to-do": "To Do",
  "all-tasks": "All Tasks",
  "completed": "Completed",
  "in-progress": "In Progress",
};

