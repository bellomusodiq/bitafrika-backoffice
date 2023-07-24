import React from "react";
import styles from "@/components/KeyValue/KeyValue.module.css";

export interface KeyValueProps {
  items: {
    key: string;
    value?: string;
    valueComponent?: JSX.Element;
  }[];
  noFooterBoder?: boolean;
}

const KeyValue: React.FC<KeyValueProps> = ({ items, noFooterBoder }) => (
  <div className={styles.keyValueContainer}>
    {items.map((item: any, index: number) => (
      <div
        key={item.key}
        className={index === 0 ? styles.keyValueHeader : styles.keyValue}
        style={{
          borderBottom: "1px solid var(--gray-200, #eaecf0)",
          borderLeft: "1px solid var(--gray-200, #eaecf0)",
          borderRight: "1px solid var(--gray-200, #eaecf0)",
          borderTop: index === 0 ? "1px solid var(--gray-200, #eaecf0)" : "",
        }}
      >
        <div className={styles.keyContainer}>
          <span className={styles.key}>{item.key}</span>
        </div>
        <div className={styles.valueContainer}>
          {item.valueComponent ? (
            item.valueComponent
          ) : (
            <span className={styles.value}>{item.value}</span>
          )}
        </div>
      </div>
    ))}
  </div>
);

export default KeyValue;
