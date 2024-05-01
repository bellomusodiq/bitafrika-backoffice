import React, { useState } from "react";

import PageLayout from "@/components/PageLayout";
import styles from "@/pages/search/users.module.css";
import NavigationStep from "@/components/NavigationStep";
import Button from "@/components/Button";
import { Table } from "antd";
import Modal from "@/components/Modal";
import axios from "axios";
import { BASE_URL } from "@/CONFIG";
import getToken from "@/utils/getToken";
import Dropdown from "@/components/Dropdown";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

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
      <p className={styles.username}>{username}</p>
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
      <p>{kycVerified ? "Verfied" : "Not Verfied"}</p>
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
  },
  {
    title: "Transaction ID",
    dataIndex: "transactionId",
    key: "transactionId",
    render: (_: any, { transactionId }: any) => (
      <p className={styles.username}>{transactionId}</p>
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
    dataIndex: "amountUsd",
    key: "amountUsd",
  },
  {
    title: "Amount (CRYPTO)",
    dataIndex: "crypto",
    key: "crypto",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (_: any, { status }: any) => (
      <div
        style={{
          padding: 4,
          borderRadius: 16,
          backgroundColor: "#EDFCF2",
          color: "#087443",
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: 12 }}>{status}</span>
      </div>
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

const MOMO_WITHDRWAL_COLUMNS = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Transaction ID",
    dataIndex: "transactionId",
    key: "transactionId",
    render: (_: any, { transactionId }: any) => (
      <p className={styles.username}>{transactionId}</p>
    ),
  },
  {
    title: "Asset",
    dataIndex: "cryptoCurrency",
    key: "cryptoCurrency",
  },
  {
    title: "Amount (GHS)",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Amount (USD)",
    dataIndex: "amountUSD",
    key: "amountUSD",
  },
  {
    title: "Amount (CRYPTO)",
    dataIndex: "topupAmount",
    key: "topupAmount",
  },
  {
    title: "status",
    dataIndex: "status",
    key: "status",
    render: (_: any, { status }: any) => (
      <div
        style={{
          padding: 4,
          borderRadius: 16,
          backgroundColor: "#EDFCF2",
          color: "#087443",
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: 12, margin: "0px 10px" }}>{status}</span>
      </div>
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

const CRYPTO_TRANSACTIONS_COLUMNS = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Transaction ID",
    dataIndex: "transactionId",
    key: "transactionId",
    render: (_: any, { transactionId }: any) => (
      <p className={styles.username}>{transactionId}</p>
    ),
  },
  {
    title: "Asset",
    dataIndex: "currency",
    key: "currency",
  },
  {
    title: "Amount (GHS)",
    dataIndex: "amount",
    key: "amount",
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
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (_: any, { status }: any) => (
      <div
        style={{
          padding: 4,
          borderRadius: 16,
          backgroundColor: "#EDFCF2",
          color: "#087443",
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: 12 }}>{status}</span>
      </div>
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
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
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
                router.push(`/users/details/${user.username}`);
              },
            }))
          );
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
        setLoading(false);
        toast.error(err.response.data.message);
      });
  };

  const searchMomoTopUp = () => {
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/search/momo-top-up`,
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
        toast.error(err.response.data.message);
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
        toast.error(err.response.data.message);
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
        toast.error(err.response.data.message);
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
        setData([]);
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

  console.log(currentUser);

  return (
    <PageLayout title="Hone">
      <Modal
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
      </Modal>
      <Modal
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
      </Modal>
      <Modal
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
      </Modal>
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
        <h3 className={styles.header}>Search</h3>
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
                  setData([]);
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
          <Loader />
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
            />
          </div>
        )}
      </div>
    </PageLayout>
  );
}
