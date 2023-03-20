import React from "react";
import styles from "./Card.module.css";
import { StatsCardProps } from "./types";

const StatsCard: React.FC<StatsCardProps> = ({ headerTitle, children }) => (
  <div className={styles.statsContainer}>
    {headerTitle && (
      <div className={styles.titleContainer}>
        <h3 className={styles.title}>{headerTitle}</h3>
      </div>
    )}
    <div className={styles.bodyContainer}>{children}</div>
  </div>
);

export default StatsCard;
