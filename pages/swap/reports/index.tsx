import React, { useMemo, useState } from "react";
import PageLayout from "@/components/PageLayout";
import styles from "@/pages/swap/reports/reports.module.css";
// import Button from "@/components/Button";
import { Alert, Button, DatePicker, Table } from "antd";
import Dropdown from "@/components/Dropdown";
import CustomPieChart from "@/components/Charts/PieChart";
import { BASE_URL } from "@/CONFIG";
import axios from "axios";
import formatDate from "@/utils/formatDate";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Link from "next/link";

export default function Search() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("all");
  const [data, setData] = useState<Record<string, any>>({});
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  let auth: any = {};
  if (typeof window !== "undefined" && localStorage.getItem("auth")) {
    auth = JSON.parse(localStorage.getItem("auth") || "");
  }

  const getStatusCode = () => {
    switch (status) {
      case "success":
      case "confirmed":
        return "success";
      case "pending":
        return "warning";
      case "all":
        return "info";
      case "error":
        return "error";
      default:
        return "error";
    }
  };

  const getSwapReports = () => {
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/swap/report`,
        {
          status,
          from: fromDate,
          to: toDate,
        },
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          setData(res.data.data);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => {
        setLoading(false);
        if (e?.response?.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        } else {
          toast.error("Something went wrong, please try again");
        }
      });
  };
  const onSearch = () => {
    getSwapReports();
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
        dataIndex: "title",
        key: "title",
        render: (_: any, { title }: any) => {
          const color = getRandomHexColor();
          return (
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                className={styles.orderIcon}
                style={{ backgroundColor: color }}
              />
              <p>{title}</p>
            </div>
          );
        },
      },
      {
        title: "Count",
        dataIndex: "count",
        key: "count",
        render: (_: any, { count }: any) => <p>{count} swaps</p>,
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
        render: (_: any, { amount }: any) => <p>{amount} USD</p>,
      },
    ];
  }, []);

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
            <Button type="text" onClick={router.back}>
              <img src="/icons/arrow-left.svg" />
            </Button>
          </div>
          <p className={styles.filterTitle}>Filter swap reports by</p>
        </div>
        <div className={styles.searchContainer}>
          <div className={styles.searchCard}>
            <div className={styles.dropdownContainer}>
              <p className={styles.dropdownTitle}>Status</p>
              <Dropdown
                value={status}
                options={[
                  { title: "Successful", value: "success" },
                  { title: "Pending", value: "pending" },
                  { title: "Confirmed", value: "confirmed" },
                  { title: "Failed", value: "failed" },
                  { title: "All", value: "all" },
                ]}
                onChange={(value) => {
                  setStatus(String(value));
                  setData({});
                }}
              />
            </div>
            <div className={styles.dropdownContainer}>
              <p className={styles.dropdownTitle}>Date range</p>
              <DatePicker.RangePicker
                onChange={(values: any) => {
                  setFromDate(formatDate(values[0].$d));
                  setToDate(formatDate(values[1].$d));
                }}
                style={{ height: 48 }}
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
                  disabled={loading}
                  onClick={onSearch}
                  className={styles.searchButton}
                >
                  Apply filter
                </Button>
              </div>
            </div>
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : Object.keys(data).length > 0 ? (
          <div className={styles.bodyContainer}>
            <h3 className={styles.header}>Swap transactions report</h3>
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
              <Alert
                message={status}
                type={getStatusCode()}
                style={{ textTransform: "capitalize" }}
              />
            </div>

            <h3 style={{ marginTop: 14 }} className={styles.header}>
              Most swapped pairs
            </h3>
            {data?.swapPairs?.length === 0 ? (
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
                dataSource={data?.swapPairs}
                columns={COLUMNS}
                loading={loading}
                pagination={false}
              />
            )}

            <div className={styles.divider} style={{ margin: "24px 0" }} />
            <div className={styles.totalHeader}>
              <p>Total Swap orders: {data?.count}</p>
              <Link
                href={`/swap/reports/orders?status=${status}&from=${fromDate}&to=${toDate}`}
              >
                View orders
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </PageLayout>
  );
}
