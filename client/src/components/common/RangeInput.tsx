import React from "react";

type RangeInputProps = {
  label: string;
  value: number;
  max?: number;
  onChange: (value: number) => void;
};

const RangeInput: React.FC<RangeInputProps> = ({
  label,
  value,
  onChange,
  max = 10,
}) => {
  return (
    <div className="flex flex-col mb-4">
      <label className="mb-2 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
        {label}
      </label>
      <input
        type="range"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full horizontal-range"
        aria-orientation="horizontal"
        min={1}
        max={max}
      />
    </div>
  );
};

export default RangeInput;
