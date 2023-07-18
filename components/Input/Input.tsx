import React from "react";
import styles from "./Input.module.css";
import { InputProps } from "./types";

const Input: React.FC<InputProps> = ({
  onChange,
  onUpdate,
  value,
  type = "text",
  placeholder,
  className,
  leftIcon,
  noBorder,
}) => (
  <div className={`${styles.inputContainer} ${className}`}>
    {leftIcon && <div className={styles.leftIconContainer}>{leftIcon}</div>}
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={styles.input}
      placeholder={placeholder}
      style={{
        borderBottomLeftRadius: leftIcon ? 0 : 8,
        borderTopLeftRadius: leftIcon ? 0 : 8,
        borderBottomRightRadius: onUpdate ? 0 : 8,
        borderTopRightRadius: onUpdate ? 0 : 8,
        borderLeft: leftIcon ? "none" : "",
        borderRight: onUpdate ? "none" : "",
        border: noBorder ? "none" : "",
        outline: noBorder ? "none" : "",
      }}
    />
    {onUpdate && <button className={styles.updateButton}>Update</button>}
  </div>
);

export default Input;
