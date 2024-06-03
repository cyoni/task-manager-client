import { openCloseSiteMenu } from "@/actions/general.actions";
import { siteMenuOpenSelector } from "@/selectors/general.selector";
import { Drawer } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function SiteDrawer() {
  const dispatch = useDispatch();
  const siteMenuOpen = useSelector(siteMenuOpenSelector);

  const onClose = () => {
    dispatch(openCloseSiteMenu(false));
  };

  return (
    <Drawer title="Basic Drawer" onClose={onClose} open={siteMenuOpen}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
}

export default SiteDrawer;
