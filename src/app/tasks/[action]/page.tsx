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
  const tasksStatus = useSelector(tasksStatusSelector);
  console.log("tasksStatus", tasksStatus);
  const dispatch = useDispatch();

  const { action } = useParams();

  useEffect(() => {
    dispatch(fetchTasks(String(action)));
  }, [action]);

  return (
    <div className="min-h-screen md:p-2 ">
      <div className="flex flex-row h-full">
        <div className="xl:w-[250px] lg:w-[200px] md:block hidden">
          <SideMenu />
        </div>
        <div className="flex-1">
          <Header />
          <TasksView />
        </div>
      </div>
    </div>
  );
}

export default Page;
