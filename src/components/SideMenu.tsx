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

function SideMenu() {
  return (
    <div className="flex flex-col gap-y-5 p-3">
      <div className="font-semibold xl:text-2xl md:text-xl text-sm items-center gap-1 mb-6 flex">
        <MdOutlineTaskAlt />
        Task Manager
      </div>

      <SideMenuLink
        pageKey={"all-tasks"}
        icon={<CiHome />}
        title={"All Tasks"}
        href={"/tasks/all-tasks"}
      />
      <SideMenuLink
        pageKey={"in-progress"}
        icon={<RiProgress5Line />}
        title={"In Progress"}
        href={"/tasks/in-progress"}
      />
      <SideMenuLink
        pageKey={"to-do"}
        icon={<GoTasklist />}
        title={"To Do"}
        href={"/tasks/to-do"}
      />
      <SideMenuLink
        pageKey={"completed"}
        icon={<MdDownloadDone />}
        title={"Completed"}
        href={"/tasks/completed"}
      />
      <SideMenuLink
        pageKey={"canceled"}
        icon={<MdOutlineCancel />}
        title={"Canceled"}
        href={"/tasks/canceled"}
      />
    </div>
  );
}

export default SideMenu;
