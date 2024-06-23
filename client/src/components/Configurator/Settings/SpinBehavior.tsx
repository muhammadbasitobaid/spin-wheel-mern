import React from "react";
import { useDispatch, useSelector } from "react-redux";
import RadioButton from "src/components/common/RadioButton";
import RangeInput from "src/components/common/RangeInput";
import { RootState } from "src/store/store";
import {
  setSpinningSpeedLevel,
  setSpinningDuration,
  setManuallyStopOption,
  setRandomInitialAngleOption,
  setMysterySpinOption,
  setSpinCountOption,
} from "src/store/actions/wheel";
import { defaultSpinConfig } from "src/constants";

const SpinBehavior: React.FC = () => {
  const dispatch = useDispatch();
  const {
    spinningSpeedLevel,
    spinningDuration,
    manuallyStopOption,
    randomInitialAngleOption,
    mysterySpinOption,
    spinCountOption,
  } = useSelector((state: RootState) => state.wheel.spinConfig);

  return (
    <div className="text-left w-full border border-light-gray rounded-custom-sm p-4 !text-xl">
      <div className="w-1/2 grid grid-cols-1 gap-4">
        <RangeInput
          label={`Spinning Speed Level: ${spinningSpeedLevel} ${
            defaultSpinConfig.spinningSpeedLevel === spinningSpeedLevel
              ? "(Default)"
              : ""
          }`}
          value={spinningSpeedLevel}
          onChange={(value: number) => dispatch(setSpinningSpeedLevel(value))}
        />
        <RangeInput
          label={`Spinning Duration: ${spinningDuration}s ${
            defaultSpinConfig.spinningDuration === spinningDuration
              ? "(Default)"
              : ""
          }`}
          value={spinningDuration}
          onChange={(value: number) => dispatch(setSpinningDuration(value))}
          max={30}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <RadioButton
          label="Manually Stop (Max 1 min, No custom speed)"
          name="manuallyStopOption"
          checked={manuallyStopOption}
          onChange={() => dispatch(setManuallyStopOption(!manuallyStopOption))}
        />
        <RadioButton
          label="Random Initial Angle (When new input inserted)"
          name="randomInitialAngleOption"
          checked={randomInitialAngleOption}
          onChange={() =>
            dispatch(setRandomInitialAngleOption(!randomInitialAngleOption))
          }
        />
        <RadioButton
          label="Mystery Spin (Hide inputs on wheel)"
          name="mysterySpinOption"
          checked={mysterySpinOption}
          onChange={() => dispatch(setMysterySpinOption(!mysterySpinOption))}
        />
        <RadioButton
          label="Spin Count (Show total spin number)"
          name="spinCountOption"
          checked={spinCountOption}
          onChange={() => dispatch(setSpinCountOption(!spinCountOption))}
        />
      </div>
    </div>
  );
};

export default SpinBehavior;
