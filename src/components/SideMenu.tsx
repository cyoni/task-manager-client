import React from "react";
import SideMenuLink from "./SideMenuLink";
import { MdOutlineTaskAlt } from "react-icons/md";

function SideMenu({ action }) {
  return (
    <div className="flex flex-col gap-y-5 p-2">
      <div className="font-semibold text-2xl flex  items-center gap-1">
        <MdOutlineTaskAlt />
        Task Manager
      </div>
      <SideMenuLink
        pageKey={"all-tasks"}
        action={action}
        title={"All Tasks"}
        href={"/tasks/all-tasks"}
      />
      <SideMenuLink
        pageKey={"completed"}
        action={action}
        title={"Completed"}
        href={"/tasks/completed"}
      />
      <SideMenuLink
        pageKey={"in-progress"}
        action={action}
        title={"In Progress"}
        href={"/tasks/in-progress"}
      />
      <SideMenuLink
        pageKey={"to-do"}
        action={action}
        title={"To Do"}
        href={"/tasks/to-do"}
      />
    </div>
  );
}

export default SideMenu;
