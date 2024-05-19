import React, { useEffect, useState } from "react";
import PageLayout from "@/components/PageLayout";
import styles from "@/pages/transactions/transactions.module.css";
import Button from "@/components/Button";
import { Table } from "antd";
import Modal from "@/components/Modal";
import axios from "axios";
import { BASE_URL } from "@/CONFIG";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";
import Pagination from "@/components/Pagination";
import { GetServerSideProps } from "next";
import { toast } from "react-toastify";

interface IProps {
  type: string;
  username: string;
  url: string;
}

export default function UserTransactions({ type, username, url }: IProps) {
  const router = useRouter();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>({});
  const [pageInfo, setPageInfo] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const BUY_COLUMN = [
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
      render: (_: any, { date }: any) => (
        <span style={{ fontSize: 12 }}>{date}</span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_: any, { action }: any) => (
        <div className={styles.actionButton}>
          <div>
            <Button disabled={loadingDetail} onClick={action}>
              View
            </Button>
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
      render: (_: any, { action }: any) => (
        <div className={styles.actionButton}>
          <div>
            <Button disabled={loadingDetail} onClick={action}>
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
      width: "20%",
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_: any, { action }: any) => (
        <div className={styles.actionButton}>
          <div>
            <Button disabled={loadingDetail} onClick={action}>
              View
            </Button>
          </div>
        </div>
      ),
    },
  ];

  const SWAP_COLUMN = [
    {
      title: "Transaction ID",
      dataIndex: "",
      key: "uniqId",
      render: (_: any, { uniqId }: any) => (
        <p className={styles.username}>{`${uniqId.slice(0, 6)}...${uniqId.slice(
          uniqId.length - 6
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
      title: "Swap pair",
      key: "pair",
      render: (_: any, res: any) => {
        return (
          <div style={{ display: "flex" }}>
            <p>{res?.sourceCrypto}</p>
            <p style={{ color: "green", margin: "0 10px" }}>&rarr;</p>
            <p>{res?.destinationCrypto}</p>
          </div>
        );
      },
    },
    {
      title: "From",
      key: "from",
      render: (_: any, res: any) => {
        return (
          <p>
            {res?.sourceAmount} {res?.sourceCrypto}
          </p>
        );
      },
    },
    {
      title: "To",
      key: "to",
      render: (_: any, res: any) => {
        return (
          <p>
            {res?.destinationAmount} {res?.destinationCrypto}
          </p>
        );
      },
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
      dataIndex: "createdOn",
      key: "date",
      width: "20%",
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_: any, { action }: any) => (
        <div className={styles.actionButton}>
          <div>
            <Button disabled={loadingDetail} onClick={action}>
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
        if (res.data.success) {
          setCurrentUser(res.data.data);
          setOpenModal(true);
        }
      })
      .catch((e) => {
        setLoadingDetail(false);
        if (e?.response?.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        } else {
          toast.error("Something went wrong, please try again");
        }
      });
  };

  const getTopupTransactions = () => {
    setLoading(true);
    axios
      .post(
        url,
        { username, page: currentPage },
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
              transactionId: item.uniqId,
              email: item.email,
              phoneNumber: item.phone,
              country: item.countryCode,
              total: `${item.currency} ${item.amount}`,
              asset: item.cryptoSymbol,
              action: () => getTopupTransactionsDetail(item.uniqId),
            }))
          );
          setPageInfo(res.data.pageInfo);
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
        if (res.data.success) {
          setCurrentUser(res.data.data);
          setOpenModal(true);
        }
      })
      .catch((e) => {
        setLoadingDetail(false);
        if (e?.response?.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        } else {
          toast.error("Something went wrong, please try again");
        }
      });
  };

  const getWithdrawalTransactions = () => {
    setLoading(true);
    axios
      .post(
        url,
        { username, page: currentPage },
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
            total: `${item.rawAmount} ${item.localCurrency}`,
            date: item.newDate,
            action: () => {
              getWithdrawalTransactionsDetail(item.uniq);
            },
          }))
        );
        setPageInfo(res.data.pageInfo);
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
        if (res.data.success) {
          setCurrentUser(res.data.data);
          setOpenModal(true);
        }
      })
      .catch((e) => {
        setLoadingDetail(false);
        if (e?.response?.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        } else {
          toast.error("Something went wrong, please try again");
        }
      });
  };

  const getReceivedTransactions = () => {
    setLoading(true);
    axios
      .post(
        url,
        { username, page: currentPage },
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
            amount: `$${item.cryptoValue}`,
            total: `${item.cryptoPrice} ${item.cryptoPrice}`,
            asset: item.currency,
            action: () => {
              getReceivedTransactionsDetail(item.txid);
            },
          }))
        );
        setPageInfo(res.data.pageInfo);
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

  const getSwapTransactionsDetail = (id: string) => {
    setLoadingDetail(true);
    axios
      .post(
        `${BASE_URL}/swap/view`,
        { transactionId: id },
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res: any) => {
        setLoadingDetail(false);
        if (res.data.success) {
          setCurrentUser(res.data.data);
          setOpenModal(true);
        }
      })
      .catch((e) => {
        setLoadingDetail(false);
        if (e?.response?.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        } else {
          toast.error("Something went wrong, please try again");
        }
      });
  };

  const getSwapTransactions = () => {
    setLoading(true);
    axios
      .post(
        url,
        { username, page: currentPage },
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
            action: () => {
              getSwapTransactionsDetail(item.uniqId);
            },
          }))
        );
        setPageInfo(res.data.pageInfo);
      })
      .catch((e) => {
        setLoading(false);
        if (e?.response?.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        } else {
          toast.error("Something went wrong, please try againhvv gchh");
        }
      });
  };

  const onSearch = () => {
    switch (type.toUpperCase()) {
      case "BUY":
        getTopupTransactions();
        break;
      case "SELL":
        getWithdrawalTransactions();
        break;
      case "CRYPTO":
        getReceivedTransactions();
        break;
      case "SWAP":
        getSwapTransactions();
        break;
      default:
        setData(null);
    }
  };

  const getColumns = () => {
    switch (type.toUpperCase()) {
      case "BUY":
        return BUY_COLUMN;
      case "SELL":
        return SELL_COLUMN;
      case "CRYPTO":
        return RECEIVE_COLUMN;
      case "SWAP":
        return SWAP_COLUMN;
    }
  };

  useEffect(() => {
    onSearch();
  }, [currentPage]);

  return (
    <PageLayout title="Home">
      <Modal
        openModal={openModal && type === "buy"}
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
            <p className={styles.value}>{currentUser.uniqId}</p>
          </div>

          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Asset:</p>
            <p className={styles.value}>{currentUser.cryptoSymbol}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Amount (USD):</p>
            <p className={styles.value}>${currentUser.usd}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Amount (GHS):</p>
            <p className={styles.value}>
              {currentUser.currency} {currentUser.amount}
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Amount ({currentUser.cryptoSymbol}):</p>
            <p className={styles.value} style={{ color: "#16B364" }}>
              {currentUser.amount} {currentUser.cryptoSymbol}
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
            <p className={styles.key}>Transaction Status:</p>
            <div className={styles.statusContainer}>
              <div className={styles.statusIndicator} /> {currentUser.status}
            </div>
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
            <p className={styles.key}>Transaction date:</p>
            <p className={styles.value}>{currentUser.date}</p>
          </div>
        </div>
      </Modal>
      <Modal
        openModal={openModal && type === "sell"}
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
            <p className={styles.value}>
              {currentUser?.paymentAccount?.name} (
              {currentUser?.paymentAccount?.phoneNumber})
            </p>
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
        openModal={openModal && type === "crypto"}
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
      </Modal>
      <Modal
        openModal={openModal && type === "swap"}
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
              <span style={{ color: "black" }}>{currentUser?.username}</span>
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction ID:</p>
            <p className={styles.value}>{currentUser?.uniqId}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction Status:</p>
            <div className={styles.statusContainer}>
              <div className={styles.statusIndicator} /> {currentUser?.status}
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>From</p>
            <p className={styles.value}>
              {currentUser?.sourceAmount} {currentUser?.sourceCrypto} (
              {currentUser?.sourceCryptoName})
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>To</p>
            <p className={styles.value}>
              {currentUser?.destinationAmount} {currentUser?.destinationCrypto}{" "}
              ({currentUser?.destinationCryptoName})
            </p>
          </div>

          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction Date</p>
            <p className={styles.value}>{currentUser?.createdOn}</p>
          </div>
        </div>
      </Modal>
      <div className={styles.container}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p
            style={{ textTransform: "capitalize" }}
            className={styles.filterTitle}
          >
            {type} transactions
          </p>
          <div className={styles.goBackBtn}>
            <Button color="white" onClick={router.back}>
              <img src="/icons/arrow-left.svg" />
              Go back
            </Button>
          </div>
        </div>

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { type, username } = context.query;
  const getUrl = () => {
    switch (type) {
      case "buy":
        return `${BASE_URL}/transactions/momo-top-up/list-user-transactions`;
      case "sell":
        return `${BASE_URL}/transactions/momo-withdrawal/list-user-transactions`;
      case "crypto":
        return `${BASE_URL}/transactions/withdraw-crypto/list-user-transactions`;
      case "swap":
        return `${BASE_URL}/swap/list-user-transactions`;
      default:
        return "";
    }
  };

  return {
    props: {
      type,
      username,
      url: getUrl(),
    },
  };
};
