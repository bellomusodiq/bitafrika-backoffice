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
import { Radio } from "antd";
import useCustomQuery from "@/hooks/useCustomQuery";

interface IProps {
  id: string;
}

const AssetsDetail = ({ id }: IProps) => {
  const router = useRouter();
  // const assetCode: string = String(router.query.id);
  // const assetCodeLower = assetCode?.toLowerCase();

  const [filter, setFilter] = useState<string>("month");
  // const [loading, setLoading] = useState<boolean>(false);
  // const [asset, setAsset] = useState<any>({});

  let auth: any = {};
  if (typeof window !== "undefined" && localStorage.getItem("auth")) {
    auth = JSON.parse(localStorage.getItem("auth") || "");
  }

  const {
    isLoading,
    isFetching,
    data: { data: result } = {},
    refetch,
  } = useCustomQuery({
    queryKey: ["asset", id],
    enabled: id.length > 0,
    queryFn: async () => {
      const result = await axios.post(
        `${BASE_URL}/overview/coins-stats`,
        { type: filter, currency: id },
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      );
      return result;
    },
  });

  // const getAsset = () => {
  //   setLoading(true);
  //   axios
  //     .post(
  //       `${BASE_URL}/overview/coins-stats`,
  //       { type: filter, currency: assetCodeLower },
  //       {
  //         headers: {
  //           Authorization: auth.accessToken,
  //         },
  //       }
  //     )
  //     .then((res: any) => {
  //       setLoading(false);
  //       if (res.data.success) {
  //         setAsset(res.data.data);
  //       } else {
  //         localStorage.removeItem("auth");
  //         router.replace("/", "/");
  //       }
  //     })
  //     .catch((err) => {
  //       if (err.response.status === 401) {
  //         localStorage.removeItem("auth");
  //         router.replace("/", "/");
  //       }
  //     });
  // };

  // useEffect(() => {
  //   if (assetCodeLower !== "undefined") {
  //     getAsset();
  //   }
  // }, [filter, router.query]);

  const graphsItem = useMemo(() => {
    const tempAsset = result?.data || {};
    const formatData =
      tempAsset?.trades?.chart?.options?.xAxis?.categories?.map(
        (item: any, i: number) => ({
          name: item,
          x: item,
          sell: tempAsset?.trades?.chart?.series[0].data[i],
          buy: tempAsset?.trades?.chart?.series[1].data[i],
        })
      );
    return formatData;
  }, [result]);

  const pieChartData = [
    {
      value: result?.data?.trades?.totalBuy?.usd + 0.000001,
      color: "red",
    },
    {
      value: result?.data?.trades?.totalSell?.usd + 0.000001,
      color: "blue",
    },
    {
      value: result?.data?.transactions?.totalReceived?.usd + 0.000001,
      color: "green",
    },
    {
      value: result?.data?.transactions?.totalSent?.usd + 0.000001,
      color: "yellow",
    },
  ];

  return (
    <PageLayout>
      {isLoading || isFetching ? (
        <div style={{ marginTop: 60 }}>
          <Loader />
        </div>
      ) : (
        <>
          <div className={styles.headerContainer}>
            <div className={styles.assetTitleContainer}>
              <Button color="white" isText onClick={() => router.back()}>
                <img src="/icons/arrow-left.svg" />
              </Button>
              <h1>{id.toUpperCase()} balance </h1>
              {/* <span>${asset.overview?.totalCrypto?.usd?.toFixed(2)}</span> */}
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ marginRight: 16 }}>
                <Button color="white" onClick={refetch}>
                  Refresh
                </Button>
              </div>
            </div>
          </div>

          <div className={styles.assetsBody}>
            <div className={styles.divider} />

            <div className={styles.balanceItems}>
              <div className={styles.balanceItem}>
                <div>
                  <p className={styles.balanceTitle}>Total bitcoin</p>
                  <p className={styles.balanceAmount}>
                    {result?.data.overview?.totalCrypto?.crypto}{" "}
                    {id.toUpperCase()}
                  </p>
                  <div className={styles.balanceAmount}>
                    <p>
                      ${result?.data.overview?.totalCrypto?.usd?.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.balanceItem}>
                <div>
                  <p className={styles.balanceTitle}>Users balance</p>
                  <p className={styles.balanceAmount}>
                    {result?.data.overview?.usersBalance?.crypto?.toFixed(8)}{" "}
                    {id.toUpperCase()}
                  </p>
                  <div className={styles.balanceAmount}>
                    <p>
                      ${result?.data.overview?.usersBalance?.usd?.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.balanceItem}>
                <div>
                  <p className={styles.balanceTitle}>Our balance</p>
                  <p className={styles.balanceAmount}>
                    {result?.data.overview?.platformBalance?.crypto?.toFixed(8)}{" "}
                    {id.toUpperCase()}
                  </p>
                  <div className={styles.balanceAmount}>
                    <p>
                      ${result?.data.overview?.platformBalance?.usd?.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.balanceItem}>
                <div>
                  <p className={styles.balanceTitle}>External wallet</p>
                  <p className={styles.balanceAmount}>
                    {result?.data.overview?.external?.crypto?.toFixed(8)}{" "}
                    {id.toUpperCase()}
                  </p>
                  <div className={styles.balanceAmount}>
                    <p>${result?.data.overview?.external?.usd?.toFixed(2)}</p>
                  </div>
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
                          {result?.data?.trades?.totalBuy?.crypto?.toFixed(8)}{" "}
                          {id.toUpperCase()}
                        </h3>
                        <div className={styles.balanceFooter}>
                          <p>
                            ${result?.data?.trades?.totalBuy?.usd?.toFixed(2)}
                          </p>
                          <div
                            className={styles.verticalDivider}
                            style={{ margin: "0 10px" }}
                          />
                          <p>~GHC {result?.data?.trades?.totalBuy?.local}</p>
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
                          {result?.data?.trades?.totalSell?.crypto?.toFixed(8)}{" "}
                          {id.toUpperCase()}
                        </h3>
                        <div className={styles.balanceFooter}>
                          <p>
                            ${result?.data?.trades?.totalSell?.usd?.toFixed(2)}
                          </p>
                          <div
                            className={styles.verticalDivider}
                            style={{ margin: "0 10px" }}
                          />
                          <p>~GHC {result?.data?.trades?.totalSell?.local}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ height: 300 }}>
                    <CustomAreaChart data={graphsItem} />
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
                        {result?.data?.transactions?.totalSent?.crypto}{" "}
                        {id.toUpperCase()}
                      </h3>
                      <div className={styles.balanceFooter}>
                        <p>
                          $
                          {result?.data?.transactions?.totalSent?.usd?.toFixed(
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
                        {result?.data?.transactions?.totalReceived?.crypto}{" "}
                        {id.toUpperCase()}
                      </h3>
                      <div className={styles.balanceFooter}>
                        <p>
                          $
                          {result?.data?.transactions?.totalReceived?.usd?.toFixed(
                            2
                          )}
                        </p>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  return {
    props: {
      id: id ? id.toString().toLowerCase() : "",
    },
  };
};

export default AssetsDetail;
