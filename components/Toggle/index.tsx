import React, { useState } from "react";
import styles from "@/components/Toggle/Toggle.module.css";
import { Switch } from "antd";

const Toggle: React.FC<{ onToggle?: (value: boolean) => void }> = ({
  onToggle,
}) => {
  const [active, setActive] = useState<boolean>(false);
  const toggleSwitch = (value: boolean) => {
    setActive(value);
    onToggle?.(value);
  };
  return (
    <div className={styles.toggleContainer}>
      <Switch onChange={toggleSwitch} />
      <span>{active ? "Enabled" : "Disabled"}</span>
    </div>
  );
};

export default Toggle;
