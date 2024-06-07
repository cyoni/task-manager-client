"use client";
import { Inter } from "next/font/google";
import "../../globals.css";
import TaskContextProvider from "@/context/TaskContextProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TaskContextProvider>
      <div className={inter.className}>{children}</div>
    </TaskContextProvider>
  );
}
