import React from "react";
import Button from "../Button";
import CustomLineChart from "../Charts/LineChart";
import styles from "./TrendItem.module.css";
import { TrendItemProps } from "./types";

const TrendItem: React.FC<TrendItemProps> = ({
  title,
  number,
  trend = "up",
  subTitle,
  trendNumber,
  borderTop,
  borderBottom,
  borderLeft,
  borderRight,
  dateFrom,
  dateTo,
  showGraph,
  onPressAction,
  children,
}) => (
  <div
    style={{
      borderRight: borderRight ? "1px solid #EAECF0" : 0,
      borderTop: borderTop ? "1px solid #EAECF0" : 0,
      borderBottom: borderBottom ? "1px solid #EAECF0" : 0,
      borderLeft: borderLeft ? "1px solid #EAECF0" : 0,
    }}
    className={styles.trendItem}
  >
    <div className={styles.titleContainer}>
      <div className={styles.titleIcon}>
        <p className={styles.title}>{title}</p>
        <img src="/icons/Help.svg" />
      </div>
      {onPressAction && (
        <Button
          onClick={onPressAction}
          className={styles.viewTransactionsButton}
          color="white"
        >
          View transactions <img src="/icons/arrow-right.svg" />
        </Button>
      )}
    </div>
    {children ? (
      <>
        <h3 className={styles.trendNumber}>{number}</h3>
        {children}
      </>
    ) : (
      <>
        <div className={styles.numbersContainer}>
          <h3 className={styles.trendNumber}>{number}</h3>
          <p
            className={styles.trendIndicator}
            style={{
              border: `1.5px solid ${trend === "up" ? "#039855" : "#F04438"}`,
              color: trend === "up" ? "#039855" : "#F04438",
            }}
          >
            <img
              src={
                trend === "up" ? "/icons/arrow-up.svg" : "/icons/arrow-down.svg"
              }
              style={{ marginRight: 5 }}
            />
            {trendNumber}
          </p>
        </div>
        <p className={styles.subTitle}>{subTitle}</p>
        {showGraph && (
          <div className={styles.lineChartContainer}>
            <CustomLineChart />
          </div>
        )}
        <div className={styles.dateContainer}>
          <span>{dateFrom}</span>
          <span>{dateTo}</span>
        </div>
      </>
    )}
  </div>
);

export default TrendItem;
