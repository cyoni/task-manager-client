import { openCloseSiteMenu } from "@/actions/general.actions";
import { siteMenuOpenSelector } from "@/selectors/general.selector";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function MobileHeader() {
  const dispatch = useDispatch();
  const siteMenuOpen = useSelector(siteMenuOpenSelector);
  const openOrCloseSiteMenu = () => {
    dispatch(openCloseSiteMenu(!siteMenuOpen));
  };

  return (
    <div className="md:hidden flex justify-between p-2">
      <div className="text-2xl font-semibold">Task Manager</div>

      <Image
        src="/icons/hamburger.svg"
        width={40}
        height={40}
        alt="menu"
        onClick={openOrCloseSiteMenu}
        className="cursor-pointer p-2 hover:bg-gray-200 rounded-full"
      />
    </div>
  );
}

export default MobileHeader;
