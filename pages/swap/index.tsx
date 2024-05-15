import React from "react";
import styles from "@/pages/swap/swap.module.css";
import { NextPage } from "next";
import PageLayout from "@/components/PageLayout";
import { useRouter } from "next/router";

const Cards: NextPage = () => {
  const router = useRouter();
  return (
    <PageLayout>
      <div className={styles.container}>
        <h3 className={styles.header}>Swap</h3>
        <p className={styles.subHeader}>
          Here’s an overview of how BitAfrika Swap is performing
        </p>
        <div className={styles.divider} />
        <div className={styles.cardsContainer}>
          <div className={styles.card}>
            <p className={styles.cardHeader}>No. of swaps</p>
            <p className={styles.cardText}>120</p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardHeader}>Available USDT balance</p>
            <p className={styles.cardText}>18,900.50 USDT</p>
          </div>
        </div>
        <div className={styles.bodyContainer}>
          <div className={styles.cardsNav}>
            <div className={styles.headerRow}>
              <p>Actions</p>
            </div>
            <div className={styles.cardBody}>
              <div
                onClick={() => router.push("/cards/search", "/cards/search")}
              >
                <span>Search</span>
                <img src="/icons/arrow-right-card.svg" />
              </div>
              <div onClick={() => router.push("/cards/cards", "/cards/cards")}>
                <span>Reports</span>
                <img src="/icons/arrow-right-card.svg" />
              </div>

              <div
                onClick={() =>
                  router.push("/cards/transactions", "/cards/transactions")
                }
                style={{ borderBottom: "none" }}
              >
                <span>View total transactions</span>
                <img src="/icons/arrow-right-card.svg" />
              </div>
            </div>
          </div>
          <div>
            <div
              style={{ width: "100%", marginBottom: 24 }}
              className={styles.card}
            >
              <p className={styles.cardHeader}>Total USDT balance</p>
              <p className={styles.cardText}>500,723.40 USDT</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Cards;
