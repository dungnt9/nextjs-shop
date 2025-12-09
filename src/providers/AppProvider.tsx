"use client";

import React from "react";
import { Toaster } from "react-hot-toast";
import { SocketProvider } from "@/contexts/SocketContext";
import NotificationHandler from "@/components/notifications/NotificationHandler";

interface AppProviderProps {
  children: React.ReactNode;
}

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <SocketProvider>
      {children}
      <NotificationHandler />
      <Toaster position="top-right" />
    </SocketProvider>
  );
}
