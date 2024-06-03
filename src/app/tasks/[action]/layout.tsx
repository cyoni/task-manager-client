"use client";
import { Inter } from "next/font/google";
import "../../globals.css";
import StoreProvider from "@/StoreProvider";
import TaskContextProvider from "@/app/context/TaskContextProvider";
import { Button, Drawer } from "antd";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <TaskContextProvider>
      <div className={inter.className}>
        {children}
      </div>
    </TaskContextProvider>
  );
}
