import React from "react";


const CustomToast: React.FC<CustomToastProps> = ({ status, message, onClose }) => {
  const backgroundColor = status === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div
      className={`${backgroundColor} text-sm text-white min-w-[300px] p-4 rounded shadow-lg flex`}
      role="alert"
    >
      {message}

      <button
        onClick={onClose}
        type="button"
        className="ml-auto ..."
      >
        <span className="sr-only">Close</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default CustomToast;
