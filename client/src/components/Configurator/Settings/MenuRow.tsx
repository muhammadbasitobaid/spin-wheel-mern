import React, { useState } from "react";
import Button from "src/components/common/Button";
import SpinBehavior from "./SpinBehavior";
import { v4 as uuidv4 } from "uuid";
import ConfettiAndSound from "../ConfettiAndSound";

type ToggleButtonProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
  className?: string;
};

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  label,
  isActive,
  onClick,
  className = "",
}) => {
  return isActive ? (
    <Button onClick={onClick} small className={className}>
      <span>{label}</span>
    </Button>
  ) : (
    <button
      className={`px-4 mx-2 text-base font-medium rounded ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

const MenuRow: React.FC = () => {
  const [activeButton, setActiveButton] = useState(0);

  const buttons = [
    { label: "Spin Behavior", content: <SpinBehavior /> },
    { label: "Confetti and Sound", content: <ConfettiAndSound /> },
    // { label: "Spin Button", content: "Content for Spin Button" },
    // { label: "Banner Logo", content: "Content for Banner Logo" },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center  mb-3">
        {buttons.map((button, index) => (
          <ToggleButton
            key={uuidv4()}
            label={button.label}
            isActive={activeButton === index}
            onClick={() => setActiveButton(index)}
          />
        ))}
      </div>
      {buttons[activeButton].content}
    </div>
  );
};

export default MenuRow;
