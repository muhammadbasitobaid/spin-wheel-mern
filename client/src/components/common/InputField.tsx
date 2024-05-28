import React, { useState } from "react";

interface InputFieldProps {
  label?: string;
  value?: string;
  id?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  className?: string;
  type?: "text" | "number" | "email" | "password";
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  value,
  placeholder,
  onChange,
  className,
  type = "text",
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
    <label className={`form-control w-full ${className}`} htmlFor={id ?? ""}>
      {label && (
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="input input-bordered w-full text-sm"
        value={inputValue}
        onChange={handleInputChange}
      />
    </label>
  );
};

export default InputField;
