import React from "react";
import styles from "./Button.module.css";
import { ButtonProps } from "./types";

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  className,
  color,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`${
      color === "white" ? styles.buttonWhite : styles.button
    } ${className}`}
  >
    {children}
  </button>
);

export default Button;
