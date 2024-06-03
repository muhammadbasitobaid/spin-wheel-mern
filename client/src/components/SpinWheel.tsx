import { useState, useRef, useEffect } from "react";
// @ts-ignore
import { Wheel } from "spin-wheel";
import { THEMES } from "src/constants";
import { getBgColorForLabel, getLabelColor } from "src/utils";

interface WheelItem {
  label: string;
  labelColor?: string;
}

interface SpinWheel {
  spinToItem: (
    itemIndex: number,
    duration?: number,
    spinToCenter?: boolean,
    numberOfRevolutions?: number,
    easingFunction?: null | ((t: number) => number)
  ) => void;
}

const randomizeNumber = (number: number) => Math.floor(Math.random() * number);

const Home = () => {
  const [homeState, setHomeState] = useState({
    isWheelSpinning: false,
  });
  const { isWheelSpinning } = homeState;
  let wheelItems: WheelItem[] = [
    {
      label: "Yes",
    },
    {
      label: "No",
    },
    {
      label: "Yes",
    },
    {
      label: "No",
    },
    {
      label: "Yes",
    },
    {
      label: "Yes",
    },
    {
      label: "No",
    },
    {
      label: "Yes",
    },
    {
      label: "No",
    },
    {
      label: "Yes",
    },
  ];

  wheelItems = wheelItems.map((item, index) => ({
    label: item.label,
    labelColor: getLabelColor(getBgColorForLabel(index, THEMES[0])),
  }));

  const container = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [wheel, setWheel] = useState<SpinWheel>();

  useEffect(() => {
    if (!container) return;
    console.log("render wheel");
    setWheel(
      new Wheel(container.current, {
        radius: 1,
        borderWidth: 5,
        borderColor: "#ffff",
        itemLabelFontSizeMax: 28,
        lineColor: "#ffff",
        lineWidth: 3,
        itemBackgroundColors: THEMES[0],
        items: wheelItems,
        onSpin: (event: any) => {
          setHomeState((prevState) => ({
            ...prevState,
            isWheelSpinning: true,
          }));
        },
        onRest: (event: any) => {
          console.log(event);
          console.log(wheelItems[event.currentIndex]);
          setHomeState((prevState) => ({
            ...prevState,
            isWheelSpinning: false,
          }));
        },
      })
    );
    setMounted(true);
  }, []);

  return (
    <div
      id="wheel"
      ref={container}
      className="relative flex justify-center items-center h-[380px]"
    >
      <div className="absolute inset-0 flex justify-center items-center">
        {isWheelSpinning ? (
          <button className="p-0 m-0 border-none bg-none ">
            <img
              src="/assets/icons/indicator.svg"
              alt="indicator"
              className="drop-shadow-4xl h-[77px]"
            />
          </button>
        ) : (
          <button
            onClick={() => {
              mounted &&
                wheel!.spinToItem(
                  randomizeNumber(wheelItems.length),
                  4000,
                  true,
                  5
                );
            }}
            className="p-0 m-0 border-none bg-none cursor-pointer animate-flick-commented"
          >
            <img
              src="/assets/icons/indicator.svg"
              alt="indicator"
              className="drop-shadow-4xl h-[77px]"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
