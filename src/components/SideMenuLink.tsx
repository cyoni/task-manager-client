import Link from "next/link";
import React from "react";

function SideMenuLink({ title, href, action, pageKey }) {
  return (
    <Link
      href={href}
      shallow
      className={`py-2 px-2 rounded-full ${
        pageKey === action
          ? "bg-blue-700 text-white "
          : "text-gray-600 hover:bg-[#2564ed2d] hover:text-[#2564ed]"
      }  text-base lg:w-3/4  pl-5`}
    >
      <span className="">{title}</span>
    </Link>
  );
}

export default SideMenuLink;
