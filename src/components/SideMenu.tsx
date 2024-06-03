import React from "react";
import SideMenuLink from "./SideMenuLink";
import {
  MdDownloadDone,
  MdOutlineCancel,
  MdOutlineTaskAlt,
} from "react-icons/md";
import { CiHome } from "react-icons/ci";
import { RiProgress5Line } from "react-icons/ri";
import { GoTasklist } from "react-icons/go";

function SideMenu({ action }) {
  return (
    <div className="flex flex-col gap-y-5 p-3">
      <div className="font-semibold xl:text-2xl md:text-xl text-sm items-center gap-1 mb-6 flex">
        <MdOutlineTaskAlt />
        Task Manager
      </div>

      <SideMenuLink
        pageKey={"all-tasks"}
        action={action}
        icon={<CiHome />}
        title={"All Tasks"}
        href={"/tasks/all-tasks"}
      />
      <SideMenuLink
        pageKey={"in-progress"}
        action={action}
        icon={<RiProgress5Line />}
        title={"In Progress"}
        href={"/tasks/in-progress"}
      />
      <SideMenuLink
        pageKey={"to-do"}
        action={action}
        icon={<GoTasklist />}
        title={"To Do"}
        href={"/tasks/to-do"}
      />
      <SideMenuLink
        pageKey={"completed"}
        action={action}
        icon={<MdDownloadDone />}
        title={"Completed"}
        href={"/tasks/completed"}
      />
      <SideMenuLink
        pageKey={"canceled"}
        action={action}
        icon={<MdOutlineCancel />}
        title={"Canceled"}
        href={"/tasks/canceled"}
      />
    </div>
  );
}

export default SideMenu;
