import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import toast from "react-hot-toast";
import { NavBar } from "src/components";
import Auth from "src/components/Auth";
import Configurator from "src/components/Configurator";
import EditWheel from "src/components/EditWheel";
import ResultModal from "src/components/ResultModal";
import Results from "src/components/Results";
import ScoreCard from "src/components/ScoreCard";
import VerticalScoreCard from "src/components/VerticalScoreCard"; // Import the VerticalScoreCard
import SpinWheel from "src/components/SpinWheel";
import VolumeController from "src/components/VolumeController";
import { setActiveModal } from "src/store/actions/wheel";
import { RootState } from "src/store/store";
import ModifyModal from "./ModifyModal";
import WheelsListModal from "src/components/WheelsListModal";
import { fetchWheelById } from "src/store/thunks/wheel";
import { YesNoWheel } from '../constants';

export type ModalNames =
  | "result"
  | "profile"
  | "switch_wheels"
  | "wheels"
  | "settings"
  | "share"
  | "history"
  | "modify"
  | null;

export default function Home() {
  const { activeModal, selectedWheel, fullScreenMode } = useSelector((state: RootState) => state.wheel);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const error = params.get("error");
    const wheelId = params.get("id");

    if (error === "google") {
      toast.error("Google login failed");
      params.delete("error");
      setTimeout(() => {
        navigate({ search: params.toString() }, { replace: true });
      }, 1000);
    }

    if (wheelId) {
      // @ts-ignore
      dispatch(fetchWheelById(wheelId));
    }
  }, [activeModal, location, navigate, dispatch]);

  // Helper class to toggle fade-out
  const fadeOutClass = fullScreenMode ? "animate-fadeOut" : "";

  return (
    <div className="flex flex-col">
      {/* Components will fade out if fullScreenMode is true */}
      <div>
        {activeModal === "profile" && <Auth />}
        {activeModal === "wheels" && <WheelsListModal />}
        {activeModal === "settings" && <Configurator />}
        {activeModal === "result" && <ResultModal />}
        {activeModal === "history" && <Results />}
        {activeModal === "modify" && <ModifyModal />}
        <NavBar />
        <div className="max-w-[1360px] mx-auto p-6 py-0 flex-1 lg:flex lg:flex-row lg:justify-between gap-6 mt-8 overflow-hidden">
          <div className={clsx("mb-8 lg:mb-0 lg:w-1/2 lg:flex lg:flex-col lg:justify-center", {"flex-1": !fullScreenMode})}>
            <h1 className="text-black text-4xl font-medium">
              {selectedWheel.label || "N/A"} Picker Wheel
            </h1>
            <span className="text-light-gray text-base font-normal">
              Decide {selectedWheel.label || "N/A"} by wheel
            </span>
            {/*TODO: put flex-1 only if the fullScreenMode is not true*/}
            <div className="lg:flex-1 lg:flex lg:justify-center lg:items-center">
              <SpinWheel />
            </div>
          </div>
            <div className={clsx("lg:flex lg:flex-col-reverse lg:justify-center", { "flex-1": !fullScreenMode })}>
              <div className="flex justify-between h-[60px] lg:hidden">
              <VolumeController />
              <button
                onClick={() => {
                  console.log("history modal should open");
                  dispatch(setActiveModal("history"));
                }}
                className="flex justify-center items-center"
              >
                <img
                  src="/assets/icons/history.svg"
                  alt="history"
                  className="h-[43px]"
                />
              </button>
              </div>

            {/* Display VerticalScoreCard when fullScreenMode is enabled, otherwise ScoreCard */}
            {selectedWheel.name === YesNoWheel.name && (
              <div>
                {fullScreenMode ? <VerticalScoreCard /> : <ScoreCard />}
              </div>
            )}

            <div className={clsx(fadeOutClass, { hidden: fullScreenMode })}>
              <EditWheel />
            </div>
          </div >
          <div className="hidden lg:block lg:flex lg:flex-col lg:w-[66px] lg:gap-2">
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
          </div>
        </div>
      </div>
    </div>
  );
}
