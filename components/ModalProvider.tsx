"use client";

import { useEffect, useState } from "react";
import { modal, type ModalOptions, subscribeModal } from "@/lib/modal";

export function ModalProvider() {
  const [options, setOptions] = useState<ModalOptions | null>(null);

  useEffect(() => {
    return subscribeModal((opts) => setOptions(opts));
  }, []);

  const close = () => {
    options?.onClose?.();
    modal.hide();
  };

  if (!options) return null;

  return (
    <dialog open className="modal">
      <div className="modal-box max-w-2xl">
        {options.content}

        <div className="modal-action">
          <button className="btn" onClick={close}>
            Close
          </button>
        </div>
      </div>

      {options.closeOnOutsideClick !== false && (
        <form className="modal-backdrop" method="dialog">
          <button onClick={close}>close</button>
        </form>
      )}
    </dialog>
  );
}
