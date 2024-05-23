import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-1/3">
        <button
          className="absolute top-3 right-3 text-gray-700 hover:text-gray-900"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold">Modal Title</h2>
          <p className="mt-2 text-gray-600">This is the modal body.</p>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="bg-blue text-white py-2 px-4 rounded hover:bg-blue"
          onClick={onClose}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default Modal;
