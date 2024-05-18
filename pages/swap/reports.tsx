import React, { useState } from "react";
import PageLayout from "@/components/PageLayout";
import styles from "@/pages/swap/reports.module.css";
import Button from "@/components/Button";
import { DatePicker } from "antd";
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
  const [status, setStatus] = useState<string>("success");
  const [data, setData] = useState<Record<string, any>>({});
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  let auth: any = {};
  if (typeof window !== "undefined" && localStorage.getItem("auth")) {
    auth = JSON.parse(localStorage.getItem("auth") || "");
  }

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

  return (
    <PageLayout title="Hone">
      <div className={styles.container}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h3 className={styles.header}>Swap report</h3>
          <div>
            <Button color="white" onClick={router.back}>
              <img src="/icons/arrow-left.svg" /> Back
            </Button>
          </div>
        </div>
        <p className={styles.filterTitle}>Filter results by</p>
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
        ) : (
          <div className={styles.bodyContainer}>
            <h3 className={styles.header}>Swap transactions report</h3>
            <p className={styles.date}>
              Date: {fromDate} — {toDate}
            </p>
            <p className={styles.date}>Status: {status}</p>

            <h3 style={{ marginTop: 14 }} className={styles.header}>
              Most swapped pairs
            </h3>
            <div className={styles.ordersContainer}>
              <div style={{ flex: 1 }}>
                {data?.swapPairs?.map((order: any) => (
                  <div className={styles.order} key={order.key}>
                    <div
                      className={styles.orderIcon}
                      style={{
                        backgroundColor: "grey",
                      }}
                    />
                    <p className={styles.orderText}>
                      <span>{order.title}</span> -{" "}
                      <span> {order.count} swaps</span> -{" "}
                      <span className={styles.grey}>{order.amount} USD</span>
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
                    data={data?.percentages?.map((order: any) => ({
                      value: order.percentage,
                    }))}
                  />
                </div>
                <div className={styles.pieIndicators}>
                  {data?.percentages?.map((order: any) => (
                    <div key={order.key} className={styles.pieIndicator}>
                      <div
                        style={{
                          backgroundColor: "grey",
                        }}
                      />
                      {order.percentage}%
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.divider} style={{ margin: "24px 0" }} />
            <div className={styles.totalHeader}>
              <p>Total Swap orders: {data?.count}</p>
              <Link href="/swap/transactions">View orders</Link>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
