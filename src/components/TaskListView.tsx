import React, { useContext } from "react";
import { Button, Table, Tag } from "antd";
import type { TableProps } from "antd";
import moment from "moment";
import useMenu from "@/hooks/useMenu";
import { E_PriorityCodeToWord } from "@/enums/general.enums";
import { TaskContext } from "@/app/context/TaskContextProvider";

interface DataType {
  key: string;
  name: string;
  tags: string[];
}

const TaskListView: React.FC = ({ tasks }) => {
  const { triggerUpdateTaskModal, triggerDeleteTaskModal } =
    useContext(TaskContext);

  const { handleDelete, handleUpdate } = useMenu();

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Task Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (data) => {
        return E_PriorityCodeToWord[data];
      },
    },
    {
      title: "Start Date",
      dataIndex: "plannedStartDate",
      key: "plannedStartDate",
      render: (data) => {
        return moment(data).format("HH:mm DD/MM/YY");
      },
    },
    {
      title: "End Date",
      dataIndex: "plannedEndDate",
      key: "plannedEndDate",
      render: (data) => {
        return moment(data).format("HH:mm DD/MM/YY");
      },
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag: Tag) => {
            return (
              <Tag color={tag.color || "geekblue"} key={tag.id}>
                {tag.name}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (data) => (
        <div className="flex">
          <Button
            type="link"
            className="px-2"
            onClick={() => triggerUpdateTaskModal(data.id)}
          >
            Update
          </Button>
          <Button
            type="link"
            danger
            className="px-2"
            onClick={() => triggerDeleteTaskModal(data.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return <Table columns={columns} dataSource={tasks} />;
};

export default TaskListView;
