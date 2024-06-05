import React, { useMemo } from "react";
import styles from "@/pages/giftcards/cards.module.css";
import { NextPage } from "next";
import PageLayout from "@/components/PageLayout";
import { useRouter } from "next/router";
import useCustomQuery from "@/hooks/useCustomQuery";
import axios from "axios";
import { BASE_URL } from "@/CONFIG";
import { Skeleton } from "antd";

const Cards: NextPage = () => {
  const router = useRouter();

  let auth: any = {};
  if (typeof window !== "undefined" && localStorage.getItem("auth")) {
    auth = JSON.parse(localStorage.getItem("auth") || "");
  }

  const { isLoading, data: result } = useCustomQuery({
    queryKey: ["giftCardOverview"],
    enabled: true,
    queryFn: async () => {
      const result = await axios.post(
        `${BASE_URL}/gift-cards/overview`,
        {},
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      );
      return result;
    },
  });

  const overview = useMemo(() => {
    return result?.data?.data;
  }, [result]);

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
            {isLoading ? (
              <Skeleton active paragraph={{ rows: 0 }} />
            ) : (
              <p className={styles.cardText}>${overview?.totalOrdersUsd}</p>
            )}
          </div>
          <div className={styles.card}>
            <p className={styles.cardHeader}>Number of Orders</p>
            {isLoading ? (
              <Skeleton active paragraph={{ rows: 0 }} />
            ) : (
              <p className={styles.cardText}>{overview?.ordersCount}</p>
            )}
          </div>
          <div className={styles.card}>
            <p className={styles.cardHeader}>Total Giftcards</p>
            {isLoading ? (
              <Skeleton active paragraph={{ rows: 0 }} />
            ) : (
              <p className={styles.cardText}>{overview?.totalGiftCards}</p>
            )}
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
              {isLoading ? (
                <Skeleton active paragraph={{ rows: 0 }} />
              ) : (
                <p className={styles.cardText}>${overview?.platformBalance}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Cards;
