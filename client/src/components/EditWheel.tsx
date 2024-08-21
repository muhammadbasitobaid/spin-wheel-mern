import {useState} from 'react';
import Card from "./common/Card";
import SelectInput from './common/SelectInput';
import { ToggleButton } from "./Configurator/Settings/MenuRow";
import ChoiceCounter from "./common/ChoiceCounter";
import { wheels } from "src/constants";
import { RootState } from "src/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  resetHistory,
  setActiveModal,
  setInputNumbers,
  setSelectedWheel,
} from "src/store/actions/wheel";
import InputField from "./common/InputField";


export const YesNoWheelControls = () => {
const dispatch = useDispatch();
  const { selectedWheel, inputNumbers, maxInputNumbers } = useSelector(
    (state: RootState) => state.wheel
  );

  return (
    <>
      {/* Wheel Mode Selection */}
      <div className="w-full">
        <div className="text-sm lg:text-xl">Mode</div>
        <div className="flex my-1.5">
          {wheels.map((wheel) => (
            <ToggleButton
              key={wheel.name}
              label={wheel.label}
              isActive={wheel.name === selectedWheel.name}
              onClick={() => {
                dispatch(setSelectedWheel({ ...wheel }));
                dispatch(resetHistory());
              }}
              className="!text-xs lg:!text-xl flex-1"
            />
          ))}
        </div>
      </div>

      {/* Input Numbers */}
      <div className="w-full">
        <div className="!text-xs lg:!text-xl">Input Numbers</div>
        <ChoiceCounter
          max={maxInputNumbers}
          value={inputNumbers}
          onChange={(newNumber: number) =>
            dispatch(setInputNumbers(newNumber))
          }
        />
      </div>
    </>
  );
}

export const LetterWheelControls = () => {
const [styleOption, setStyleOption] = useState<string>("UPPERCASE");
  const [letterOption, setLetterOption] = useState<string>("A to Z / a to z");

  // Options for the select dropdown
  const letterOptions = ["A to Z / a to z", "A to Z", "a to z"];

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      {/* Letter Options */}
      <div className="mb-6">
        <SelectInput
          label="Letter Options:"
          options={letterOptions}
          value={letterOption}
          onChange={(value: string) => setLetterOption(value)}
        />
      </div>

      {/* Style Options (Using ToggleButton) */}
      <div className="mb-6">
        <label className="block text-lg font-medium mb-2">Style Options:</label>
        <div className="flex space-x-2">
          <ToggleButton
            label="UPPERCASE"
            isActive={styleOption === "UPPERCASE"}
            onClick={() => setStyleOption("UPPERCASE")}
            className="w-1/2"
          />
          <ToggleButton
            label="lowercase"
            isActive={styleOption === "lowercase"}
            onClick={() => setStyleOption("lowercase")}
            className="w-1/2"
          />
        </div>
      </div>

      {/* Selected Style Option (for demonstration) */}
      <p className="mt-4 text-lg">
        Selected Style: <span className="font-bold">{styleOption}</span>
      </p>
    </div>
  );
}

export const NumberWheelControls = () => {
const [lowerNumber, setLowerNumber] = useState<string>("1");
  const [highestNumber, setHighestNumber] = useState<string>("10");
  const [excludeNumbers, setExcludeNumbers] = useState<string>("");
  const [interval, setInterval] = useState<string>("1");

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      {/* Section for Lower and Highest Number in one row */}
      <div className="flex space-x-4 mb-6">
        <InputField
          label="Lower Number"
          type="number"
          value={lowerNumber}
          onChange={(e) => setLowerNumber(e.target.value)}
          className="w-1/2"
          placeholder="1"
        />
        <InputField
          label="Highest Number"
          type="number"
          value={highestNumber}
          onChange={(e) => setHighestNumber(e.target.value)}
          className="w-1/2"
          placeholder="10"
        />
      </div>

      {/* Section for Advance Wheel */}
      <div className="mt-6">
        <h2 className="font-semibold text-lg mb-4">Advance Wheel</h2>

        {/* Section for Exclude Number and Interval in one row */}
        <div className="flex space-x-4">
          <InputField
            label="Exclude Number"
            type="text"
            value={excludeNumbers}
            onChange={(e) => setExcludeNumbers(e.target.value)}
            className="w-1/2"
            placeholder="e.g. 1,2,3"
          />
          <InputField
            label="Interval/steps"
            type="number"
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
            className="w-1/2"
            placeholder="1"
          />
        </div>
      </div>
    </div>
  );
}

export const EditWheel = () => {
const { selectedWheel } = useSelector((state: RootState) => state.wheel);
  const dispatch = useDispatch();

  return (
    <Card>
      <div className="gap-3 flex flex-col items-center p-4 my-6 text-xl">
        <div className=" px-4 py-7 rounded-custom border border-light-gray w-full bg-gradient-to-b from-gray-alpha to-white">
          <div className="w-full flex justify-between">
            <div className="flex-1 text-xl font-semibold leading-normal mb-1.5 lg:text-3xl">
              Edit Wheel
            </div>
            <div className="flex gap-2 items-center">
              <button className="opacity-50 cursor-not-allowed" disabled>
                <img
                  src="/assets/icons/show.svg"
                  alt="Show"
                  className="w-5 lg:w-[28px]"
                  title={`Fullscreen (feature currently unavailable!)`}
                />
              </button>
              <button className="" onClick={() => dispatch(resetHistory())}>
                <img
                  src="/assets/icons/refresh.svg"
                  alt="Show"
                  className="w-3.5  lg:w-[22px]"
                />
              </button>
              <button
                role="button"
                className=""
                onClick={() => dispatch(setActiveModal('modify'))}
              >
                <img
                  src="/assets/icons/text.svg"
                  alt="Show"
                  className="w-3.5 lg:w-[24px]"
                />
              </button>
            </div>
          </div>

          {/* YesNoWheelControls integrated here */}
          <YesNoWheelControls />
        </div>
      </div>
    </Card>
  );
};

export default EditWheel;
