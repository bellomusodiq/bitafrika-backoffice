import React from "react";
import styles from "./Dropdown.module.css";

const Dropdown: React.FC<{
  options: { title: string; value: string }[];
  onChange: (event: string | number) => void;
  value?: string | number;
}> = ({ options, onChange, value }) => {
  return (
    <select
      name=""
      id=""
      onChange={(e) => onChange(e.target.value)}
      className={styles.select}
      value={value}
    >
      {options.map((option) => (
        <option
          value={option.value}
          key={option.title}
        >
          {option.title}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
