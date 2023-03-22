import Button from "@/components/Button";
import CustomAreaChart from "@/components/Charts/AreaChart";
import CustomPieChart from "@/components/Charts/PieChart";
import NavigationStep from "@/components/NavigationStep";
import PageLayout from "@/components/PageLayout";
import { NextPage } from "next";
import React from "react";
import styles from "./assets.module.css";

const AssetsDetail: NextPage = () => {
  return (
    <PageLayout>
      <NavigationStep />
      <div className={styles.assetTitleContainer}>
        <h1>Bitcoin - (BTC) balance </h1>
        <span>
          <img src="/icons/arrow-up.svg" />
          $21,500.99
        </span>
      </div>
      <div className={styles.welcomeCard}>
        <div className={styles.welcomeTextContainer}>
          <p>Good evening emmanuel</p>
          <h3>Here’s an overview of all Bitcoin balances on the platform</h3>
        </div>
        <div className={styles.welcomeButtons}>
          <Button className={styles.welcomeButton} color="white">
            Button CTA
          </Button>
          <Button color="white">Button CTA</Button>
        </div>
      </div>
      <div className={styles.assetsBody}>
        <div className={styles.balanceItems}>
          <div className={styles.balanceItem}>
            <div>
              <p className={styles.balanceTitle}>Total bitcoin</p>
              <p className={styles.balanceAmount}>102.99831016 BTC</p>
              <div className={styles.balanceAmount}>
                <p>$62,898.55</p>
                <span>
                  <img src="/icons/arrow-up.svg" /> 10%
                </span>
              </div>
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.balanceItem}>
            <div>
              <p className={styles.balanceTitle}>Cold wallet (External)</p>
              <p className={styles.balanceAmount}>102.99831016 BTC</p>
              <div className={styles.balanceAmount}>
                <p>$62,898.55</p>
              </div>
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.balanceItem}>
            <div>
              <p className={styles.balanceTitle}>Cold wallet (Platform)</p>
              <p className={styles.balanceAmount}>102.99831016 BTC</p>
              <div className={styles.balanceAmount}>
                <p>$62,898.55</p>
              </div>
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.balanceItem}>
            <div>
              <p className={styles.balanceTitle}>Hot Wallet (Users balance)</p>
              <p className={styles.balanceAmount}>102.99831016 BTC</p>
              <div className={styles.balanceAmount}>
                <p>$62,898.55</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.tradesTitle}>
          <div className={styles.tradesTextContainer}>
            <h3>Bitcoin Trades</h3>
            <p>
              <img src="/icons/info-circle.svg" />
              Analytics data is compared to previous period
            </p>
          </div>
          <div className={styles.filterDays}>
            <a>30d</a>
            <div className={styles.divider} />
            <a className={styles.filterMiddle}>7d</a>
            <div className={styles.divider} />
            <a className={styles.filterActive}>24h</a>
          </div>
        </div>
        <div className={styles.border} />
        <div className={styles.tradesCharts}>
          <div style={{ width: "60%" }}>
            <div
              className={styles.balanceItems}
              style={{ backgroundColor: "#FCFCFD" }}
            >
              <div
                className={styles.balanceItem}
                style={{ width: "calc(100% / 2 - 2px)" }}
              >
                <div>
                  <p className={styles.balanceTitle}>Deposit</p>
                  <h3 className={styles.balanceAmount}>1.2345678 BTC</h3>
                  <div className={styles.balanceFooter}>
                    <p>$12,000</p>
                    <div
                      className={styles.divider}
                      style={{ margin: "0 10px" }}
                    />
                    <p>~GHC 1,900.00</p>
                  </div>
                </div>
              </div>
              <div className={styles.divider} />
              <div
                className={styles.balanceItem}
                style={{ width: "calc(100% / 2 - 2px)" }}
              >
                <div>
                  <p className={styles.balanceTitle}>Deposit</p>
                  <h3 className={styles.balanceAmount}>1.2345678 BTC</h3>
                  <div className={styles.balanceFooter}>
                    <p>$12,000.000</p>
                    <div
                      className={styles.divider}
                      style={{ margin: "0 10px" }}
                    />
                    <p>~GHC 1,900.00</p>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ height: 300 }}>
              <CustomAreaChart />
            </div>
          </div>
          <div
            style={{
              width: "calc(40% - 24px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ width: "100%", height: 200 }}>
              <CustomPieChart />
            </div>
            <h4 className={styles.pieTitle}>1021</h4>
            <div className={styles.legend}>
              <p>
                <div style={{ backgroundColor: "red" }} /> Buy Orders
              </p>
              <p>
                <div style={{ backgroundColor: "red" }} /> Sell Orders
              </p>
              <p>
                <div style={{ backgroundColor: "red" }} /> Deposits
              </p>
              <p>
                <div style={{ backgroundColor: "red" }} /> Withdrawals
              </p>
            </div>
            <div>
              <Button color="white">View transactions</Button>
            </div>
          </div>
        </div>
        <div className={styles.summaryTexts}>
          <p className={styles.inLastDays}>in last 30 days</p>
          <p>120.98938388 BTC Sold</p>
          <p>120.98938388 BTC bought</p>
          <p>800 Buy orders</p>
          <p>221 sell orders</p>
        </div>
        <div className={styles.tradesTitle}>
          <div className={styles.tradesTextContainer}>
            <h3>Bitcoin Transactions</h3>
            <p>
              <img src="/icons/info-circle.svg" />
              Analytics data is compared to previous period
            </p>
          </div>
          <div className={styles.filterDays}>
            <a>30d</a>
            <div className={styles.divider} />
            <a className={styles.filterMiddle}>7d</a>
            <div className={styles.divider} />
            <a className={styles.filterActive}>24h</a>
          </div>
        </div>
        <div
          className={styles.balanceItems}
          style={{
            backgroundColor: "#FCFCFD",
            justifyContent: "space-between",
          }}
        >
          <div
            className={styles.balanceItem}
            style={{ width: "calc(100% / 2 - 2px)" }}
          >
            <div>
              <p className={styles.balanceTitle}>Sent</p>
              <h3 className={styles.balanceAmount}>1.2345678 BTC</h3>
              <div className={styles.balanceFooter}>
                <p>$12,000</p>
                <div className={styles.divider} style={{ margin: "0 10px" }} />
                <p>~GHC 1,900.00</p>
              </div>
            </div>
          </div>
          <div className={styles.divider} />
          <div
            className={styles.balanceItem}
            style={{ width: "calc(100% / 2 - 2px)" }}
          >
            <div>
              <p className={styles.balanceTitle}>Received</p>
              <h3 className={styles.balanceAmount}>1.2345678 BTC</h3>
              <div className={styles.balanceFooter}>
                <p>$12,000.000</p>
                <div className={styles.divider} style={{ margin: "0 10px" }} />
                <p>~GHC 1,900.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AssetsDetail;
