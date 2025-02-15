import React, { Dispatch, ReactNode, SetStateAction, MouseEvent } from "react";
import Button from "./Button";
import { ModalNames } from "src/pages/HomePage";
import clsx from "clsx";

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
  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose(null);
    }
  };

  return (
    <div
      className={clsx(
        "opacity-0 min-h-screen fixed inset-0 z-50 top-[40px] flex flex-col items-center justify-center transition-opacity",
        {
          "animate-fadeInFast": isOpen,
          "animate-fadeOutFast": !isOpen,
          "bg-black bg-opacity-50 backdrop-blur-sm": showOverlay,
        }
      )}
      onClick={handleOverlayClick}
    >
      <div
        className={`bg-white p-4 pt-8 md:p-10 md:pb-4 ${
          showOverlay
            ? "rounded-custom-sm lg:rounded-custom relative"
            : "rounded-custom lg:rounded-custom-lg relative"
        } shadow-3xl w-[90%] md:w-[50%] max-w-[900px] max-h-[80%] ${className}`}
      >
        <button
          className="absolute top-3 right-3 md:top-6 md:right-6 text-black hover:text-gray"
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
        <div className="text-center h-full flex flex-col">
          {/* Scrollable Content Container */}
          <div className="overflow-y-auto max-h-[calc(100vh-220px)] px-2">
            {children}
          </div>
        </div>
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
