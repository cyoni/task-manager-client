import { configureStore } from "@reduxjs/toolkit";
import TasksReducer from "./reducers/tasks.reducer";
import createSagaMiddleware from "redux-saga";
import TaskSaga from "./app/sagas/task.saga";

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    general: TasksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(TaskSaga);
