import React, { useState, useEffect } from "react";

interface InputFieldProps {
  label?: string;
  value?: string;
  name?: string;
  id?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void; // Optional onBlur handler
  className?: string;
  type?: "text" | "number" | "email" | "password";
  disabled?: boolean; // Added disabled prop
  note?: string; // New optional prop for notes
  min?: string; // Optional min for number input
  max?: string; // Optional max for number input
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  value,
  placeholder,
  name,
  onChange,
  onBlur, // Optional onBlur prop
  className = "",
  type = "text",
  disabled = false, // Default to false if not provided
  note, // Optional note
  min, // Optional min value for number input
  max, // Optional max value for number input
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
          disabled ? "bg-gray-200 cursor-not-allowed" : ""
        }`}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={onBlur} // Optional onBlur prop
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
