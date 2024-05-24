import React, { ReactNode } from "react";
import Button from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  showOverlay?: boolean;
  showDoneButton?: boolean;
  useDefaultCloseIcon?: boolean;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  showOverlay = false,
  showDoneButton = false,
  useDefaultCloseIcon = false,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={`min-h-screen fixed inset-0 z-50 flex flex-col items-center justify-center ${
        showOverlay && "bg-black bg-opacity-50 backdrop-blur-sm"
      }`}
    >
      <div
        className={`h-[80%] bg-white p-6 ${
          showOverlay ? "rounded-custom relative" : "rounded-custom-lg relative"
        } shadow-3xl  w-[50%]`}
      >
        <button
          className="absolute top-6 right-6 text-gray-700 hover:text-gray-900"
          onClick={onClose}
        >
          {useDefaultCloseIcon && (
            <img
              src="/assets/icons/close.svg"
              alt="Close"
              height={16}
              width={16}
            />
          )}
        </button>
        <div className="text-center h-full flex">{children}</div>
      </div>

      {showDoneButton && (
        <div className="flex justify-center mt-4">
          <Button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={onClose}
            invertedVariant
          >
            Done
          </Button>
        </div>
      )}
    </div>
  );
};

export default Modal;
