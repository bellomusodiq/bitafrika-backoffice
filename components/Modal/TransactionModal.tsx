import React from "react";
import styles from "./TransactionModal.module.css";
import { ModalProps } from "./types";

const TransactionModal: React.FC<ModalProps> = ({
  openModal,
  onClose,
  children,
  headerLeft,
  headerCenter,
}) => {
  return (
    <div className={styles.container} style={{ zIndex: openModal ? 2 : -3 }}>
      <div
        style={{ display: openModal ? "flex" : "none" }}
        className={styles.backdrop}
      />
      <div
        style={{
          transform: openModal ? "translateY(0)" : "translateY(-150vh)",
        }}
        className={styles.cardContainer}
      >
        <div className={styles.header}>
          <div className={styles.headerLeft}></div>
          <div className={styles.headerCenter}>{headerCenter}</div>
          <button onClick={onClose} className={styles.cancelButton}>
            <img src="/icons/x.svg" className={styles.cancelImage} />
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
};

export default TransactionModal;
