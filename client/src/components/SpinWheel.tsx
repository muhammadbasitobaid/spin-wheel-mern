import { useState, useRef, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import { Wheel } from "spin-wheel";
import { setActiveModal, setHistory, setResult } from "src/store/actions/wheel";
import { RootState } from "src/store/store";
import { getBgColorForLabel, getLabelColor } from "src/utils";
import { Howl } from "howler";
import { wheels } from "src/constants";

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
  const { selectedWheel, inputNumbers, wheelList, history, selectedTheme, spinConfig } =
    useSelector((state: RootState) => state.wheel);
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

  const wheelItems: WheelListItem[] = useMemo(() => {
    let items: WheelListItem[] = [];
    for (let i = 0; i < n; i++) {
      items = items.concat(
        [...(selectedWheel?.options || wheels[0].options!)].map(
          (item: string, index: number) => ({
            label: mysterySpinOption ? "?" : item,
            labelColor: getLabelColor(getBgColorForLabel(index, selectedTheme)),
            value: item,
          })
        )
      );
    }
    return items;
  }, [selectedWheel.options, n, selectedTheme, mysterySpinOption]);

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
        lineColor: "#ffff",
        lineWidth: 5,
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

          dispatch(setHistory(updatedHistory));
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
    selectedWheel.options,
    spinningSpeedLevel,
  ]);

  const handleSpinButtonClick = () => {
    if (!wheel) return;
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
