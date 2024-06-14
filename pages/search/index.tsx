import React, { useState } from "react";

import PageLayout from "@/components/PageLayout";
import styles from "@/pages/search/users.module.css";
import NavigationStep from "@/components/NavigationStep";
import Button from "@/components/Button";
import { Skeleton, Table, Tag, message } from "antd";
import Modal from "@/components/Modal";
import axios from "axios";
import { BASE_URL } from "@/CONFIG";
import getToken from "@/utils/getToken";
import Dropdown from "@/components/Dropdown";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";
import Link from "next/link";
import { getStatusCode } from "@/utils/utils";
import AntdModal from "@/components/Modal/DetailsModal";
import modalStyles from "@/styles/modal.module.css";

const COUNTRY_MAP: { [k: string]: string } = {
  GH: "Ghana",
  CM: "Cameroon",
  NG: "Nigeria",
};

const USER_COLUMNS = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
    render: (_: any, { username }: any) => (
      <Link
        className={styles.username}
        href={`/users/details/${username}?type=`}
      >
        {username}
      </Link>
    ),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone number",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Country",
    dataIndex: "countryCode",
    key: "countryCode",
  },
  {
    title: "KYC Status",
    dataIndex: "kycVerified",
    key: "kycVerified",
    render: (_: any, { kycVerified }: any) => (
      <Tag color={kycVerified ? "success" : "warning"}>
        {kycVerified ? "Verified" : "Not Verified"}
      </Tag>
    ),
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

const MOMO_TOPUP_COLUMNS = [
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
    dataIndex: "cryptoSymbol",
    key: "cryptoSymbol",
  },
  {
    title: "Amount (GHS)",
    dataIndex: "amount",
    key: "amount",
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
    render: (_: any, { action }: any) => (
      <div className={styles.actionButton}>
        <Button onClick={action}>View</Button>
      </div>
    ),
  },
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
  //       methodId,

  //       status,
  //     }: any
  //   ) => (
  //     <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
  //       <span>{uniqId}</span>
  //       <span>{date}</span>
  //       <span>
  //         CASHOUT ({methodId}) <Tag color={getStatusCode(status)}>{status}</Tag>
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
  //   title: "Username",
  //   dataIndex: "username",
  //   key: "username",
  //   render: (_: any, { username }: any) => (
  //     <Link className={styles.username} href={`/users/details/${username}`}>
  //       {username}
  //     </Link>
  //   ),
  // },
  // {
  //   title: "Transaction ID",
  //   dataIndex: "transactionId",
  //   key: "transactionId",
  //   render: (_: any, { transactionId }: any) => (
  //     <>
  //       {transactionId.slice(0, 6)}...
  //       {transactionId.slice(transactionId.length - 6)}
  //     </>
  //   ),
  // },
  // {
  //   title: "Asset",
  //   dataIndex: "cryptoSymbol",
  //   key: "cryptoSymbol",
  // },
  // {
  //   title: "Amount (GHS)",
  //   dataIndex: "amount",
  //   key: "amount",
  //   render: (_: any, { amount }: any) => <>GHS {amount}</>,
  // },
  // {
  //   title: "Rate",
  //   dataIndex: "rate",
  //   key: "rate",
  // },
  // {
  //   title: "Amount (USD)",
  //   dataIndex: "amountUsd",
  //   key: "amountUsd",
  //   render: (_: any, { amountUsd }: any) => <>${amountUsd}</>,
  // },
  // {
  //   title: "Amount (CRYPTO)",
  //   dataIndex: "crypto",
  //   key: "crypto",
  //   render: (_: any, { crypto, cryptoSymbol }: any) => (
  //     <>
  //       {crypto} {cryptoSymbol}
  //     </>
  //   ),
  // },
  // {
  //   title: "Status",
  //   dataIndex: "status",
  //   key: "status",
  //   render: (_: any, { status }: any) => (
  //     <Tag color={status === "success" ? "success" : "warning"}>{status}</Tag>
  //   ),
  // },
  // {
  //   title: "Actions",
  //   dataIndex: "action",
  //   render: (_: any, { action }: any) => (
  //     <div className={styles.actionButton}>
  //       <div>
  //         <Button onClick={action}>View</Button>
  //       </div>
  //     </div>
  //   ),
  // },
];

