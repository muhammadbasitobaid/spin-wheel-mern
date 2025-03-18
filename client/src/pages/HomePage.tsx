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
import {
  setActiveModal,
  setSelectedWheel,
  setWheelSnapshot,
  setLastRotation,
} from "src/store/actions/wheel";
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
  letterWheelDefaultOption,
  initCustomWheelOptions,
} from "../constants";
import { generateAlphabetArray } from "../utils";
import HomePageFullScreen from "src/pages/HomePageFullScreen";
import parse from "html-react-parser";
import { Helmet } from "react-helmet-async";

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

// Add prop type for HomePage
interface HomeProps {
  canonicalUrl?: string;
}

interface MetaInfo {
  title: string;
  description: string;
}

const META_INFO: Record<string, MetaInfo> = {
  default: {
    title: "The Spinner Wheel - Free Random Choice Picker",
    description:
      "Use The Spinner Wheel to make decisions with a customizable random choice picker. Try the Yes/No Wheel, Number Picker, Letter Picker and more for free!",
  },
  "yes-or-no-wheel": {
    title: "Yes or No Picker Wheel - Spin The Wheel To Decide Yes or No",
    description:
      "The Yes No Picker Wheel is a unique decision-making tool that provides random yes, no, or maybe answers. You can make your decision with a simple spin.",
  },
  "random-number-generator": {
    title: "Number Picker Wheel - Spin the Wheel to Pick Random Numbers",
    description:
      "The Number Picker Wheel lets you pick random numbers for making decisions with a simple spin. You can customize your number range and generate unbiased results.",
  },
  "random-letter-generator": {
    title: "Letter Picker Wheel - Pick Random Letters from A to Z",
    description:
      "The Random Letter Picker Wheel helps you generate random letters effortlessly. With a quick spin, you can select letters for word games, educational activities, and more.",
  },
};

export default function Home({ canonicalUrl }: HomeProps) {
  const { activeModal, selectedWheel, fullScreenMode } = useSelector(
    (state: RootState) => state.wheel
  );
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [initiateAnimation, setInitiateAnimation] = useState(false);
  const [isLoadingWheel, setIsLoadingWheel] = useState(false);
  const [hideSmallScreen, setHideSmallScreen] = useState(false);

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
      dispatch(
        // @ts-ignore
        fetchWheelById(wheelId, () => {
          setIsLoadingWheel(false);
        })
      );
    }
  }, [location.search, dispatch]);

  useEffect(() => {
    if (fullScreenMode) {
      setInitiateAnimation(true); // Trigger fadeOut for home content when entering fullscreen
      setTimeout(() => {
        setHideSmallScreen(true);
      }, 1000); // Duration should match fadeOut
    } else {
      setHideSmallScreen(false);
      setInitiateAnimation(false);
    }
  }, [fullScreenMode]);

  useEffect(() => {
    const path = location.pathname;

    // Reset last rotation when changing wheel type
    dispatch(setLastRotation(0));

    switch (path) {
      case "/yes-or-no-wheel":
        dispatch(setSelectedWheel(YesNoWheel));
        break;
      case "/random-number-wheel":
        dispatch(setSelectedWheel(NumberWheel));
        break;
      case "/random-letter-generator":
        dispatch(setSelectedWheel(LetterWheel));
        dispatch(
          setWheelSnapshot({
            options: generateAlphabetArray(
              DEFAULT_LETTER_WHEEL_CASING === UPPERCASE
            ),
            selectedOption: letterWheelDefaultOption,
          })
        );
        break;
      case "/":
        dispatch(setSelectedWheel(CustomOptionsWheel));
        dispatch(
          setWheelSnapshot({
            options: initCustomWheelOptions,
            selectedOption: initCustomWheelOptions[0],
          })
        );
        break;
      default:
        break;
    }
  }, [location.pathname, dispatch]);

  // Fix the useEffect return type issue
  useEffect(() => {
    if (canonicalUrl) {
      // Find existing canonical link or create a new one
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute("href", canonicalUrl);

      // Cleanup function
      return () => {
        if (canonicalLink && canonicalLink.parentNode) {
          canonicalLink.parentNode.removeChild(canonicalLink);
        }
      };
    }
    return () => {}; // Add return for when canonicalUrl is falsy
  }, [canonicalUrl]);

  // Get the current path without the leading slash
  const currentPath = location.pathname.slice(1) || "default";
  const metaInfo = META_INFO[currentPath] || META_INFO.default;

  return isLoadingWheel ? (
    <div className="flex items-center justify-center h-screen max-h-screen">
      <Spinner />
    </div>
  ) : (
    <div>
      <Helmet>
        <title>{metaInfo.title}</title>
        <meta name="description" content={metaInfo.description} />
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      </Helmet>

      <div className="flex flex-col min-h-[100vh] lg:overflow-hidden">
        {activeModal === "profile" && <Auth />}
        {activeModal === "wheels" && <WheelsListModal />}
        {activeModal === "settings" && <Configurator />}
        {activeModal === "result" && <ResultModal />}
        {activeModal === "history" && <Results />}
        {activeModal === "modify" && <ModifyModal />}
        <NavBar />
        {!hideSmallScreen ? (
          <div className="flex-1 w-full h-full flex">
            <div
              className={clsx(
                "max-w-[1360px] mx-auto flex-1 lg:flex lg:flex-row lg:justify-between gap-6 lg:overflow-hidden",
                initiateAnimation && !hideSmallScreen
                  ? "animate-fadeOut"
                  : "opacity-0 animate-fadeIn"
              )}
            >
              {selectedWheel && (selectedWheel.name || selectedWheel.label) && (
                <div className="flex-1 mb-8 lg:mb-0 lg:w-1/2 lg:flex lg:flex-col lg:justify-center">
                  <h1 className="p-6 py-0 mt-[30px] lg:mt-0 text-black text-4xl font-medium">
                    {selectedWheel.label || selectedWheel.name || "N/A"} Picker
                    Wheel
                  </h1>
                  <span className="text-light-gray text-base font-normal p-6 py-0">
                    Decide {selectedWheel.label || selectedWheel.name || "N/A"}{" "}
                    by Wheel
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
        )}
      </div>
      <div className="max-w-[90%] lg:max-w-4xl mx-auto">
        {selectedWheel && parse(selectedWheel.htmlStr)}
      </div>
      <footer className="bg-gray-100 text-center text-gray-700 py-6 mt-8 border-t border-gray-300">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row md:justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-lg font-semibold">
              &copy; 2025 The Spinner Wheel
            </span>
          </div>
          <ul className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
            <li>
              <a href="/about-us" className="hover:text-blue-600 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact-us" className="hover:text-blue-600 transition">
                Contact Us
              </a>
            </li>
            <li>
              <a
                href="/privacy-policy"
                className="hover:text-blue-600 transition"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="/terms-and-conditions"
                className="hover:text-blue-600 transition"
              >
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer">
                Site Map
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
