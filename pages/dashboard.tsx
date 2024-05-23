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
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { BASE_URL } from "@/CONFIG";
import Loader from "@/components/Loader";
import { Skeleton } from "antd";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [dashboardStats, setDashboardStats] = useState<any>({});
  const [coinStats, setCoinStats] = useState<any>({});
  const [coinStatsLoading, setCoinStatsLoading] = useState<any>(false);
  const [currencyStats, setCurrencyStats] = useState<any>({});
  const [currencyStatsLoading, setCurrencyStatsLoading] = useState<any>(false);
  const [userStats, setUserStats] = useState<any>({});
  const [userstatsLoading, setUserStatsLoading] = useState<any>(false);

  let auth: any = {};
  if (typeof window !== "undefined" && localStorage.getItem("auth")) {
    auth = JSON.parse(localStorage.getItem("auth") || "");
  }

  const getCoinStats = () => {
    setCoinStatsLoading(true);
    axios
      .post(
        `${BASE_URL}/overview/crypto-stats`,
        {},
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res: any) => {
        setCoinStatsLoading(false);
        if (res.data.success) {
          setCoinStats(res.data.data);
        } else {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
      });
  };

  const getCurrencyStats = () => {
    setCurrencyStatsLoading(true);
    axios
      .post(
        `${BASE_URL}/overview/currency-stats`,
        {},
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res: any) => {
        setCurrencyStatsLoading(false);
        if (res.data.success) {
          setCurrencyStats(res.data.data);
        } else {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
      });
  };

  const getUserStats = () => {
    setUserStatsLoading(true);
    axios
      .post(
        `${BASE_URL}/overview/users-stats`,
        {},
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res: any) => {
        setUserStatsLoading(false);
        if (res.data.success) {
          setUserStats(res.data.data);
        } else {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
      });
  };

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (!auth) {
      router.replace("/signin");
    }
    getCoinStats();
    getUserStats();
    getCurrencyStats();
  }, []);

  const COIN_LISTING = coinStats
    ? Object.keys(coinStats).map((key: string) => ({
        ...coinStats[key],
      }))
    : [];

  return (
    <PageLayout title="Hone">
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
              {userstatsLoading ? (
                <Skeleton paragraph={{ rows: 0, width: "100%" }} active />
              ) : (
                <p className={styles.cardValue}>{userStats?.allUsers}</p>
              )}
            </div>
            <div className={styles.cardContainer}>
              <p className={styles.cardTitle}>Verified</p>
              {userstatsLoading ? (
                <Skeleton paragraph={{ rows: 0, width: "100%" }} active />
              ) : (
                <p className={styles.cardValue}>{userStats?.verifiedUsers}</p>
              )}
            </div>
            <div className={styles.cardContainer}>
              <p className={styles.cardTitle}>Unverified</p>
              {userstatsLoading ? (
                <Skeleton paragraph={{ rows: 0, width: "100%" }} active />
              ) : (
                <p className={styles.cardValue}>{userStats?.unverifiedUsers}</p>
              )}
            </div>
          </div>
          <div className={styles.statsContainer}>
            <CoinListing
              title="Available Coin balances"
              coins={COIN_LISTING}
              loading={coinStatsLoading}
            />
            <div className={styles.avaibleContainer}>
              <StatsCard headerTitle="Transaction Stats">
                {currencyStatsLoading ? (
                  <Skeleton active />
                ) : (
                  <>
                    <div className={styles.statsCardContainer}>
                      <div style={{ width: 120, height: 120 }}>
                        <CustomPieChart
                          data={[
                            {
                              value:
                                currencyStats?.totalBuy?.todayTotal + 0.000001,
                            },
                            {
                              value:
                                currencyStats?.totalBuy?.monthTotal + 0.000001,
                            },
                          ]}
                        />
                      </div>
                      <div className={styles.statsTextContainer}>
                        <p className={styles.statsTextGray}>
                          Total Buy Today (GHS):
                        </p>
                        <p className={styles.statsTextBold}>
                          {currencyStats?.totalBuy?.todayTotal}
                        </p>
                        <p
                          className={styles.statsTextGray}
                          style={{ marginTop: 16 }}
                        >
                          Total Buy Month (GHS):
                        </p>
                        <p className={styles.statsTextNormal}>
                          {currencyStats?.totalBuy?.monthTotal}
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
                                currencyStats?.totalBuy?.todayTotal + 0.000001,
                            },
                            {
                              value:
                                currencyStats?.totalBuy?.monthTotal + 0.000001,
                            },
                          ]}
                        />
                      </div>
                      <div className={styles.statsTextContainer}>
                        <p className={styles.statsTextGray}>
                          Total Sell Today (GHS):
                        </p>
                        <p className={styles.statsTextBold}>
                          {currencyStats?.totalSell?.todayTotal}
                        </p>
                        <p
                          className={styles.statsTextGray}
                          style={{ marginTop: 16 }}
                        >
                          Total Sell Month (GHS):
                        </p>
                        <p className={styles.statsTextNormal}>
                          {currencyStats?.totalSell?.monthTotal}
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
