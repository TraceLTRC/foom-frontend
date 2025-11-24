"use client";

export type ModalOptions = {
  content: React.ReactNode;
  closeOnOutsideClick?: boolean;
  onClose?: () => void;
};

type Listener = (options: ModalOptions | null) => void;

const listeners = new Set<Listener>();

export const modal = {
  show(options: ModalOptions) {
    listeners.forEach((fn) => fn(options));
  },

  hide() {
    listeners.forEach((fn) => fn(null));
  },
};

export function subscribeModal(fn: Listener) {
  listeners.add(fn);

  return () => {
    listeners.delete(fn);
  };
}
