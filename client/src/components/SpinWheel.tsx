import { useState, useRef, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import { Wheel } from "spin-wheel";
import { WheelItem } from "src/constants";
import { setActiveModal, setHistory, setResult } from "src/store/actions/wheel";
import { RootState } from "src/store/store";
import { getBgColorForLabel, getLabelColor } from "src/utils";

interface WheelListItem {
  label: string;
  labelColor: "#FFFFFF" | "#000000";
}

interface SpinWheelInstance {
  spinToItem: (
    itemIndex: number,
    duration?: number,
    spinToCenter?: boolean,
    numberOfRevolutions?: number,
    easingFunction?: null | ((t: number) => number)
  ) => void;
}

const randomizeNumber = (number: number) => Math.floor(Math.random() * number);

const SpinWheel = () => {
  const dispatch = useDispatch();
  const { selectedWheel, inputNumbers, history, selectedTheme } = useSelector(
    (state: RootState) => state.wheel
  );
  const n = inputNumbers || 1;

  const wheelItems: WheelListItem[] = useMemo(() => {
    let items: WheelListItem[] = [];
    for (let i = 0; i < n; i++) {
      items = items.concat(
        selectedWheel.options.map((item: WheelItem, index: number) => ({
          label: item.label,
          labelColor: getLabelColor(getBgColorForLabel(index, selectedTheme)),
        }))
      );
    }
    return items;
  }, [selectedWheel.options, n, selectedTheme]);

  const container = useRef<HTMLDivElement | null>(null);
  const shadowCanvas = useRef<HTMLCanvasElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [wheel, setWheel] = useState<SpinWheelInstance | null>(null);

  useEffect(() => {
    if (!container.current || !shadowCanvas.current) return;

    const updateCanvasDimensions = () => {
      if (container.current && shadowCanvas.current) {
        const containerRect = container.current.getBoundingClientRect();
        shadowCanvas.current.width = containerRect.width * 1.2;
        shadowCanvas.current.height = containerRect.height * 1.2;
      }
    };

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
        lineWidth: 3,
        itemBackgroundColors: selectedTheme,
        items: wheelItems,
        onSpin: () => {
          // Placeholder for spin start logic
        },
        onRest: (event: any) => {
          const stoppedItemIndex = event.currentIndex;
          const stoppedItemLabel = wheelItems[stoppedItemIndex].label;
          const selectedItemIndex = selectedWheel.options.findIndex(
            (option: WheelItem) => option.label === stoppedItemLabel
          );
          dispatch(setResult(stoppedItemLabel));
          console.log(history);
          const updatedHistory = [...history];
          const selectedItem = updatedHistory[selectedItemIndex];

          if (selectedItem) {
            selectedItem.occurrences = (selectedItem.occurrences || 0) + 1;
          }
          dispatch(setHistory(updatedHistory));
          setActiveModal("result");
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
  }, [wheelItems]);

  return (
    <div className="relative flex justify-center items-center h-[380px] lg:h-[90%] lg:w-[90%]">
      <canvas ref={shadowCanvas} className="absolute"></canvas>
      <div
        id="wheel"
        ref={container}
        className="relative flex justify-center items-center w-full h-full"
      ></div>
      <div className="absolute inset-0 flex justify-center items-center">
        <button
          onClick={() => {
            if (mounted && wheel) {
              wheel.spinToItem(
                randomizeNumber(wheelItems.length),
                4000,
                true,
                5
              );
            }
          }}
          className="p-0 m-0 border-none bg-none cursor-pointer animate-flick-commented relative"
        >
          <img
            src="/assets/icons/indicator.svg"
            alt="indicator"
            className="w-[50px] lg:w-[85px]"
            style={{ filter: "drop-shadow(0 0 10px rgba(0, 0, 0, 0.5))" }}
          />
          <span className="absolute inset-0 mt-1 flex justify-center items-center font-medium text-xs lg:text-sm lg:mt-2">
            SPIN
          </span>
        </button>
      </div>
    </div>
  );
};

export default SpinWheel;
