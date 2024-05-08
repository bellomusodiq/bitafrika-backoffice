import React from "react";
import styles from "@/pages/giftcards/cards.module.css";
import { NextPage } from "next";
import PageLayout from "@/components/PageLayout";
import { useRouter } from "next/router";

const Cards: NextPage = () => {
  const router = useRouter();
  return (
    <PageLayout>
      <div className={styles.container}>
        <h3 className={styles.header}>Giftcards</h3>
        <p className={styles.subHeader}>
          Here’s an overview of how BitAfrika is performing
        </p>
        <div className={styles.divider} />
        <div className={styles.cardsContainer}>
          <div className={styles.card}>
            <p className={styles.cardHeader}>Total Orders (USD)</p>
            <p className={styles.cardText}>$100,470.90</p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardHeader}>Number of Orders</p>
            <p className={styles.cardText}>18900</p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardHeader}>Total Giftcards</p>
            <p className={styles.cardText}>901</p>
          </div>
        </div>
        <div className={styles.bodyContainer}>
          <div className={styles.cardsNav}>
            <div className={styles.headerRow}>
              <p>Actions</p>
            </div>
            <div className={styles.cardBody}>
              <div
                onClick={() =>
                  router.push("/giftcards/search", "/giftcards/search")
                }
              >
                <span>Search</span>
                <img src="/icons/arrow-right-card.svg" />
              </div>
              <div
                onClick={() =>
                  router.push("/giftcards/giftcards", "/giftcards/giftcards")
                }
              >
                <span>Giftcards</span>
                <img src="/icons/arrow-right-card.svg" />
              </div>
              <div
                onClick={() =>
                  router.push("/giftcards/reports", "/giftcards/reports")
                }
              >
                <span>Reports </span>
                <img src="/icons/arrow-right-card.svg" />
              </div>
              <div
                onClick={() =>
                  router.push(
                    "/giftcards/transactions",
                    "/giftcards/transactions"
                  )
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
              <p className={styles.cardText}>$20,000.00</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Cards;
