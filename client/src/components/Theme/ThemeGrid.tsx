import React, { useState } from "react";
import { THEMES } from "src/constants";
import { v4 as uuidv4 } from "uuid";

const ThemeGrid: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<string[]>([]);

  const selectTheme = (theme: string[]) => {
    setSelectedTheme(theme);
  };

  return (
    <div className="">
      <h2 className="font-semibold text-xl font-normal text-left mb-6">
        Select Wheels Colors
      </h2>
      <div className="flex flex-wrap gap-4 justify-center">
        {THEMES.map((item) => (
          <div
            key={uuidv4()}
            className={`flex items-center justify-center gap-2 w-[60px] leading-none ${
              selectedTheme === item
                ? "rounded-custom-sm border-2 border-blue border-opacity-100"
                : "border-2 border-transparent"
            }`}
            onClick={() => selectTheme(item)}
          >
            <div className="flex flex-1 ">
              <div
                style={{
                  backgroundColor: item[0],
                  height: "40px",
                  flex: "1",
                }}
                className="border-0 rounded-l-custom-sm"
              ></div>
              <div
                style={{
                  backgroundColor: item[1],
                  height: "40px",
                  flex: "1",
                }}
              ></div>
              <div
                style={{
                  backgroundColor: item[2],
                  height: "40px",
                  flex: "1",
                }}
              ></div>
              <div
                style={{
                  backgroundColor: item[3],
                  height: "40px",
                  flex: "1",
                }}
                className="border-0 rounded-r-custom-sm"
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemeGrid;
