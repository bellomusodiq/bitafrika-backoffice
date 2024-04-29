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
  disabled,
  loading,
}) => (
  <div className={`${styles.inputContainer} ${className}`}>
    {leftIcon && <div className={styles.leftIconContainer}>{leftIcon}</div>}
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={styles.input}
      placeholder={placeholder}
      disabled={disabled}
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
    {onUpdate && (
      <button
        disabled={loading}
        onClick={onUpdate}
        className={styles.updateButton}
        style={{ backgroundColor: loading ? "lightgrey" : "" }}
      >
        {loading ? <span className="loader"></span> : "Update"}
      </button>
    )}
  </div>
);

export default Input;
