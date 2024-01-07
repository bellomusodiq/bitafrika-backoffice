import Button from "@/components/Button";
import CustomAreaChart from "@/components/Charts/AreaChart";
import CustomPieChart from "@/components/Charts/PieChart";
import NavigationStep from "@/components/NavigationStep";
import PageLayout from "@/components/PageLayout";
import { NextPage } from "next";
import React, { useState } from "react";
import styles from "./assets.module.css";

const AssetsDetail: NextPage = () => {
  const [filter, setFilter] = useState<string>("30d");
  return (
    <PageLayout>
      <NavigationStep
        navigation={["Overview", "Avaiable balance", "Bitcoin"]}
      />
      <div className={styles.assetTitleContainer}>
        <h1>Bitcoin - (BTC) balance </h1>
        <span>
          $21,500.99
        </span>
      </div>

      <div className={styles.assetsBody}>
        <div className={styles.divider} />

        <div className={styles.balanceItems}>
          <div className={styles.balanceItem}>
            <div>
              <p className={styles.balanceTitle}>Total bitcoin</p>
              <p className={styles.balanceAmount}>102.99831016 BTC</p>
              <div className={styles.balanceAmount}>
                <p>$62,898.55</p>
              </div>
            </div>
          </div>
          <div className={styles.balanceItem}>
            <div>
              <p className={styles.balanceTitle}>Users balance</p>
              <p className={styles.balanceAmount}>102.99831016 BTC</p>
              <div className={styles.balanceAmount}>
                <p>$62,898.55</p>
              </div>
            </div>
          </div>
          <div className={styles.balanceItem}>
            <div>
              <p className={styles.balanceTitle}>Our balance</p>
              <p className={styles.balanceAmount}>102.99831016 BTC</p>
              <div className={styles.balanceAmount}>
                <p>$62,898.55</p>
              </div>
            </div>
          </div>
          <div className={styles.balanceItem}>
            <div>
              <p className={styles.balanceTitle}>External wallet</p>
              <p className={styles.balanceAmount}>102.99831016 BTC</p>
              <div className={styles.balanceAmount}>
                <p>$62,898.55</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.tradesTitle}>
            <div className={styles.tradesTextContainer}>
              <h3>Bitcoin Trades</h3>
            </div>
            <div className={styles.filterDays}>
              <a
                className={filter === "30d" ? styles.filterActiveLeft : ""}
                onClick={() => setFilter("30d")}
              >
                30d
              </a>
              <div className={styles.verticalDivider} />
              <a
                className={
                  filter === "7d"
                    ? `${styles.filterActive} ${styles.filterMiddle}`
                    : styles.filterMiddle
                }
                onClick={() => setFilter("7d")}
              >
                7d
              </a>
              <div className={styles.verticalDivider} />
              <a
                className={filter === "24h" ? styles.filterActiveRight : ""}
                onClick={() => setFilter("24h")}
              >
                24h
              </a>
            </div>
          </div>
          <div className={styles.border} />

          <div className={styles.blankDivider} />

          <div className={styles.tradesCharts}>
            <div style={{ width: "60%" }}>
              <div
                className={styles.balanceItems}
                style={{ backgroundColor: "#FCFCFD" }}
              >
                <div
                  className={styles.balanceItem2}
                  style={{ width: "calc(100% / 2 - 2px)" }}
                >
                  <div>
                    <p className={styles.balanceTitle}>Bought</p>
                    <h3 className={styles.balanceAmount}>1.2345678 BTC</h3>
                    <div className={styles.balanceFooter}>
                      <p>$12,000</p>
                      <div
                        className={styles.verticalDivider}
                        style={{ margin: "0 10px" }}
                      />
                      <p>~GHC 1,900.00</p>
                    </div>
                  </div>
                </div>
                <div className={styles.verticalDivider} />
                <div
                  className={styles.balanceItem2}
                  style={{ width: "calc(100% / 2 - 2px)" }}
                >
                  <div>
                    <p className={styles.balanceTitle}>Sold</p>
                    <h3 className={styles.balanceAmount}>1.2345678 BTC</h3>
                    <div className={styles.balanceFooter}>
                      <p>$12,000.000</p>
                      <div
                        className={styles.verticalDivider}
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
        </div>
        <div
          className={styles.container}
          style={{ marginTop: 24, marginBottom: 24 }}
        >
          <div className={styles.tradesTitle}>
            <div className={styles.tradesTextContainer}>
              <h3>Bitcoin Transactions</h3>
            </div>
            <div className={styles.filterDays}>
              <a
                className={filter === "30d" ? styles.filterActiveLeft : ""}
                onClick={() => setFilter("30d")}
              >
                30d
              </a>
              <div className={styles.verticalDivider} />
              <a
                className={
                  filter === "7d"
                    ? `${styles.filterActive} ${styles.filterMiddle}`
                    : styles.filterMiddle
                }
                onClick={() => setFilter("7d")}
              >
                7d
              </a>
              <div className={styles.verticalDivider} />
              <a
                className={filter === "24h" ? styles.filterActiveRight : ""}
                onClick={() => setFilter("24h")}
              >
                24h
              </a>
            </div>
          </div>
          <div className={styles.border} />
          <div style={{ backgroundColor: "white" }}>
            <div
              className={styles.balanceItems}
              style={{
                backgroundColor: "#FCFCFD",
                justifyContent: "space-between",
                border: "1px solid #eaecf0",
                padding: 24,
                marginTop: 24,
              }}
            >
              <div
                className={styles.balanceItem2}
                style={{
                  width: "calc(100% / 2 - 2px)",
                  flex: 1,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <div>
                  <p className={styles.balanceTitle}>Sent</p>
                  <h3 className={styles.balanceAmount}>1.2345678 BTC</h3>
                  <div className={styles.balanceFooter}>
                    <p>$12,000</p>
                    <div className={styles.verticalDivider} />
                    <p>~GHC 1,900.00</p>
                  </div>
                </div>
              </div>
              <div className={styles.verticalDivider} />
              <div
                className={styles.balanceItem2}
                style={{ width: "calc(100% / 2 - 2px)" }}
              >
                <div>
                  <p className={styles.balanceTitle}>Received</p>
                  <h3 className={styles.balanceAmount}>1.2345678 BTC</h3>
                  <div className={styles.balanceFooter}>
                    <p>$12,000.000</p>
                    <div
                      className={styles.verticalDivider}
                      style={{ margin: "0 10px" }}
                    />
                    <p>~GHC 1,900.00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AssetsDetail;
