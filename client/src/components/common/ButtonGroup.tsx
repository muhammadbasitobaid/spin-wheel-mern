import React, { useState } from "react";
import Button from "./Button";

interface ButtonGroupProps {
  buttonLabels: string[];  // Array of button labels
  onClick: (label: string) => void;  // Callback when a button is clicked
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ buttonLabels, onClick }) => {
  const [selected, setSelected] = useState<string>(buttonLabels[0]);

  return (
    <div className="flex space-x-2">
      {buttonLabels.map((label) => (
        <Button
          key={label}
          onClick={() => {
            setSelected(label);  // Update the selected button
            onClick(label);  // Trigger the onClick callback with the selected label
          }}
          invertedVariant={selected === label}
        >
          {label}
        </Button>
      ))}
    </div>
  );
};

export default ButtonGroup;
