import React, { useMemo, useState } from "react";
import PageLayout from "@/components/PageLayout";
import styles from "@/pages/transactions/transactions.module.css";
import { Button, Table } from "antd";
import Modal from "@/components/Modal";
import axios from "axios";
import { BASE_URL } from "@/CONFIG";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";
import Pagination from "@/components/Pagination";
import { GetServerSideProps } from "next";
import useCustomQuery from "@/hooks/useCustomQuery";

interface IProps {
  type: string;
  username: string;
  url: string;
  userType: string;
  detailsUrl: string;
}

export default function UserTransactions({
  type,
  username,
  url,
  userType,
  detailsUrl,
}: IProps) {
  const router = useRouter();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [detailsId, setDetailsId] = useState<string | null>(null);

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
            <Button onClick={action}>View</Button>
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
            <Button onClick={action}>View</Button>
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
            <Button onClick={action}>View</Button>
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
            <Button onClick={action}>View</Button>
          </div>
        </div>
      ),
    },
  ];

  let auth: any = {};
  if (typeof window !== "undefined" && localStorage.getItem("auth")) {
    auth = JSON.parse(localStorage.getItem("auth") || "");
  }

  const { isLoading, data: { data: result = {} } = {} } = useCustomQuery({
    queryKey: ["userTransactions", username, type, currentPage],
    enabled: username.length > 0 && type.length > 0,
    queryFn: async () => {
      const payload = { username, page: currentPage };
      return await axios.post(url, payload, {
        headers: {
          Authorization: auth.accessToken,
        },
      });
    },
  });

  const { isLoading: isLoadingDetails, data: { data: details = {} } = {} } =
    useCustomQuery({
      queryKey: ["userTransactionsDetails", detailsId],
      enabled: !!detailsId,
      queryFn: async () => {
        const temp = type.toUpperCase();
        const id = detailsId || "";
        let tempUrl = detailsUrl;
        let payload = {};
        if (temp === "SWAP") {
          payload = { transactionId: id };
        } else {
          tempUrl = `${tempUrl}/${id}?page=${currentPage}`;
        }
        return await axios.post(tempUrl, payload, {
          headers: {
            Authorization: auth.accessToken,
          },
        });
      },
    });

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

  const formatResponse = (args: any) => {
    switch (type.toUpperCase()) {
      case "BUY":
        return args.map((item: any, i: number) => ({
          ...item,
          transactionId: item.uniqId,
          email: item.email,
          phoneNumber: item.phone,
          country: item.countryCode,
          total: `${item.currency} ${item.amount}`,
          asset: item.cryptoSymbol,
          action: () => {
            setDetailsId(item.uniqId);
            setOpenModal(true);
          },
        }));
      case "SELL":
        return args.map((item: any, i: number) => ({
          ...item,
          transactionId: item.uniq,
          email: item.email,
          phoneNumber: item.phone,
          amount: `$${item.usdAmount}`,
          asset: item.cryptoCurrency,
          total: `${item.rawAmount} ${item.localCurrency}`,
          date: item.newDate,
          action: () => {
            setDetailsId(item.uniq);
            setOpenModal(true);
          },
        }));
      case "CRYPTO":
        return args.map((item: any, i: number) => ({
          ...item,
          transactionId: item.uniqId,
          email: item.email,
          phoneNumber: item.phone,
          amount: `$${item.cryptoValue}`,
          total: `${item.cryptoPrice} ${item.cryptoPrice}`,
          asset: item.currency,
          action: () => {
            setDetailsId(item.txid);
            setOpenModal(true);
          },
        }));
      case "SWAP":
        return args.map((item: any, i: number) => ({
          ...item,
          action: () => {
            setDetailsId(item.uniqId);
            setOpenModal(true);
          },
        }));
      default:
        return null;
    }
  };

  const formatData = useMemo(() => {
    const temp = result?.data;
    if (Array.isArray(temp)) {
      const response = formatResponse(temp);
      return {
        record: response,
        pageInfo: result?.pageInfo || {},
      };
    }
  }, [result]);

  return (
    <PageLayout title="Home">
      <Modal
        openModal={openModal && type === "buy"}
        onClose={() => setOpenModal(false)}
        headerCenter={
          <div className={styles.modalHeader}>
            <p>Transaction details</p>
            <div className={styles.breadCrumb}>Buy (Momo Top-Up)</div>
            <div className={styles.breadCrumb}>{details?.data?.username}</div>
          </div>
        }
        headerLeft={
          <div className={styles.iconContainer}>
            <img src="/icons/receipt-check.svg" />
          </div>
        }
      >
        {isLoadingDetails ? (
          <Loader />
        ) : (
          <div className={styles.modalContainer}>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>
                User:{" "}
                <span style={{ color: "black" }}>
                  @{details?.data?.username}
                </span>
              </p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Transaction ID:</p>
              <p className={styles.value}>{details?.data?.uniqId}</p>
            </div>

            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Asset:</p>
              <p className={styles.value}>{details?.data?.cryptoSymbol}</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Amount (USD):</p>
              <p className={styles.value}>${details?.data?.usd}</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Amount (GHS):</p>
              <p className={styles.value}>
                {details?.data?.currency} {details?.data?.amount}
              </p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>
                Amount ({details?.data?.cryptoSymbol}):
              </p>
              <p className={styles.value} style={{ color: "#16B364" }}>
                {details?.data?.amount} {details?.data?.cryptoSymbol}
              </p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Rate:</p>
              <p className={styles.value}>
                {details?.data?.rate} {details?.data?.currency} per Dollar
              </p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Transaction Status:</p>
              <div className={styles.statusContainer}>
                <div className={styles.statusIndicator} />{" "}
                {details?.data?.status}
              </div>
            </div>

            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Payment account:</p>
              <p className={styles.value}>
                {details?.data?.name} ({details?.data?.phoneNumber})
              </p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Transaction date:</p>
              <p className={styles.value}>{details?.data?.date}</p>
            </div>
          </div>
        )}
      </Modal>
      <Modal
        openModal={openModal && type === "sell"}
        onClose={() => setOpenModal(false)}
        headerCenter={
          <div className={styles.modalHeader}>
            <p>Transaction details</p>
            <div className={styles.breadCrumb}>Sell (Momo withdrawal)</div>
            <div className={styles.breadCrumb}>{details?.data?.username}</div>
          </div>
        }
        headerLeft={
          <div className={styles.iconContainer}>
            <img src="/icons/receipt-check.svg" />
          </div>
        }
      >
        {isLoadingDetails ? (
          <Loader />
        ) : (
          <div className={styles.modalContainer}>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>
                User:{" "}
                <span style={{ color: "black" }}>
                  @{details?.data?.username}
                </span>
              </p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Transaction ID:</p>
              <p className={styles.value}>{details?.data?.trxId}</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Transaction Status:</p>
              <div className={styles.statusContainer}>
                <div className={styles.statusIndicator} />{" "}
                {details?.data?.status}
              </div>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Asset amount:</p>
              <p className={styles.value} style={{ color: "#F79009" }}>
                -{details?.data?.cryptoAmount} {details?.data?.cryptoCurrency}{" "}
                <span style={{ color: "#98A2B3" }}>
                  (${details?.data?.usdAmount})
                </span>
              </p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Rate:</p>
              <p className={styles.value}>
                Sold @ {details?.data?.rate} (price at sell time: $
                {details?.data?.cryptoPrice})
              </p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Fee:</p>
              <p className={styles.value}>{details?.data?.netFee}</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Total paid:</p>
              <p className={styles.value}>
                {details?.data?.localCurrency} {details?.data?.rawAmount}
              </p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Payment account:</p>
              <p className={styles.value}>
                {details?.data?.paymentAccount?.name} (
                {details?.data?.paymentAccount?.phoneNumber})
              </p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Order time:</p>
              <p className={styles.value}>{details?.data?.createdOn}</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Completion time:</p>
              <p className={styles.value}>{details?.data?.dataSeven}</p>
            </div>
          </div>
        )}
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
        {isLoadingDetails ? (
          <Loader />
        ) : (
          <div className={styles.modalContainer}>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>
                User:{" "}
                <span style={{ color: "black" }}>
                  @{details?.data?.username}
                </span>
              </p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Transaction ID:</p>
              <p className={styles.value}>{details?.data?.txid}</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Transaction Status:</p>
              <div className={styles.statusContainer}>
                <div className={styles.statusIndicator} />{" "}
                {details?.data?.status}
              </div>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Asset:</p>
              <p className={styles.value}>{details?.data?.currency}</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>receive from:</p>
              <p className={styles.value}>{details?.data?.from}</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Amount:</p>
              <p className={styles.value} style={{ color: "#F79009" }}>
                -{details?.data?.cryptoValue} {details?.data?.currency}
              </p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>USD value:</p>
              <p className={styles.value}>${details?.data?.usdAmount}</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Confirmations:</p>
              <p className={styles.value}>{details?.data?.confirmations}</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Transaction data:</p>
              <p className={styles.value}>{details?.data?.date}</p>
            </div>
          </div>
        )}
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
        {isLoadingDetails ? (
          <Loader />
        ) : (
          <div className={styles.modalContainer}>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>
                User:{" "}
                <span style={{ color: "black" }}>
                  {details?.data?.username}
                </span>
              </p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Transaction ID:</p>
              <p className={styles.value}>{details?.data?.uniqId}</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Transaction Status:</p>
              <div className={styles.statusContainer}>
                <div className={styles.statusIndicator} />{" "}
                {details?.data?.status}
              </div>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>From</p>
              <p className={styles.value}>
                {details?.data?.sourceAmount} {details?.data?.sourceCrypto} (
                {details?.data?.sourceCryptoName})
              </p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>To</p>
              <p className={styles.value}>
                {details?.data?.destinationAmount}{" "}
                {details?.data?.destinationCrypto} (
                {details?.data?.destinationCryptoName})
              </p>
            </div>

            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Transaction Date</p>
              <p className={styles.value}>{details?.data?.createdOn}</p>
            </div>
          </div>
        )}
      </Modal>
      <div className={styles.container}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div>
            <Button
              type="text"
              onClick={() =>
                router.push(`/users/details/${username}?type=${userType}`)
              }
            >
              <img src="/icons/arrow-left.svg" />
            </Button>
          </div>
          <p
            style={{
              textTransform: "capitalize",
            }}
            className={styles.filterTitle}
          >
            {type} transactions
          </p>
        </div>

        {isLoading ? (
          <Loader />
        ) : formatData ? (
          <div className={styles.table} style={{ overflow: "hidden" }}>
            <p className={styles.resultText}>
              {formatData.record.length} result found!
            </p>
            <Table
              style={{
                fontFamily: "PP Telegraf",
                border: "1px solid var(--Gray-200, #EAECF0)",
                borderRadius: 12,
                boxShadow: "0px 7px 37px -24px rgba(0, 0, 0, 0.09)",
                overflow: "hidden",
              }}
              dataSource={formatData?.record}
              columns={getColumns()}
              loading={isLoading}
              pagination={false}
            />
            <Pagination
              pageInfo={formatData?.pageInfo}
              setCurrentPage={setCurrentPage}
            />
          </div>
        ) : null}
      </div>
    </PageLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { type, username, userType } = context.query;
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
  const getDetailsUrl = () => {
    switch (type) {
      case "buy":
        return `${BASE_URL}/transactions/momo-top-up`;
      case "sell":
        return `${BASE_URL}/transactions/momo-withdrawal`;
      case "crypto":
        return `${BASE_URL}/transactions/receive-crypto`;
      case "swap":
        return `${BASE_URL}/swap/view`;
      default:
        return "";
    }
  };

  return {
    props: {
      type,
      username,
      userType,
      url: getUrl(),
      detailsUrl: getDetailsUrl(),
    },
  };
};
