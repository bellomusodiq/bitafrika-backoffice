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

const COUNTRY_MAP: { [k: string]: string } = {
  GH: "Ghana",
  CM: "Cameroon",
  NG: "Nigeria",
};

const BUY_COLUMN = [
  {
    title: "Transaction ID",
    dataIndex: "transactionId",
    key: "transactionId",
    render: (_: any, { transactionId }: any) => (
      <p className={styles.username}>{transactionId}</p>
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
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Total (GHS)",
    dataIndex: "total",
    key: "total",
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
  },
  {
    title: "Actions",
    dataIndex: "action",
    render: (_: any, { action }: any) => (
      <div className={styles.actionButton}>
        <div>
          <Button onClick={action}>View</Button>
        </div>
      </div>
    ),
  },
];

const SELL_COLUMN = [
  {
    title: "Transaction ID",
    dataIndex: "transactionId",
    key: "transactionId",
    render: (_: any, { transactionId }: any) => (
      <p className={styles.username}>{transactionId}</p>
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
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Total (GHS)",
    dataIndex: "total",
    key: "total",
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
  },
  {
    title: "Actions",
    dataIndex: "action",
    render: (_: any, { action }: any) => (
      <div className={styles.actionButton}>
        <div>
          <Button onClick={action}>View</Button>
        </div>
      </div>
    ),
  },
];


const RECEIVE_COLUMN = [
  {
    title: "Transaction ID",
    dataIndex: "transactionId",
    key: "transactionId",
    render: (_: any, { transactionId }: any) => (
      <p className={styles.username}>{transactionId}</p>
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
      <div className={styles.statusContainer}>
        <div className={styles.statusIndicator} /> {status}
      </div>
    ),
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Actions",
    dataIndex: "action",
    render: (_: any, { action }: any) => (
      <div className={styles.actionButton}>
        <div>
          <Button onClick={action}>View</Button>
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
      <p className={styles.username}>{transactionId}</p>
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
  },
  {
    title: "Actions",
    dataIndex: "action",
    render: (_: any, { action }: any) => (
      <div className={styles.actionButton}>
        <div>
          <Button onClick={action}>View</Button>
        </div>
      </div>
    ),
  },
];

const SWAP_COLUMN = [
  {
    title: "Transaction ID",
    dataIndex: "transactionId",
    key: "transactionId",
    render: (_: any, { transactionId }: any) => (
      <p className={styles.username}>{transactionId}</p>
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
    title: "Swap pair",
    dataIndex: "swapPair",
    key: "swapPair",
    render: (_: any, { swapPair }: any) => (
      <p
        className={styles.username}
        style={{
          color: "black",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {swapPair.from}{" "}
        <span style={{ marginBottom: -4.5 }}>
          <img src="/icons/swap-arrow.svg" />
        </span>{" "}
        {swapPair.to}
      </p>
    ),
  },
  {
    title: "From",
    dataIndex: "from",
    key: "from",
  },
  {
    title: "To",
    dataIndex: "to",
    key: "to",
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
  },
  {
    title: "Actions",
    dataIndex: "action",
    render: (_: any, { action }: any) => (
      <div className={styles.actionButton}>
        <div>
          <Button onClick={action}>View</Button>
        </div>
      </div>
    ),
  },
];

const UTILITY_COLUMN = [
  {
    title: "Transaction ID",
    dataIndex: "transactionId",
    key: "transactionId",
    render: (_: any, { transactionId }: any) => (
      <p className={styles.username}>{transactionId}</p>
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
    title: "Product",
    dataIndex: "product",
    key: "product",
  },
  {
    title: "Phone number",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: "Paid with",
    dataIndex: "paidWith",
    key: "paidWith",
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
  },
  {
    title: "Actions",
    dataIndex: "action",
    render: (_: any, { action }: any) => (
      <div className={styles.actionButton}>
        <div>
          <Button onClick={action}>View</Button>
        </div>
      </div>
    ),
  },
];

const UTILITY_DATA = [
  {
    transactionId: "#1234554533453",
    username: "@samual12345",
    product: "Airtime topup",
    phoneNumber: "0708 000 0000",
    amount: "200 GHC",
    paidWith: "10 USDT",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
  {
    transactionId: "#1234554533453",
    username: "@samual12345",
    product: "Airtime topup",
    phoneNumber: "0708 000 0000",
    amount: "200 GHC",
    paidWith: "10 USDT",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
  {
    transactionId: "#1234554533453",
    username: "@samual12345",
    product: "Airtime topup",
    phoneNumber: "0708 000 0000",
    amount: "200 GHC",
    paidWith: "10 USDT",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
  {
    transactionId: "#1234554533453",
    username: "@samual12345",
    product: "Airtime topup",
    phoneNumber: "0708 000 0000",
    amount: "200 GHC",
    paidWith: "10 USDT",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
  {
    transactionId: "#1234554533453",
    username: "@samual12345",
    product: "Airtime topup",
    phoneNumber: "0708 000 0000",
    amount: "200 GHC",
    paidWith: "10 USDT",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
];

const CARDS_COLUMN = [
  {
    title: "Transaction ID",
    dataIndex: "transactionId",
    key: "transactionId",
    render: (_: any, { transactionId }: any) => (
      <p className={styles.username}>{transactionId}</p>
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
    title: "Biller",
    dataIndex: "biller",
    key: "biller",
    render: (_: any, { biller }: any) => (
      <p className={styles.username}>{biller}</p>
    ),
  },
  {
    title: "Amount",
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
  },
  {
    title: "Actions",
    dataIndex: "action",
    render: (_: any, { action }: any) => (
      <div className={styles.actionButton}>
        <div>
          <Button onClick={action}>View</Button>
        </div>
      </div>
    ),
  },
];

const CARDS_DATA = [
  {
    transactionId: "#1234554533453",
    username: "@samual12345",
    biller: "AppleMusic.com",
    amount: "$9.99",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
  {
    transactionId: "#1234554533453",
    username: "@samual12345",
    biller: "AppleMusic.com",
    amount: "$9.99",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
  {
    transactionId: "#1234554533453",
    username: "@samual12345",
    biller: "AppleMusic.com",
    amount: "$9.99",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
  {
    transactionId: "#1234554533453",
    username: "@samual12345",
    biller: "AppleMusic.com",
    amount: "$9.99",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
  {
    transactionId: "#1234554533453",
    username: "@samual12345",
    biller: "AppleMusic.com",
    amount: "$9.99",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
];

const CARDS_TOPUP_COLUMN = [
  {
    title: "Transaction ID",
    dataIndex: "transactionId",
    key: "transactionId",
    render: (_: any, { transactionId }: any) => (
      <p className={styles.username}>{transactionId}</p>
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
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Paid with",
    dataIndex: "paidWith",
    key: "paidWith",
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
  },
  {
    title: "Actions",
    dataIndex: "action",
    render: (_: any, { action }: any) => (
      <div className={styles.actionButton}>
        <div>
          <Button onClick={action}>View</Button>
        </div>
      </div>
    ),
  },
];

const CARDS_TOPUP_DATA = [
  {
    transactionId: "#1234554533453",
    username: "@samual12345",
    paidWith: "USDT",
    amount: "$9.99",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
  {
    transactionId: "#1234554533453",
    username: "@samual12345",
    paidWith: "USDT",
    amount: "$9.99",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
  {
    transactionId: "#1234554533453",
    username: "@samual12345",
    paidWith: "USDT",
    amount: "$9.99",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
  {
    transactionId: "#1234554533453",
    username: "@samual12345",
    paidWith: "USDT",
    amount: "$9.99",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
  {
    transactionId: "#1234554533453",
    username: "@samual12345",
    paidWith: "USDT",
    amount: "$9.99",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
];

const GIFTCARDS_COLUMN = [
  {
    title: "Transaction ID",
    dataIndex: "transactionId",
    key: "transactionId",
    render: (_: any, { transactionId }: any) => (
      <p className={styles.username}>{transactionId}</p>
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
    title: "Card type",
    dataIndex: "cardType",
    key: "cardType",
  },
  {
    title: "Amount",
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
  },
  {
    title: "Actions",
    dataIndex: "action",
    render: (_: any, { action }: any) => (
      <div className={styles.actionButton}>
        <div>
          <Button onClick={action}>View</Button>
        </div>
      </div>
    ),
  },
];

export default function Search() {
  const [search, setSearch] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [currentUser, setCurrentUser] = useState<any>({});
  const [searchType, setSearchType] = useState<string>("Buy");
  const [statusType, setStatusType] = useState<string>("success");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [pagination, setPaingation] = useState<any>({ pageNumber: 1 });

  let auth: any;
  if (typeof window !== "undefined") {
    auth = JSON.parse(localStorage.getItem("auth") || "");
  }

  const getTopupTransactions = () => {
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/transactions/momo-top-up?status=${statusType}&from=${fromDate}&to=${toDate}&pageNumber=${pagination.pageNumber}&pageSize=30`,
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
            res.data.data.map((item: any) => ({
              ...item,
              transactionId: item.txid,
              email: item.email,
              phoneNumber: item.phone,
              country: item.countryCode,
              total: `${item.currency} ${item.amount}`,
              asset: item.cryptoSymbol,
              action: () => showModal(item),
            }))
          );
          setPaingation(res.data.pagination);
        }
      });
  };

  const getWithdrawalTransactions = () => {
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/transactions/momo-withdrawal?status=${statusType}&from=${fromDate}&to=${toDate}&pageNumber=${pagination.pageNumber}&pageSize=30`,
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
          res.data.data.map((item: any) => ({
            ...item,
            transactionId: item.uniq,
            email: item.email,
            phoneNumber: item.phone,
            amount: `$${item.usdAmount}`,
            asset: item.cryptoCurrency,
            total: `${item.cryptoPrice} ${item.cryptoCurrency}`,
            date: item.newDate,
            action: () => {
              showModal(item);
            },
          }))
        );
      });
  };

  const getReceivedTransactions = () => {
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/transactions/receive-crypto?status=${statusType}&from=${fromDate}&to=${toDate}&pageNumber=${pagination.pageNumber}&pageSize=30`,
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
          res.data.data.map((item: any) => ({
            ...item,
            transactionId: item.txid,
            email: item.email,
            phoneNumber: item.phone,
            amount: `$${item.usdAmount}`,
            total: `${item.cryptoPrice} ${item.cryptoPrice}`,
            asset: item.currency,
            action: () => {
              showModal(item);
            },
          }))
        );
      });
  };

  const getSentTransactions = () => {
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/transactions/withdraw-crypto?status=${statusType}&from=${fromDate}&to=${toDate}&pageNumber=${pagination.pageNumber}&pageSize=30`,
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
          res.data.data.map((item: any) => ({
            ...item,
            transactionId: item.txid,
            email: item.email,
            phoneNumber: item.phone,
            amount: `$${item.usdAmount}`,
            total: `${item.cryptoPrice} ${item.cryptoPrice}`,
            asset: item.currency,
            action: () => {
              showModal(item);
            },
          }))
        );
      });
  };

  const getSwapTransactions = () => {
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/transactions/swap?status=${statusType}&from=${fromDate}&to=${toDate}&pageNumber=${pagination.pageNumber}&pageSize=30`,
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
          res.data.data.map((item: any) => ({
            ...item,
            transactionId: item.uniqId,
            email: item.email,
            phoneNumber: item.phone,
            amount: `$${item.usdAmount}`,
            total: `${item.cryptoPrice} ${item.cryptoPrice}`,
            asset: item.currency,
            swapPair: {
              from: `${item.sourceAmount} ${item.sourceCrypto}`,
              to: `${item.destinationAmount} ${item.destinationCrypto}`,
            },
            from: item.sourceCrypto,
            to: item.destinationCrypto,
            date: item.createdOn,
            action: () => {
              showModal(item);
            },
          }))
        );
      });
  };

  const getGiftcardsTransactions = () => {
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/transactions/gift-card?status=${statusType}&from=${fromDate}&to=${toDate}&pageNumber=${pagination.pageNumber}&pageSize=30`,
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
          res.data.data.map((item: any) => ({
            ...item,
            transactionId: item.uniqId,
            email: item.email,
            amount: `$${item.amount}`,
            date: item.newDate,
            action: () => {
              showModal(item);
            },
          }))
        );
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
      case "Swap":
        getSwapTransactions();
        break;
      case "Utility":
        setData(UTILITY_DATA);
        break;
      case "Cards":
        setData(CARDS_DATA);
        break;
      case "Cards top up":
        setData(CARDS_TOPUP_DATA);
        break;
      case "Giftcards":
        getGiftcardsTransactions();
        break;
      default:
        setData([]);
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
      case "Swap":
        return SWAP_COLUMN;
      case "Utility":
        return UTILITY_COLUMN;
      case "Cards":
        return CARDS_COLUMN;
      case "Cards top up":
        return CARDS_TOPUP_COLUMN;
      case "Giftcards":
        return GIFTCARDS_COLUMN;
    }
  };

  return (
    <PageLayout title="Hone">
      <Modal
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
            <p className={styles.key}>Asset amount:</p>
            <p className={styles.value} style={{ color: "#16B364" }}>
              {currentUser.crypto} {currentUser.cryptoSymbol}
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Rate:</p>
            <p className={styles.value}>
              {currentUser.rate} {currentUser.currency} per Dollar
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Total GHS:</p>
            <p className={styles.value}>
              {currentUser.currency} {currentUser.amount}
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Payment account:</p>
            <p className={styles.status}>{currentUser.methodId}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction date:</p>
            <p className={styles.value}>{currentUser.date}</p>
          </div>
        </div>
      </Modal>
      <Modal
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
            <p className={styles.key}>
              User:{" "}
              <span style={{ color: "black" }}>@{currentUser.username}</span>
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction ID:</p>
            <p className={styles.value}>{currentUser.uniq}</p>
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
            <p className={styles.key}>Asset amount:</p>
            <p className={styles.value} style={{ color: "#F79009" }}>
              -{currentUser.cryptoAmount} {currentUser.cryptoCurrency}{" "}
              <span style={{ color: "#98A2B3" }}>
                (${currentUser.usdAmount})
              </span>
            </p>
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
            <p className={styles.status}>{currentUser.dataFive}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Order time:</p>
            <p className={styles.value}>{currentUser.createdOn}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Completion time:</p>
            <p className={styles.value}>{currentUser.dataSeven}</p>
          </div>
        </div>
      </Modal>
      <Modal
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
            <p className={styles.key}>receive from:</p>
            <p className={styles.value}>{currentUser.recipient}</p>
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
      </Modal>
      <Modal
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
            <p className={styles.value}>{currentUser.recipient}</p>
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
      </Modal>
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
                ({currentUser.sourceCrypto})
              </span>{" "}
              <img src="/icons/swap.svg" />
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>To:</p>
            <p className={styles.value}>
              <span style={{ color: "#98A2B3", marginRight: 10 }}>
                ({currentUser.destinationCrypto})
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
              User: <span style={{ color: "black" }}>@{currentUser.username}</span>
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
            <p className={styles.key}>Amount:</p>
            <p className={styles.value}>${currentUser.amount}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Payment method:</p>
            <p className={styles.value}>USDT balance</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction data:</p>
            <p className={styles.value}>{currentUser.newDate}</p>
          </div>
        </div>
      </Modal>

      <div className={styles.container}>
        <p className={styles.filterTitle}>Filter results by</p>
        <div className={styles.searchContainer}>
          <div className={styles.searchCard}>
            <div className={styles.dropdownContainer}>
              <p className={styles.dropdownTitle}>Transaction type</p>
              <Dropdown
                value={searchType}
                options={[
                  { title: "Buy (Momo topup)", value: "Buy" },
                  { title: "Sell (Momo withdrawal)", value: "Sell" },
                  { title: "Receive (Crypto)", value: "Receive" },
                  { title: "Withdrawal (Crypto)", value: "Withdrawal" },
                  { title: "Swap", value: "Swap" },
                  { title: "Utility", value: "Utility" },
                  { title: "Cards", value: "Cards" },
                  { title: "Cards top up", value: "Cards top up" },
                  { title: "Giftcards", value: "Giftcards" },
                ]}
                onChange={(value) => {
                  setSearchType(String(value));
                  setData([]);
                }}
              />
            </div>
            <div className={styles.dropdownContainer}>
              <p className={styles.dropdownTitle}>Status</p>
              <Dropdown
                value={statusType}
                options={[
                  { title: "Successful", value: "success" },
                  { title: "Pending", value: "pending" },
                  { title: "Failed", value: "failed" },
                ]}
                onChange={(value) => {
                  setStatusType(String(value));
                  setData([]);
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
                <Button onClick={onSearch} className={styles.searchButton}>
                  Apply filter
                </Button>
              </div>
            </div>
          </div>
        </div>
        {data.length === 0 ? (
          <p className={styles.searchHint}></p>
        ) : (
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
              pagination={{
                defaultCurrent: pagination.pageNumber,
                pageSize: pagination.pageSize,
                total: pagination.totalCount,
                showSizeChanger: false,
                onChange(page, pageSize) {
                  setPaingation({
                    pageNumber: page,
                  });
                  onSearch();
                },
              }}
            />
          </div>
        )}
      </div>
    </PageLayout>
  );
}
