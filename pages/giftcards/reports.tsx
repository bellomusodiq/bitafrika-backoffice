import React, { useEffect, useMemo, useState } from "react";

import PageLayout from "@/components/PageLayout";
import styles from "@/pages/reports/users.module.css";
import NavigationStep from "@/components/NavigationStep";
import Button from "@/components/Button";
import {
  DatePicker,
  Divider,
  Skeleton,
  Table,
  Tag,
  Button as AntdButton,
} from "antd";
import Modal from "@/components/Modal";
import Dropdown from "@/components/Dropdown";
import CustomPieChart from "@/components/Charts/PieChart";
import { BASE_URL } from "@/CONFIG";
import axios from "axios";
import formatDate from "@/utils/formatDate";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";
import Pagination from "@/components/Pagination";
import Link from "next/link";
import useCustomQuery from "@/hooks/useCustomQuery";

export default function Search() {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [openModal, setOpenModal] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>({
    orders: [
      { name: "Apple", count: 1001, usdTotal: 10000.0 },
      { name: "Google play", count: 1001, usdTotal: 10000.0 },
      { name: "Mifinity evoucher", count: 1001, usdTotal: 10000.0 },
      { name: "Sephora", count: 1001, usdTotal: 10000.0 },
      { name: "Steam card", count: 1001, usdTotal: 10000.0 },
      { name: "Mastercard prepaid", count: 1001, usdTotal: 10000.0 },
    ],
    totalAmount: 1000000,
    totalCount: 200,
    totalFees: 0,
    grandTotal: 1000000,
  });
  const [currentUser, setCurrentUser] = useState<any>({});
  const [searchType, setSearchType] = useState<string>("Balance");
  const [sort, setSort] = useState<string>("highest");
  const [currentPage, setCurrentPage] = useState<number | null>(1);
  const [coin, setCoin] = useState<string>("BTC");
  const [status, setStatus] = useState<string>("ALL");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [params, setParams] = useState<Record<string, string> | null>(null);

  let auth: any = {};
  if (typeof window !== "undefined" && localStorage.getItem("auth")) {
    auth = JSON.parse(localStorage.getItem("auth") || "");
  }

  const { isLoading, data: { data: result } = {} } = useCustomQuery({
    queryKey: ["giftCardReport", params],
    enabled: !!params,
    queryFn: async () => {
      const result = await axios.post(
        `${BASE_URL}/gift-cards/report`,
        {
          status: params?.status,
          startDate: params?.fromDate,
          endDate: params?.toDate,
        },
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      );
      return result;
    },
  });

  const getStatusCode = () => {
    switch (status) {
      case "ALL":
      case "warning":
        return "blue";
      case "failed":
        return "error";
      default:
        return "error";
    }
  };

  const onSearch = () => {
    setParams({
      status,
      fromDate,
      toDate,
    });
  };

  const getRandomHexColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const COLUMNS = useMemo(() => {
    return [
      {
        title: "Pair",
        dataIndex: "type",
        key: "type",
        render: (_: any, { type }: any) => {
          const color = getRandomHexColor();
          return (
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                className={styles.orderIcon}
                style={{ backgroundColor: color }}
              />
              <p>{type}</p>
            </div>
          );
        },
      },
      {
        title: "Count",
        dataIndex: "count",
        key: "count",
        render: (_: any, { count }: any) => <p>{count} giftcards</p>,
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
        render: (_: any, { amount }: any) => <p>{amount} USD</p>,
      },
    ];
  }, []);

  const isActiveData = () => {
    let isActive = true;
    if (params?.status !== status) isActive = false;
    if (params?.fromDate !== fromDate) isActive = false;
    if (params?.toDate !== toDate) isActive = false;
    return isActive;
  };

  return (
    <PageLayout title="Hone">
      <div className={styles.container}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div>
            <AntdButton type="text" onClick={() => router.push("/giftcards")}>
              <img src="/icons/arrow-left.svg" />
            </AntdButton>
          </div>
          <p className={styles.filterTitle}>Filter giftcard results by</p>
        </div>
        <div className={styles.searchContainer}>
          <div className={styles.searchCard}>
            <div className={styles.dropdownContainer}>
              <p className={styles.dropdownTitle}>Status</p>
              <Dropdown
                value={status}
                options={[
                  { title: "Successful", value: "success" },
                  { title: "Failed", value: "failed" },
                  { title: "All", value: "ALL" },
                ]}
                onChange={(value) => {
                  setStatus(String(value));
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
                <Button
                  onClick={onSearch}
                  disabled={isLoading}
                  className={styles.searchButton}
                >
                  Apply filter
                </Button>
              </div>
            </div>
          </div>
        </div>
        {isLoading ? (
          <Skeleton active style={{ margin: "20px 0" }} />
        ) : result && Object.keys(result?.data).length > 0 && isActiveData() ? (
          <div className={styles.bodyContainer}>
            <h3 className={styles.header}>Giftcard transactions report</h3>
            <p className={styles.date}>
              Date: {fromDate} — {toDate}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                width: "50px",
                marginTop: 4,
              }}
            >
              <p style={{ width: "50px" }} className={styles.date}>
                Status:
              </p>
              <Tag
                color={getStatusCode()}
                style={{ textTransform: "capitalize" }}
              >
                {status}
              </Tag>
            </div>

            <h3 style={{ marginTop: 14 }} className={styles.header}>
              Giftcard orders
            </h3>
            {/* <div className={styles.ordersContainer}>
              <div style={{ flex: 1 }}>
                {data?.orders?.map((order: any) => (
                  <div className={styles.order} key={order.name}>
                    <div
                      className={styles.orderIcon}
                      style={{
                        backgroundColor: "grey",
                      }}
                    />
                    <p className={styles.orderText}>
                      <span>{order.name}</span> -{" "}
                      <span> {order.count} orders</span> -{" "}
                      <span className={styles.grey}>{order.usdTotal} USD</span>
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
                    }))}
                  />
                </div>
                <div className={styles.pieIndicators}>
                  {data?.orders?.map((order: any) => (
                    <div key={order.name} className={styles.pieIndicator}>
                      <div
                        style={{
                          backgroundColor: "grey",
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
            </div> */}
            {result?.data?.transactions?.length === 0 ? (
              <p>No Report found</p>
            ) : (
              <Table
                style={{
                  fontFamily: "PP Telegraf",
                  border: "1px solid var(--Gray-200, #EAECF0)",
                  borderRadius: 12,
                  boxShadow: "0px 7px 37px -24px rgba(0, 0, 0, 0.09)",
                  overflow: "hidden",
                }}
                dataSource={result?.data?.transactions}
                columns={COLUMNS}
                loading={isLoading}
                pagination={false}
              />
            )}
            <div className={styles.divider} style={{ margin: "24px 0" }} />
            <div className={styles.totalHeader}>
              <p>Total gifted orders: {result?.data?.count}</p>
              <Link
                href={`/giftcards/orders?status=${status}&from=${fromDate}&to=${toDate}`}
              >
                View orders
              </Link>
              <Link href="/giftcards/ranking">View ranking</Link>
            </div>
            <div className={styles.footerHeaderContainer}>
              <p>TOTAL AMOUNT</p>
              <p>TOTAL FEES</p>
              <p>GRAND TOTAL</p>
            </div>
            <div className={styles.divider} style={{ marginTop: 5 }} />
            <div className={styles.totalContainer}>
              <p>USD {result?.data?.totalAmount}</p>
              <p>USD {result?.data?.totalFees}</p>
              <p style={{ color: "#1570EF" }}>USD {result?.data?.grandTotal}</p>
            </div>
          </div>
        ) : null}
      </div>
    </PageLayout>
  );
}
