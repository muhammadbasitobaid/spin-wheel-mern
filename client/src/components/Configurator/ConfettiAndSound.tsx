import { useState } from "react";
import RadioButton from "../common/RadioButton";
import SelectInput from "../common/SelectInput";

const ConfettiAndSound = () => {
  const [confetti, setConfetti] = useState("off");
  const [soundOn, setSoundOn] = useState("off");
  const [confettiType, setConfettiType] = useState("Confetti");
  const [soundType, setSoundType] = useState("Sound");

  return (
    <div className="text-left w-full border border-light-gray rounded-custom-sm p-4 !text-xl">
      <div className="grid grid-cols-2 gap-4 mt-4">
        <SelectInput
          label="Confetti Type"
          options={["Confetti", "Fireworks"]}
          value={confettiType}
          onChange={setConfettiType}
        />
        <SelectInput
          label="Sound Type"
          options={["Sound", "No Sound"]}
          value={soundType}
          onChange={setSoundType}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <RadioButton
          label="Confetti On"
          name="confetti"
          checked={confetti === "on"}
          onChange={() =>
            setConfetti((prevState) => (prevState === "on" ? "off" : "on"))
          }
        />
        <RadioButton
          label="Sound On"
          name="sound"
          checked={soundOn === "on"}
          onChange={() =>
            setSoundOn((prevState) => (prevState === "on" ? "off" : "on"))
          }
        />
      </div>
    </div>
  );
};

export default ConfettiAndSound;