const MOMO_WITHDRWAL_COLUMNS = [
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
    dataIndex: "cryptoCurrency",
    key: "cryptoCurrency",
  },
  {
    title: "Amount (USD)",
    dataIndex: "amountUSD",
    key: "amountUSD",
  },
  {
    title: "Amount (GHS)",
    dataIndex: "amount",
    key: "amount",
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
        <Button onClick={action}>View</Button>
      </div>
    ),
  },
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
  //       {/* <span>{uniq}</span>
  //       <span>Order Placed @ {createdOn}</span>
  //       <span>
  //         {localCurrency} {rawAmount} ({cryptoAmount} {cryptoCurrency}) - $
  //         {usdAmount} with fee of {localCurrency} {netFee}
  //       </span>
  //       <span>Completed by</span> */}
  //       <span>
  //         {paymentMethod}
  //         {/* {paymenthodMethodId} */}
  //       </span>
  //     </div>
  //   ),
  // },
  // {
  //   title: "Username",
  //   dataIndex: "username",
  //   key: "username",
  //   render: (_: any, { username }: any) => (
  //     <Link className={styles.username} href={`/users/details/${username}`}>
  //       {username}
  //     </Link>
  //   ),
  // },
  // {
  //   title: "Transaction ID",
  //   dataIndex: "transactionId",
  //   key: "transactionId",
  //   render: (_: any, { transactionId }: any) => (
  //     <>
  //       {transactionId.slice(0, 6)}...
  //       {transactionId.slice(transactionId.length - 6)}
  //     </>
  //   ),
  // },
  // {
  //   title: "Asset",
  //   dataIndex: "cryptoCurrency",
  //   key: "cryptoCurrency",
  // },
  // {
  //   title: "Amount (GHS)",
  //   dataIndex: "amount",
  //   key: "amount",
  //   render: (_: any, { amount }: any) => <>{amount} GHS</>,
  // },
  // {
  //   title: "Amount (USD)",
  //   dataIndex: "amountUSD",
  //   key: "amountUSD",
  //   render: (_: any, { amountUSD }: any) => <>${amountUSD}</>,
  // },
  // {
  //   title: "Amount (CRYPTO)",
  //   dataIndex: "topupAmount",
  //   key: "topupAmount",
  // },
  // {
  //   title: "status",
  //   dataIndex: "status",
  //   key: "status",
  //   render: (_: any, { status }: any) => (
  //     <Tag color={status === "success" ? "success" : "warning"}>{status}</Tag>
  //   ),
  // },
  // {
  //   title: "Actions",
  //   dataIndex: "action",
  //   render: (_: any, { action }: any) => (
  //     <div className={styles.actionButton}>
  //       <div>
  //         <Button onClick={action}>View</Button>
  //       </div>
  //     </div>
  //   ),
  // },
];

