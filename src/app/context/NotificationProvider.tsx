"use client";
import { NotificationArgsProps, notification } from "antd";
import { createContext } from "react";

type NotificationType = "success" | "info" | "warning" | "error";

export const NotificationContext = createContext({});
type NotificationPlacement = NotificationArgsProps["placement"];

export const NotificationProvider = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();

  const toast = (
    message: string,
    description: string,
    type: NotificationType,
    placement?: NotificationPlacement
  ) => {
    api[type]({
      message,
      description,
      placement: placement || "bottomLeft",
    });
  };

  return (
    <NotificationContext.Provider value={{ toast }}>
      {children}
      {contextHolder}
    </NotificationContext.Provider>
  );
};
