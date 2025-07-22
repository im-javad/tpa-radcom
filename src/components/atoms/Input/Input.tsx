import React, { forwardRef } from "react";
import "./Input.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = false, className = "", ...props }, ref) => {
    const inputClasses = [
      "input__field",
      error && "input__field--error",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const containerClasses = ["input", fullWidth && "input--full-width"]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={containerClasses}>
        {label && <label className="input__label">{label}</label>}
        <input ref={ref} className={inputClasses} {...props} />
        {error && <span className="input__error">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
