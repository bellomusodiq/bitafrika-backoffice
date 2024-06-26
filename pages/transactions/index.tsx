import React, { useEffect, useState } from "react";

import PageLayout from "@/components/PageLayout";
import styles from "@/pages/transactions/transactions.module.css";
import NavigationStep from "@/components/NavigationStep";
// import Button from "@/components/Button";
import { Button } from "antd";

import { DatePicker, Skeleton, Table, Tag } from "antd";
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
import AntdModal from "@/components/Modal/DetailsModal";
import modalStyles from "@/styles/modal.module.css";
import { getStatusCode } from "@/utils/utils";

const COUNTRY_MAP: { [k: string]: string } = {
  GH: "Ghana",
  CM: "Cameroon",
  NG: "Nigeria",
};

export default function Search() {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>({});
  const [searchType, setSearchType] = useState<string>("Buy");
  const [statusType, setStatusType] = useState<string>("all");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [pageInfo, setPageInfo] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  const BUY_COLUMN = [
    // {
    //   title: "Username",
    //   dataIndex: "username",
    //   key: "username",
    //   render: (_: any, { username }: any) => (
    //     <Link href={`/users/details/${username}`} className={styles.username}>
    //       {username}
    //     </Link>
    //   ),
    // },
    // {
    //   title: "Info",
    //   dataIndex: "info",
    //   key: "info",
    //   render: (
    //     _: any,
    //     {
    //       uniqId,
    //       date,
    //       usd,

    //       crypto,
    //       cryptoSymbol,
    //       status,
    //       methodId,
    //     }: any
    //   ) => (
    //     <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
    //       {/* <span className={styles.username}>{`${uniqId.slice(0, 6)}...${uniqId.slice(
    //         uniqId.length - 6
    //       )}`}</span> */}
    //       <span>{uniqId}</span>
    //       <span>{date}</span>
    //       <span>
    //         CASHOUT ({methodId}){" "}
    //         <Tag color={getStatusCode(status)}>{status}</Tag>
    //       </span>
    //     </div>
    //   ),
    // },
    // {
    //   title: "Payment Details",
    //   dataIndex: "info",
    //   key: "info",
    //   render: (
    //     _: any,
    //     { txid, currency, crypto, cryptoSymbol, amount, rate, usd }: any
    //   ) => (
    //     <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
    //       <span style={{ color: "green" }}>{txid}</span>
    //       <span>
    //         {amount} {currency} ({crypto} {cryptoSymbol})
    //       </span>
    //       <span>
    //         - Bought @ {rate} (${usd})
    //       </span>
    //     </div>
    //   ),
    // },
    // {
    //   title: "Asset",
    //   dataIndex: "asset",
    //   key: "asset",
    // },
    // {
    //   title: "Amount (GHS)",
    //   dataIndex: "total",
    //   key: "total",
    // },
    // {
    //   title: "Amount (USD)",
    //   dataIndex: "usd",
    //   key: "usd",
    //   render: (_: any, { usd }: any) => <>${usd}</>,
    // },
    // {
    //   title: "Amount (CRYPTO)",
    //   dataIndex: "crypto",
    //   key: "crypto",
    //   render: (_: any, { crypto, asset }: any) => (
    //     <>
    //       {crypto} {asset}
    //     </>
    //   ),
    // },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    //   render: (_: any, { status }: any) => (
    //     <Tag color={status === "success" ? "success" : "error"}>{status}</Tag>
    //   ),
    // },
    // {
    //   title: "Date",
    //   dataIndex: "date",
    //   key: "date",
    //   width: "20%",
    //   render: (_: any, { date }: any) => (
    //     <span style={{ fontSize: 12 }}>{date}</span>
    //   ),
    // },
    // {
    //   title: "Actions",
    //   dataIndex: "action",
    //   render: (_: any, { action }: any, index: number) => (
    //     <div className={styles.actionButton}>
    //       <div>
    //         <Button loading={loadingIndex === index} onClick={action}>
    //           View
    //         </Button>
    //       </div>
    //     </div>
    //   ),
    // },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (_: any, { username }: any) => (
        <p className={styles.username}>{username}</p>
      ),
    },
    {
      title: "Transaction ID",
      dataIndex: "uniqId",
      key: "uniqId",
      render: (_: any, { uniqId }: any) => (
        <p className={styles.username}>{`${uniqId.slice(0, 6)}...${uniqId.slice(
          uniqId.length - 6
        )}`}</p>
      ),
    },
    {
      title: "Asset",
      dataIndex: "asset",
      key: "asset",
    },
    {
      title: "Amount (GHS)",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Amount (USD)",
      dataIndex: "usd",
      key: "usd",
      render: (_: any, { usd }: any) => <>${usd}</>,
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
        <Tag color={status === "success" ? "success" : "error"}>{status}</Tag>
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
          <Button loading={loadingIndex === index} onClick={action}>
            View
          </Button>
        </div>
      ),
    },
  ];

  const BUY_COLUMN2 = [
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
      dataIndex: "uniqId",
      key: "uniqId",
      render: (_: any, { uniqId }: any) => (
        <p className={styles.username}>{`${uniqId.slice(0, 6)}...${uniqId.slice(
          uniqId.length - 6
        )}`}</p>
      ),
    },
    {
      title: "Asset",
      dataIndex: "asset",
      key: "asset",
    },
    {
      title: "Amount (GHS)",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Amount (USD)",
      dataIndex: "usd",
      key: "usd",
      render: (_: any, { usd }: any) => <>${usd}</>,
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
        <Tag color={status === "success" ? "success" : "error"}>{status}</Tag>
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
            <Button loading={loadingIndex === index} onClick={action}>
              View
            </Button>
          </div>
        </div>
      ),
    },
  ];

  const SELL_COLUMN = [
    // {
    //   title: "Username",
    //   dataIndex: "username",
    //   key: "username",
    //   render: (_: any, { username }: any) => (
    //     <Link href={`/users/details/${username}`} className={styles.username}>
    //       {username}
    //     </Link>
    //   ),
    // },
    // {
    //   title: "Info",
    //   dataIndex: "info",
    //   key: "info",
    //   render: (
    //     _: any,
    //     {
    //       uniq,
    //       createdOn,
    //       usdAmount,
    //       localCurrency,
    //       rawAmount,
    //       cryptoAmount,
    //       cryptoCurrency,
    //       netFee,
    //     }: any
    //   ) => (
    //     <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
    //       {/* <span className={styles.username}>{`${uniqId.slice(0, 6)}...${uniqId.slice(
    //         uniqId.length - 6
    //       )}`}</span> */}
    //       <span>{uniq}</span>
    //       <span>Order Placed @ {createdOn}</span>
    //       <span>
    //         {localCurrency} {rawAmount} ({cryptoAmount} {cryptoCurrency}) - $
    //         {usdAmount} with fee of {localCurrency} {netFee}
    //       </span>
    //       <span>Completed by</span>
    //     </div>
    //   ),
    // },
    // {
    //   title: "Payment Details",
    //   dataIndex: "paymentAccount",
    //   key: "paymentAccount",
    //   render: (_: any, { paymentMethod, paymenthodMethodId }: any) => (
    //     <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
    //       <span>{paymentMethod}</span>
    //     </div>
    //   ),
    // },
    // {
    //   title: "Transaction ID",
    //   dataIndex: "transactionId",
    //   key: "transactionId",
    //   render: (_: any, { transactionId }: any) => (
    //     <p className={styles.username}>{`${transactionId.slice(
    //       0,
    //       6
    //     )}...${transactionId.slice(transactionId.length - 6)}`}</p>
    //   ),
    // },
    // {
    //   title: "Asset",
    //   dataIndex: "asset",
    //   key: "asset",
    // },
    // {
    //   title: "Amount (USD)",
    //   dataIndex: "amount",
    //   key: "amount",
    // },
    // {
    //   title: "Amount (GHS)",
    //   dataIndex: "total",
    //   key: "total",
    // },
    // {
    //   title: "Fee",
    //   dataIndex: "netFee",
    //   key: "netFee",
    // },
    // {
    //   title: "Status/Date",
    //   dataIndex: "status",
    //   key: "status",
    //   width: "25%",
    //   render: (_: any, { status, createdOn }: any) => (
    //     <div
    //       style={{
    //         display: "flex",
    //         flexDirection: "row",
    //         alignItems: "center",
    //       }}
    //     >
    //       <Tag color={status === "success" ? "success" : "error"}>{status}</Tag>
    //       <p style={{ marginLeft: 5, fontSize: 12 }}>{createdOn}</p>
    //     </div>
    //   ),
    // },
    // {
    //   title: "Actions",
    //   dataIndex: "action",
    //   render: (_: any, { action }: any, index: number) => (
    //     <div className={styles.actionButton}>
    //       <div>
    //         <Button loading={loadingIndex === index} onClick={action}>
    //           View
    //         </Button>
    //       </div>
    //     </div>
    //   ),
    // },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (_: any, { username }: any) => (
        <p className={styles.username}>{username}</p>
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
          {/* <div className={styles.statusContainer}>
            <div className={styles.statusIndicator} /> {status}
          </div> */}
          <Tag color={status === "success" ? "success" : "error"}>{status}</Tag>
          <p style={{ marginLeft: 5 }}>{createdOn}</p>
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_: any, { action }: any, index: number) => (
        <div className={styles.actionButton}>
          <Button loading={loadingIndex === index} onClick={action}>
            View
          </Button>
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
        <p className={styles.username}>{username}</p>
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
        <Tag color={status === "confirmed" ? "success" : "warning"}>
          {status}
        </Tag>
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
          <Button loading={loadingIndex === index} onClick={action}>
            View
          </Button>
        </div>
      ),
    },
    // {
    //   title: "Transaction ID",
    //   dataIndex: "txid",
    //   key: "txid",
    //   render: (_: any, { txid }: any) => (
    //     <p className={styles.username}>{`${txid?.slice(0, 6)}...${txid?.slice(
    //       txid?.length - 6
    //     )}`}</p>
    //   ),
    // },
    // {
    //   title: "Username",
    //   dataIndex: "username",
    //   key: "username",
    //   render: (_: any, { username }: any) => (
    //     <Link href={`/users/details/${username}`} className={styles.username}>
    //       {username}
    //     </Link>
    //   ),
    // },
    // {
    //   title: "Info",
    //   dataIndex: "info",
    //   key: "info",
    //   render: (_: any, { txid, date }: any) => (
    //     <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
    //       {/* <span className={styles.username}>{`${uniqId.slice(0, 6)}...${uniqId.slice(
    //         uniqId.length - 6
    //       )}`}</span> */}
    //       <span>{txid}</span>
    //       <span>{date}</span>
    //     </div>
    //   ),
    // },
    // {
    //   title: "Details",
    //   dataIndex: "details",
    //   key: "details",
    //   render: (_: any, { status, cryptoValue, currency, usdAmount }: any) => (
    //     <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
    //       {/* <span className={styles.username}>{`${uniqId.slice(0, 6)}...${uniqId.slice(
    //         uniqId.length - 6
    //       )}`}</span> */}
    //       <span>
    //         {cryptoValue} {currency} (USD {usdAmount})
    //       </span>
    //       <span>
    //         <Tag color={status === "confirmed" ? "success" : "warning"}>
    //           {status}
    //         </Tag>{" "}
    //         ()
    //       </span>
    //     </div>
    //   ),
    // },
    // {
    //   title: "Asset",
    //   dataIndex: "asset",
    //   key: "asset",
    // },
    // {
    //   title: "Asset amount",
    //   dataIndex: "amount",
    //   key: "amount",
    // },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    //   render: (_: any, { status }: any) => (
    //     <Tag
    //       color={
    //         status === "success" || status === "confirmed" ? "success" : "error"
    //       }
    //     >
    //       {status}
    //     </Tag>
    //   ),
    // },
    // {
    //   title: "Date",
    //   dataIndex: "date",
    //   key: "date",
    //   width: "20%",
    //   render: (_: any, { date }: any) => (
    //     <span style={{ fontSize: 12 }}>{date}</span>
    //   ),
    // },
    // {
    //   title: "Actions",
    //   dataIndex: "action",
    //   render: (_: any, { action }: any, index: number) => (
    //     <div className={styles.actionButton}>
    //       <div>
    //         <Button loading={loadingIndex === index} onClick={action}>
    //           View
    //         </Button>
    //       </div>
    //     </div>
    //   ),
    // },
  ];

  const WITHDRAWAL_COLUMN = [
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
        <p className={styles.username}>{username}</p>
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
        <Tag color={status === "success" ? "success" : "error"}>{status}</Tag>
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
          <Button loading={loadingIndex === index} onClick={action}>
            View
          </Button>
        </div>
      ),
    },
    // {
    //   title: "Transaction ID",
    //   dataIndex: "transactionId",
    //   key: "transactionId",
    //   render: (_: any, { transactionId }: any) => (
    //     <p className={styles.username}>{`${transactionId.slice(
    //       0,
    //       6
    //     )}...${transactionId.slice(transactionId.length - 6)}`}</p>
    //   ),
    // },
    // {
    //   title: "Username",
    //   dataIndex: "username",
    //   key: "username",
    //   render: (_: any, { username }: any) => (
    //     <Link href={`/users/details/${username}`} className={styles.username}>
    //       {username}
    //     </Link>
    //   ),
    // },
    // {
    //   title: "Info",
    //   dataIndex: "info",
    //   key: "info",
    //   render: (_: any, { txid, recipient, date }: any) => (
    //     <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
    //       {/* <span className={styles.username}>{`${uniqId.slice(0, 6)}...${uniqId.slice(
    //         uniqId.length - 6
    //       )}`}</span> */}
    //       <span>{txid}</span>
    //       <span>sent to {recipient} </span>
    //       <span>{date}</span>
    //     </div>
    //   ),
    // },
    // {
    //   title: "Details",
    //   dataIndex: "details",
    //   key: "details",
    //   render: (_: any, { status, cryptoValue, currency, usdAmount }: any) => (
    //     <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
    //       {/* <span className={styles.username}>{`${uniqId.slice(0, 6)}...${uniqId.slice(
    //         uniqId.length - 6
    //       )}`}</span> */}
    //       <span>
    //         {cryptoValue} {currency} (USD {usdAmount})
    //       </span>
    //       <span>
    //         <Tag color={status === "success" ? "success" : "warning"}>
    //           {status}
    //         </Tag>{" "}
    //         ()
    //       </span>
    //     </div>
    //   ),
    // },
    // {
    //   title: "To",
    //   dataIndex: "to",
    //   key: "to",
    //   render: (_: any, { to }: any) => <p className={styles.username}>{to}</p>,
    // },
    // {
    //   title: "Asset",
    //   dataIndex: "asset",
    //   key: "asset",
    // },
    // {
    //   title: "Asset amount",
    //   dataIndex: "amount",
    //   key: "amount",
    // },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    //   render: (_: any, { status }: any) => (
    //     <Tag color={status === "success" ? "success" : "error"}>{status}</Tag>
    //   ),
    // },
    // {
    //   title: "Date",
    //   dataIndex: "date",
    //   key: "date",
    //   width: "20%",
    //   render: (_: any, { date }: any) => (
    //     <span style={{ fontSize: 12 }}>{date}</span>
    //   ),
    // },
    // {
    //   title: "Actions",
    //   dataIndex: "action",
    //   render: (_: any, { action }: any, index: number) => (
    //     <div className={styles.actionButton}>
    //       <div>
    //         <Button loading={loadingIndex === index} onClick={action}>
    //           View
    //         </Button>
    //       </div>
    //     </div>
    //   ),
    // },
  ];

  let auth: any = {};
  if (typeof window !== "undefined" && localStorage.getItem("auth")) {
    auth = JSON.parse(localStorage.getItem("auth") || "");
  }

  const getTopupTransactionsDetail = (id: string) => {
    setLoadingDetail(true);
    axios
      .post(
        `${BASE_URL}/transactions/momo-top-up/${id}?page=${currentPage}`,
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

  const getTopupTransactions = () => {
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/transactions/momo-top-up?page=${currentPage}&status=${statusType}&from=${fromDate}&to=${toDate}&pageSize=30`,
        {},
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res: any) => {
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
              action: () => {
                getTopupTransactionsDetail(item.uniqId);
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

  const getWithdrawalTransactionsDetail = (id: string) => {
    setLoadingDetail(true);
    axios
      .post(
        `${BASE_URL}/transactions/momo-withdrawal/${id}?page=${currentPage}`,
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

  const getWithdrawalTransactions = () => {
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/transactions/momo-withdrawal?status=${statusType}&from=${fromDate}&to=${toDate}&page=${currentPage}&pageSize=30`,
        {},
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        setData(
          res.data.data.map((item: any, i: number) => ({
            ...item,
            transactionId: item.uniq,
            email: item.email,
            phoneNumber: item.phone,
            amount: `$${item.usdAmount}`,
            asset: item.cryptoCurrency,
            total: `${item.rawAmount} ${item.localCurrency}`,
            date: item.newDate,
            action: () => {
              getWithdrawalTransactionsDetail(item.uniq);
              setLoadingIndex(i);
            },
          }))
        );
        setPageInfo(res.data.pageInfo);
      })
      .catch((e) => {
        if (e?.response?.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
      });
  };

  const getReceivedTransactionsDetail = (id: string) => {
    setLoadingDetail(true);
    axios
      .post(
        `${BASE_URL}/transactions/receive-crypto/${id}`,
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

  const getReceivedTransactions = () => {
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/transactions/receive-crypto?status=${statusType}&from=${fromDate}&to=${toDate}&page=${currentPage}&pageSize=30`,
        {},
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        setData(
          res.data.data.map((item: any, i: number) => ({
            ...item,
            transactionId: item.uniqId,
            email: item.email,
            phoneNumber: item.phone,
            amount: `$${item.cryptoValue}`,
            total: `${item.cryptoPrice} ${item.cryptoPrice}`,
            asset: item.currency,
            action: () => {
              getReceivedTransactionsDetail(item.txid);
              setLoadingIndex(i);
            },
          }))
        );
        setPageInfo(res.data.pageInfo);
      })
      .catch((e) => {
        if (e?.response?.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
      });
  };

  const getSentTransactionsDetail = (id: string) => {
    setLoadingDetail(true);
    axios
      .post(
        `${BASE_URL}/transactions/withdraw-crypto/${id}`,
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

  const getSentTransactions = () => {
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/transactions/withdraw-crypto?status=${statusType}&from=${fromDate}&to=${toDate}&page=${currentPage}&pageSize=30`,
        {},
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        setData(
          res.data.data.map((item: any, i: number) => ({
            ...item,
            transactionId: item.txid,
            email: item.email,
            phoneNumber: item.phone,
            to: `${item.recipient.slice(0, 6)}...${item.recipient.slice(
              item.recipient.length - 6
            )}`,
            amount: `${item.cryptoValue} ${item.currency}`,
            asset: item.currency,
            action: () => {
              getSentTransactionsDetail(item.txid);
              setLoadingIndex(i);
            },
          }))
        );
        setPageInfo(res.data.pageInfo);
      })
      .catch((e) => {
        if (e?.response?.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
      });
  };

  const onSearch = () => {
    switch (searchType) {
      case "Buy":
        getTopupTransactions();
        break;
      case "Sell":
        getWithdrawalTransactions();
        break;
      case "Receive":
        getReceivedTransactions();
        break;
      case "Withdrawal":
        getSentTransactions();
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
    switch (searchType) {
      case "Buy":
        return BUY_COLUMN;
      case "Sell":
        return SELL_COLUMN;
      case "Receive":
        return RECEIVE_COLUMN;
      case "Withdrawal":
        return WITHDRAWAL_COLUMN;
    }
  };

  useEffect(() => {
    if (pageInfo) {
      onSearch();
    }
  }, [currentPage]);
  return (
    <PageLayout title="Home">
      <AntdModal
        open={openModal && searchType === "Buy"}
        onClose={() => setOpenModal(false)}
        title={
          <div>
            <p className={modalStyles.antModalTitle}>Transaction details</p>
            <div className={modalStyles.antModalSubHeader}>
              <p className={modalStyles.antModalSubtitle}>
                Txn id: {currentUser.uniqId}
              </p>
              <Tag color="warning">Buy (Momo Top-Up)</Tag>
            </div>
          </div>
        }
      >
        <>
          <div className={modalStyles.antModalContainer}>
            <div className={modalStyles.item}>
              <p className={modalStyles.label}>Asset value</p>
              <p className={modalStyles.values}>
                {currentUser.crypto} {currentUser.cryptoSymbol}
              </p>
            </div>
            <div className={modalStyles.item}>
              <p className={modalStyles.label}>Amount (USD)</p>
              <p className={modalStyles.values}>{currentUser.usd} USD</p>
            </div>
            <div className={modalStyles.item}>
              <p className={modalStyles.label}>Amount (GHS)</p>
              <p className={modalStyles.values}>
                {currentUser.amount} {currentUser.currency}
              </p>
            </div>
          </div>
          <div className={modalStyles.antModalSubContent}>
            <div className={modalStyles.item}>
              <p className={modalStyles.label}>Order time</p>
              <p className={modalStyles.label}>
                {currentUser?.date?.split("G")[0]}
              </p>
            </div>
            <div className={modalStyles.item}>
              <p className={modalStyles.label}>Buy Rate</p>
              <p className={modalStyles.label}>
                Bought @ {currentUser.rate} - (Crypto Price: $
                {currentUser.cryptoPrice})
              </p>
            </div>
            <div className={modalStyles.item}>
              <p className={modalStyles.label}>Fees</p>
              <p className={modalStyles.values}>
                {currentUser.netFee}
                {currentUser.currency}
              </p>
            </div>
            <div className={modalStyles.item}>
              <p className={modalStyles.label}>Total amount paid</p>
              <p className={modalStyles.values}>{currentUser.currency}</p>
            </div>
          </div>
          <div className={modalStyles.antModalFooterContent}>
            <div className={modalStyles.antModalLeftContent}>
              <div className={modalStyles.item}>
                <p className={modalStyles.label}>Payment account:</p>
              </div>
              <div className={modalStyles.item}>
                <p className={modalStyles.values}>
                  Account: {currentUser.paymentAccount?.name}
                </p>
              </div>
              <div className={modalStyles.item}>
                <p className={modalStyles.values}>
                  Network: {currentUser.paymentAccount?.network}
                </p>
              </div>

              <p className={modalStyles.values}>
                Phone: {currentUser.paymentAccount?.phoneNumber}
              </p>
            </div>
            <div className={modalStyles.antModalRightContent}>
              <div className={modalStyles.item}>
                <p className={modalStyles.label}>Payment tx id:</p>
              </div>
              <div className={modalStyles.item}>
                <p className={modalStyles.values}>{currentUser?.txid}</p>
              </div>
              <p className={modalStyles.values}>
                @ {currentUser?.date?.split("G")[0]}
              </p>
            </div>
          </div>
        </>
      </AntdModal>
      {/* <Modal
        openModal={openModal && searchType === "Buy"}
        onClose={() => setOpenModal(false)}
        headerCenter={
          <div className={styles.modalHeader}>
            <p>Transaction details</p>
            <div className={styles.breadCrumb}>Buy (Momo Top-Up)</div>
            <div className={styles.breadCrumb}>{currentUser.username}</div>
          </div>
        }
        headerLeft={
          <div className={styles.iconContainer}>
            <img src="/icons/receipt-check.svg" />
          </div>
        }
      >
        <div className={styles.modalContainer}>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction ID:</p>
            <p className={styles.value}>{currentUser.uniqId}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction Status:</p>
            <Tag
              style={{ marginLeft: 4 }}
              color={currentUser.status === "success" ? "success" : "error"}
            >
              {currentUser.status}
            </Tag>
          </div>

          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Payment account:</p>
            <p className={styles.value}>
              {currentUser.name} ({currentUser.phoneNumber})
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Completion time:</p>
            <p className={styles.value}>{currentUser.date}</p>
          </div>
        </div>
      </Modal> */}
      <AntdModal
        open={openModal && searchType === "Sell"}
        onClose={() => setOpenModal(false)}
        title={
          <div>
            <p className={modalStyles.antModalTitle}>Transaction details</p>
            <div className={modalStyles.antModalSubHeader}>
              <p className={modalStyles.antModalSubtitle}>
                Txn id: {currentUser.trxId}
              </p>
              <Tag color="warning">Sell (Momo withdrawal)</Tag>
            </div>
          </div>
        }
      >
        <>
          <div className={modalStyles.antModalContainer}>
            <div className={modalStyles.item}>
              <p className={modalStyles.label}>Asset value</p>
              <p className={modalStyles.values}>
                {currentUser.cryptoAmount} {currentUser.cryptoCurrency}
              </p>
            </div>
            <div className={modalStyles.item}>
              <p className={modalStyles.label}>Amount (USD)</p>
              <p className={modalStyles.values}>{currentUser.usdAmount} USD</p>
            </div>
            <div className={modalStyles.item}>
              <p className={modalStyles.label}>Amount (GHS)</p>
              <p className={modalStyles.values}>
                {currentUser.rawAmount} {currentUser.localCurrency}
              </p>
            </div>
          </div>
          <div className={modalStyles.antModalSubContent}>
            <div className={modalStyles.item}>
              <p className={modalStyles.label}>Order time</p>
              <p className={modalStyles.label}>
                {currentUser?.createdOn?.split("G")[0]}
              </p>
            </div>
            <div className={modalStyles.item}>
              <p className={modalStyles.label}>Buy Rate</p>
              <p className={modalStyles.label}>
                Bought @ {currentUser.rate} - (Crypto Price: $
                {currentUser.cryptoPrice})
              </p>
            </div>
            <div className={modalStyles.item}>
              <p className={modalStyles.label}>Fees</p>
              <p className={modalStyles.values}>
                {currentUser.netFee} {currentUser.localCurrency}
              </p>
            </div>
            <div className={modalStyles.item}>
              <p className={modalStyles.label}>Total amount paid</p>
              <p className={modalStyles.values}>{currentUser.localCurrency}</p>
            </div>
          </div>
          <div className={modalStyles.antModalFooterContent}>
            <div className={modalStyles.antModalLeftContent}>
              <div className={modalStyles.item}>
                <p className={modalStyles.label}>Payment account:</p>
              </div>
              <div className={modalStyles.item}>
                <p className={modalStyles.values}>
                  Account: {currentUser.paymentAccount?.name}
                </p>
              </div>
              <div className={modalStyles.item}>
                <p className={modalStyles.values}>
                  Network: {currentUser.paymentAccount?.networkName}{" "}
                  {currentUser.paymentAccount?.paymentMethodType}
                </p>
              </div>

              <p className={modalStyles.values}>
                Phone: {currentUser.paymentAccount?.phoneNumber}
              </p>
            </div>
            <div className={modalStyles.antModalRightContent}>
              <div className={modalStyles.item}>
                <p className={modalStyles.label}>Payment tx id:</p>
              </div>
              <div className={modalStyles.item}>
                <p className={modalStyles.values}>{currentUser?.trxId}</p>
              </div>
              <p className={modalStyles.values}>
                @ {currentUser?.createdOn?.split("G")[0]}
              </p>
            </div>
          </div>
        </>
      </AntdModal>
      {/* <Modal
        openModal={openModal && searchType === "Sell"}
        onClose={() => setOpenModal(false)}
        headerCenter={
          <div className={styles.modalHeader}>
            <p>Transaction details</p>
            <div className={styles.breadCrumb}>Sell (Momo withdrawal)</div>
            <div className={styles.breadCrumb}>{currentUser.username}</div>
          </div>
        }
        headerLeft={
          <div className={styles.iconContainer}>
            <img src="/icons/receipt-check.svg" />
          </div>
        }
      >
        <div className={styles.modalContainer}>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction ID:</p>
            <p className={styles.value}>{currentUser.trxId}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction Status:</p>
            <div className={styles.statusContainer}>
              <div className={styles.statusIndicator} /> {currentUser.status}
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Rate:</p>
            <p className={styles.value}>
              Sold @ {currentUser.rate} (price at sell time: $
              {currentUser.cryptoPrice})
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Fee:</p>
            <p className={styles.value}>{currentUser.netFee}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Total paid:</p>
            <p className={styles.value}>
              {currentUser.localCurrency} {currentUser.rawAmount}
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Payment account:</p>
            <p className={styles.value}>
              <p>Account: {currentUser?.paymentAccount?.name}</p>
              <p>Network: {currentUser?.paymentAccount?.networkName}</p>
              <p>Phone number: {currentUser?.paymentAccount?.phoneNumber}</p>
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Completion time:</p>
            <p className={styles.value}>{currentUser.dataSeven}</p>
          </div>
        </div>
      </Modal> */}
      <AntdModal
        width={"650px"}
        open={openModal && searchType === "Receive"}
        onClose={() => setOpenModal(false)}
        title={
          <div>
            <p className={modalStyles.antModalTitle}>Transaction details</p>
            <div className={modalStyles.antModalSubHeader}>
              <p className={modalStyles.antModalSubtitle}>
                Txn id: {currentUser.txid}
              </p>
              <Tag color="warning">Receive</Tag>
            </div>
          </div>
        }
      >
        <>
          <div className={modalStyles.antModalContainer}>
            <div className={modalStyles.item}>
              <p className={modalStyles.label}>Asset value</p>
              <p className={modalStyles.values}>
                {currentUser.currencyValue} {currentUser.currency}
              </p>
            </div>
            <div className={modalStyles.item}>
              <p className={modalStyles.label}>Amount (USD)</p>
              <p className={modalStyles.values}>{currentUser.usdAmount} USD</p>
            </div>
          </div>
          <div className={modalStyles.antModalSubContent}>
            <div className={modalStyles.item}>
              <p className={modalStyles.label}>Transaction time</p>
              <p className={modalStyles.label}>
                {currentUser?.date?.split("G")[0]}
              </p>
            </div>
            <div className={modalStyles.item}>
              <p className={modalStyles.label}>Confirmations</p>
              <p className={modalStyles.label}>{currentUser?.confirmations}</p>
            </div>
            <div className={modalStyles.item}>
              <p className={modalStyles.label}>Status</p>
              <Tag color={getStatusCode(currentUser?.status)}>
                {currentUser?.status}
              </Tag>
            </div>
          </div>
          <div className={modalStyles.antModalFooterContent}>
            <div className={modalStyles.antModalLeftContent}>
              <div className={modalStyles.item}>
                <p className={modalStyles.label}>Blockchain Tx Hash</p>
              </div>
              <div className={modalStyles.item}>
                <p className={modalStyles.values}>{currentUser?.txid}</p>
              </div>
            </div>
          </div>
        </>
      </AntdModal>
      {/* <Modal
        openModal={openModal && searchType === "Receive"}
        onClose={() => setOpenModal(false)}
        headerCenter={
          <div className={styles.modalHeader}>
            <p>Transaction details</p>
            <div className={styles.breadCrumb}>Crypto transactions</div>
            <div className={styles.breadCrumb}>Receive</div>
          </div>
        }
        headerLeft={
          <div className={styles.iconContainer}>
            <img src="/icons/receipt-check.svg" />
          </div>
        }
      >
        <div className={styles.modalContainer}>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>
              User:{" "}
              <span style={{ color: "black" }}>@{currentUser.username}</span>
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction ID:</p>
            <p className={styles.value}>{currentUser.txid}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction Status:</p>
            <div className={styles.statusContainer}>
              <div className={styles.statusIndicator} /> {currentUser.status}
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Asset:</p>
            <p className={styles.value}>{currentUser.currency}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Receive from:</p>
            <p className={styles.value}>{currentUser.from}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Amount:</p>
            <p className={styles.value} style={{ color: "#F79009" }}>
              -{currentUser.cryptoValue} {currentUser.currency}
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>USD value:</p>
            <p className={styles.value}>${currentUser.usdAmount}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Confirmations:</p>
            <p className={styles.value}>{currentUser.confirmations}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction data:</p>
            <p className={styles.value}>{currentUser.date}</p>
          </div>
        </div>
      </Modal> */}
      <AntdModal
        width={"650px"}
        open={openModal && searchType === "Withdrawal"}
        onClose={() => setOpenModal(false)}
        title={
          <div>
            <p className={modalStyles.antModalTitle}>Transaction details</p>
            <div className={modalStyles.antModalSubHeader}>
              <p className={modalStyles.antModalSubtitle}>
                Txn id: {currentUser.txid}
              </p>
              <Tag color="warning">Send</Tag>
            </div>
          </div>
        }
      >
        <>
          <div className={modalStyles.antModalContainer}>
            <div className={modalStyles.item}>
              <p className={modalStyles.label}>Asset</p>
              <p className={modalStyles.values}>
                {currentUser.asset} - {currentUser.currency}
              </p>
            </div>
            <div className={modalStyles.item}>
              <p className={modalStyles.label}>Asset value</p>
              <p className={modalStyles.values}>
                {currentUser.cryptoValue} {currentUser.currency}
              </p>
            </div>
            <div className={modalStyles.item}>
              <p className={modalStyles.label}>Amount (USD)</p>
              <p className={modalStyles.values}>{currentUser.usdAmount} USD</p>
            </div>
          </div>
          <div className={modalStyles.antModalSubContent}>
            <div className={modalStyles.item}>
              <p className={modalStyles.label}>Transaction time</p>
              <p className={modalStyles.label}>
                {currentUser?.date?.split("G")[0]}
              </p>
            </div>
            <div className={modalStyles.item}>
              <p className={modalStyles.label}>Network fees</p>
              <p className={modalStyles.label}>
                {currentUser?.fee} {currentUser?.feeSymbol}
              </p>
            </div>
            <div className={modalStyles.item}>
              <p className={modalStyles.label}>Confirmations</p>
              <p className={modalStyles.label}>{currentUser?.confirmations}</p>
            </div>
            <div className={modalStyles.item}>
              <p className={modalStyles.label}>Status</p>
              <Tag color={getStatusCode(currentUser?.status)}>
                {currentUser?.status}
              </Tag>
            </div>
          </div>
          <div className={modalStyles.antModalFooterContent}>
            <div className={modalStyles.antModalLeftContent}>
              <div className={modalStyles.item}>
                <p className={modalStyles.label}>Recipient address</p>
              </div>
              <div className={modalStyles.item}>
                <p className={modalStyles.values}>{currentUser?.to}</p>
              </div>
              <div className={modalStyles.item}>
                <p className={modalStyles.label}>Blockchain Tx Hash</p>
              </div>
              <div className={modalStyles.item}>
                <p className={modalStyles.values}>{currentUser?.txid}</p>
              </div>
            </div>
          </div>
        </>
      </AntdModal>
      {/* <Modal
        openModal={openModal && searchType === "Withdrawal"}
        onClose={() => setOpenModal(false)}
        headerCenter={
          <div className={styles.modalHeader}>
            <p>Transaction details</p>
            <div className={styles.breadCrumb}>Crypto transactions</div>
            <div className={styles.breadCrumb}>Withdrawal</div>
          </div>
        }
        headerLeft={
          <div className={styles.iconContainer}>
            <img src="/icons/receipt-check.svg" />
          </div>
        }
      >
        <div className={styles.modalContainer}>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>
              User:{" "}
              <span style={{ color: "black" }}>@{currentUser.username}</span>
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction ID:</p>
            <p className={styles.value}>{currentUser.txid}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction Status:</p>
            <div className={styles.statusContainer}>
              <div className={styles.statusIndicator} /> {currentUser.status}
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Asset:</p>
            <p className={styles.value}>{currentUser.currency}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>receive from:</p>
            <p className={styles.value}>{currentUser.to}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Amount:</p>
            <p className={styles.value} style={{ color: "#F79009" }}>
              -{currentUser.cryptoValue} {currentUser.currency}
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>USD value:</p>
            <p className={styles.value}>${currentUser.usdAmount}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Confirmations:</p>
            <p className={styles.value}>{currentUser.confirmations}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction data:</p>
            <p className={styles.value}>{currentUser.date}</p>
          </div>
        </div>
      </Modal> */}
      <Modal
        openModal={openModal && searchType === "Swap"}
        onClose={() => setOpenModal(false)}
        headerCenter={
          <div className={styles.modalHeader}>
            <p>Transaction details</p>
            <div className={styles.breadCrumb}>Swap</div>
          </div>
        }
        headerLeft={
          <div className={styles.iconContainer}>
            <img src="/icons/receipt-check.svg" />
          </div>
        }
      >
        <div className={styles.modalContainer}>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>
              User:{" "}
              <span style={{ color: "black" }}>@{currentUser.username}</span>
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction ID:</p>
            <p className={styles.value}>{currentUser.uniqId}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction Status:</p>
            <div className={styles.statusContainer}>
              <div className={styles.statusIndicator} /> {currentUser.status}
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>From:</p>
            <p className={styles.value}>
              <span style={{ color: "#98A2B3", marginRight: 10 }}>
                {currentUser.sourceCryptoName} ({currentUser.sourceCrypto})
              </span>{" "}
              <img src="/icons/swap.svg" />
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>To:</p>
            <p className={styles.value}>
              <span style={{ color: "#98A2B3", marginRight: 10 }}>
                {currentUser.destinationCryptoName} (
                {currentUser.destinationCrypto})
              </span>{" "}
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>From amount:</p>
            <p className={styles.value}>
              {currentUser.sourceAmount} {currentUser.sourceCrypto}
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>To amount:</p>
            <p className={styles.value}>
              {currentUser.destinationAmount} {currentUser.destinationCrypto}
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Rate at transaction time:</p>
            <p className={styles.value}>
              {currentUser.ratePerUnit} {currentUser.sourceCrypto} per{" "}
              {currentUser.destinationCrypto}
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction data:</p>
            <p className={styles.value}>{currentUser.createdOn}</p>
          </div>
        </div>
      </Modal>
      <Modal
        openModal={openModal && searchType === "Utility"}
        onClose={() => setOpenModal(false)}
        headerCenter={
          <div className={styles.modalHeader}>
            <p>Transaction details</p>
            <div className={styles.breadCrumb}>Utility</div>
            <div className={styles.breadCrumb}>Airtime</div>
          </div>
        }
        headerLeft={
          <div className={styles.iconContainer}>
            <img src="/icons/receipt-check.svg" />
          </div>
        }
      >
        <div className={styles.modalContainer}>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>
              User: <span style={{ color: "black" }}>@Samuel12345</span>
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction ID:</p>
            <p className={styles.value}>TX12345678909887776665</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction Status:</p>
            <div className={styles.statusContainer}>
              <div className={styles.statusIndicator} /> Successful
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Biller:</p>
            <p className={styles.value}>MTN Ghana</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Amount:</p>
            <p className={styles.value}>
              5000 GHS{" "}
              <span style={{ color: "#98A2B3", marginRight: 10 }}>
                (10.98 USDT)
              </span>{" "}
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Reference:</p>
            <p className={styles.value} style={{ color: "#98A2B3" }}>
              +233 333 333 0000
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Payment asset:</p>
            <p className={styles.value}>USDT</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction data:</p>
            <p className={styles.value}>Mon 23 jan 07:40:03AM</p>
          </div>
        </div>
      </Modal>
      <Modal
        openModal={openModal && searchType === "Cards"}
        onClose={() => setOpenModal(false)}
        headerCenter={
          <div className={styles.modalHeader}>
            <p>Transaction details</p>
            <div className={styles.breadCrumb}>Cards transactions</div>
          </div>
        }
        headerLeft={
          <div className={styles.iconContainer}>
            <img src="/icons/receipt-check.svg" />
          </div>
        }
      >
        <div className={styles.modalContainer}>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>
              User: <span style={{ color: "black" }}>@Samuel12345</span>
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction ID:</p>
            <p className={styles.value}>TX12345678909887776665</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction type:</p>
            <p className={styles.value}>Mastercard purchase</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction Status:</p>
            <div className={styles.statusContainer}>
              <div className={styles.statusIndicator} /> Approved
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Biller:</p>
            <p className={styles.value}>Starlink8874748</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Amount:</p>
            <p className={styles.value}>
              5000
              <span style={{ color: "#98A2B3", marginRight: 10 }}>GHS</span>
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Payment method:</p>
            <p className={styles.value}>Card balance</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Reference:</p>
            <p className={styles.value} style={{ color: "#98A2B3" }}>
              #01233432423434243523
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Rate at transaction time:</p>
            <p className={styles.value}>1 USDT is 500 GHS</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Total GHS:</p>
            <p className={styles.value}>500 GHS</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction data:</p>
            <p className={styles.value}>Mon 23 jan 07:40:03AM</p>
          </div>
        </div>
      </Modal>
      <Modal
        openModal={openModal && searchType === "Cards top up"}
        onClose={() => setOpenModal(false)}
        headerCenter={
          <div className={styles.modalHeader}>
            <p>Transaction details</p>
            <div className={styles.breadCrumb}>Cards top up</div>
          </div>
        }
        headerLeft={
          <div className={styles.iconContainer}>
            <img src="/icons/receipt-check.svg" />
          </div>
        }
      >
        <div className={styles.modalContainer}>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>
              User: <span style={{ color: "black" }}>@Samuel12345</span>
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction ID:</p>
            <p className={styles.value}>TX12345678909887776665</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction type:</p>
            <p className={styles.value}>Mastercard top up</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction Status:</p>
            <div className={styles.statusContainer}>
              <div className={styles.statusIndicator} /> Completed
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Amount:</p>
            <p className={styles.value}>$100.99</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Payment method:</p>
            <p className={styles.value}>USDT balance</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction data:</p>
            <p className={styles.value}>Mon 23 jan 07:40:03AM</p>
          </div>
        </div>
      </Modal>
      <Modal
        openModal={openModal && searchType === "Giftcards"}
        onClose={() => setOpenModal(false)}
        headerCenter={
          <div className={styles.modalHeader}>
            <p>Transaction details</p>
            <div className={styles.breadCrumb}>Giftcards</div>
          </div>
        }
        headerLeft={
          <div className={styles.iconContainer}>
            <img src="/icons/receipt-check.svg" />
          </div>
        }
      >
        <div className={styles.modalContainer}>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>
              User:{" "}
              <span style={{ color: "black" }}>@{currentUser.username}</span>
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction ID:</p>
            <p className={styles.value}>{currentUser.uniqId}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction Status:</p>
            <div className={styles.statusContainer}>
              <div className={styles.statusIndicator} /> {currentUser.status}
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Card type:</p>
            <p className={styles.value}>
              {currentUser.dataSix} (${currentUser.amount})
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Amount paid:</p>
            <p className={styles.value}>
              {currentUser.amount} {currentUser.dataFive}
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Recipient email:</p>
            <p className={styles.value}>{currentUser.recipient}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction data:</p>
            <p className={styles.value}>{currentUser.date}</p>
          </div>
        </div>
      </Modal>

      <div className={styles.container}>
        <p className={styles.filterTitle}>
          Filter {router.pathname.split("/")[1]} results by
        </p>
        <div className={styles.searchContainer}>
          <div className={styles.searchCard}>
            <div className={styles.dropdownContainer}>
              <p className={styles.dropdownTitle}>Transaction type</p>
              <Dropdown
                value={searchType}
                options={[
                  { title: "Buy orders", value: "Buy" },
                  { title: "Sell orders", value: "Sell" },
                  { title: "Receive (Crypto)", value: "Receive" },
                  { title: "Sent (Crypto)", value: "Withdrawal" },
                ]}
                onChange={(value) => {
                  setSearchType(String(value));
                  setData(null);
                  setCurrentPage(1);
                  setPageInfo(null);
                }}
              />
            </div>
            <div className={styles.dropdownContainer}>
              <p className={styles.dropdownTitle}>Status</p>
              <Dropdown
                value={statusType}
                options={[
                  { title: "All", value: "all" },
                  { title: "Successful", value: "success" },
                  { title: "Pending", value: "pending" },
                  { title: "Failed", value: "failed" },
                ]}
                onChange={(value) => {
                  setStatusType(String(value));
                  setData(null);
                  setPageInfo(null);
                  setCurrentPage(1);
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
          <Skeleton active style={{ margin: "20px 0" }} />
        ) : data ? (
          <div className={styles.table} style={{ overflow: "hidden" }}>
            <p className={styles.resultText}>
              {pageInfo?.totalCount || data.length} result found!
            </p>
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
