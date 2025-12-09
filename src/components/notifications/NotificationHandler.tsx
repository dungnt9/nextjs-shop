"use client";

import { useEffect } from "react";
import { useSocket } from "@/contexts/SocketContext";
import toast from "react-hot-toast";
import type { OrderCreatedEvent } from "@/types";

export default function NotificationHandler() {
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    const handleOrderCreated = (data: OrderCreatedEvent) => {
      toast.success(
        `🎉 ${data.message}\nCustomer: ${data.data.customerName}\nProduct: ${data.data.productName}\nAmount: $${data.data.totalAmount}`,
        {
          duration: 5000,
          position: "top-right",
        }
      );
    };

    socket.on("ORDER_CREATED", handleOrderCreated);

    return () => {
      socket.off("ORDER_CREATED", handleOrderCreated);
    };
  }, [socket]);

  return null; // This component doesn't render anything
}