const CRYPTO_TRANSACTIONS_COLUMNS = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
    render: (_: any, { username }: any) => (
      <Link className={styles.username} href={`/users/details/${username}`}>
        {username}
      </Link>
    ),
  },
  {
    title: "Transaction ID",
    dataIndex: "transactionId",
    key: "transactionId",
    render: (_: any, { transactionId }: any) => (
      <>
        {transactionId.slice(0, 6)}...
        {transactionId.slice(transactionId.length - 6)}
      </>
    ),
  },
  {
    title: "Asset",
    dataIndex: "currency",
    key: "currency",
  },
  {
    title: "Amount (CRYPTO)",
    dataIndex: "amountCrypto",
    key: "amountCrypto",
  },
  {
    title: "Amount (USD)",
    dataIndex: "amountUSD",
    key: "amountUSD",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (_: any, { status }: any) => (
      <Tag color={status === "success" ? "success" : "warning"}>{status}</Tag>
    ),
  },
  // {
  //   title: "TX type",
  //   dataIndex: "txType",
  //   key: "txType",
  // },
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
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>({});
  const [searchType, setSearchType] = useState<string>("User");

  let auth: any = {};
  if (typeof window !== "undefined" && localStorage.getItem("auth")) {
    auth = JSON.parse(localStorage.getItem("auth") || "");
  }

  const searchUser = () => {
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/search/user/${search}`,
        {},
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          setData(
            res.data?.data?.map((user: any) => ({
              ...user,
              action: () => {
                router.push(`/users/details/${user.username}?type=`);
              },
            }))
          );
        } else {
          messageApi.error({ content: res.data.message, duration: 5 });
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
        setLoading(false);
        messageApi.error({ content: err.response.data.message, duration: 5 });
      });
  };

  const searchMomoTopUp = () => {
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/search/momo-top-up/${search}`,
        {},
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        const data = res.data?.data?.map((data: any) => ({
          ...data,
          transactionId: data.uniqId,
          username: data.username,
          amount: data.amount,
          status: data.status,
          amountUsd: data.usd,
          action: () => {
            showModal(data);
          },
        }));
        setData(data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
        setLoading(false);
        messageApi.error({ content: err.response.data.message, duration: 5 });
      });
  };

  const searchMomoWithdrawal = () => {
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/search/momo-withdrawal/${search}`,
        {},
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        const data = res.data?.data?.map((data: any) => ({
          ...data,
          transactionId: data.uniq,
          username: data.username,
          amount: data.rawAmount,
          status: data.status,
          amountUSD: data.usdAmount,
          fee: data.netFee,
          topupAmount: `${data.netFee} ${data.cryptoCurrency}`,
          action: () => {
            showModal(data);
          },
        }));
        setData(data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
        setLoading(false);
        messageApi.error({ content: err.response.data.message, duration: 5 });
      });
  };

  const searchTransactions = () => {
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/search/crypto-transaction/${search}`,
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
            amountCrypto: `${item.cryptoValue} ${item.currency}`,
            amountUSD: `$${item.usdAmount}`,
            txType: item.type,
            action: () => showModal(item),
          }))
        );
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
        setLoading(false);
        messageApi.error({ content: err.response.data.message, duration: 5 });
      });
  };

  const onSearch = () => {
    switch (searchType) {
      case "User":
        searchUser();
        break;
      case "Momo topup":
        searchMomoTopUp();
        break;
      case "Momo withdrawal":
        searchMomoWithdrawal();
        break;
      case "Crypto transactions":
        searchTransactions();
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
      case "User":
        return USER_COLUMNS;
      case "Momo topup":
        return MOMO_TOPUP_COLUMNS;
      case "Momo withdrawal":
        return MOMO_WITHDRWAL_COLUMNS;
      case "Crypto transactions":
        return CRYPTO_TRANSACTIONS_COLUMNS;
    }
  };

  const renderPlaceHolder = () => {
    switch (searchType) {
      case "User":
        return "Phone, username or email address";
      case "Momo topup":
        return "Reference ID";
      case "Momo withdrawal":
        return "Reference ID";
      case "Crypto transactions":
        return "Transaction ID, Recipient address";
    }
  };

  return (
    <PageLayout title="Home">
      {contextHolder}
      <AntdModal
        width={"650px"}
        open={openModal && searchType === "Crypto transactions"}
        onClose={() => setOpenModal(false)}
        title={
          <div>
            <p className={modalStyles.antModalTitle}>Transaction details</p>
            <div className={modalStyles.antModalSubHeader}>
              <p className={modalStyles.antModalSubtitle}>
                Txn id: {currentUser.txid}
              </p>
              <Tag color="warning" style={{ textTransform: "capitalize" }}>
                {currentUser?.type}
              </Tag>
            </div>
          </div>
        }
      >
        <>
          <div className={modalStyles.antModalContainer}>
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
            {currentUser?.recipient && (
              <div className={modalStyles.item}>
                <p className={modalStyles.label}>Network fees</p>
                <p className={modalStyles.label}>
                  {currentUser.fee} {currentUser.feeSymbol}
                </p>
              </div>
            )}

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
              {currentUser?.recipient && (
                <>
                  <div className={modalStyles.item}>
                    <p className={modalStyles.label}>Recipient address</p>
                  </div>
                  <div className={modalStyles.item}>
                    <p className={modalStyles.values}>
                      {currentUser?.recipient}
                    </p>
                  </div>
                </>
              )}
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
        openModal={openModal && searchType === "Crypto transactions"}
        onClose={() => setOpenModal(false)}
        headerCenter={
          <div className={styles.modalHeader}>
            <p>Transaction details</p>
            <div className={styles.breadCrumb}>Crypto transactions</div>
            <div className={styles.breadCrumb}>{currentUser.type}</div>
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
            <p className={styles.value}>{currentUser.dataOne}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Address:</p>
            <p className={styles.value}>{""}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Asset amount:</p>
            <p className={styles.value} style={{ color: "#16B364" }}>
              {currentUser.cryptoValue} {currentUser.currency}
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>USD value:</p>
            <p className={styles.value}>${currentUser.usdAmount}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Total paid:</p>
            <p className={styles.value}></p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Confirmations:</p>
            <p className={styles.value}>{currentUser.confirmations}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction date:</p>
            <p className={styles.value}>{currentUser.date}</p>
          </div>
        </div>
      </Modal> */}
      <AntdModal
        open={openModal && searchType === "Momo withdrawal"}
        onClose={() => setOpenModal(false)}
        title={
          <div>
            <p className={modalStyles.antModalTitle}>Transaction details</p>
            <div className={modalStyles.antModalSubHeader}>
              <p className={modalStyles.antModalSubtitle}>
                Txn id: {currentUser.uniq}
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
                <p className={modalStyles.values}>{currentUser?.uniq}</p>
              </div>
              <p className={modalStyles.values}>
                @ {currentUser?.createdOn?.split("G")[0]}
              </p>
            </div>
          </div>
        </>
      </AntdModal>
      {/* <Modal
        openModal={openModal && searchType === "Momo withdrawal"}
        onClose={() => setOpenModal(false)}
        headerCenter={
          <div className={styles.modalHeader}>
            <p>Transaction details</p>
            <div className={styles.breadCrumb}>Sell (Momo withdrawal)</div>
            <div className={styles.breadCrumb}>
              {currentUser.cryptoCurrency}
            </div>
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
              -{currentUser.cryptoAmount}{" "}
              <span style={{ color: "#98A2B3" }}>
                (${currentUser.usdAmount})
              </span>
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Amount:</p>
            <p className={styles.value}>
              {currentUser.localCurrency} {currentUser.receivableLocal}
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
            <p className={styles.value}>
              {currentUser.netFee} <span style={{ color: "#98A2B3" }}></span>
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Total paid:</p>
            <p className={styles.value}>
              {currentUser.localCurrency} {currentUser.receivableLocal}
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
            <p className={styles.value}>{currentUser.newDate}</p>
          </div>
        </div>
      </Modal> */}
      <AntdModal
        open={openModal && searchType === "Momo topup"}
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
                {currentUser.netFee} {currentUser.currency}
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
        openModal={openModal && searchType === "Momo topup"}
        onClose={() => setOpenModal(false)}
        headerCenter={
          <div className={styles.modalHeader}>
            <p>Transaction details</p>
            <div className={styles.breadCrumb}>Buy (Momo Top-Up)</div>
            <div className={styles.breadCrumb}>{currentUser.cryptoSymbol}</div>
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
              +{currentUser.crypto} {currentUser.currency}
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
            <p className={styles.key}>Payment account:</p>
            <p className={styles.status}>{currentUser.methodId}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction date:</p>
            <p className={styles.value}>{currentUser.date}</p>
          </div>
        </div>
      </Modal> */}
      <Modal
        openModal={openModal && searchType === "User"}
        onClose={() => setOpenModal(false)}
        headerCenter={
          <div
            style={{
              width: "fit-content",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              justifySelf: "center",
            }}
          >
            <Button color="white">#</Button>
          </div>
        }
      >
        <div className={styles.modalContainer}>
          <p className={styles.modalHeader}>Account details</p>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Account:</p>
            <p className={styles.value}>{currentUser.fullname}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Country:</p>
            <p className={styles.value}>{currentUser.countryCode}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Username:</p>
            <p className={styles.value}>{currentUser.username}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Email:</p>
            <p className={styles.value}>{currentUser.email}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Phone number:</p>
            <p className={styles.value}>{currentUser.phone}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Active:</p>
            <p className={styles.valueStatus}>
              {currentUser.active?.toString()}
            </p>
          </div>
          <div className={styles.divider} />
          <p className={styles.date}>
            Date registered: {currentUser.createdOn}
          </p>
          <Button
            onClick={() => setOpenModal(false)}
            className={styles.modalButton}
          >
            Close
          </Button>
        </div>
      </Modal>
      <div className={styles.container}>
        <p className={styles.filterTitle}>Filter search results by</p>
        <div className={styles.searchContainer}>
          <div className={styles.searchCard}>
            <div className={styles.dropdownContainer}>
              <Dropdown
                value={searchType}
                options={[
                  { title: "User", value: "User" },
                  { title: "Momo topup", value: "Momo topup" },
                  { title: "Momo withdrawal", value: "Momo withdrawal" },
                  {
                    title: "Crypto transactions",
                    value: "Crypto transactions",
                  },
                ]}
                onChange={(value) => {
                  setSearchType(String(value));
                  setData(null);
                }}
              />
            </div>
            <div className={styles.searchHeader}>
              <img src="/icons/search.svg" />
              <input
                className={styles.input}
                placeholder={renderPlaceHolder()}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div>
              <Button onClick={onSearch} disabled={loading}>
                Search
              </Button>
            </div>
          </div>
        </div>
        {loading ? (
          <Skeleton active style={{ marginTop: 20 }} />
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
            />
          </div>
        ) : null}
      </div>
    </PageLayout>
  );
}
