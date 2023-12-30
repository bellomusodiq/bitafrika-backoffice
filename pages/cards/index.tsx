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
            <p className={styles.cardHeader}>Total transactions vol</p>
            <p className={styles.cardText}>$100,470.90</p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardHeader}>Total card balances</p>
            <p className={styles.cardText}>$100,470.90</p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardHeader}>Total top up</p>
            <p className={styles.cardText}>$100,470.90</p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardHeader}>Total chargebacks</p>
            <p className={styles.cardText}>$100,470.90</p>
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
                  router.push("/cards/requests", "/cards/requests")
                }
              >
                <span>View total requests </span>
                <img src="/icons/arrow-right-card.svg" />
              </div>
              <div
                onClick={() =>
                  router.push("/cards/disputes", "/cards/disputes")
                }
              >
                <span>View total dispute/chargebacks </span>
                <img src="/icons/arrow-right-card.svg" />
              </div>
              <div
                onClick={() => router.push("/cards/top-up", "/cards/top-up")}
              >
                <span>View total top up</span>
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
              <p className={styles.cardHeader}>Total cards requested</p>
              <p className={styles.cardText}>10047</p>
            </div>
            <div className={styles.cardsContainer}>
              <div
                style={{ width: "calc(50% - 12px)" }}
                className={styles.card}
              >
                <p className={styles.cardHeader}>Cards approved</p>
                <p className={styles.cardText}>10047</p>
              </div>
              <div
                style={{ width: "calc(50% - 12px)" }}
                className={styles.card}
              >
                <p className={styles.cardHeader}>Cards denied</p>
                <p className={styles.cardText}>10047</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Cards;
