import React, { useState } from "react";

import PageLayout from "@/components/PageLayout";
import styles from "@/pages/reports/transactions.module.css";
import NavigationStep from "@/components/NavigationStep";
import Button from "@/components/Button";
import { DatePicker, Table } from "antd";
import Modal from "@/components/Modal";
import axios from "axios";
import { BASE_URL } from "@/CONFIG";
import getToken from "@/utils/getToken";
import Dropdown from "@/components/Dropdown";
import CustomPieChart from "@/components/Charts/PieChart";
import formatDate from "@/utils/formatDate";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";

const TOKEN_TO_COLOR: { [k: string]: string } = {
  USDT: "#008F39",
  BTC: "#AEA04B",
  LTC: "#6C4675",
  TRX: "#9D9101",
  DOGE: "#7FB5B5",
  BCH: "#D84B20",
  USDC: "#5D9B9B",
  BNB: "#B5B8B1",
  ETH: "#E4A010",
  MATIC: "#2271B3",
  BSC: "#9E9764",
};

export default function Search() {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>({});
  console.log(data?.orders);

  const [currentUser, setCurrentUser] = useState<any>({});
  const [searchType, setSearchType] = useState<string>("Buy");
  const [coin, setCoin] = useState<string>("BTC");
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [status, setStatus] = useState<string>("success");

  let auth: any = {};
  if (typeof window !== "undefined" && localStorage.getItem("auth")) {
    auth = JSON.parse(localStorage.getItem("auth") || "");
  }

  const showModal = (user: any) => {
    setCurrentUser(user);
    setOpenModal(true);
  };

  const searchBuyReports = () => {
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/reports/transactions/buy?from=${fromDate}&to=${toDate}&status=${status}`,
        {},
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res: any) => {
        setLoading(false);
        setData(res.data.data);
      })
      .catch((e) => {
        if (e.response.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
      });
  };

  const searchSellReports = () => {
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/reports/transactions/sell?from=${fromDate}&to=${toDate}&status=${status}`,
        {},
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res: any) => {
        setLoading(false);
        setData(res.data.data);
      })
      .catch((e) => {
        if (e.response.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
      });
  };

  const searchSendReports = () => {
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/reports/transactions/send?from=${fromDate}&to=${toDate}&status=${status}`,
        {},
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res: any) => {
        setLoading(false);
        setData(res.data.data);
      })
      .catch((e) => {
        if (e.response.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
      });
  };

  const searchReceiveReports = () => {
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/reports/transactions/receive?from=${fromDate}&to=${toDate}&status=${status}`,
        {},
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res: any) => {
        setLoading(false);
        setData(res.data.data);
      })
      .catch((e) => {
        if (e.response.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
      });
  };

  const searchBuyAndSellReports = () => {
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/reports/transactions/buy-and-sell?from=${fromDate}&to=${toDate}&status=${status}`,
        {},
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res: any) => {
        setLoading(false);
        setData(res.data.data);
      })
      .catch((e) => {
        if (e.response.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
      });
  };

  const onSearch = () => {
    switch (searchType) {
      case "Buy":
        searchBuyReports();
        break;
      case "Sell":
        searchSellReports();
        break;
      case "Buy and Sell":
        searchBuyAndSellReports();
        break;
      case "Send":
        searchSendReports();
        break;
      case "Receive":
        searchReceiveReports();
        break;
    }
  };

  const buyTotalAmount = data?.buy?.totalAmount;
  const sellTotalAmount = data?.sell?.totalAmount;

  return (
    <PageLayout title="Hone">
      <div className={styles.container}>
        <p className={styles.filterTitle}>Filter transaction reports by</p>
        <div className={styles.searchContainer}>
          <div className={styles.searchCard}>
            <div className={styles.dropdownContainer}>
              <p className={styles.dropdownTitle}>Transaction type</p>
              <Dropdown
                value={searchType}
                options={[
                  { title: "Buy transactions", value: "Buy" },
                  { title: "Sell transactions", value: "Sell" },
                  { title: "Buy and Sell transactions", value: "Buy and Sell" },
                  { title: "Send transactions", value: "Send" },
                  { title: "Received transactions", value: "Receive" },
                ]}
                onChange={(value) => {
                  setSearchType(String(value));
                  setData({});
                }}
              />
            </div>
            <div className={styles.dropdownContainer}>
              <p className={styles.dropdownTitle}>Date range</p>
              <DatePicker.RangePicker
                style={{ height: 48 }}
                onChange={(values: any) => {
                  setFromDate(formatDate(values[0].$d));
                  setToDate(formatDate(values[1].$d));
                }}
              />
            </div>
            <div className={styles.dropdownContainer}>
              <p className={styles.dropdownTitle}>Status</p>
              <Dropdown
                value={status}
                options={[
                  { title: "Successful", value: "success" },
                  { title: "Pending", value: "pending" },
                  { title: "Failed", value: "failed" },
                ]}
                onChange={(value) => {
                  setStatus(String(value));
                  setData({});
                }}
              />
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <div>
                <Button onClick={onSearch} className={styles.searchButton}>
                  Apply filter
                </Button>
              </div>
            </div>
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : (
          Object.keys(data).length > 0 && (
            <>
              {data && searchType === "Buy" && (
                <div className={styles.bodyContainer}>
                  <h3 className={styles.header}>Buy transactions report</h3>
                  <p className={styles.date}>
                    Date: {fromDate} — {toDate}
                  </p>
                  <p className={styles.date}>
                    Status:{" "}
                    <span
                      style={{
                        padding: "2px 12px 4px 12px",
                        borderRadius: 16,
                        backgroundColor:
                          status === "success"
                            ? "#EDFCF2"
                            : status === "pending"
                            ? "#f7900953"
                            : "#FBEAE9",
                        color:
                          status === "success"
                            ? "#087443"
                            : status === "pending"
                            ? "#F79009"
                            : "#F04438",
                        textAlign: "center",
                      }}
                    >
                      <span style={{ fontSize: 12 }}>{status}</span>
                    </span>
                  </p>

                  <h3 style={{ marginTop: 14 }} className={styles.header}>
                    Buy orders
                  </h3>
                  {data?.orders?.length === 0 && <p>No Report found</p>}
                  <div className={styles.ordersContainer}>
                    <div style={{ flex: 1 }}>
                      {data?.orders?.map((order: any) => (
                        <div className={styles.order} key={order.coin}>
                          <div
                            className={styles.orderIcon}
                            style={{
                              backgroundColor: TOKEN_TO_COLOR[order.coin],
                            }}
                          />
                          <p className={styles.orderText}>
                            <span>{order.coin}</span>{" "}
                            <span> {order.count} orders</span>
                            <span className={styles.grey}>
                              {order.usdTotal} USD
                            </span>
                          </p>
                        </div>
                      ))}
                    </div>
                    <div
                      style={{
                        width: "50%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ width: 200, height: 200 }}>
                        <CustomPieChart
                          data={data?.orders?.map((order: any) => ({
                            value: order.usdTotal,
                            color: TOKEN_TO_COLOR[order.coin],
                          }))}
                        />
                      </div>
                      <div className={styles.pieIndicators}>
                        {data?.orders?.map((order: any) => (
                          <div key={order.coin} className={styles.pieIndicator}>
                            <div
                              style={{
                                backgroundColor: TOKEN_TO_COLOR[order.coin],
                              }}
                            />{" "}
                            {(
                              (order.amountTotal * 100) /
                              (data.totalAmount + 0.000001)
                            ).toFixed(2)}
                            %
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div
                    className={styles.divider}
                    style={{ margin: "24px 0" }}
                  />
                  <div className={styles.totalHeader}>
                    <p>Total buy orders: {data?.totalCount}</p>
                    <a href="#">View orders</a>
                  </div>
                  <div className={styles.footerHeaderContainer}>
                    <p>TOTAL AMOUNT</p>
                    <p>TOTAL FEES</p>
                    <p>GRAND TOTAL</p>
                  </div>
                  <div className={styles.divider} style={{ marginTop: 5 }} />
                  <div className={styles.totalContainer}>
                    <p>GHS {data?.totalAmount} ($100000.00)</p>
                    <p>GHS {data?.totalFees} ($1000.00)</p>
                    <p style={{ color: "#1570EF" }}>
                      GHS {data?.grandTotal} ($101000.00)
                    </p>
                  </div>
                </div>
              )}
              {data && searchType === "Sell" && (
                <div className={styles.bodyContainer}>
                  <p className={styles.header}>Sell transactions report</p>
                  <p className={styles.date}>
                    Date: {fromDate} — {toDate}
                  </p>
                  <p className={styles.date}>
                    Status:{" "}
                    <span
                      style={{
                        padding: "2px 12px 4px 12px",
                        borderRadius: 16,
                        backgroundColor:
                          status === "success"
                            ? "#EDFCF2"
                            : status === "pending"
                            ? "#f7900953"
                            : "#FBEAE9",
                        color:
                          status === "success"
                            ? "#087443"
                            : status === "pending"
                            ? "#F79009"
                            : "#F04438",
                        textAlign: "center",
                      }}
                    >
                      <span style={{ fontSize: 12 }}>{status}</span>
                    </span>
                  </p>

                  <p className={styles.header}>Sell orders</p>
                  {data?.orders?.length === 0 && <p>No report found</p>}
                  <div className={styles.ordersContainer}>
                    <div style={{ flex: 1 }}>
                      {data?.orders?.map((order: any) => (
                        <div className={styles.order} key={order.coin}>
                          <div
                            className={styles.orderIcon}
                            style={{
                              backgroundColor: TOKEN_TO_COLOR[order.coin],
                            }}
                          />
                          <p className={styles.orderText}>
                            <span>{order.coin}</span>{" "}
                            <span> {order.count} orders</span>
                            <span className={styles.grey}>
                              {order.usdTotal} USD
                            </span>
                          </p>
                        </div>
                      ))}
                    </div>
                    <div
                      style={{
                        width: "50%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ width: 200, height: 200 }}>
                        <CustomPieChart
                          data={data?.orders?.map((order: any) => ({
                            value: order.usdTotal,
                            color: TOKEN_TO_COLOR[order.coin],
                          }))}
                        />
                      </div>
                      <div className={styles.pieIndicators}>
                        {data?.orders?.map((order: any) => (
                          <div key={order.coin} className={styles.pieIndicator}>
                            <div
                              style={{
                                backgroundColor: TOKEN_TO_COLOR[order.coin],
                              }}
                            />{" "}
                            {(
                              (order.amountTotal * 100) /
                              (data.totalAmount + 0.000001)
                            ).toFixed(2)}
                            %
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div
                    className={styles.divider}
                    style={{ margin: "24px 0" }}
                  />
                  <div className={styles.totalHeader}>
                    <p>Total sell orders: {data.totalCount}</p>
                    <a href="#">View orders</a>
                  </div>
                  <div className={styles.footerHeaderContainer}>
                    <p>TOTAL AMOUNT</p>
                    <p>TOTAL FEES</p>
                    <p>GRAND TOTAL</p>
                  </div>
                  <div className={styles.divider} style={{ marginTop: 5 }} />
                  <div className={styles.totalContainer}>
                    <p>GHS {data.totalAmount} ($10,000.00)</p>
                    <p>GHS {data.totalFees} ($1,000.00)</p>
                    <p style={{ color: "#1570EF" }}>
                      GHS {data.grandTotal} ($11,000.00)
                    </p>
                  </div>
                </div>
              )}
              {data && searchType === "Buy and Sell" && (
                <>
                  <div className={styles.bodyContainer}>
                    <p className={styles.header}>
                      Buy and Sell transactions report
                    </p>
                    <p className={styles.date}>
                      Date: {fromDate} — {toDate}
                    </p>
                    <p className={styles.date}>
                      Status:{" "}
                      <span
                        style={{
                          padding: "2px 12px 4px 12px",
                          borderRadius: 16,
                          backgroundColor:
                            status === "success"
                              ? "#EDFCF2"
                              : status === "pending"
                              ? "#f7900953"
                              : "#FBEAE9",
                          color:
                            status === "success"
                              ? "#087443"
                              : status === "pending"
                              ? "#F79009"
                              : "#F04438",
                          textAlign: "center",
                        }}
                      >
                        <span style={{ fontSize: 12 }}>{status}</span>
                      </span>
                    </p>

                    <div className={styles.buySellOrders}>
                      <div
                        className={styles.ordersContainer2}
                        style={{ paddingRight: 48 }}
                      >
                        <p className={styles.header}>Buy orders</p>
                        {data?.buy?.orders?.length === 0 && (
                          <p>No report found</p>
                        )}
                        <div style={{ flex: 1 }}>
                          {data?.buy?.orders?.map((order: any) => (
                            <div
                              key={order.coin}
                              className={styles.buySellOrdersChild}
                            >
                              <div className={styles.order}>
                                <div
                                  className={styles.orderIcon}
                                  style={{
                                    backgroundColor: TOKEN_TO_COLOR[order.coin],
                                  }}
                                />
                                <p className={styles.orderText}>
                                  <span>{order.coin}</span>{" "}
                                  <span>{order.count} orders</span>{" "}
                                  <span className={styles.grey}>
                                    {order.usdTotal} USD
                                  </span>
                                </p>
                              </div>
                            </div>
                          ))}
                          <div
                            style={{
                              width: "50%",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <div style={{ width: 200, height: 200 }}>
                              <CustomPieChart
                                data={data?.buy?.orders?.map((order: any) => ({
                                  value: order.usdTotal,
                                  color: TOKEN_TO_COLOR[order.coin],
                                }))}
                              />
                            </div>
                            <div className={styles.pieIndicators}>
                              {data?.buy?.orders?.map((order: any) => (
                                <div
                                  key={order.coin}
                                  className={styles.pieIndicator}
                                >
                                  <div
                                    style={{
                                      backgroundColor:
                                        TOKEN_TO_COLOR[order.coin],
                                    }}
                                  />{" "}
                                  {(
                                    (order.usdTotal * 100) /
                                    buyTotalAmount
                                  ).toFixed(2)}
                                  %
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div
                          className={styles.divider}
                          style={{ margin: "24px 0" }}
                        />
                        <div className={styles.totalHeader}>
                          <p>Total buy orders: {data?.buy?.totalCount}</p>
                          <a href="#">View orders</a>
                        </div>
                        <div className={styles.footerHeaderContainer}>
                          <p>TOTAL AMOUNT</p>
                          <p>TOTAL FEES</p>
                          <p>GRAND TOTAL</p>
                        </div>
                        <div
                          className={styles.divider}
                          style={{ marginTop: 5 }}
                        />
                        <div className={styles.totalContainer}>
                          <p style={{ fontSize: 14 }}>
                            GHS {data?.buy?.totalAmount} ($10,000)
                          </p>
                          <p style={{ fontSize: 14 }}>
                            GHS {data?.buy?.totalFees} ($100)
                          </p>
                          <p style={{ color: "#1570EF", fontSize: 14 }}>
                            GHS {data?.buy?.grandTotal} ($10,100)
                          </p>
                        </div>
                      </div>
                      <div className={styles.verticalDivider} />
                      <div
                        className={styles.ordersContainer2}
                        style={{ paddingLeft: 48 }}
                      >
                        <p className={styles.header}>Sell orders</p>
                        {data?.sell?.orders?.length === 0 && (
                          <p>No report found</p>
                        )}
                        <div style={{ flex: 1 }}>
                          <div className={styles.buySellOrdersChild}>
                            {data?.sell?.orders?.map((order: any) => (
                              <div
                                key={order.coin}
                                className={styles.buySellOrdersChild}
                              >
                                <div className={styles.order}>
                                  <div
                                    className={styles.orderIcon}
                                    style={{
                                      backgroundColor:
                                        TOKEN_TO_COLOR[order.coin],
                                    }}
                                  />
                                  <p className={styles.orderText}>
                                    <span>{order.coin}</span>{" "}
                                    <span>{order.count} orders</span>{" "}
                                    <span className={styles.grey}>
                                      {order.usdTotal} USD
                                    </span>
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div
                            style={{
                              width: "50%",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <div style={{ width: 200, height: 200 }}>
                              <CustomPieChart
                                data={data?.sell?.orders?.map((order: any) => ({
                                  value: order.usdTotal,
                                  color: TOKEN_TO_COLOR[order.coin],
                                }))}
                              />
                            </div>
                            <div className={styles.pieIndicators}>
                              {data?.sell?.orders?.map((order: any) => (
                                <div
                                  key={order.coin}
                                  className={styles.pieIndicator}
                                >
                                  <div
                                    style={{
                                      backgroundColor:
                                        TOKEN_TO_COLOR[order.coin],
                                    }}
                                  />{" "}
                                  {(
                                    (order.usdTotal * 100) /
                                    sellTotalAmount
                                  ).toFixed(2)}
                                  %
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div
                          className={styles.divider}
                          style={{ margin: "24px 0" }}
                        />
                        <div className={styles.totalHeader2}>
                          <p>Total sell orders: 7000</p>
                          <a href="#">View orders</a>
                        </div>
                        <div className={styles.footerHeaderContainer2}>
                          <p>TOTAL AMOUNT</p>
                          <p>TOTAL FEES</p>
                          <p>GRAND TOTAL</p>
                        </div>
                        <div
                          className={styles.divider}
                          style={{ marginTop: 5 }}
                        />
                        <div className={styles.totalContainer}>
                          <p style={{ fontSize: 14 }}>
                            GHS {data?.sell?.totalAmount} ($10,000)
                          </p>
                          <p style={{ fontSize: 14 }}>
                            GHS {data?.sell?.totalFees} ($100)
                          </p>
                          <p style={{ fontSize: 14, color: "#1570EF" }}>
                            GHS {data?.sell?.grandTotal} ($10,100)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.bodyContainer}>
                    <div className={styles.totalProfitHeader}>
                      <p>
                        Total profit{" "}
                        <span>(Buy grand total - Sell grand total)</span>
                      </p>
                      <div className={styles.downloadButton}>
                        <Button>Download report</Button>
                      </div>
                    </div>
                    <p className={styles.profitText}>
                      110,000 120,000 ={" "}
                      <span style={{ color: "#1570EF" }}>440</span>
                    </p>
                    <div className={styles.divider} />
                    <p className={styles.profitBreakdown}>
                      Total profit breakdown
                    </p>
                    <p className={styles.fees}>
                      Fees: <span>60</span>
                    </p>
                    <p className={styles.fees}>
                      Rate difference: <span>440-60 = 380 </span>
                    </p>
                  </div>
                </>
              )}
              {data && searchType === "Send" && (
                <div className={styles.bodyContainer}>
                  <p className={styles.header}>Send transactions report</p>
                  <p className={styles.date}>
                    Date: {fromDate} — {toDate}
                  </p>
                  <p className={styles.date}>
                    Status:{" "}
                    <span
                      style={{
                        padding: "2px 12px 4px 12px",
                        borderRadius: 16,
                        backgroundColor:
                          status === "success"
                            ? "#EDFCF2"
                            : status === "pending"
                            ? "#f7900953"
                            : "#FBEAE9",
                        color:
                          status === "success"
                            ? "#087443"
                            : status === "pending"
                            ? "#F79009"
                            : "#F04438",
                        textAlign: "center",
                      }}
                    >
                      <span style={{ fontSize: 12 }}>{status}</span>
                    </span>
                  </p>

                  <p className={styles.header}>Send transactions</p>
                  <div className={styles.ordersContainer}>
                    <div style={{ flex: 1 }}>
                      {data?.orders?.map((order: any) => (
                        <div className={styles.order} key={order.coin}>
                          <div
                            className={styles.orderIcon}
                            style={{
                              backgroundColor: TOKEN_TO_COLOR[order.coin],
                            }}
                          />
                          <p className={styles.orderText1}>
                            <span>{order.coin}</span>{" "}
                            <span>{order.count} trnx</span>{" "}
                            <span className={styles.grey}>
                              {" "}
                              {order.cryptoTotal} {order.coin}
                            </span>{" "}
                            <span className={styles.grey}>
                              {order.usdTotal} USD
                            </span>
                          </p>
                        </div>
                      ))}
                    </div>
                    <div
                      style={{
                        width: "50%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ width: 200, height: 200 }}>
                        <CustomPieChart
                          data={data?.orders?.map((order: any) => ({
                            value: order.usdTotal,
                            color: TOKEN_TO_COLOR[order.coin],
                          }))}
                        />
                      </div>
                      <div className={styles.pieIndicators}>
                        {data?.orders?.map((order: any) => (
                          <div key={order.coin} className={styles.pieIndicator}>
                            <div
                              style={{
                                backgroundColor: TOKEN_TO_COLOR[order.coin],
                              }}
                            />{" "}
                            {(
                              (order.amountTotal * 100) /
                              (data.totalAmount + 0.000001)
                            ).toFixed(2)}
                            %
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div
                    className={styles.divider}
                    style={{ margin: "24px 0" }}
                  />
                  <div className={styles.totalHeader}>
                    <p>Total send transactions: {data.totalCount}</p>
                    <a href="#">View transactions</a>
                  </div>
                </div>
              )}
              {data && searchType === "Receive" && (
                <div className={styles.bodyContainer}>
                  <p className={styles.header}>Received transactions report</p>
                  <p className={styles.date}>
                    Date: {fromDate} — {toDate}
                  </p>
                  <p className={styles.date}>
                    Status:{" "}
                    <span
                      style={{
                        padding: "2px 12px 4px 12px",
                        borderRadius: 16,
                        backgroundColor:
                          status === "success"
                            ? "#EDFCF2"
                            : status === "pending"
                            ? "#f7900953"
                            : "#FBEAE9",
                        color:
                          status === "success"
                            ? "#087443"
                            : status === "pending"
                            ? "#F79009"
                            : "#F04438",
                        textAlign: "center",
                      }}
                    >
                      <span style={{ fontSize: 12 }}>{status}</span>
                    </span>
                  </p>

                  <p className={styles.header}>Received transactions</p>
                  <div className={styles.ordersContainer}>
                    <div style={{ flex: 1 }}>
                      {data?.orders?.map((order: any) => (
                        <div className={styles.order} key={order.coin}>
                          <div
                            className={styles.orderIcon}
                            style={{
                              backgroundColor: TOKEN_TO_COLOR[order.coin],
                            }}
                          />
                          <p className={styles.orderText1}>
                            <span>{order.coin}</span>{" "}
                            <span>{order.cryptoTotal} trnx</span>{" "}
                            <span className={styles.grey}>
                              {" "}
                              {order.cryptoTotal} {order.coin}
                            </span>{" "}
                            <span className={styles.grey}>
                              {order.usdTotal} USD
                            </span>
                          </p>
                        </div>
                      ))}
                    </div>
                    <div
                      style={{
                        width: "50%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ width: 200, height: 200 }}>
                        <CustomPieChart
                          data={data?.orders?.map((order: any) => ({
                            value: order.usdTotal,
                            color: TOKEN_TO_COLOR[order.coin],
                          }))}
                        />
                      </div>
                      <div className={styles.pieIndicators}>
                        {data?.orders?.map((order: any) => (
                          <div key={order.coin} className={styles.pieIndicator}>
                            <div
                              style={{
                                backgroundColor: TOKEN_TO_COLOR[order.coin],
                              }}
                            />{" "}
                            {(
                              (order.amountTotal * 100) /
                              (data.totalAmount + 0.000001)
                            ).toFixed(2)}
                            %
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div
                    className={styles.divider}
                    style={{ margin: "24px 0" }}
                  />
                  <div className={styles.totalHeader}>
                    <p>Total recived transactions: {data.totalCount}</p>
                    <a href="#">View transactions</a>
                  </div>
                </div>
              )}
            </>
          )
        )}
      </div>
    </PageLayout>
  );
}
