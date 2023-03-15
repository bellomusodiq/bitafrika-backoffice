import React from "react";
import styles from "./Input.module.css";
import { InputProps } from "./types";

const Input: React.FC<InputProps> = ({
  onChange,
  value,
  type="text",
  placeholder,
  className,
}) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    className={`${styles.input} ${className}`}
    placeholder={placeholder}
  />
);

export default Input;
