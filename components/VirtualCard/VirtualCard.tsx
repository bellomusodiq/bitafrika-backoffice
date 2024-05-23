import React from "react";
import styles from "./VirtualCard.module.css";

const VirtualCard: React.FC<any> = ({
  name,
  status,
  expDate,
  cvv,
  cardNumber,
}) => (
  <div className={styles.cardContainer}>
    <div className={styles.header}>
      <p>Virtual</p>{" "}
      <p
        className={styles.active}
        style={{
          color: status === "Card - Active" ? "#0aec8d" : "tomato",
        }}
      >
        <div
          style={{
            backgroundColor: status === "Card - Active" ? "#0aec8d" : "tomato",
          }}
        />{" "}
        {status?.split(" - ")[1]}
      </p>
    </div>
    <div className={styles.main}>
      <p className={styles.name}>{name}</p>
      <p className={styles.cardNumber}>{cardNumber}</p>
    </div>
    <div className={styles.footer}>
      <div>
        <div className={styles.footerItem}>
          <p>Exp Date</p>
          <p>{expDate}</p>
        </div>
        <div className={styles.footerItem}>
          <p>CVV</p>
          <p>{cvv}</p>
        </div>
      </div>
      <img src="/icons/visa2.svg" className={styles.img} />
    </div>
  </div>
);

export default VirtualCard;
