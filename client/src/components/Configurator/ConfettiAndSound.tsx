import React from "react";
import { useSelector, useDispatch } from "react-redux";
import SelectInput from "src/components/common/SelectInput";
import {
  ConfettiTypes,
  setConfetti,
  setConfettiType,
  setSoundType,
  SoundTypes,
} from "src/store/actions/wheel";
import { RootState } from "src/store/store";
import Checkbox from "../common/Checkbox";

const ConfettiAndSound: React.FC = () => {
  const dispatch = useDispatch();

  const { confetti, confettiType, soundType } = useSelector(
    (state: RootState) => state.wheel.spinConfig
  );
  const handleConfettiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setConfetti(e.target.checked));
  };

  const handleConfettiTypeChange = (value: ConfettiTypes) => {
    dispatch(setConfettiType(value));
  };

  const handleSoundTypeChange = (value: SoundTypes) => {
    dispatch(setSoundType(value));
  };

  return (
    <div className="text-left w-full border border-light-gray rounded-custom-sm p-4 !text-xl">
      <div className="grid grid-cols-2 gap-4 mt-4">
        <SelectInput
          label="Confetti Type"
          options={["Confetti", "Fireworks"]}
          value={confettiType}
          onChange={handleConfettiTypeChange}
        />
        <SelectInput
          label="Sound Type"
          options={["Sound", "No Sound"]}
          value={soundType}
          onChange={handleSoundTypeChange}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <Checkbox
          label="Animation On"
          name="confetti"
          checked={confetti}
          onChange={handleConfettiChange}
        />
      </div>
    </div>
  );
};

export default ConfettiAndSound;
