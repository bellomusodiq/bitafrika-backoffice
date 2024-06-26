import React from "react";
import styles from "@/pages/swap/swap.module.css";
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

  const { isLoading, data: { data: result } = {} } = useCustomQuery({
    queryKey: ["swap"],
    queryFn: async () => {
      const result = await axios.post(
        `${BASE_URL}/swap`,
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
  const { isLoading: isLoadingBalance, data: { data: balance } = {} } =
    useCustomQuery({
      queryKey: ["swapBalance"],
      queryFn: async () => {
        const result = await axios.post(
          `${BASE_URL}/swap/usdt-balance`,
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

  return (
    <PageLayout>
      <div className={styles.container}>
        <h3 className={styles.header}>Swap</h3>
        <p className={styles.subHeader}>
          Here’s an overview of how BitAfrika Swap is performing
        </p>
        <div className={styles.divider} />
        {auth?.user?.role !== "NANO" && (
          <div className={styles.cardsContainer}>
            <div className={styles.card}>
              <p className={styles.cardHeader}>No. of swaps</p>
              {isLoading ? (
                <Skeleton active paragraph={{ rows: 0 }} />
              ) : (
                <p className={styles.cardText}>{result?.data?.numberOfSwaps}</p>
              )}
            </div>
            <div className={styles.card}>
              <p className={styles.cardHeader}>Available USDT balance</p>
              {isLoadingBalance ? (
                <Skeleton active paragraph={{ rows: 0 }} />
              ) : (
                <p className={styles.cardText}>
                  {balance?.data?.availableUsdtBalance}{" "}
                  {balance?.data?.currency}
                </p>
              )}
            </div>
          </div>
        )}

        <div className={styles.bodyContainer}>
          <div className={styles.cardsNav}>
            <div className={styles.headerRow}>
              <p>Actions</p>
            </div>
            <div className={styles.cardBody}>
              <div onClick={() => router.push("/swap/search", "/swap/search")}>
                <span>Search</span>
                <img src="/icons/arrow-right-card.svg" />
              </div>
              {auth?.user?.role !== "NANO" && (
                <div
                  onClick={() => router.push("/swap/reports", "/swap/reports")}
                >
                  <span>Reports</span>
                  <img src="/icons/arrow-right-card.svg" />
                </div>
              )}

              <div
                onClick={() =>
                  router.push("/swap/transactions", "/swap/transactions")
                }
                style={{ borderBottom: "none" }}
              >
                <span>View total transactions</span>
                <img src="/icons/arrow-right-card.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Cards;
