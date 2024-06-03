export const E_Priority = {
  LOW: 0,
  MEDIUM: 1,
  HIGH: 2,
};

export const E_PriorityCodeToWord = {
  [E_Priority.LOW]: "Low",
  [E_Priority.MEDIUM]: "Medium",
  [E_Priority.HIGH]: "High",
};

export const E_TaskStatus = {
  ToDo: 1,
  InProgress: 2,
  Done: 3,
  Cancelled: 4,
};

export const E_TaskCode = {
  ALL_TASKS: "all-tasks",
  TO_DO: "to-do",
  COMPLETED: "completed",
  IN_PROGRESS: "in-progress",
  CANCELED: "canceled",
};

export const E_TaskTypeToCode = {
  "all-tasks": 0,
  "to-do": 1,
  completed: 2,
  "in-progress": 3,
  "canceled": 4,
};
