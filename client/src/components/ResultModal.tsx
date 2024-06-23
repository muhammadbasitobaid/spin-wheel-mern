import React, {  useEffect } from "react";
import Modal from "./common/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setActiveModal, setConfetti } from "src/store/actions/wheel";
import { RootState } from "src/store/store";
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

const ResultModal: React.FC = () => {
  const dispatch = useDispatch();
  const { result, spinConfig } = useSelector((state: RootState) => state.wheel);
  const {confetti} = spinConfig;
  const { width, height } = useWindowSize()

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setConfetti(false));
    }, 5000); // Confetti will be shown for 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <Modal
      isOpen
      onClose={() => dispatch(setActiveModal(null))}
      showOverlay
      showDoneButton
      useDefaultCloseIcon
    >
      {confetti && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Confetti
            width={width}
            height={height}
            tweenDuration={10000}
            gravity={0.7}
            friction={1}
            initialVelocityY={20}
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
