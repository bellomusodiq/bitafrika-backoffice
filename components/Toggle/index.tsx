import React, { useState } from "react";
import styles from "@/components/Toggle/Toggle.module.css";
import { Switch } from "antd";

const Toggle: React.FC<{
  defaultValue?: boolean;
  onToggle?: (value: boolean) => void;
}> = ({ defaultValue = false, onToggle }) => {
  const [active, setActive] = useState<boolean>(defaultValue);
  const toggleSwitch = (value: boolean) => {
    setActive(value);
    onToggle?.(value);
  };
  return (
    <div className={styles.toggleContainer}>
      <Switch onChange={toggleSwitch} defaultChecked={defaultValue} />
      <span>{active ? "Enabled" : "Disabled"}</span>
    </div>
  );
};

export default Toggle;
