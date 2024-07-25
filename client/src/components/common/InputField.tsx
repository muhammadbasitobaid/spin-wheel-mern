import React, { useState, useEffect } from "react";

interface InputFieldProps {
  label?: string;
  value?: string;
  name?: string;
  id?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  type?: "text" | "number" | "email" | "password";
  disabled?: boolean; // Added disabled prop
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  value,
  placeholder,
  name,
  onChange,
  className = "",
  type = "text",
  disabled = false, // Default to false if not provided
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
        className={`input input-bordered w-full text-sm md:text-base p-2 md:p-4 ${
          disabled ? "bg-gray-200 cursor-not-allowed" : ""
        }`}
        value={inputValue}
        onChange={handleInputChange}
        name={name}
        disabled={disabled} // Apply the disabled prop
      />
    </label>
  );
};

export default InputField;
