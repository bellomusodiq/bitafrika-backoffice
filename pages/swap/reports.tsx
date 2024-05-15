import React, { useEffect, useState } from "react";

import PageLayout from "@/components/PageLayout";
import styles from "@/pages/reports/users.module.css";
import NavigationStep from "@/components/NavigationStep";
import Button from "@/components/Button";
import { DatePicker, Divider, Table } from "antd";
import Modal from "@/components/Modal";
import Dropdown from "@/components/Dropdown";
import CustomPieChart from "@/components/Charts/PieChart";
import { BASE_URL } from "@/CONFIG";
import axios from "axios";
import formatDate from "@/utils/formatDate";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Pagination from "@/components/Pagination";
import Link from "next/link";

export default function Search() {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [openModal, setOpenModal] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("Successful");
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
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [coin, setCoin] = useState<string>("BTC");

  let auth: any = {};
  if (typeof window !== "undefined" && localStorage.getItem("auth")) {
    auth = JSON.parse(localStorage.getItem("auth") || "");
  }

  return (
    <PageLayout title="Hone">
      <div className={styles.container}>
        <p className={styles.filterTitle}>Filter results by</p>
        <div className={styles.searchContainer}>
          <div className={styles.searchCard}>
            <div className={styles.dropdownContainer}>
              <p className={styles.dropdownTitle}>Type</p>
              <Dropdown
                value={searchType}
                options={[
                  {
                    title: "Giftcard transactions",
                    value: "Giftcard transactions",
                  },
                ]}
                onChange={(value) => {}}
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
                value={coin}
                options={[
                  { title: "Successful", value: "Successful" },
                  { title: "Pending", value: "Pending" },
                  { title: "Failed", value: "Failed" },
                ]}
                onChange={(value) => {
                  setCoin(String(value));
                  setData(false);
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
                  onClick={() => {}}
                  disabled={loading}
                  className={styles.searchButton}
                >
                  Apply filter
                </Button>
              </div>
            </div>
          </div>
        </div>
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
          </div>
          <div className={styles.divider} style={{ margin: "24px 0" }} />
          <div className={styles.totalHeader}>
            <p>Total Swap orders: 2039{data?.totalCount}</p>
            <Link href="/giftcards/orders">View orders</Link>
            {/* <Link href="/giftcards/ranking">View ranking</Link> */}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
