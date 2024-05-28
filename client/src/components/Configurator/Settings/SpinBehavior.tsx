import React, { useState } from "react";
import RadioButton from "src/components/common/RadioButton";
import RangeInput from "src/components/common/RangeInput";

const SpinBehavior: React.FC = () => {
  const [spinSpeed, setSpinSpeed] = useState(50);
  const [spinDuration, setSpinDuration] = useState(50);
  const [radioValue1, setRadioValue1] = useState("option1");
  const [radioValue2, setRadioValue2] = useState("option2");
  const [radioValue3, setRadioValue3] = useState("option3");
  const [radioValue4, setRadioValue4] = useState("option4");

  return (
    <div className="text-left w-full border border-light-gray rounded-custom-sm p-4 !text-xl">
      <div className="w-1/2 grid grid-cols-1 gap-4">
        <RangeInput
          label="Spinning Speed Level: 5 (Default)"
          value={spinSpeed}
          onChange={setSpinSpeed}
        />
        <RangeInput
          label="Spinning Duration: 9s (Default)"
          value={spinDuration}
          onChange={setSpinDuration}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <RadioButton
          label="Manually Stop (Max 1 min, No custom speed)"
          name="option1"
          value="option1"
          checked={radioValue1 === "option1"}
          onChange={() => setRadioValue1("option1")}
        />
        <RadioButton
          label="Random Initial Angle (When new input inserted)"
          name="option2"
          value="option2"
          checked={radioValue2 === "option2"}
          onChange={() => setRadioValue2("option2")}
        />
        <RadioButton
          label="Mystery Spin (Hide inputs on wheel)"
          name="option3"
          value="option3"
          checked={radioValue3 === "option3"}
          onChange={() => setRadioValue3("option3")}
        />
        <RadioButton
          label="Spin Count (Show total spin number)"
          name="option4"
          value="option4"
          checked={radioValue4 === "option4"}
          onChange={() => setRadioValue4("option4")}
        />
      </div>
    </div>
  );
};

export default SpinBehavior;
