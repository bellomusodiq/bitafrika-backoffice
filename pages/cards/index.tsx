import React from "react";
import styles from "@/pages/cards/cards.module.css";
import { NextPage } from "next";
import PageLayout from "@/components/PageLayout";
import { useRouter } from "next/router";

const Cards: NextPage = () => {
  const router = useRouter();
  return (
    <PageLayout>
      <div className={styles.container}>
        <h3 className={styles.header}>Cards</h3>
        <p className={styles.subHeader}>
          Here’s an overview of how BitAfrika is performing
        </p>
        <div className={styles.divider} />
        <div className={styles.cardsContainer}>
          <div className={styles.card}>
            <p className={styles.cardHeader}>No. of Cards</p>
            <p className={styles.cardText}>200</p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardHeader}>Total active cards</p>
            <p className={styles.cardText}>189</p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardHeader}>Total terminated Cards</p>
            <p className={styles.cardText}>25</p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardHeader}>Total frozen Cards</p>
            <p className={styles.cardText}>15</p>
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
                <span>Cards</span>
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
              <p className={styles.cardHeader}>
                Platform Balance (Balance with provider)
              </p>
              <p className={styles.cardText}>$500,723.40</p>
            </div>
            <div
              style={{ width: "100%", marginBottom: 24 }}
              className={styles.card}
            >
              <p className={styles.cardHeader}>Total card Balances</p>
              <p className={styles.cardText}>$400,550.95</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Cards;
