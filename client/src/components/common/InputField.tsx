import React, { useState } from "react";

interface InputFieldProps {
  label?: string;
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  placeholder,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState(value || "");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <label className="form-control w-full max-w-xs">
      {label && (
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
      )}
      <input
        type="text"
        placeholder={placeholder}
        className="input input-bordered w-full max-w-xs"
        value={inputValue}
        onChange={handleInputChange}
      />
    </label>
  );
};

export default InputField;
