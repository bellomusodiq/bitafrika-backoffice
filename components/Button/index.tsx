import React from "react";
import styles from "./Button.module.css";
import { ButtonProps } from "./types";
import Spinner from "../Spinner";
import { Button as AntButton } from "antd";

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  className,
  color,
  loading,
  isText,
  size = "large",
}) => {
  let type: any = "primary";
  if (color === "white") {
    type = "default";
  }
  if (isText) {
    type = "text";
  }
  return (
    // <button
    //   onClick={onClick}
    //   disabled={disabled || loading}
    //   style={{ backgroundColor: disabled ? "#98A2B3" : "" }}
    //   className={`${
    //     color === "white" ? styles.buttonWhite : styles.button
    //   } ${className}`}
    // >
    //   {loading ? <Spinner /> : children}
    // </button>
    <AntButton
      size={size}
      className={className}
      onClick={onClick}
      disabled={disabled}
      type={type}
      loading={loading}
    >
      {children}
    </AntButton>
  );
};

export default Button;
