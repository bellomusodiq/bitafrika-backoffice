import React from "react";
import styles from "./Button.module.css";
import { ButtonProps } from "./types";
import Spinner from "../Spinner";

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  className,
  color,
  loading,
}) => (
  <button
    onClick={onClick}
    disabled={disabled || loading}
    className={`${
      color === "white" ? styles.buttonWhite : styles.button
    } ${className}`}
  >
    {loading ? <Spinner /> : children}
  </button>
);

export default Button;
