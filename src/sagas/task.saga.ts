import {
  fetchTasksError,
  fetchTasksStarted,
  fetchTasksSuccess,
} from "@/actions/tasks.actions";
import { BASE_URL, TASK_FETCH_REQUESTED } from "@/consts/general.consts";
import { getTaskType } from "@/scripts/general.scripts";
import { call, put,  takeLatest } from "redux-saga/effects";

function* fetchTasks(action) {
  try {
    yield put(fetchTasksStarted());
    const type = getTaskType(action.payload.type);
    const response = yield call(fetch, `${BASE_URL}/tasks?type=${type}`);
    if (!response.ok) {
      throw "server error";
    }
    const tasks = yield response.json();
    yield put(fetchTasksSuccess(tasks));
  } catch (e) {
    yield put(fetchTasksError());
  }
}

function* TaskSaga() {
  yield takeLatest(TASK_FETCH_REQUESTED, fetchTasks);
}

export default TaskSaga;
