import {
  DELETE_TASK,
  FETCH_TASKS,
  LOADING,
  READY,
  UPDATE_SEARCH_TEXT,
  UPDATE_TASK,
  UPDATE_TASKS,
} from "@/consts/general.consts";

const initialState = {
  tasks: [],
  loadStatus: READY,
  tasksStatus: LOADING,
  filterSearchText: null,
};

const TasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TASKS:
      const { status, tasks } = action.payload;
      return { ...state, tasksStatus: status, tasks };

    case UPDATE_TASK:
      return { ...state, taskOnEdit: action.payload };
    case UPDATE_TASKS:
      return { ...state, tasks: action.payload };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    case UPDATE_SEARCH_TEXT:
      return { ...state, filterSearchText: action.payload };
    default:
      return state;
  }
};

export default TasksReducer;
