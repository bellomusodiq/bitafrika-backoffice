import Button from "@/components/Button";
import CustomAreaChart from "@/components/Charts/AreaChart";
import CustomPieChart from "@/components/Charts/PieChart";
import NavigationStep from "@/components/NavigationStep";
import PageLayout from "@/components/PageLayout";
import { GetServerSideProps, NextPage } from "next";
import React, { useEffect, useMemo, useState } from "react";
import styles from "./assets.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import { BASE_URL } from "@/CONFIG";
import Loader from "@/components/Loader";
import { Radio, Skeleton } from "antd";
import useCustomQuery from "@/hooks/useCustomQuery";
import { useQueries } from "@tanstack/react-query";

interface IProps {
  id: string;
}

const AssetsDetail = ({ id }: IProps) => {
  const router = useRouter();
  const [filter, setFilter] = useState<string>("month");
  const [transactionFilter, setTransactionFilter] = useState<string>("month");

  let auth: any = {};
  if (typeof window !== "undefined" && localStorage.getItem("auth")) {
    auth = JSON.parse(localStorage.getItem("auth") || "");
  }

  const requests = [
    {
      key: ["assetCoinStat", id, filter],
      url: `${BASE_URL}/overview/coins-stats`,
      payload: { type: filter, currency: id },
    },
    {
      key: ["assetTradeStat", id, filter],
      url: `${BASE_URL}/overview/coin-trade-stats`,
      payload: { type: filter, currency: id },
    },
    {
      key: ["assetTransactionStat", id, transactionFilter],
      url: `${BASE_URL}/overview/coin-transaction-stats`,
      payload: { type: transactionFilter, currency: id },
    },
  ];

  const [assetCoinStat, assetTradeStat, assetTransactionStat] = useQueries({
    queries: requests.map(({ key, url, payload }) => ({
      queryKey: key,
      queryFn: async () => {
        const result = await axios.post(url, payload, {
          headers: {
            Authorization: auth.accessToken,
          },
        });
        return result;
      },
    })),
  });

  const graphsItem = useMemo(() => {
    const tempAsset = assetTradeStat?.data?.data?.data || {};
    const formatData = tempAsset?.chart?.options?.xAxis?.categories?.map(
      (item: any, i: number) => ({
        name: item,
        x: item,
        sell: tempAsset?.chart?.series[0].data[i],
        buy: tempAsset?.chart?.series[1].data[i],
      })
    );
    return formatData;
  }, [assetTradeStat?.data?.data?.data]);

  // const pieChartData = [
  //   {
  //     value: result?.data?.trades?.totalBuy?.usd + 0.000001,
  //     color: "red",
  //   },
  //   {
  //     value: result?.data?.trades?.totalSell?.usd + 0.000001,
  //     color: "blue",
  //   },
  //   {
  //     value: result?.data?.transactions?.totalReceived?.usd + 0.000001,
  //     color: "green",
  //   },
  //   {
  //     value: result?.data?.transactions?.totalSent?.usd + 0.000001,
  //     color: "yellow",
  //   },
  // ];

  const renderSkeleton = () => (
    <Skeleton
      title={false}
      paragraph={{
        rows: 1,
        style: { margin: "10px 0" },
        width: "100%",
      }}
    />
  );

  return (
    <PageLayout>
      <div className={styles.headerContainer}>
        <div className={styles.assetTitleContainer}>
          <Button color="white" isText onClick={() => router.back()}>
            <img src="/icons/arrow-left.svg" />
          </Button>
          <h1>{id.toUpperCase()} balance </h1>
        </div>
        {/* <div style={{ display: "flex" }}>
          <div style={{ marginRight: 16 }}>
            <Button
              color="white"
              onClick={() => {
                assetCoinStat.refetch();
                assetTradeStat.refetch();
                assetTransactionStat.refetch();
              }}
            >
              Refresh
            </Button>
          </div>
        </div> */}
      </div>

      <div className={styles.assetsBody}>
        <div className={styles.divider} />

        <div className={styles.balanceItems}>
          <div className={styles.balanceItem}>
            <div style={{ width: "100%" }}>
              <p className={styles.balanceTitle}>Total bitcoin</p>
              {assetCoinStat.isLoading || assetCoinStat.isFetching ? (
                renderSkeleton()
              ) : (
                <p className={styles.balanceAmount}>
                  {assetCoinStat?.data?.data?.data?.totalCrypto?.crypto?.toFixed(
                    8
                  )}{" "}
                  {id.toUpperCase()}
                </p>
              )}
              {assetCoinStat.isLoading || assetCoinStat.isFetching ? (
                renderSkeleton()
              ) : (
                <div className={styles.balanceAmount}>
                  <p>
                    ${" "}
                    {assetCoinStat?.data?.data?.data?.totalCrypto?.usd?.toFixed(
                      2
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className={styles.balanceItem}>
            <div>
              <p className={styles.balanceTitle}>Users balance</p>
              {assetCoinStat.isLoading || assetCoinStat.isFetching ? (
                renderSkeleton()
              ) : (
                <p className={styles.balanceAmount}>
                  {assetCoinStat?.data?.data?.data?.usersBalance?.crypto?.toFixed(
                    8
                  )}{" "}
                  {id.toUpperCase()}
                </p>
              )}
              {assetCoinStat.isLoading || assetCoinStat.isFetching ? (
                renderSkeleton()
              ) : (
                <div className={styles.balanceAmount}>
                  <p>
                    $
                    {assetCoinStat?.data?.data?.data?.usersBalance?.usd?.toFixed(
                      2
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className={styles.balanceItem}>
            <div>
              <p className={styles.balanceTitle}>Our balance</p>
              {assetCoinStat.isLoading || assetCoinStat.isFetching ? (
                renderSkeleton()
              ) : (
                <p className={styles.balanceAmount}>
                  {assetCoinStat?.data?.data?.data?.platformBalance?.crypto?.toFixed(
                    8
                  )}{" "}
                  {id.toUpperCase()}
                </p>
              )}
              {assetCoinStat.isLoading || assetCoinStat.isFetching ? (
                renderSkeleton()
              ) : (
                <div className={styles.balanceAmount}>
                  <p>
                    $
                    {assetCoinStat?.data?.data?.data?.platformBalance?.usd?.toFixed(
                      2
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className={styles.balanceItem}>
            <div>
              <p className={styles.balanceTitle}>External wallet</p>
              {assetCoinStat.isLoading || assetCoinStat.isFetching ? (
                renderSkeleton()
              ) : (
                <p className={styles.balanceAmount}>
                  {assetCoinStat?.data?.data?.data?.external?.crypto?.toFixed(
                    8
                  )}{" "}
                  {id.toUpperCase()}
                </p>
              )}
              {assetCoinStat.isLoading || assetCoinStat.isFetching ? (
                renderSkeleton()
              ) : (
                <div className={styles.balanceAmount}>
                  <p>
                    $
                    {assetCoinStat?.data?.data?.data?.external?.usd?.toFixed(2)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.tradesTitle}>
            <div className={styles.tradesTextContainer}>
              <h3>{id.toUpperCase()} Trades</h3>
            </div>
            <Radio.Group
              onChange={(e: any) => setFilter(e.target.value)}
              value={filter}
              buttonStyle="solid"
              size="large"
            >
              <Radio.Button value="month">30d</Radio.Button>
              <Radio.Button value="week">7d</Radio.Button>
              <Radio.Button value="day">24h</Radio.Button>
            </Radio.Group>
            {/* <div className={styles.filterDays}>
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
                </div> */}
          </div>
          <div className={styles.border} />

          <div className={styles.blankDivider} />

          {assetTradeStat?.isLoading || assetTradeStat?.isFetching ? (
            <Skeleton active />
          ) : (
            <div className={styles.tradesCharts}>
              <div style={{ width: "100%" }}>
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
                        {assetTradeStat?.data?.data?.data?.totalBuy?.crypto?.toFixed(
                          8
                        )}{" "}
                        {id.toUpperCase()}
                      </h3>
                      <div className={styles.balanceFooter}>
                        <p>
                          $
                          {assetTradeStat?.data?.data?.data?.totalBuy?.usd?.toFixed(
                            2
                          )}
                        </p>
                        <div
                          className={styles.verticalDivider}
                          style={{ margin: "0 10px" }}
                        />
                        <p>
                          ~GHC{" "}
                          {assetTradeStat?.data?.data?.data?.totalBuy?.local}
                        </p>
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
                        {assetTradeStat?.data?.data?.data?.totalSell?.crypto?.toFixed(
                          8
                        )}{" "}
                        {id.toUpperCase()}
                      </h3>
                      <div className={styles.balanceFooter}>
                        <p>
                          $
                          {assetTradeStat?.data?.data?.data?.totalSell?.usd?.toFixed(
                            2
                          )}
                        </p>
                        <div
                          className={styles.verticalDivider}
                          style={{ margin: "0 10px" }}
                        />
                        <p>
                          ~GHC{" "}
                          {assetTradeStat?.data?.data?.data?.totalSell?.local}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ height: 300 }}>
                  <CustomAreaChart data={graphsItem} />
                </div>
              </div>
            </div>
          )}
        </div>
        <div
          className={styles.container}
          style={{ marginTop: 24, marginBottom: 24 }}
        >
          <div className={styles.tradesTitle}>
            <div className={styles.tradesTextContainer}>
              <h3>Bitcoin Transactions</h3>
            </div>
            {/* <div className={styles.filterDays}>
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
            </div> */}
            <Radio.Group
              onChange={(e: any) => setTransactionFilter(e.target.value)}
              value={transactionFilter}
              buttonStyle="solid"
              size="large"
            >
              <Radio.Button value="month">30d</Radio.Button>
              <Radio.Button value="week">7d</Radio.Button>
              <Radio.Button value="day">24h</Radio.Button>
            </Radio.Group>
          </div>
          <div className={styles.border} />
          <div style={{ backgroundColor: "white" }}>
            {assetTransactionStat?.isLoading ||
            assetTransactionStat?.isFetching ? (
              <Skeleton active style={{ marginTop: 20 }} />
            ) : (
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
                      {
                        assetTransactionStat?.data?.data?.data?.totalSent
                          ?.crypto
                      }{" "}
                      {id.toUpperCase()}
                    </h3>
                    <div className={styles.balanceFooter}>
                      <p>
                        $
                        {assetTransactionStat?.data?.data?.data?.totalSent?.usd?.toFixed(
                          2
                        )}
                      </p>
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
                      {
                        assetTransactionStat?.data?.data?.data?.totalReceived
                          ?.crypto
                      }{" "}
                      {id.toUpperCase()}
                    </h3>
                    <div className={styles.balanceFooter}>
                      <p>
                        $
                        {assetTransactionStat?.data?.data?.data?.totalReceived?.usd?.toFixed(
                          2
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  return {
    props: {
      id: id ? id.toString().toLowerCase() : "",
    },
  };
};

export default AssetsDetail;
