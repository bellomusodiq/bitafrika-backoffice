import Button from "@/components/Button";
import CustomAreaChart from "@/components/Charts/AreaChart";
import CustomPieChart from "@/components/Charts/PieChart";
import NavigationStep from "@/components/NavigationStep";
import PageLayout from "@/components/PageLayout";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import styles from "./assets.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import { BASE_URL } from "@/CONFIG";
import Loader from "@/components/Loader";

const AssetsDetail: NextPage = () => {
  const router = useRouter();
  const assetCode: string = String(router.query.id);
  const assetCodeLower = assetCode?.toLowerCase();

  const [filter, setFilter] = useState<string>("month");
  const [loading, setLoading] = useState<boolean>(false);
  const [asset, setAsset] = useState<any>({});

  let auth: any = {};
  if (typeof window !== "undefined" && localStorage.getItem("auth")) {
    auth = JSON.parse(localStorage.getItem("auth") || "");
  }

  const getAsset = () => {
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/overview/coins-stats`,
        { type: filter, currency: assetCodeLower },
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res: any) => {
        setLoading(false);
        if (res.data.success) {
          setAsset(res.data.data);
        } else {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
      });
  };

  useEffect(() => {
    if (assetCodeLower !== "undefined") {
      getAsset();
    }
  }, [filter, router.query]);

  const graphsItem = asset?.trades?.chart?.options?.xAxis?.categories?.map(
    (item: any, i: number) => ({
      name: item,
      x: item,
      sell: asset?.trades?.chart?.series[0].data[i],
      buy: asset?.trades?.chart?.series[1].data[i],
    })
  );

  const pieChartData = [
    {
      value: asset?.trades?.totalBuy?.usd,
    },
    {
      value: asset?.trades?.totalSell?.usd,
    },
    {
      value: asset?.transactions?.totalReceived?.usd,
    },
    {
      value: asset?.transactions?.totalSent?.usd,
    },
  ];

  return (
    <PageLayout>
      {loading ? (
        <div style={{ marginTop: 60 }}>
          <Loader />
        </div>
      ) : (
        <>
          <div className={styles.headerContainer}>
            <div className={styles.assetTitleContainer}>
              <h1>Bitcoin - (BTC) balance </h1>
              <span>${asset.overview?.totalCrypto?.usd}</span>
            </div>
            <div>
              <Button color="white" onClick={() => router.back()}>
                <img src="/icons/arrow-left.svg" /> Back
              </Button>
            </div>
          </div>

          <div className={styles.assetsBody}>
            <div className={styles.divider} />

            <div className={styles.balanceItems}>
              <div className={styles.balanceItem}>
                <div>
                  <p className={styles.balanceTitle}>Total bitcoin</p>
                  <p className={styles.balanceAmount}>
                    {asset.overview?.totalCrypto?.crypto} {assetCode}
                  </p>
                  <div className={styles.balanceAmount}>
                    <p>${asset.overview?.totalCrypto?.crypto}</p>
                  </div>
                </div>
              </div>
              <div className={styles.balanceItem}>
                <div>
                  <p className={styles.balanceTitle}>Users balance</p>
                  <p className={styles.balanceAmount}>
                    {asset.overview?.usersBalance?.crypto} {assetCode}
                  </p>
                  <div className={styles.balanceAmount}>
                    <p>${asset.overview?.usersBalance?.crypto}</p>
                  </div>
                </div>
              </div>
              <div className={styles.balanceItem}>
                <div>
                  <p className={styles.balanceTitle}>Our balance</p>
                  <p className={styles.balanceAmount}>
                    {asset.overview?.platformBalance?.crypto} {assetCode}
                  </p>
                  <div className={styles.balanceAmount}>
                    <p>${asset.overview?.platformBalance?.crypto}</p>
                  </div>
                </div>
              </div>
              <div className={styles.balanceItem}>
                <div>
                  <p className={styles.balanceTitle}>External wallet</p>
                  <p className={styles.balanceAmount}>
                    {asset.overview?.external?.crypto} {assetCode}
                  </p>
                  <div className={styles.balanceAmount}>
                    <p>${asset.overview?.external?.crypto}</p>
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
                    className={
                      filter === "month" ? styles.filterActiveLeft : ""
                    }
                    onClick={() => setFilter("month")}
                  >
                    30d
                  </a>
                  <div className={styles.verticalDivider} />
                  <a
                    className={
                      filter === "week"
                        ? `${styles.filterActive} ${styles.filterMiddle}`
                        : styles.filterMiddle
                    }
                    onClick={() => setFilter("week")}
                  >
                    7d
                  </a>
                  <div className={styles.verticalDivider} />
                  <a
                    className={filter === "day" ? styles.filterActiveRight : ""}
                    onClick={() => setFilter("day")}
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
                        <h3 className={styles.balanceAmount}>
                          {asset?.trades?.totalBuy?.crypto} {assetCode}
                        </h3>
                        <div className={styles.balanceFooter}>
                          <p>${asset?.trades?.totalBuy?.usd}</p>
                          <div
                            className={styles.verticalDivider}
                            style={{ margin: "0 10px" }}
                          />
                          <p>~GHC {asset?.trades?.totalBuy?.local}</p>
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
                        <h3 className={styles.balanceAmount}>
                          {asset?.trades?.totalSell?.crypto} {assetCode}
                        </h3>
                        <div className={styles.balanceFooter}>
                          <p>${asset?.trades?.totalSell?.usd}</p>
                          <div
                            className={styles.verticalDivider}
                            style={{ margin: "0 10px" }}
                          />
                          <p>~GHC {asset?.trades?.totalSell?.local}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ height: 300 }}>
                    <CustomAreaChart data={graphsItem} />
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
                    <CustomPieChart data={pieChartData} />
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
                      <h3 className={styles.balanceAmount}>
                        {asset?.transactions?.totalSent?.crypto} {assetCode}
                      </h3>
                      <div className={styles.balanceFooter}>
                        <p>${asset?.transactions?.totalSent?.usd}</p>
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
                      <h3 className={styles.balanceAmount}>
                        {asset?.transactions?.totalReceived?.crypto} {assetCode}
                      </h3>
                      <div className={styles.balanceFooter}>
                        <p>${asset?.transactions?.totalReceived?.usd}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </PageLayout>
  );
};

export default AssetsDetail;
