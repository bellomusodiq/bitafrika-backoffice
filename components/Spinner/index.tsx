import React from "react";
import styles from "@/components/Spinner/Spinner.module.css";

const Spinner: React.FC<{ size?: number }> = ({ size = 64 }) => {
  return <div className={styles["lds-dual-ring"]}></div>;
};

export default Spinner;
