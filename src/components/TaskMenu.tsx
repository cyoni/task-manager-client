import React, { useContext, useState } from "react";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space, Tooltip } from "antd";
import { DiAptana } from "react-icons/di";
import DeleteTaskModal from "./DeleteTaskModal";
import NewTaskModal from "./NewTaskModal";
import { TaskContext } from "@/context/TaskContextProvider";

interface IProps {
  id: number;
}

const TaskMenu: React.FC = ({ id }): IProps => {
  const { triggerUpdateTaskModal, triggerDeleteTaskModal } =
    useContext(TaskContext);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <div onClick={() => triggerUpdateTaskModal(id)}>Update</div>,
    },
    {
      key: "2",
      label: <div onClick={() => triggerDeleteTaskModal(id)}>Delete</div>,
    },
  ];

  return (
    <Space direction="vertical">
      <Space wrap>
        <Dropdown menu={{ items }} placement="bottom" arrow>
          <Button shape="circle" icon={<DiAptana />} />
        </Dropdown>
      </Space>
    </Space>
  );
};

export default TaskMenu;
