import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import SideNav from "@/components/SideNav";
import PageLayout from "@/components/PageLayout";
import CoinListing from "@/components/CoinListing";
import StatsCard from "@/components/Card/StatsCard";
import CustomPieChart from "@/components/Charts/PieChart";
import TrendItem from "@/components/TrendItem";
import CardListing from "@/components/CardListing";
import ServicesListing from "@/components/ServicesListing";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { BASE_URL } from "@/CONFIG";
import Loader from "@/components/Loader";
import { Skeleton } from "antd";
import { useQueries } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function Home() {
  const router = useRouter();

  let auth: any = {};
  if (typeof window !== "undefined" && localStorage.getItem("auth")) {
    auth = JSON.parse(localStorage.getItem("auth") || "");
  }

  const requests = [
    {
      key: "coinStat",
      url: `${BASE_URL}/overview/crypto-stats`,
    },
    {
      key: "currencyStat",
      url: `${BASE_URL}/overview/currency-stats`,
    },
    {
      key: "userStat",
      url: `${BASE_URL}/overview/users-stats`,
    },
  ];

  const [coinStat, currencyStat, userStat] = useQueries({
    queries: requests.map(({ key, url }) => ({
      queryKey: [key],
      queryFn: async () => {
        const result = await axios.post(
          url,
          {},
          {
            headers: {
              Authorization: auth.accessToken,
            },
          }
        );
        return result;
      },
    })),
  });

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (!auth) {
      router.replace("/signin");
    }

    if (coinStat && !coinStat.data?.data?.success) {
      toast.error(!coinStat.data?.data.message);
    }
    if (currencyStat && !currencyStat.data?.data?.success) {
      toast.error(!currencyStat.data?.data.message);
    }
    if (userStat && !userStat.data?.data?.success) {
      toast.error(!userStat.data?.data.message);
    }
    if (coinStat.error || currencyStat.error || userStat.error) {
      const msg = "Something went wrong, please try again";
      const err =
        coinStat.error || currencyStat.error || (userStat.error as any);
      if (err?.response?.status === 401) {
        localStorage.removeItem("auth");
        router.replace("/", "/");
      } else if (!err?.response?.data?.success) {
        toast.error(err?.response?.data.message || msg);
      } else {
        toast.error(err?.response?.message || msg);
      }
    }
  }, [coinStat, currencyStat, userStat]);

  const COIN_LISTING = useMemo(() => {
    const temp = coinStat.data?.data?.data;
    const result = temp
      ? Object.keys(temp).map((key: string) => ({
          ...temp[key],
        }))
      : [];
    return result;
  }, [coinStat]);

  return (
    <PageLayout title="Home">
      <>
        <div className={styles.homeContainer}>
          <h1 className={styles.header}>Dashboard Overview</h1>
          <p className={styles.subHeader}>
            Here&apos;s an overview of how BitAfrika is performing
          </p>
          <div className={styles.divider} />
          <div className={styles.overviewContainer}>
            <div className={styles.cardContainer}>
              <p className={styles.cardTitle}>Total Users</p>
              {userStat.isLoading ? (
                <Skeleton paragraph={{ rows: 0, width: "100%" }} active />
              ) : (
                <p className={styles.cardValue}>
                  {userStat.data?.data?.data?.allUsers}
                </p>
              )}
            </div>
            <div className={styles.cardContainer}>
              <p className={styles.cardTitle}>Verified</p>
              {userStat.isLoading ? (
                <Skeleton paragraph={{ rows: 0, width: "100%" }} active />
              ) : (
                <p className={styles.cardValue}>
                  {userStat.data?.data?.data?.verifiedUsers}
                </p>
              )}
            </div>
            <div className={styles.cardContainer}>
              <p className={styles.cardTitle}>Unverified</p>
              {userStat.isLoading ? (
                <Skeleton paragraph={{ rows: 0, width: "100%" }} active />
              ) : (
                <p className={styles.cardValue}>
                  {userStat.data?.data?.data?.unverifiedUsers}
                </p>
              )}
            </div>
          </div>
          <div className={styles.statsContainer}>
            <CoinListing
              title="Available Coin balances"
              coins={COIN_LISTING}
              loading={coinStat.isLoading || coinStat.isFetching}
              // refresh={coinStat.refetch}
            />
            <div className={styles.avaibleContainer}>
              <StatsCard headerTitle="Transaction Stats">
                {currencyStat.isLoading ? (
                  <div style={{ padding: "24px" }}>
                    <Skeleton active />
                  </div>
                ) : (
                  <>
                    <div className={styles.statsCardContainer}>
                      <div style={{ width: 120, height: 120 }}>
                        <CustomPieChart
                          data={[
                            {
                              value:
                                currencyStat.data?.data?.data?.totalBuy
                                  ?.todayTotal + 0.000001,
                              color: "#0088FE",
                            },
                            {
                              value:
                                currencyStat.data?.data?.data?.totalBuy
                                  ?.monthTotal + 0.000001,
                              color: "#00C49F",
                            },
                          ]}
                        />
                      </div>
                      <div className={styles.statsTextContainer}>
                        <p className={styles.statsTextGray}>
                          Total Buy Today (GHS):
                        </p>
                        <p className={styles.statsTextBold}>
                          {currencyStat.data?.data?.data?.totalBuy?.todayTotal}
                        </p>
                        <p
                          className={styles.statsTextGray}
                          style={{ marginTop: 16 }}
                        >
                          Total Buy Month (GHS):
                        </p>
                        <p className={styles.statsTextNormal}>
                          {currencyStat.data?.data?.data?.totalBuy?.monthTotal}
                        </p>
                      </div>
                    </div>
                    <div className={styles.spacer} />
                    <div className={styles.statsCardContainer}>
                      <div style={{ width: 120, height: 120 }}>
                        <CustomPieChart
                          data={[
                            {
                              value:
                                currencyStat.data?.data?.data?.totalBuy
                                  ?.todayTotal + 0.000001,
                              color: "#0088FE",
                            },
                            {
                              value:
                                currencyStat.data?.data?.data?.totalBuy
                                  ?.monthTotal + 0.000001,
                              color: "#00C49F",
                            },
                          ]}
                        />
                      </div>
                      <div className={styles.statsTextContainer}>
                        <p className={styles.statsTextGray}>
                          Total Sell Today (GHS):
                        </p>
                        <p className={styles.statsTextBold}>
                          {currencyStat.data?.data?.data?.totalSell?.todayTotal}
                        </p>
                        <p
                          className={styles.statsTextGray}
                          style={{ marginTop: 16 }}
                        >
                          Total Sell Month (GHS):
                        </p>
                        <p className={styles.statsTextNormal}>
                          {currencyStat.data?.data?.data?.totalSell?.monthTotal}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </StatsCard>
            </div>
          </div>
          {/* 
        <h3 className={styles.trendHeader}>Trends</h3>
        <div className={styles.infoContainer}>
        <img src="/icons/info-circle.svg" />
        <p>Analytics are compared to the last month</p>
        </div>
        <div className={styles.trendsContainer}>
        <TrendItem
        // showGraph
        title="Transaction completion rate"
        trend="up"
        trendNumber={3.4}
        number="1004"
        subTitle="vs. 80003 last month"
        borderTop
        borderRight
        borderBottom
        dateFrom="04 Feb"
        dateTo="05 May"
        />
        <TrendItem
        // showGraph
        title="New user sign ups"
        trend="up"
        trendNumber={3.4}
        number="$150.44"
        subTitle="vs. $850,999.00 last month"
        borderTop
        borderRight
        borderBottom
        dateFrom="04 Feb"
        dateTo="05 May"
        />
        
        <TrendItem
        // showGraph
        title="Total users"
        trend="up"
        trendNumber={3.4}
        number="1200"
        subTitle="vs. 900 last month"
        borderRight
        dateFrom="04 Feb"
        dateTo="05 May"
        />
        
        </div>
        <h3 className={styles.trendHeader}>Cards</h3>
        <div className={styles.infoContainer}>
        <img src="/icons/info-circle.svg" />
        <p>Analytics are compared to the last month</p>
        </div>
        <div className={styles.cardsContainer}>
        <div>
        <TrendItem
        title="Transaction completion rate"
        trend="up"
        trendNumber={3.4}
        number="1004"
        subTitle="vs. 80003 last month"
        borderTop
        borderRight
        borderBottom
        borderLeft
        dateFrom="04 Feb"
        dateTo="05 May"
        onPressAction={() => {}}
        />
        <TrendItem
        title="Total active cards on platform"
        trend="up"
        trendNumber={3.4}
        number="1004"
        subTitle="vs. 80003 last month"
              borderTop
              borderRight
              borderBottom
              borderLeft
              dateFrom="04 Feb"
              dateTo="05 May"
              onPressAction={() => {}}
            />
          </div>
          <CardListing title="Recent card funding" cards={CARD_LISTING} />
        </div>
        <h3 className={styles.trendHeader}>Utilities</h3>
        <div className={styles.infoContainer}>
          <img src="/icons/info-circle.svg" />
          <p>Analytics are compared to the last month</p>
        </div>
        <div className={styles.utilitiesContainer}>
          <div>
            <TrendItem
              title="Utility transactions"
              trend="up"
              trendNumber={3.4}
              number="$20000.80"
              subTitle="vs. 80003 last month"
              borderTop
              borderRight
              borderBottom
              borderLeft
              dateFrom="04 Feb"
              dateTo="05 May"
              onPressAction={() => {}}
            />
            <TrendItem
              title="Utilitiy services available on platform"
              trend="up"
              trendNumber={3.4}
              number="6"
              borderTop
              borderRight
              borderBottom
              borderLeft
            >
              <div className={styles.tabletsContainer}>
                <span className={styles.tablet}>
                  <img src="/icons/wifi.svg" />
                  Internet subscription
                </span>
                <span className={styles.tablet}>
                  <img src="/icons/phone-call.svg" />
                  Airtime purchase
                </span>
                <span className={styles.tablet}>
                  <img src="/icons/flash.svg" />
                  Electricity
                </span>
                <span className={styles.tablet}>
                  <img src="/icons/phone.svg" />
                  Data plans
                </span>
                <span className={styles.tablet}>
                  <img src="/icons/tv.svg" />
                  TV Subscription
                </span>
              </div>
            </TrendItem>
          </div>
          <ServicesListing title="Service status" services={SERVICES_LISTING} />
        </div>
        */}
        </div>
      </>{" "}
    </PageLayout>
  );
}
