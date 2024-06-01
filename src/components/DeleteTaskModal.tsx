import useMenu from "@/hooks/useMenu";
import { Modal } from "antd";
import React, { useState } from "react";

export default function DeleteTaskModal({
  taskId,
  isDeleteModalOpen,
  setIsDeleteModalOpen,
}) {
  const { handleDelete } = useMenu();


  const handleOk = () => {
    setIsDeleteModalOpen(false);
    handleDelete(taskId);
  };

  const handleCancel = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <Modal
      title="Delete task Modal"
      open={isDeleteModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>Are you sure you want to delete this task?</p>
    </Modal>
  );
}
