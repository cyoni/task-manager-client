import { openCloseSiteMenu } from "@/actions/general.actions";
import { siteMenuOpenSelector } from "@/selectors/general.selector";
import { Drawer } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CiHome } from "react-icons/ci";
import MobileSideMenuLink from "./MobileSideMenuLink";
import { MdDownloadDone, MdOutlineCancel } from "react-icons/md";
import { GoTasklist } from "react-icons/go";
import { RiProgress5Line } from "react-icons/ri";

function SiteDrawer() {
  const dispatch = useDispatch();
  const siteMenuOpen = useSelector(siteMenuOpenSelector);

  const onClose = () => {
    dispatch(openCloseSiteMenu(false));
  };
  return (
    <Drawer onClose={onClose} open={siteMenuOpen}>
      <MobileSideMenuLink
        pageKey={"all-tasks"}
        icon={<CiHome />}
        title={"All Tasks"}
        href={"/tasks/all-tasks"}
        onClose={onClose}
      />
      <MobileSideMenuLink
        pageKey={"in-progress"}
        icon={<RiProgress5Line />}
        title={"In Progress"}
        href={"/tasks/in-progress"}
        onClose={onClose}
      />
      <MobileSideMenuLink
        pageKey={"to-do"}
        icon={<GoTasklist />}
        title={"To Do"}
        href={"/tasks/to-do"}
        onClose={onClose}
      />
      <MobileSideMenuLink
        pageKey={"completed"}
        icon={<MdDownloadDone />}
        title={"Completed"}
        href={"/tasks/completed"}
        onClose={onClose}
      />
      <MobileSideMenuLink
        pageKey={"canceled"}
        icon={<MdOutlineCancel />}
        title={"Canceled"}
        href={"/tasks/canceled"}
        onClose={onClose}
      />
    </Drawer>
  );
}

export default SiteDrawer;
