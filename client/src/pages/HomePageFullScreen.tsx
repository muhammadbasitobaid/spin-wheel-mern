import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import VerticalScoreCard from "src/components/VerticalScoreCard";
import VolumeController from "src/components/VolumeController";
import { setActiveModal, setFullScreenMode } from "src/store/actions/wheel";
import { RootState, AppDispatch } from "src/store/store";
import SpinWheel from "src/components/SpinWheel";

import { 
  YesNoWheel
} from "src/constants";

export default function HomeFullScreen() {
  const { fullScreenMode, selectedWheel } = useSelector((state: RootState) => state.wheel);
  const dispatch: AppDispatch = useDispatch(); // Use AppDispatch

  const [initiateFadeOut, setInitiateFadeOut] = useState(false);

  useEffect(() => {

    if(initiateFadeOut){
      setTimeout(() => {
        setInitiateFadeOut(false)
        dispatch(setFullScreenMode(false))
      }, 2000)
    }

  }, [initiateFadeOut])

  return (

      <div className="absolute top-0 w-full h-full flex">
        <div className={clsx("opacity-0 max-w-[1360px] mx-auto p-6 pb-0 flex-1 lg:flex lg:flex-row lg:justify-between lg:items-center overflow-hidden ", { "block animate-fadeIn ": fullScreenMode })}>
        <div
          className={clsx(
            "mb-8 lg:mb-0 lg:w-1/2 lg:flex gap-6 ",
            { "flex-1 animate-fadeIn": fullScreenMode },
            { "flex-1 animate-fadeOut": initiateFadeOut }
          )}
        >
          <span className="flex-1">
                <SpinWheel />
          </span>
          <div
            className={clsx("lg:flex lg:flex-col-reverse lg:justify-center", {
              "flex-1": !fullScreenMode,
            })}
          >
            <div className="flex justify-between items-end h-[60px] lg:hidden">
              <VolumeController />
              <button
                onClick={() => dispatch(setActiveModal("history"))}
                className="flex justify-center items-center"
              >
                <img
                  src="/assets/icons/history.svg"
                  alt="history"
                  className="h-[43px]"
                />
              </button>
            </div>
            {
              selectedWheel && selectedWheel.name === YesNoWheel.name && (
            <div
              className={clsx({
                "block animate-fadeIn": fullScreenMode,
              })}
            >
              <VerticalScoreCard />
            </div>

              )
            }

          </div>
          <div className="hidden relative z-50 lg:block lg:flex lg:flex-col lg:justify-end lg:w-[66px] lg:gap-2">
            <VolumeController />
            <button
              className="flex justify-center items-center"
              onClick={() => dispatch(setActiveModal("history"))}
            >
              <img
                src="/assets/icons/history.svg"
                alt="history"
                className="h-[43px]"
              />
            </button>

            {fullScreenMode && (
              <button
                onClick={() => setInitiateFadeOut(true)}
                className="flex justify-center"
              >
                <img
                  src="/assets/icons/exit_fullscreen.svg"
                  alt="Close Fullscreen mode"
                  title="Close Fullscreen mode"
                  className="w-[30px] aspect-square cursor-pointer"
                />
              </button>
            )}
          </div>
        </div>
      </div>
      </div>
  );
}
