import { useEffect, useState } from "react";
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
import SpinWheel from "src/components/SpinWheel";
import VolumeController from "src/components/VolumeController";
import { setActiveModal, setSelectedWheel } from "src/store/actions/wheel";
import { RootState } from "src/store/store";
import ModifyModal from "./ModifyModal";
import WheelsListModal from "src/components/WheelsListModal";
import { fetchWheelById } from "src/store/thunks/wheel";
import { 
  YesNoWheel,
  CustomOptionsWheel,
  NumberWheel,
  LetterWheel,
} from '../constants';
import HomePageFullScreen from "src/pages/HomePageFullScreen"

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
  const [ initiateAnimation, setInitiateAnimation ]  = useState(false);
  const [ hideSmallScreen, setHideSmallScreen ]  = useState(false);

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

  useEffect(() => {
  if(fullScreenMode){
    setInitiateAnimation(true);
    setTimeout(() => {
      setHideSmallScreen(true);
    }, 1000);
  }

  }, [fullScreenMode]);


useEffect(() => {
  const path = location.pathname;

  switch (path) {
    case "/yes-or-no-wheel":
      dispatch(setSelectedWheel(YesNoWheel));
      break;
    case "/random-number-wheel":
      dispatch(setSelectedWheel(NumberWheel));
      break;
    case "/random-letter-generator":
      dispatch(setSelectedWheel(LetterWheel));
      break;
    case "/":
      dispatch(setSelectedWheel(CustomOptionsWheel));
      break;
    default:
      break;
  }
}, [location.pathname, dispatch]);

  return (
      <div className="flex flex-col min-h-[100vh]">
        {activeModal === "profile" && <Auth />}
        {activeModal === "wheels" && <WheelsListModal />}
        {activeModal === "settings" && <Configurator />}
        {activeModal === "result" && <ResultModal />}
        {activeModal === "history" && <Results />}
        {activeModal === "modify" && <ModifyModal />}
        <NavBar />
      {
        !hideSmallScreen ? (
        <div className="flex-1 w-full h-full flex">
        <div className={clsx("max-w-[1360px] mx-auto flex-1 lg:flex lg:flex-row lg:justify-between gap-6 lg:overflow-hidden ", { "animate-fadeOut": initiateAnimation })}>
          <div className="flex-1 mb-8 lg:mb-0 lg:w-1/2 lg:flex lg:flex-col lg:justify-center">
            <h1 className="p-6 py-0 mt-[30px] lg:mt-0 text-black text-4xl font-medium ">
              {selectedWheel.label || "N/A"} Picker Wheel
            </h1>
            <span className="text-light-gray text-base font-normal p-6 py-0 ">
              Decide {selectedWheel.label || "N/A"} by wheel
            </span>
            <SpinWheel/>
          </div>
          <div className="p-6 py-0 md:p-0 md:min-w-[35%] lg:flex lg:flex-col-reverse lg:justify-center">
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

            {/* Don't apply fade-out to ScoreCard */}
            {selectedWheel.name === YesNoWheel.name && (
              <div>
                <ScoreCard />
              </div>
            )}
            <div>
              <EditWheel />
            </div>
          </div>
          <div className="hidden lg:flex lg:flex-col lg:justify-end lg:w-[66px] lg:gap-2 pb-8">
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
        ): (
        <HomePageFullScreen />
        )
      }
      </div>
  );
}
