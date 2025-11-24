"use client";

type ToastType = "info" | "success" | "warning" | "error";

export type ToastMessage = {
  id: number;
  type: ToastType;
  message: string;
};

const listeners = new Set<(toast: ToastMessage) => void>();

export function showToast(message: string, type: ToastType = "info") {
  const toast: ToastMessage = {
    id: Date.now(),
    type,
    message,
  };

  listeners.forEach((fn) => fn(toast));
}

export function toastInfo(msg: string) { showToast(msg, "info"); }
export function toastSuccess(msg: string) { showToast(msg, "success"); }
export function toastWarning(msg: string) { showToast(msg, "warning"); }
export function toastError(msg: string) { showToast(msg, "error"); }

export function subscribeToast(fn: (toast: ToastMessage) => void) {
  listeners.add(fn);
  return () => { listeners.delete(fn) };
}
