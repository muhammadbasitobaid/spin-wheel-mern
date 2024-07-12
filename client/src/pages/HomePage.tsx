import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavBar } from "src/components";
import Auth from "src/components/Auth";
import Configurator from "src/components/Configurator";
import EditWheel from "src/components/EditWheel";
import ResultModal from "src/components/ResultModal";
import ScoreCard from "src/components/ScoreCard";
import SpinWheel from "src/components/SpinWheel";
import VolumeController from "src/components/VolumeController";
import { RootState } from "src/store/store";

export type ModalNames =
  | "result"
  | "profile"
  | "wheels"
  | "settings"
  | "share"
  | null;

export default function Home() {
  const { activeModal } = useSelector((state: RootState) => state.wheel);

  useEffect(() => {
    console.log(activeModal);
  }, [activeModal]);

  return (
    <div className="max-w-[1360px] mx-auto min-h-screen flex flex-col">
      {activeModal === "profile" && <Auth />}
      {activeModal === "wheels" && <Auth />}
      {activeModal === "settings" && <Configurator />}

      {activeModal === "result" && <ResultModal />}
      <NavBar />
      <div className="p-6 flex-1 lg:flex lg:flex-row lg:justify-between gap-6">
        <div className="mb-8 lg:mb-0 lg:w-1/2 lg:flex lg:flex-col lg:justify-center">
          <h1 className="text-black text-4xl font-medium">
            Yes No Picker Wheel
          </h1>
          <span className="text-light-gray text-base font-normal">
            Decide yes or no by wheel
          </span>
          <div className="lg:flex-1 lg:flex lg:justify-center lg:items-center">
            <SpinWheel />
          </div>
        </div>
        <div className="flex-1 lg:flex lg:flex-col-reverse lg:justify-center">
          <div className="flex justify-between h-[60px] lg:hidden">
            <VolumeController />
            <img
              src="/assets/icons/history.svg"
              alt="history"
              className="h-[43px]"
            />
          </div>
          <div>
            <ScoreCard />
          </div>
          <div>
            <EditWheel />
          </div>
        </div>
        <div className="hidden lg:block lg:flex lg:flex-col lg:w-[66px] lg:gap-2">
          <VolumeController />
          <img
            src="/assets/icons/history.svg"
            alt="history"
            className="h-[43px]"
          />
        </div>
      </div>
    </div>
  );
}
