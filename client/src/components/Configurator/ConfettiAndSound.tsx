import React from "react";
import { useSelector, useDispatch } from "react-redux";
import SelectInput from "src/components/common/SelectInput";
import {
  ConfettiTypes,
  setConfetti,
  setConfettiType,
  setSound,
} from "src/store/actions/wheel";
import { RootState } from "src/store/store";
import Checkbox from "../common/Checkbox";

const ConfettiAndSound: React.FC = () => {
  const dispatch = useDispatch();

  const { confetti, confettiType, sound } = useSelector(
    (state: RootState) => state.wheel.spinConfig
  );
  const handleConfettiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setConfetti(e.target.checked));
  };

  const handleConfettiTypeChange = (value: ConfettiTypes) => {
    dispatch(setConfettiType(value));
  };
  const handleSoundOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setSound(e.target.checked));
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
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <Checkbox
          label="Animation On"
          name="confetti"
          checked={confetti}
          onChange={handleConfettiChange}
        />
        <Checkbox
                  label="Sound On"
                  name="sound"
                  checked={sound}
                  onChange={handleSoundOnChange}
        />
      </div>
    </div>
  );
};

export default ConfettiAndSound;
