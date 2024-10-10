import React, { useEffect, useState } from "react";
import Modal from "./common/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setActiveModal } from "src/store/actions/wheel";
import { RootState } from "src/store/store";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { Howl } from "howler";

const ResultModal: React.FC = () => {
  const dispatch = useDispatch();
  const { result, spinConfig, popUpMessage } = useSelector(
    (state: RootState) => state.wheel
  );
  const { confetti } = spinConfig;
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (confetti) {
      setShowConfetti(true);
      const sound = new Howl({
        src: ["/assets/sounds/confetti.mp3"],
      });
      sound.play();

      const timer = setTimeout(() => {
        setShowConfetti(false);
        // dispatch(setConfetti(false));
        sound.stop();
      }, 2000); // Confetti will be shown for 5 seconds

      return () => {
        clearTimeout(timer);
        sound.stop();
      };
    }
    return () => {};
  }, [confetti, dispatch]);

  // Debugging useEffect to log state changes
  useEffect(() => {
    console.log("Global state: ", { result, spinConfig });
  }, [result, spinConfig]);

  return (
    <Modal
      isOpen
      onClose={() => dispatch(setActiveModal(null))}
      showOverlay
      showDoneButton
      useDefaultCloseIcon
    >
      {showConfetti && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Confetti
            width={width}
            height={height}
            tweenDuration={1000}
            gravity={0.7}
            friction={1}
            initialVelocityY={20}
          />
        </div>
      )}
      <div className="mb-7 flex flex-col items-center justify-center space-y-4 mx-auto">
        {popUpMessage && (
          <div className="flex-1 flex flex-col items-center justify-center ">
            <span className="text-center text-2xl font-semibold mb-4">
              {popUpMessage}
            </span>
          </div>
        )}
        <img
          src="/assets/icons/result.svg"
          alt="Result"
          className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28"
        />
        <div className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl leading-none -mt-4 md:-mt-8 lg:-mt-12 xl:-mt-16">
          {result}
        </div>
        <div className="text-xl md:text-2xl font-semibold">Selected</div>
        <div>
          <img
            src="/assets/icons/select.svg"
            alt="Select"
            className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14"
          />
        </div>
      </div>
    </Modal>
  );
};

export default ResultModal;
