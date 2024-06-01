"use client";
import {
  FETCH_TASKS,
  TASK_FETCH_REQUESTED,
  fetchTasks,
} from "@/actions/tasks.actions";
import Header from "@/components/Header";
import SideMenu from "@/components/SideMenu";
import TasksView from "@/components/TasksView";
import { BASE_URL } from "@/consts/general.consts";
import { getTaskType } from "@/scripts/general.scripts";
import { tasksSelector, tasksStatusSelector } from "@/selectors/tasks.selector";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Page() {
  const tasks = useSelector(tasksSelector);
  const tasksStatus = useSelector(tasksStatusSelector);
  console.log("tasksStatus", tasksStatus);
  const dispatch = useDispatch();

  const { action } = useParams();

  // const fetchTasks = async () => {
  //   try {
  //     dispatch({ type: FETCH_TASKS, payload: { status: "LOADING" } });
  //     const type = getTaskType(action)
  //     const response = await fetch(`${BASE_URL}/tasks?type=${type}`);
  //     if (!response.ok) {
  //       dispatch({ type: FETCH_TASKS, payload: { statys: "ERROR" } });
  //     }
  //     const tasks = await response.json();
  //     dispatch({ type: FETCH_TASKS, payload: { status: "READY", tasks } });
  //   } catch (e) {
  //     dispatch({ type: FETCH_TASKS, payload: { statys: "ERROR" } });
  //   }
  // };

  useEffect(() => {
    console.log("got action", action);
    //fetchTasks();
    dispatch(fetchTasks(String(action)));
  }, [action]);

  return (
    <div className="min-h-screen p-2 ">
      <div className="flex flex-row h-full">
        <div className="w-[15%]">
          <SideMenu action={action} />
        </div>
        <div className="flex-1">
          <Header fetchTasks={null} />
          <TasksView />
        </div>
      </div>
    </div>
  );
}

export default Page;
