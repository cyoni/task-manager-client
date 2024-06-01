import { Tag } from "antd";
import React from "react";
import TaskMenu from "./TaskMenu";
import { PRIOTITYSTYELS } from "@/consts/general.consts";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { E_Priority, E_PriorityCodeToWord } from "@/enums/general.enums";
import moment from "moment";

const ICONS = {
  [E_Priority.HIGH]: <MdKeyboardDoubleArrowUp />,
  [E_Priority.MEDIUM]: <MdKeyboardArrowUp />,
  [E_Priority.LOW]: <MdKeyboardArrowDown />,
};

interface IProps {
  task: Task;
}

function TaskCard({ task }: IProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-2 ">
      <div className="flex flex-col ">
        <div>
          <div className="flex justify-between">
            <div
              className={`${
                PRIOTITYSTYELS[task.priority]
              } uppercase flex items-center gap-1 text-sm`}
            >
              <span className="text-lg">{ICONS[task.priority]}</span>
              {E_PriorityCodeToWord[task.priority]}
            </div>

            <TaskMenu id={task.id} />
          </div>
          <div className="font-semibold truncate">{task.title}</div>

          <div>{moment(task.plannedEndDate).format("HH:mm DD/MM/YY")}</div>
          <div className="truncate">{task.description}</div>
          <div className="mt-1">
            {task.tags?.map((tag: Tag) => (
              <Tag key={tag.id} color={tag.color ?? "processing"}>
                {tag.name}
              </Tag>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
