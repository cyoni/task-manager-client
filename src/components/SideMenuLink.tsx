import Link from "next/link";
import React from "react";

interface IProps {
  title: string;
  href: string;
  icon: JSX.Element;
  action: string;
  pageKey: string;
}
function SideMenuLink({ title, href, action, icon, pageKey }: IProps) {
  return (
    <Link
      href={href}
      shallow
      className={`py-2 rounded-full ${
        pageKey === action
          ? "bg-blue-700 text-white "
          : "text-gray-600 hover:bg-[#2564ed2d] hover:text-[#2564ed]"
      }  text-base md:px-4`}
    >
      <span className="flex gap-4 items-center md:justify-start justify-center ">
        <span className="text-xl">{icon}</span>
        <span className="hidden md:block text-sm lg:text-md xl:text-lg">{title}</span>
      </span>
    </Link>
  );
}

export default SideMenuLink;
