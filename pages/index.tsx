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
import { useEffect } from "react";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

const COIN_LISTING = [
  {
    name: "Bitcoin",
    currency: "BTC",
    icon: "/icons/BTC.svg",
    balance: "0",
  },
  {
    name: "Bitcoin",
    currency: "BTC",
    icon: "/icons/BTC.svg",
    balance: "0",
  },
  {
    name: "Bitcoin",
    currency: "BTC",
    icon: "/icons/BTC.svg",
    balance: "0",
  },
  {
    name: "Bitcoin",
    currency: "BTC",
    icon: "/icons/BTC.svg",
    balance: "0",
  },
  {
    name: "Bitcoin",
    currency: "BTC",
    icon: "/icons/BTC.svg",
    balance: "0",
  },
  {
    name: "Bitcoin",
    currency: "BTC",
    icon: "/icons/BTC.svg",
    balance: "0",
  },
];

const CARD_LISTING = [
  {
    title: "Visa ending in 1234",
    username: "@Username",
    amount: 244.0,
    icon: "/icons/VISA.svg",
    balance: 0,
  },
  {
    title: "Visa ending in 1234",
    username: "@Username",
    amount: -244.0,
    icon: "/icons/master-card.svg",
    balance: 0,
  },
  {
    title: "Visa ending in 1234",
    username: "@Username",
    amount: 244.0,
    icon: "/icons/VISA.svg",
    balance: 0,
  },
  {
    title: "Visa ending in 1234",
    username: "@Username",
    amount: -244.0,
    icon: "/icons/master-card.svg",
    balance: 0,
  },
  {
    title: "Visa ending in 1234",
    username: "@Username",
    amount: 244.0,
    icon: "/icons/VISA.svg",
    balance: 0,
  },
];

const SERVICES_LISTING: any = [
  {
    name: "Airtime Purchase",
    icon: "/icons/phone-call-large.svg",
    status: "Active",
  },
  {
    name: "Internet subscription",
    icon: "/icons/wifi-large.svg",
    status: "Active",
  },
  {
    name: "Electricity",
    icon: "/icons/flash-large.svg",
    status: "Active",
  },
  {
    name: "Data plans",
    icon: "/icons/phone-large.svg",
    status: "Active",
  },
  {
    name: "TV Subscription",
    icon: "/icons/tv-large.svg",
    status: "Disabled",
  },
];

export default function Home() {
  const router = useRouter();
  // useEffect(() => {
  //   const auth = localStorage.getItem("auth");
  //   if (!auth) {
  //     router.replace("/signin");
  //   }
  // }, []);

  return (
    <PageLayout showHeader title="Hone">
      <div className={styles.homeContainer}>
        <h1 className={styles.header}>Dashboard Overview</h1>
        <p className={styles.subHeader}>
          Here&apos;s an overview of how BitAfrika is performing
        </p>
        <div className={styles.divider} />
        <div className={styles.overviewContainer}>
          <div className={styles.cardContainer}>
            <p className={styles.cardTitle}>Total Users</p>
            <p className={styles.cardValue}>10047</p>
          </div>
          <div className={styles.cardContainer}>
            <p className={styles.cardTitle}>Verified</p>
            <p className={styles.cardValue}>10047</p>
          </div>
          <div className={styles.cardContainer}>
            <p className={styles.cardTitle}>Unverified</p>
            <p className={styles.cardValue}>10047</p>
          </div>
        </div>
        <div className={styles.statsContainer}>
          <CoinListing title="Available Coin balances" coins={COIN_LISTING} />
          <div className={styles.avaibleContainer}>
            <StatsCard headerTitle="Available Mobile money Balances:">
              <>
                <div className={styles.statsCardContainer}>
                  <div style={{ width: 120, height: 120 }}>
                    <CustomPieChart />
                  </div>
                  <div className={styles.statsTextContainer}>
                    <p className={styles.statsTextGray}>
                      Total available (GHS):
                    </p>
                    <p className={styles.statsTextBold}>4,000,206.20</p>
                    <p
                      className={styles.statsTextGray}
                      style={{ marginTop: 16 }}
                    >
                      Total available (GHS):
                    </p>
                    <p className={styles.statsTextNormal}>4,000,206.20</p>
                  </div>
                </div>
                <div className={styles.divider} />
                <div className={styles.statsCardContainer}>
                  <div className={styles.statsCardFooter}>
                    <div className={styles.statsCardFooterContainer}>
                      <p className={styles.statsTextGray}>
                        Total deposits (GHS):
                      </p>
                      <p className={styles.statsTextNormal}>47,771.08</p>
                    </div>
                    <div
                      className={styles.statsCardFooterContainer}
                      style={{ textAlign: "right" }}
                    >
                      <p className={styles.statsTextGray}>
                        Total deposits (GHS):
                      </p>
                      <p className={styles.statsTextNormal}>47,771.08</p>
                    </div>
                  </div>
                </div>
              </>
            </StatsCard>
            <div className={styles.spacer} />
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
    </PageLayout>
  );
}
