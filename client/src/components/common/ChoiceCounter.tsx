import React, { useState } from "react";

interface ChoiceCounterProps {
  max: number;
}

interface InputButtonProps {
  onClick: () => void;
  disabled?: boolean;
  text?: string;
}

const InputButton: React.FC<InputButtonProps> = ({
  onClick,
  disabled = false,
  text = "-",
}) => (
  <button
    className="bg-white text-lg px-4 py-2 rounded-custom-sm leading-none md:text-2xl md:px-8 md:py-4"
    onClick={onClick}
    disabled={disabled}
  >
    {disabled ? (
      <span className="text-light-gray">{text}</span>
    ) : (
      <span>{text}</span>
    )}
  </button>
);

const ChoiceCounter: React.FC<ChoiceCounterProps> = ({ max }) => {
  const min = 1;
  const [count, setCount] = useState<number>(min);

  const handleDecrement = () => {
    if (count > min) {
      setCount(count - 1);
    }
  };

  const handleIncrement = () => {
    if (count < max) {
      setCount(count + 1);
    }
  };

  return (
    <div className="my-1.5 min-w-full p-1.5 bg-slate rounded-custom-sm flex justify-between items-center md:p-2">
      <InputButton onClick={handleDecrement} disabled={count === min} />
      <span className="mx-4 text-base md:text-xl leading-none">{count}</span>
      <InputButton
        onClick={handleIncrement}
        disabled={count === max}
        text="+"
      />
    </div>
  );
};

export default ChoiceCounter;
