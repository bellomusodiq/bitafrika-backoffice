import React, { useEffect, useMemo, useState } from "react";
import styles from "@/pages/cards/cards.module.css";
import { NextPage } from "next";
import PageLayout from "@/components/PageLayout";
import { useRouter } from "next/router";
import axios from "axios";
import { BASE_URL } from "@/CONFIG";
import Loader from "@/components/Loader";
import useCustomQuery from "@/hooks/useCustomQuery";
import { Skeleton } from "antd";

const Cards: NextPage = () => {
  const router = useRouter();

  let auth: any = {};
  if (typeof window !== "undefined" && localStorage.getItem("auth")) {
    auth = JSON.parse(localStorage.getItem("auth") || "");
  }

  const { isLoading, data: result } = useCustomQuery({
    queryKey: [],
    enabled: true,
    queryFn: async () => {
      const result = await axios.post(
        `${BASE_URL}/virtual-cards`,
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

  const cardsData = useMemo(() => {
    return result?.data?.data;
  }, [result]);

  return (
    <PageLayout>
      <div className={styles.container}>
        <h3 className={styles.header}>Cards</h3>
        <p className={styles.subHeader}>
          Here’s an overview of how BitAfrika is performing
        </p>
        <div className={styles.divider} />
        <div className={styles.cardsContainer}>
          {auth?.user?.role !== "NANO" && (
            <>
              <div className={styles.card}>
                <p className={styles.cardHeader}>No. of Cards</p>
                {isLoading ? (
                  <Skeleton active paragraph={{ rows: 0 }} />
                ) : (
                  <p className={styles.cardText}>{cardsData?.numberOfCards}</p>
                )}
              </div>
              <div className={styles.card}>
                <p className={styles.cardHeader}>Total active cards</p>
                {isLoading ? (
                  <Skeleton active paragraph={{ rows: 0 }} />
                ) : (
                  <p className={styles.cardText}>
                    {cardsData?.totalActiveCards}
                  </p>
                )}
              </div>
              <div className={styles.card}>
                <p className={styles.cardHeader}>Total terminated Cards</p>
                {isLoading ? (
                  <Skeleton active paragraph={{ rows: 0 }} />
                ) : (
                  <p className={styles.cardText}>
                    {cardsData?.totalTerminatedCards}
                  </p>
                )}
              </div>
              <div className={styles.card}>
                <p className={styles.cardHeader}>Total frozen Cards</p>
                {isLoading ? (
                  <Skeleton active paragraph={{ rows: 0 }} />
                ) : (
                  <p className={styles.cardText}>
                    {cardsData?.totalFrozenCards}
                  </p>
                )}
              </div>
            </>
          )}
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
          {auth?.user?.role !== "NANO" && (
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
                  <p className={styles.cardText}>
                    ${cardsData?.totalPlatformBalance}
                  </p>
                )}
              </div>
              <div
                style={{ width: "100%", marginBottom: 24 }}
                className={styles.card}
              >
                <p className={styles.cardHeader}>Total card Balances</p>
                {isLoading ? (
                  <Skeleton active paragraph={{ rows: 0 }} />
                ) : (
                  <p className={styles.cardText}>${cardsData?.totalBalance}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Cards;
