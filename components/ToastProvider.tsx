"use client";

import { useEffect, useState } from "react";
import { subscribeToast, ToastMessage } from "@/lib/toast";

export function ToastProvider() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    return subscribeToast((toast) => {
      setToasts((prev) => [...prev, toast]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, 3000);
    });
  }, []);

  return (
    <div className="toast toast-top toast-end">
      {toasts.map((toast) => (
        <div key={toast.id} className={`alert alert-${toast.type} shadow-lg`}>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
