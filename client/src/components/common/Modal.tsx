import React, { Dispatch, ReactNode, SetStateAction, MouseEvent } from "react";
import Button from "./Button";
import { ModalNames } from "src/pages/HomePage";

interface ModalProps {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<ModalNames | null>>;
  showOverlay?: boolean;
  showDoneButton?: boolean;
  useDefaultCloseIcon?: boolean;
  children: ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  showOverlay = false,
  showDoneButton = false,
  useDefaultCloseIcon = false,
  children,
  className = "",
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose(null);
    }
  };

  return (
    <div
      className={`min-h-screen fixed inset-0 z-50 flex flex-col items-center justify-center ${
        showOverlay && "bg-black bg-opacity-50 backdrop-blur-sm"
      }`}
      onClick={handleOverlayClick}
    >
      <div
        className={`bg-white p-4 md:p-6 ${
          showOverlay ? "rounded-custom relative" : "rounded-custom-lg relative"
        } shadow-3xl w-[90%] md:w-[50%] max-w-[900px] ${className}`}
      >
        <button
          className="absolute top-4 right-4 md:top-6 md:right-6 text-black hover:text-gray"
          onClick={() => onClose(null)}
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
            onClick={() => onClose(null)}
          >
            Done
          </Button>
        </div>
      )}
    </div>
  );
};

export default Modal;
