import { useState, useRef, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import { Wheel } from "spin-wheel";
import { setActiveModal, setResult, setWheelSnapshot } from "src/store/actions/wheel";
import { RootState } from "src/store/store";
import { getBgColorForLabel, getLabelColor } from "src/utils";
import { Howl } from "howler";
import {toast} from 'react-hot-toast';

interface WheelListItem {
  label: string;
  labelColor: "#FFFFFF" | "#000000";
  value: string;
}

interface SpinWheelInstance {
  spinToItem: (
    itemIndex: number,
    duration?: number,
    spinToCenter?: boolean,
    numberOfRevolutions?: number,
    direction?: 1 | -1,
    easingFunction?: null | ((t: number) => number)
  ) => void;
  stop: () => void;
  raiseEvent_onRest: () => void;
}

const randomizeNumber = (number: number) => Math.floor(Math.random() * number);

const SpinWheel = () => {
  const dispatch = useDispatch();
  const { wheelList, wheelSnapshot,  selectedTheme, spinConfig } =
    useSelector((state: RootState) => state.wheel);
  const {inputNumbers, history,} = wheelSnapshot;
  const {
    mysterySpinOption,
    randomInitialAngleOption,
    spinCountOption,
    manuallyStopOption,
    spinningSpeedLevel,
    spinningDuration,
  } = spinConfig;

  const n = inputNumbers || 1;
  const [isWheelSpinning, setWheelSpinning] = useState(false);
  const [spinCount, setSpinCount] = useState(0);

  // Dynamic itemLabelRadiusMax based on the number of wheel items
  const itemLabelRadiusMax = useMemo(() => {
    if (!wheelList || wheelList.length === 0) return 0.5; // Default value
    const numItems = wheelList.length;
    if (numItems > 10) {
      return 0.8; // Larger radius for more items
    } else if (numItems > 5) {
      return 0.6; // Medium radius for moderate number of items
    } else {
      return 0.4; // Smaller radius for fewer items
    }
  }, [wheelList]);

  // Generate wheel items based on wheelList and repeat them according to inputNumbers
  const wheelItems: WheelListItem[] = useMemo(() => {
    let items: WheelListItem[] = [];
    if (!wheelList || wheelList.length === 0) return items;

    for (let i = 0; i < n; i++) {
      items = items.concat(
        wheelList.map((item: string, index: number) => ({
          label: mysterySpinOption ? "?" : item,
          labelColor: getLabelColor(getBgColorForLabel(index, selectedTheme)),
          value: item,
        }))
      );
    }
    return items;
  }, [wheelList, n, selectedTheme, mysterySpinOption]);

  const container = useRef<HTMLDivElement | null>(null);
  const shadowCanvas = useRef<HTMLCanvasElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [wheel, setWheel] = useState<SpinWheelInstance | null>(null);

  useEffect(() => {
    if (!container.current || !shadowCanvas.current) return;

    const updateCanvasDimensions = () => {
      if (container.current && shadowCanvas.current) {
        const containerRect = container.current.getBoundingClientRect();
        shadowCanvas.current.width = containerRect.width * 1.31;
        shadowCanvas.current.height = containerRect.height * 1.31;
      }
    };

    const rotation = randomInitialAngleOption ? randomizeNumber(360) : 0;

    const tickSound = new Howl({
      src: ["/assets/sounds/tick.mp3"],
    });

    const initializeWheel = () => {
      const shadowCtx = shadowCanvas.current!.getContext("2d");
      if (shadowCtx) {
        const radius =
          (Math.min(shadowCanvas.current!.width, shadowCanvas.current!.height) /
            2) *
          0.83;
        shadowCtx.clearRect(
          0,
          0,
          shadowCanvas.current!.width,
          shadowCanvas.current!.height
        );
        shadowCtx.beginPath();
        shadowCtx.arc(
          shadowCanvas.current!.width / 2,
          shadowCanvas.current!.height / 2,
          radius,
          0,
          2 * Math.PI
        );
        shadowCtx.fillStyle = "rgba(0, 0, 0, 0.1)";
        shadowCtx.filter = "blur(15px)";
        shadowCtx.fill();
      }

      const newWheel = new Wheel(container.current!, {
        radius: 1,
        borderWidth: 5,
        borderColor: "#ffff",
        itemLabelFontSizeMax: 28, 
        itemLabelRadiusMax, 
        lineColor: "#ffff",
        itemBackgroundColors: selectedTheme,
        items: wheelItems,
        rotation,
        onSpin: () => {
          // Placeholder for spin start logic
        },
        onRest: (event: any) => {
          const stoppedItemIndex = event.currentIndex;
          const stoppedItemLabel =
            wheelItems[stoppedItemIndex].label === "?"
              ? wheelItems[stoppedItemIndex].value
              : wheelItems[stoppedItemIndex].label;
          dispatch(setResult(stoppedItemLabel));
          dispatch(setActiveModal("result"));
          const updatedHistory = [...(history ?? [])];
          updatedHistory.push(stoppedItemLabel);

          dispatch(setWheelSnapshot({history: updatedHistory}));
          setWheelSpinning(false);
        },
        onCurrentIndexChange: () => {
          tickSound.play();
        },
      });
      setWheel(newWheel);
    };

    window.addEventListener("resize", updateCanvasDimensions);
    updateCanvasDimensions();
    initializeWheel();
    setMounted(true);

    return () => {
      window.removeEventListener("resize", updateCanvasDimensions);
      if (container.current) {
        container.current.innerHTML = "";
      }
      if (shadowCanvas.current) {
        const shadowCtx = shadowCanvas.current.getContext("2d");
        if (shadowCtx) {
          shadowCtx.clearRect(
            0,
            0,
            shadowCanvas.current.width,
            shadowCanvas.current.height
          );
        }
      }
      setWheel(null);
    };
  }, [
    wheelItems,
    dispatch,
    history,
    randomInitialAngleOption,
    selectedTheme,
    spinningSpeedLevel,
  ]);

  const handleSpinButtonClick = () => {
    !wheelList?.length && toast.error("Please add atleast one letter for Custom Letter wheel to work!")
    if (!wheel || !wheelList?.length) return;
    if (mounted && !isWheelSpinning) {
      wheel.spinToItem(
        randomizeNumber(wheelItems.length),
        manuallyStopOption ? Number.MAX_SAFE_INTEGER : spinningDuration * 1000,
        true,
        manuallyStopOption ? Number.MAX_SAFE_INTEGER : spinningSpeedLevel * 2,
        1
      );
      setWheelSpinning(true);
      setSpinCount((prev) => prev + 1);
    } else if (manuallyStopOption) {
      wheel.stop();
      wheel.raiseEvent_onRest();
      setWheelSpinning(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="p-8 relative flex justify-center items-center h-[280px] sm:h-[320px] md:h-[380px] lg:h-[90%] w-full">
        <canvas ref={shadowCanvas} className="absolute"></canvas>
        <div
          id="wheel"
          ref={container}
          className="relative flex justify-center items-center w-full h-full"
        ></div>
        <div className="absolute inset-0 flex justify-center items-center">
          <button
            onClick={handleSpinButtonClick}
            className="p-0 m-0 border-none bg-none cursor-pointer relative"
            title={
              isWheelSpinning && manuallyStopOption
                ? "Stop the Wheel"
                : "Spin the Wheel"
            }
          >
            <img
              src="/assets/icons/indicator.svg"
              alt="indicator"
              className="w-[40px] sm:w-[50px] lg:w-[70px] xl:w-[85px]"
              style={{ filter: "drop-shadow(0 0 10px rgba(0, 0, 0, 0.5))" }}
            />
            <span className="absolute inset-0 flex justify-center items-center font-medium text-xs sm:text-sm lg:text-base">
              {isWheelSpinning && manuallyStopOption ? "STOP" : "SPIN"}
            </span>
          </button>
        </div>
      </div>
      <div className="text-center flex justify-center gap-2 mt-4 relative z-40">
        {spinCountOption && (
          <>
            <strong>{`Spin Count: ${spinCount}`}</strong>
            <button className="" onClick={() => setSpinCount(0)}>
              <img
                src="/assets/icons/refresh.svg"
                alt="Reset Spin Count"
                className="w-4 sm:w-5 lg:w-6 xl:w-7"
                title="Reset Spin Count"
              />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SpinWheel;
