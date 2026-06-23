import React from "react";

const Button: React.FC<ButtonProps> = ({
  text,
  loading,
  onClick,
  className,
  loadingText,
}) => {
  return (
    <button
      type="button"
      className={`ti-btn bg-primary text-white btn-wave !font-medium !mb-0 !text-[0.85rem] !rounded-[0.35rem] !py-2 !px-3 shadow-none w-fit min-w-10 flex ${loading ? "ti-btn-disabled" : ""} ${className}`}
      onClick={onClick}
      disabled={loading}
    >
      <span className="  ">
        {loadingText ? (loading ? loadingText : text) : text}
      </span>

      {loading && (
        <span className="loading">
          <i className="ri-refresh-line text-[0.75rem] animate-spin"></i>
        </span>
      )}
    </button>
  );
};

export default Button;
