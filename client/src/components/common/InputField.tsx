import React, { useState, useEffect } from "react";

interface InputFieldProps {
  label?: string;
  value?: string;
  name?: string;
  id?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
  type?: "text" | "number" | "email" | "password";
  disabled?: boolean;
  note?: string;
  min?: string;
  max?: string;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  value,
  placeholder,
  name,
  onChange,
  onBlur,
  onKeyDown,
  className = "",
  type = "text",
  disabled = false,
  note,
  min,
  max,
  required = false,
}) => {
  const [inputValue, setInputValue] = useState(value || "");

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <label className={`form-control w-full ${className}`} htmlFor={id ?? ""}>
      {label && (
        <div className="label">
          <span className="label-text font-medium text-sm md:text-base">
            {label}
          </span>
        </div>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`py-0 px-2 input-sm input-bordered !border-zinc-300 w-full text-sm md:text-base md:p-4 md:input ${
          disabled ? "bg-gray-200 cursor-not-allowed" : " !bg-white"
        }`}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={onBlur} // Optional onBlur prop
        onKeyDown={onKeyDown} // Optional onKeyDown prop
        name={name}
        disabled={disabled} // Apply the disabled prop
        min={min} // Pass the min prop
        max={max} // Pass the max prop
        aria-required={required ? "true" : "false"}
        required={required}
      />
      {/* Display the note if it exists */}
      {note && (
        <p className="text-xs mt-1 text-gray">
          * {note}
        </p>
      )}
    </label>
  );
};

export default InputField;
