import React, { useState, useEffect } from "react";
import Modal from "./common/Modal";

interface ResultModalProps {
  result: number;
}

const ResultModal: React.FC<ResultModalProps> = ({ result }) => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000); // Confetti will be shown for 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <Modal
      isOpen
      onClose={() => {}}
      showOverlay
      showDoneButton
      useDefaultCloseIcon
    >
      {showConfetti && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <img
            src="/assets/gifs/confetti.gif"
            alt="Confetti"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="mx-80 mb-7 flex flex-col items-center space-y-4">
        <img src="/assets/icons/result.svg" alt="Result" />
        <div className="!-mt-16 text-9xl leading-none">{result}</div>
        <div className="text-2xl">Selected</div>
        <div>
          <img src="/assets/icons/select.svg" alt="Select" />
        </div>
      </div>
    </Modal>
  );
};

export default ResultModal;
