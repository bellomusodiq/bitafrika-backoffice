import React from "react";
import styles from "./Input.module.css";
import { InputProps } from "./types";

const Input: React.FC<InputProps> = ({
  onChange,
  value,
  type = "text",
  placeholder,
  className,
  leftIcon,
}) => (
  <div className={styles.inputContainer}>
    {leftIcon && <div className={styles.leftIconContainer}>{leftIcon}</div>}
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`${styles.input} ${className}`}
      placeholder={placeholder}
      style={{ paddingLeft: leftIcon ? 35 : 10 }}
    />
  </div>
);

export default Input;
