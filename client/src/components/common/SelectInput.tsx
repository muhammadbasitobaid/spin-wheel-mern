import React from "react";
import { v4 as uuidv4 } from "uuid";

type SelectInputProps = {
  label: string;
  altLabel?: string;
  options: string[];
  value?: string;
  onChange?: (value: any) => void;
};

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  altLabel,
  options,
  value,
  onChange,
}) => {
  return (
    <label className="form-control w-full max-w-xs mb-4">
      <div className="label flex justify-between">
        <span className="label-text text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
          {label}
        </span>
        {altLabel && (
          <span className="label-text-alt text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
            {altLabel}
          </span>
        )}
      </div>
      <select
        className="select select-bordered w-full text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl p-2 md:p-3 lg:p-4 h-10 md:h-12 lg:h-14"
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
      >
        <option disabled value="">
          Pick one
        </option>
        {options.map((option) => (
          <option key={uuidv4()} value={option} className="truncate">
            {option}
          </option>
        ))}
      </select>
    </label>
  );
};

export default SelectInput;
