import React, { useMemo, useState } from "react";
import PageLayout from "@/components/PageLayout";
import styles from "@/pages/swap/reports/reports.module.css";
import { Alert, Button, DatePicker, Skeleton, Table, Tag } from "antd";
import Dropdown from "@/components/Dropdown";
import { BASE_URL } from "@/CONFIG";
import axios from "axios";
import formatDate from "@/utils/formatDate";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";
import Link from "next/link";
import useCustomQuery from "@/hooks/useCustomQuery";
import { GetServerSideProps } from "next";
import dayjs from "dayjs";

interface IProps {
  statusType: string;
  from: string;
  to: string;
}

export default function Search({ statusType, from, to }: IProps) {
  const router = useRouter();
  const [status, setStatus] = useState<string>(statusType || "all");
  const [fromDate, setFromDate] = useState<string>(from || "");
  const [toDate, setToDate] = useState<string>(to || "");
  const [params, setParams] = useState<Record<string, string> | null>(
    statusType && from && to
      ? { status: statusType, fromDate: from, toDate: to }
      : null
  );

  let auth: any = {};
  if (typeof window !== "undefined" && localStorage.getItem("auth")) {
    auth = JSON.parse(localStorage.getItem("auth") || "");
  }

  const { isLoading, data: { data: result } = {} } = useCustomQuery({
    queryKey: ["swapReport", params],
    enabled: !!params,
    queryFn: async () => {
      const result = await axios.post(
        `${BASE_URL}/swap/report`,
        {
          status: params?.status,
          from: params?.fromDate,
          to: params?.toDate,
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
      case "all":
      case "success":
      case "confirmed":
        return "success";
      case "pending":
        return "warning";
      case "error":
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
            <Button type="text" onClick={() => router.push("/swap")}>
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
                }}
              />
            </div>
            <div className={styles.dropdownContainer}>
              <p className={styles.dropdownTitle}>Date range</p>
              <DatePicker.RangePicker
                format={"YYYY-MM-DD"}
                onChange={(values: any) => {
                  setFromDate(formatDate(values[0].$d));
                  setToDate(formatDate(values[1].$d));
                }}
                defaultValue={
                  fromDate && toDate
                    ? [
                        dayjs(fromDate, "YYYY-MM-DD"),
                        dayjs(toDate, "YYYY-MM-DD"),
                      ]
                    : undefined
                }
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
                  disabled={isLoading}
                  onClick={onSearch}
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
              <Tag
                color={getStatusCode()}
                style={{ textTransform: "capitalize" }}
              >
                {status}
              </Tag>
            </div>

            <h3 style={{ marginTop: 14 }} className={styles.header}>
              Most swapped pairs
            </h3>
            {result?.data?.swapPairs?.length === 0 ? (
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
                dataSource={result?.data?.swapPairs}
                columns={COLUMNS}
                loading={isLoading}
                pagination={false}
              />
            )}

            <div className={styles.divider} style={{ margin: "24px 0" }} />
            <div className={styles.totalHeader}>
              <p>Total Swap orders: {result?.data?.count}</p>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { status, from, to } = context.query;
  return {
    props: {
      statusType: status || null,
      from: from || null,
      to: to || null,
    },
  };
};
