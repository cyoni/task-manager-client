import React, { useState } from "react";
import TaskCard from "./TaskCard";
import { Spin, Tabs, TabsProps } from "antd";
import TaskListView from "./TaskListView";
import { useParams } from "next/navigation";
import { tasksPage } from "@/consts/general.consts";
import { useSelector } from "react-redux";
import {
  filteredSearchResultsSelector,
  tasksSelector,
  tasksStatusSelector,
} from "@/selectors/tasks.selector";
import { ERROR, LOADING } from "@/consts/general.consts";

const E_Tabs = { List: 1, Grid: 2 };

function TasksView() {
  const [selectedTab, setSelectedTab] = useState(0);
  const tasksStatus = useSelector(tasksStatusSelector);
  const tasks: Task[] = useSelector(tasksSelector);
  const filteredResults = useSelector(filteredSearchResultsSelector);
  const tasksToView = filteredResults || tasks;

  const onChange = (key: string) => {
    setSelectedTab(Number(key));
  };

  const renderListView = () => {
    return <TaskListView tasks={tasksToView} />;
  };

  const renderCardView = () => {
    return (
      <div className="w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 2xl:gap-10">
        {Array.isArray(tasksToView)
          ? tasksToView.map((task) => <TaskCard key={task.id} task={task} />)
          : null}
      </div>
    );
  };

  const items: TabsProps["items"] = [
    { key: "1", label: "Board View" },
    { key: "2", label: "List View" },
  ];

  const { action } = useParams();
  return (
    <div className="shadow-sm p-5 h-full bg-[#f3f4f6]">
      <h1 className="text-2xl font-semibold capitalize">{tasksPage[action]}</h1>

      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />

      {tasksStatus === LOADING ? (
        <Spin size="large" />
      ) : tasksStatus === ERROR ? (
        <div>Oopps, there was an error while loading the page.</div>
      ) : tasksToView.length === 0 ? (
        <div>There&apos;s nothing to show here</div>
      ) : selectedTab === E_Tabs.Grid ? (
        renderListView()
      ) : (
        renderCardView()
      )}

      <div className="flex flex-wrap gap-2"></div>
    </div>
  );
}

export default TasksView;
