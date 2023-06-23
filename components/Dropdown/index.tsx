import React from "react";
import styles from "./Dropdown.module.css";

const Dropdown: React.FC<{
  options: { title: string; value: string }[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}> = ({ options, onChange }) => {
  return (
    <select name="" id="" onChange={onChange} className={styles.select}>
      {options.map((option) => (
        <option key={option.title}>{option.title}</option>
      ))}
    </select>
  );
};

export default Dropdown;
