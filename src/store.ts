import { configureStore } from "@reduxjs/toolkit";
import TasksReducer from "./reducers/tasks.reducer";
import GeneralReducer from "./reducers/general.reducer";
import createSagaMiddleware from "redux-saga";
import TaskSaga from "./sagas/task.saga";

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    general2: GeneralReducer,
    general: TasksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(TaskSaga);
