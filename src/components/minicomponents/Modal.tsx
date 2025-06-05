import React from "react";
import { createPortal } from "react-dom";

type ModalButton = {
  label: string;
  onClick: () => void;
  className?: string;
};

interface ModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  buttons: ModalButton[];
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, message, buttons }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-30 backdrop-blur-xs">
      <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-md p-6">
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
        {message && <p className="mb-6">{message}</p>}
        <div className="flex justify-end gap-4 flex-wrap">
          {buttons.map((btn, index) => (
            <button
              key={index}
              onClick={btn.onClick}
              className={`px-4 py-2 rounded-lg ${btn.className ?? 'bg-gray-300 hover:bg-gray-400'}`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
