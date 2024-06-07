import Link from "next/link";
import { useParams } from "next/navigation";
import React, { MouseEventHandler } from "react";

interface IProps {
  title: string;
  href: string;
  icon: JSX.Element;
  pageKey: string;
  onClose: MouseEventHandler<HTMLAnchorElement>;
}
function MobileSideMenuLink({ title, href, icon, pageKey, onClose }: IProps) {
  const { action } = useParams();

  return (
    <Link href={href} shallow className="p-2" onClick={onClose}>
      <div
        className={`px-4 py-3 rounded-full ${
          pageKey === action ? "bg-blue-700 text-white " : "text-gray-600"
        }   flex gap-4 items-center justify-start `}
      >
        <span className="text-xl">{icon}</span>
        <span className="text-lg">{title}</span>
      </div>
    </Link>
  );
}

export default MobileSideMenuLink;
