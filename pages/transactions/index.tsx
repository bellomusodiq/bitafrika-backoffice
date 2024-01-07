import React, { useState } from "react";

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

const BUY_DATA = [
  {
    transactionId: "#1234554533453",
    username: "@samual12345",
    asset: "Bitcoin",
    amount: "$7500.99",
    total: "GHS 750,099.00",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
  {
    transactionId: "#1234554533453",
    username: "@samual12345",
    asset: "Bitcoin",
    amount: "$7500.99",
    total: "GHS 750,099.00",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
  {
    transactionId: "#1234554533453",
    username: "@samual12345",
    asset: "Bitcoin",
    amount: "$7500.99",
    total: "GHS 750,099.00",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
  {
    transactionId: "#1234554533453",
    username: "@samual12345",
    asset: "Bitcoin",
    amount: "$7500.99",
    total: "GHS 750,099.00",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
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

const SELL_DATA = [
  {
    transactionId: "#1234554533453",
    username: "@samual12345",
    asset: "Bitcoin",
    amount: "$7500.99",
    total: "GHS 750,099.00",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
  {
    transactionId: "#1234554533453",
    username: "@samual12345",
    asset: "Bitcoin",
    amount: "$7500.99",
    total: "GHS 750,099.00",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
  {
    transactionId: "#1234554533453",
    username: "@samual12345",
    asset: "Bitcoin",
    amount: "$7500.99",
    total: "GHS 750,099.00",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
  {
    transactionId: "#1234554533453",
    username: "@samual12345",
    asset: "Bitcoin",
    amount: "$7500.99",
    total: "GHS 750,099.00",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
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

const RECEIVE_DATA = [
  {
    transactionId: "#1234554533453",
    username: "@samual12345",
    asset: "Bitcoin",
    amount: "$7500.99",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
  {
    transactionId: "#1234554533453",
    username: "@samual12345",
    asset: "Bitcoin",
    amount: "$7500.99",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
  {
    transactionId: "#1234554533453",
    username: "@samual12345",
    asset: "Bitcoin",
    amount: "$7500.99",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
  {
    transactionId: "#1234554533453",
    username: "@samual12345",
    asset: "Bitcoin",
    amount: "$7500.99",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
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

const WITHDRAWAL_DATA = [
  {
    transactionId: "#1234554533453",
    username: "@samual12345",
    asset: "Bitcoin",
    amount: "$7500.99",
    to: "OXF1245...566645",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
  {
    transactionId: "#1234554533453",
    username: "@samual12345",
    asset: "Bitcoin",
    amount: "$7500.99",
    to: "OXF1245...566645",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
  {
    transactionId: "#1234554533453",
    username: "@samual12345",
    asset: "Bitcoin",
    amount: "$7500.99",
    to: "OXF1245...566645",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
  {
    transactionId: "#1234554533453",
    username: "@samual12345",
    asset: "Bitcoin",
    amount: "$7500.99",
    to: "OXF1245...566645",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
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

const SWAP_DATA = [
  {
    transactionId: "#1234554533453",
    username: "@samual12345",
    swapPair: { from: "BTC", to: "USDT" },
    from: "1.2334 BTC",
    to: "10000.1 USDT",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
  {
    transactionId: "#1234554533453",
    username: "@samual12345",
    swapPair: { from: "BTC", to: "USDT" },
    from: "1.2334 BTC",
    to: "10000.1 USDT",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
  {
    transactionId: "#1234554533453",
    username: "@samual12345",
    swapPair: { from: "BTC", to: "USDT" },
    from: "1.2334 BTC",
    to: "10000.1 USDT",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
  {
    transactionId: "#1234554533453",
    username: "@samual12345",
    swapPair: { from: "BTC", to: "USDT" },
    from: "1.2334 BTC",
    to: "10000.1 USDT",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
  {
    transactionId: "#1234554533453",
    username: "@samual12345",
    swapPair: { from: "BTC", to: "USDT" },
    from: "1.2334 BTC",
    to: "10000.1 USDT",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
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

const GIFTCARDS_DATA = [
  {
    transactionId: "#1234554533453",
    username: "@samual12345",
    cardType: "Apple Itunes",
    amount: "$9.99",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
  {
    transactionId: "#1234554533453",
    username: "@samual12345",
    cardType: "Apple Itunes",
    amount: "$9.99",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
  {
    transactionId: "#1234554533453",
    username: "@samual12345",
    cardType: "Apple Itunes",
    amount: "$9.99",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
  {
    transactionId: "#1234554533453",
    username: "@samual12345",
    cardType: "Apple Itunes",
    amount: "$9.99",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
  {
    transactionId: "#1234554533453",
    username: "@samual12345",
    cardType: "Apple Itunes",
    amount: "$9.99",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
];

export default function Search() {
  const [search, setSearch] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [currentUser, setCurrentUser] = useState<any>({});
  const [searchType, setSearchType] = useState<string>("Buy");

  const onSearch = () => {
    switch (searchType) {
      case "Buy":
        setData(BUY_DATA);
        break;
      case "Sell":
        setData(SELL_DATA);
        break;
      case "Receive":
        setData(RECEIVE_DATA);
        break;
      case "Withdrawal":
        setData(WITHDRAWAL_DATA);
        break;
      case "Swap":
        setData(SWAP_DATA);
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
        setData(GIFTCARDS_DATA);
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
            <div className={styles.breadCrumb}>BITCOIN</div>
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
            <p className={styles.key}>Asset amount:</p>
            <p className={styles.value} style={{ color: "#16B364" }}>
              +0.001234 BTC
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Rate:</p>
            <p className={styles.value}>100 ghs per Dollar</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Total GHS:</p>
            <p className={styles.value}>GHS 750,099.00</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Payment account:</p>
            <p className={styles.status}>
              Samuel samuel{" "}
              <span style={{ color: "#667085" }}>(+2334567895566)</span>
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction date:</p>
            <p className={styles.value}>Mon 23 jan 07:40:03AM</p>
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
            <div className={styles.breadCrumb}>BITCOIN</div>
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
            <p className={styles.key}>Asset amount:</p>
            <p className={styles.value} style={{ color: "#F79009" }}>
              -0.001234 BTC <span style={{ color: "#98A2B3" }}>($50.06)</span>
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Rate:</p>
            <p className={styles.value}>
              Sold @ 11.2 (price at sell time: $28700.00)
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Fee:</p>
            <p className={styles.value}>
              $1.20 <span style={{ color: "#98A2B3" }}>(-12 GHS)</span>
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Total paid:</p>
            <p className={styles.value}>GHS 750,099.00</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Payment account:</p>
            <p className={styles.status}>
              Samuel samuel{" "}
              <span style={{ color: "#667085" }}>(+2334567895566)</span>
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Order time:</p>
            <p className={styles.value}>Mon 23 jan 07:40:03AM</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Completion time:</p>
            <p className={styles.value}>
              Paid by Pi(Cashout @ Mon 23 jan 07:40:03AM)
            </p>
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
              <div className={styles.statusIndicator} /> Confirmed
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Asset:</p>
            <p className={styles.value}>Bitcoin</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>receive from:</p>
            <p className={styles.value}>13423dfdwf4dafdadg435324</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Amount:</p>
            <p className={styles.value} style={{ color: "#F79009" }}>
              -0.001234 BTC
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>USD value:</p>
            <p className={styles.value}>$7500.99</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Confirmations:</p>
            <p className={styles.value}>24/24</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction data:</p>
            <p className={styles.value}>Mon 23 jan 07:40:03AM</p>
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
              <div className={styles.statusIndicator} /> Confirmed
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Asset:</p>
            <p className={styles.value}>Bitcoin</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>receive from:</p>
            <p className={styles.value}>13423dfdwf4dafdadg435324</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Amount:</p>
            <p className={styles.value} style={{ color: "#F79009" }}>
              -0.001234 BTC
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>USD value:</p>
            <p className={styles.value}>$7500.99</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Confirmations:</p>
            <p className={styles.value}>24/24</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction data:</p>
            <p className={styles.value}>Mon 23 jan 07:40:03AM</p>
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
            <p className={styles.key}>From:</p>
            <p className={styles.value}>
              Bitcoin{" "}
              <span style={{ color: "#98A2B3", marginRight: 10 }}>(BTC)</span>{" "}
              <img src="/icons/swap.svg" />
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>To:</p>
            <p className={styles.value}>
              USDT{" "}
              <span style={{ color: "#98A2B3", marginRight: 10 }}>
                (Tether)
              </span>{" "}
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>From amount:</p>
            <p className={styles.value}>0.001234 BTC</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>To amount:</p>
            <p className={styles.value}>1200.87 USDT</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Rate at transaction time:</p>
            <p className={styles.value}>0.123456 BTC is 1200.00 USDT</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction data:</p>
            <p className={styles.value}>Mon 23 jan 07:40:03AM</p>
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
              <div className={styles.statusIndicator} /> Approved
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
                value={searchType}
                options={[
                  { title: "Successful", value: "Successful" },
                  { title: "Pending", value: "Pending" },
                  { title: "Failed", value: "Failed" },
                ]}
                onChange={(value) => {
                  setSearchType(String(value));
                  setData([]);
                }}
              />
            </div>
            <div className={styles.dropdownContainer}>
              <p className={styles.dropdownTitle}>Date range</p>
              <DatePicker.RangePicker style={{ height: 48 }} />
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
          <p className={styles.searchHint}>
            
          </p>
        ) : (
          <div className={styles.table} style={{overflow: "hidden"}}>
            <p className={styles.resultText}>{data.length} result found!</p>
            <Table
              style={{
                fontFamily: "PP Telegraf",
                border: "1px solid var(--Gray-200, #EAECF0)",
                borderRadius: 12,
                boxShadow: "0px 7px 37px -24px rgba(0, 0, 0, 0.09)",
                overflow: "hidden"
              }}
              dataSource={data.map((user: any) => ({
                ...user,
                action: () => showModal(user),
              }))}
              columns={getColumns()}
              loading={loading}
            />
          </div>
        )}
      </div>
    </PageLayout>
  );
}
