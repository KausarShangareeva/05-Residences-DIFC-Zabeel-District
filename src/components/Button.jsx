import React from "react";
import "./Button.css";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "medium",
  icon,
  iconPosition = "right",
  disabled = false,
  className = "",
  ...props
}) => {
  const buttonClass = `
    btn
    btn--${variant}
    btn--${size}
    ${icon && iconPosition === "left" ? "btn--icon-left" : ""}
    ${icon && iconPosition === "right" ? "btn--icon-right" : ""}
    ${disabled ? "btn--disabled" : ""}
    ${className}
  `.trim().replace(/\s+/g, " ");

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <span className="btn__icon btn__icon--left">{icon}</span>
      )}
      <span className="btn__text">{children}</span>
      {icon && iconPosition === "right" && (
        <span className="btn__icon btn__icon--right">{icon}</span>
      )}
    </button>
  );
};

export default Button;
