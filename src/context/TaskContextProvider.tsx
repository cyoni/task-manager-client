"use client";
import DeleteTaskModal from "@/components/DeleteTaskModal";
import NewTaskModal from "@/components/NewTaskModal";
import { createContext, useState } from "react";

export const TaskContext = createContext({});

export default function TaskContextProvider({ children }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [taskId, setTaskId] = useState(-1);

  const triggerUpdateTaskModal = (id: number) => {
    setIsUpdateModalOpen(true);
    setTaskId(id);
  };

  const triggerDeleteTaskModal = (id: number) => {
    setIsDeleteModalOpen(true);
    setTaskId(id);
  };

  return (
    <TaskContext.Provider
      value={{ triggerUpdateTaskModal, triggerDeleteTaskModal }}
    >
      {children}

      {isUpdateModalOpen && (
        <NewTaskModal
          taskId={taskId}
          isModalOpen={isUpdateModalOpen}
          fetchTasks={() => {}}
          onClose={() => setIsUpdateModalOpen(false)}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteTaskModal
          taskId={taskId}
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={() => setIsDeleteModalOpen(false)}
        />
      )}
    </TaskContext.Provider>
  );
}
