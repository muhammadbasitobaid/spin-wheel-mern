import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { THEMES } from "src/constants";
import { setSelectedTheme } from "src/store/actions/wheel";
import { RootState } from "src/store/store";
import { v4 as uuidv4 } from "uuid";

const ThemeGrid: React.FC = () => {
  const dispatch = useDispatch();
  const { selectedTheme } = useSelector((state: RootState) => state.wheel);

  const selectTheme = (theme: string[]) => {
    dispatch(setSelectedTheme(theme));
  };

  return (
    <div className="">
      <h2 className="font-semibold text-xl font-normal text-left mb-6">
        Select Wheels Colors
      </h2>
      <div className="flex flex-wrap gap-4 justify-center">
        {THEMES.map((item) => (
          <button
            key={uuidv4()}
            className={`flex items-center justify-center gap-2 w-[40px] lg:w-[50px] xl:w-[60px] leading-none ${
              selectedTheme === item
                ? "rounded-custom-sm border-2 border-blue border-opacity-100"
                : "border-2 border-transparent"
            }`}
            onClick={() => selectTheme(item)}
          >
            <div className="flex flex-1 h-[30px] lg:h-[40px]">
              <div
                style={{
                  backgroundColor: item[0],
                }}
                className="flex-1 h-full border-0 rounded-l-custom-sm"
              ></div>
              <div
                style={{
                  backgroundColor: item[1],
                }}
                className="flex-1 h-full"
              ></div>
              <div
                style={{
                  backgroundColor: item[2],
                }}
                className="flex-1 h-full"
              ></div>
              <div
                style={{
                  backgroundColor: item[3],
                }}
                className="flex-1 h-full border-0 rounded-r-custom-sm"
              ></div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeGrid;
