import React from "react";

import { v4 as uuidv4 } from "uuid";

type SelectInputProps = {
  label: string;
  altLabel?: string;
  options: string[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
};

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  altLabel,
  options,
  value,
  defaultValue = "Pick One",
  onChange,
}) => {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">{label}</span>
        {altLabel && <span className="label-text-alt">{altLabel}</span>}
      </div>
      <select
        className="select select-bordered"
        defaultValue={defaultValue}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
      >
        <option disabled value="Pick one">
          Pick one
        </option>
        {options.map((option) => (
          <option key={uuidv4()} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="label">
        {altLabel && <span className="label-text-alt">{altLabel}</span>}
        {altLabel && <span className="label-text-alt">{altLabel}</span>}
      </div>
    </label>
  );
};

export default SelectInput;
