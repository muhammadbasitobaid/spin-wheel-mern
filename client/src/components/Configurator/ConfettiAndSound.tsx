import React from "react";
import { useSelector, useDispatch } from "react-redux";
import RadioButton from "src/components/common/RadioButton";
import SelectInput from "src/components/common/SelectInput";
import {
  SET_CONFETTI,
  SET_SOUND,
  SET_CONFETTI_TYPE,
  SET_SOUND_TYPE,
} from "src/store/actions/wheel";
import { RootState } from "src/store/store";

const ConfettiAndSound: React.FC = () => {
  const dispatch = useDispatch();

  const { confetti, sound, confettiType, soundType } = useSelector(
    (state: RootState) => state.wheel.spinConfig
  );
  const handleConfettiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: SET_CONFETTI, payload: e.target.value === "on" });
  };

  const handleSoundOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: SET_SOUND, payload: e.target.value === "on" });
  };

  const handleConfettiTypeChange = (value: string) => {
    dispatch({ type: SET_CONFETTI_TYPE, payload: value });
  };

  const handleSoundTypeChange = (value: string) => {
    dispatch({ type: SET_SOUND_TYPE, payload: value });
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
        <RadioButton
          label="Confetti On"
          name="confetti"
          checked={confetti}
          onChange={handleConfettiChange}
        />
        <RadioButton
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
