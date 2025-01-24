import React from "react";



const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder = "",
  value,
  onChange,
  type = "text",
  name,
  id,
  className = "",
  required = false,
  disabled = false,
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-semibold text-gray-700 mb-1 w-full"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
      />
    </div>
  );
};

export default InputField;
