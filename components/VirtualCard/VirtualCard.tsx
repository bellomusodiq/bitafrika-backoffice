import React from "react";
import styles from "./VirtualCard.module.css";

const VirtualCard: React.FC = () => (
  <div className={styles.cardContainer}>
    <div className={styles.header}>
      <p>Virtual</p>{" "}
      <p className={styles.active}>
        <div /> Active
      </p>
    </div>
    <div className={styles.main}>
      <p className={styles.name}>Emmanuel Nkrumah</p>
      <p className={styles.cardNumber}>1234 5678 9123 4567 8901</p>
    </div>
    <div className={styles.footer}>
      <div>
        <div className={styles.footerItem}>
          <p>Exp Date</p>
          <p>05/28</p>
        </div>
        <div className={styles.footerItem}>
          <p>CVV</p>
          <p>028</p>
        </div>
      </div>
      <img src="/icons/visa2.svg" className={styles.img} />
    </div>
  </div>
);

export default VirtualCard;
