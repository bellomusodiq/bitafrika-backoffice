import React from "react";
import styles from "./Card.module.css";
import { StatsCardProps } from "./types";
import Button from "../Button";

const StatsCard: React.FC<StatsCardProps> = ({
  headerTitle,
  children,
  showRefresh,
}) => (
  <div className={styles.statsContainer}>
    {headerTitle && (
      <div className={styles.titleContainer}>
        <h3 className={styles.title}>{headerTitle}</h3>
        {showRefresh && (
          <div>
            <Button color="white">Refresh</Button>
          </div>
        )}
      </div>
    )}
    <div className={styles.bodyContainer}>{children}</div>
  </div>
);

export default StatsCard;
