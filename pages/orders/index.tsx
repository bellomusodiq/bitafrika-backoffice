import React, { useEffect, useState } from "react";

import PageLayout from "@/components/PageLayout";
import styles from "@/pages/transactions/transactions.module.css";
import NavigationStep from "@/components/NavigationStep";
import Button from "@/components/Button";
import { DatePicker, Table } from "antd";
import Modal from "@/components/Modal";
import axios from "axios";
import { BASE_URL } from "@/CONFIG";
import getToken from "@/utils/getToken";
import Dropdown from "@/components/Dropdown";
import formatDate from "@/utils/formatDate";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";
import Pagination from "@/components/Pagination";
import Link from "next/link";

const COUNTRY_MAP: { [k: string]: string } = {
  GH: "Ghana",
  CM: "Cameroon",
  NG: "Nigeria",
};

export default function Search() {
  const router = useRouter();

  const { status, fromDate, toDate, type } = router.query;

  const [search, setSearch] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>({});
  const [searchType, setSearchType] = useState<string>("Buy");
  const [statusType, setStatusType] = useState<string>("all");
  const [pageInfo, setPageInfo] = useState<any>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  const BUY_ORDERS = [
    {
      title: "Transaction ID",
      dataIndex: "uniqId",
      key: "uniqId",
      render: (_: any, { uniqId }: any) =>
        uniqId ? (
          <p className={styles.username}>{`${uniqId.slice(
            0,
            6
          )}...${uniqId.slice(uniqId.length - 6)}`}</p>
        ) : null,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (_: any, { username }: any) =>
        username ? (
          <Link href={`/users/details/${username}`} className={styles.username}>
            {username}
          </Link>
        ) : null,
    },
    {
      title: "Asset",
      dataIndex: "cryptoSymbol",
      key: "cryptoSymbol",
    },
    {
      title: "Amount (USD)",
      dataIndex: "usd",
      key: "usd",
      render: (_: any, { usd }: any) => <>${usd}</>,
    },
    {
      title: "Amount (GHS)",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Amount (CRYPTO)",
      dataIndex: "crypto",
      key: "crypto",
      render: (_: any, { crypto, asset }: any) => (
        <>
          {crypto} {asset}
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_: any, { status }: any) => (
        <div
          className={styles.statusContainer}
          style={{
            backgroundColor: status === "success" ? "#EDFCF2" : "#FBEAE9",
            color: status === "success" ? "#087443" : "#F04438",
          }}
        >
          <div
            className={styles.statusIndicator}
            style={{
              backgroundColor: status === "success" ? "#087443" : "#F04438",
            }}
          />{" "}
          {status}
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: "20%",
      render: (_: any, { date }: any) => (
        <span style={{ fontSize: 12 }}>{date}</span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_: any, { action }: any, index: number) => (
        <div className={styles.actionButton}>
          <div>
            <Button>View</Button>
          </div>
        </div>
      ),
    },
  ];

  const SELL_ORDERS = [
    {
      title: "Transaction ID",
      dataIndex: "uniqId",
      key: "uniqId",
      render: (_: any, { uniqId }: any) =>
        uniqId ? (
          <p className={styles.username}>{`${uniqId.slice(
            0,
            6
          )}...${uniqId.slice(uniqId.length - 6)}`}</p>
        ) : null,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (_: any, { username }: any) =>
        username ? (
          <Link href={`/users/details/${username}`} className={styles.username}>
            {username}
          </Link>
        ) : null,
    },
    {
      title: "Asset",
      dataIndex: "cryptoSymbol",
      key: "cryptoSymbol",
    },
    {
      title: "Amount (USD)",
      dataIndex: "usd",
      key: "usd",
      render: (_: any, { usd }: any) => <>${usd}</>,
    },
    {
      title: "Amount (GHS)",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Amount (CRYPTO)",
      dataIndex: "crypto",
      key: "crypto",
      render: (_: any, { crypto, asset }: any) => (
        <>
          {crypto} {asset}
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_: any, { status }: any) => (
        <div
          className={styles.statusContainer}
          style={{
            backgroundColor: status === "success" ? "#EDFCF2" : "#FBEAE9",
            color: status === "success" ? "#087443" : "#F04438",
          }}
        >
          <div
            className={styles.statusIndicator}
            style={{
              backgroundColor: status === "success" ? "#087443" : "#F04438",
            }}
          />{" "}
          {status}
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: "20%",
      render: (_: any, { date }: any) => (
        <span style={{ fontSize: 12 }}>{date}</span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_: any, { action }: any, index: number) => (
        <div className={styles.actionButton}>
          <div>
            <Button>View</Button>
          </div>
        </div>
      ),
    },
  ];

  const SELL_COLUMN = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (_: any, { username }: any) => (
        <Link href={`/users/details/${username}`} className={styles.username}>
          {username}
        </Link>
      ),
    },
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
      render: (_: any, { transactionId }: any) => (
        <p className={styles.username}>{`${transactionId.slice(
          0,
          6
        )}...${transactionId.slice(transactionId.length - 6)}`}</p>
      ),
    },
    {
      title: "Asset",
      dataIndex: "asset",
      key: "asset",
    },
    {
      title: "Amount (USD)",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Amount (GHS)",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Fee",
      dataIndex: "netFee",
      key: "netFee",
    },
    {
      title: "Status/Date",
      dataIndex: "status",
      key: "status",
      width: "25%",
      render: (_: any, { status, createdOn }: any) => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div className={styles.statusContainer}>
            <div className={styles.statusIndicator} /> {status}
          </div>
          <p style={{ marginLeft: 5 }}>{createdOn}</p>
        </div>
      ),
    },

    {
      title: "Actions",
      dataIndex: "action",
      render: (_: any, { action }: any, index: number) => (
        <div className={styles.actionButton}>
          <div>
            <Button loading={loadingIndex === index} onClick={action}>
              View
            </Button>
          </div>
        </div>
      ),
    },
  ];

  const RECEIVE_COLUMN = [
    {
      title: "Transaction ID",
      dataIndex: "txid",
      key: "txid",
      render: (_: any, { txid }: any) => (
        <p className={styles.username}>{`${txid?.slice(0, 6)}...${txid?.slice(
          txid?.length - 6
        )}`}</p>
      ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (_: any, { username }: any) => (
        <Link href={`/users/details/${username}`} className={styles.username}>
          {username}
        </Link>
      ),
    },
    {
      title: "Asset",
      dataIndex: "asset",
      key: "asset",
    },
    {
      title: "Asset amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_: any, { status }: any) => (
        <div className={styles.statusContainer}>
          <div className={styles.statusIndicator} /> {status}
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: "20%",
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_: any, { action }: any, index: number) => (
        <div className={styles.actionButton}>
          <div>
            <Button loading={loadingIndex === index} onClick={action}>
              View
            </Button>
          </div>
        </div>
      ),
    },
  ];

  const WITHDRAWAL_COLUMN = [
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
      render: (_: any, { transactionId }: any) => (
        <p className={styles.username}>{`${transactionId.slice(
          0,
          6
        )}...${transactionId.slice(transactionId.length - 6)}`}</p>
      ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (_: any, { username }: any) => (
        <Link href={`/users/details/${username}`} className={styles.username}>
          {username}
        </Link>
      ),
    },
    {
      title: "To",
      dataIndex: "to",
      key: "to",
      render: (_: any, { to }: any) => <p className={styles.username}>{to}</p>,
    },
    {
      title: "Asset",
      dataIndex: "asset",
      key: "asset",
    },
    {
      title: "Asset amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_: any, { status }: any) => (
        <div className={styles.statusContainer}>
          <div className={styles.statusIndicator} /> {status}
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: "20%",
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_: any, { action }: any, index: number) => (
        <div className={styles.actionButton}>
          <div>
            <Button loading={loadingIndex === index} onClick={action}>
              View
            </Button>
          </div>
        </div>
      ),
    },
  ];

  let auth: any = {};
  if (typeof window !== "undefined" && localStorage.getItem("auth")) {
    auth = JSON.parse(localStorage.getItem("auth") || "");
  }

  const getBuyTransactions = () => {
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/reports/transactions/buy/view?page=${currentPage}&status=${status}&from=${fromDate}&to=${toDate}&pageSize=30`,
        {},
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res: any) => {
        console.log("res", res.data);

        setLoading(false);
        if (res.data.success) {
          setData(
            res.data.data.map((item: any, i: number) => ({
              ...item,
              transactionId: item.uniqId,
              email: item.email,
              phoneNumber: item.phone,
              country: item.countryCode,
              total: `${item.currency} ${item.amount}`,
              asset: item.cryptoSymbol,
              status,
              action: () => {
                // getTopupTransactionsDetail(item.uniqId);
                setLoadingIndex(i);
              },
            }))
          );
          setPageInfo(res.data.pageInfo);
        }
      })
      .catch((e) => {
        if (e?.response?.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
      });
  };

  const getSellTransactions = () => {
    setLoadingDetail(true);
    axios
      .post(
        `${BASE_URL}/reports/transactions/sell/view?page=${currentPage}&status=${status}&from=${fromDate}&to=${toDate}&pageSize=30`,
        {},
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res: any) => {
        setLoadingDetail(false);
        setLoadingIndex(null);
        if (res.data.success) {
          setCurrentUser(res.data.data);
          setOpenModal(true);
        }
      })
      .catch((e) => {
        if (e?.response?.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
      });
  };

  const onSearch = () => {
    switch (type) {
      case "buy":
        getBuyTransactions();
        break;
      case "sell":
        getSellTransactions();
        break;
      default:
        setData(null);
    }
  };

  const showModal = (user: any) => {
    setCurrentUser(user);
    setOpenModal(true);
  };

  const getColumns = () => {
    switch (type) {
      case "buy":
        return BUY_ORDERS;
      case "sell":
        return SELL_ORDERS;
    }
  };

  useEffect(() => {
    onSearch();
  }, [currentPage, status, fromDate, toDate, type]);

  return (
    <PageLayout title="Hone">
      <div className={styles.container}>
        <h3 className={styles.header}>
          {type === "buy" ? "Buy" : "Sell"} transactions report
        </h3>
        <p className={styles.date} style={{ textAlign: "left" }}>
          Date: {fromDate} — {toDate}
        </p>
        <p className={styles.date} style={{ textAlign: "left" }}>
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
        {loading ? (
          <Loader />
        ) : data ? (
          <div className={styles.table} style={{ overflow: "hidden" }}>
            <p className={styles.resultText}>{data.length} result found!</p>
            <Table
              style={{
                fontFamily: "PP Telegraf",
                border: "1px solid var(--Gray-200, #EAECF0)",
                borderRadius: 12,
                boxShadow: "0px 7px 37px -24px rgba(0, 0, 0, 0.09)",
                overflow: "hidden",
              }}
              dataSource={data}
              columns={getColumns()}
              loading={loading}
              pagination={false}
            />
            <Pagination pageInfo={pageInfo} setCurrentPage={setCurrentPage} />
          </div>
        ) : null}
      </div>
    </PageLayout>
  );
}
