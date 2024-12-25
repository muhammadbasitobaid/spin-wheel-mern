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
import { setActiveModal, setSelectedWheel, setWheelSnapshot } from "src/store/actions/wheel";
import { RootState } from "src/store/store";
import ModifyModal from "./ModifyModal";
import WheelsListModal from "src/components/WheelsListModal";
import { fetchWheelById } from "src/store/thunks/wheel";
import Spinner from "src/components/common/Spinner";
import { 
  YesNoWheel,
  CustomOptionsWheel,
  NumberWheel,
  LetterWheel,
  DEFAULT_LETTER_WHEEL_CASING,
  UPPERCASE,
  letterWheelDefaultOption
} from '../constants';
import { generateAlphabetArray } from "../utils"
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
  const [ isLoadingWheel, setIsLoadingWheel ]  = useState(false);
  const [ hideSmallScreen, setHideSmallScreen ]  = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const error = params.get("error");

    if (error === "google") {
      toast.error("Google login failed");
      params.delete("error");
      setTimeout(() => {
        navigate({ search: params.toString() }, { replace: true });
      }, 1000);
    }

  }, [activeModal, location.search, navigate, dispatch]);

  useEffect(() => {

    const params = new URLSearchParams(location.search);
    const wheelId = params.get("id");

    if (wheelId) {
      setIsLoadingWheel(true);
      // @ts-ignore
      dispatch(fetchWheelById(wheelId, () => {setIsLoadingWheel(false)}));
    }
  }, [location.search, dispatch])

useEffect(() => {
  if (fullScreenMode) {
    setInitiateAnimation(true); // Trigger fadeOut for home content when entering fullscreen
    setTimeout(() => {
      setHideSmallScreen(true);
    }, 1000); // Duration should match fadeOut
  }else{

    setHideSmallScreen(false);
    setInitiateAnimation(false); 
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
      dispatch(setWheelSnapshot({options: generateAlphabetArray(DEFAULT_LETTER_WHEEL_CASING === UPPERCASE), selectedOption: letterWheelDefaultOption}))
      break;
    case "/":
      dispatch(setSelectedWheel(CustomOptionsWheel));
      break;
    default:
      break;
  }
}, [location.pathname, dispatch]);

return (
  isLoadingWheel ? (
    <div className="flex items-center justify-center h-screen max-h-screen">
      <Spinner />
    </div>
  ) : (
    <div className="flex flex-col min-h-[100vh] lg:overflow-hidden">
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
            <div className={clsx(
              "max-w-[1360px] mx-auto flex-1 lg:flex lg:flex-row lg:justify-between gap-6 lg:overflow-hidden",
              initiateAnimation && !hideSmallScreen ? "animate-fadeOut" : "opacity-0 animate-fadeIn"
            )}>
              {selectedWheel && (selectedWheel.name || selectedWheel.label) && (
                <div className="flex-1 mb-8 lg:mb-0 lg:w-1/2 lg:flex lg:flex-col lg:justify-center">
                  <h1 className="p-6 py-0 mt-[30px] lg:mt-0 text-black text-4xl font-medium">
                    {selectedWheel.label || selectedWheel.name || "N/A"} Picker Wheel
                  </h1>
                  <span className="text-light-gray text-base font-normal p-6 py-0">
                    Decide {selectedWheel.label || selectedWheel.name || "N/A"} by wheel
                  </span>
                  <SpinWheel />
                </div>
              )}
              <div className="md:min-w-[35%] lg:flex lg:flex-col-reverse lg:justify-center">
                <div className="px-6 flex justify-between h-[60px] lg:hidden lg:px-0">
                  <VolumeController />
                  <button
                    onClick={() => {
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
                {selectedWheel && selectedWheel.name === YesNoWheel.name && (
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
        ) : (
          <HomePageFullScreen />
        )
      }
    </div>
  )
);
}
