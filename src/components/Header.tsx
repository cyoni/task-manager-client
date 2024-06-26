import { Button } from "antd";
import React, { useState } from "react";
import NewTaskModal from "./NewTaskModal";
import { CiSearch } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { UPDATE_SEARCH_TEXT } from "@/consts/general.consts";
import SiteDrawer from "./SiteDrawer";
import MobileHeader from "./MobileHeader";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { value } = e.target;
    dispatch({ type: UPDATE_SEARCH_TEXT, payload: value });
  };

  return (
    <>
      <SiteDrawer />
      <div className="md:flex justify-between items-center mb-2 pr-4 hidden">
        <div className="text-3xl pl-2">
          <div className="w-64 px-4 gap-2 lg:w-[400px] md:w-[350px] placeholder:text-gray-500 text-gray-800 py-2  bg-[#f3f4f6] rounded-full flex items-center">
            <CiSearch className="text-gray-500 text-[20px]" />
            <input
              type="text"
              className="bg-[#f3f4f6] flex-1 text-sm bg-transparent outline-none border-none"
              placeholder="Search Tasks..."
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <Button type="primary" onClick={() => setIsModalOpen(true)}>
            Create Task
          </Button>

          <div className="w-12 h-12 bg-blue-800 text-white rounded-full shadow-md cursor-pointer flex justify-center items-center capitalize text-lg">
            YC
          </div>
        </div>
      </div>

      <MobileHeader />

      {isModalOpen && (
        <NewTaskModal
          isModalOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

export default Header;
