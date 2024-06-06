import styles from "@/pages/manual-approvals/manual-approvals.module.css";
import Button from "@/components/Button";
import { TManualApprovalFilter } from "@/types";
import { Tag, Button as AntdButton } from "antd";
import { getStatusCode } from "@/utils/utils";
import Link from "next/link";

export const getTableColumn = (
  args: TManualApprovalFilter,
  isActive: boolean
) => {
  switch (args) {
    case "withdrawal":
      return [
        ...withdrawal,
        {
          title: "Actions",
          dataIndex: "action",
          render: (_: any, { action }: any) => (
            <div className={styles.actionButton}>
              <div>
                <AntdButton disabled={isActive} onClick={action}>
                  Mark as success
                </AntdButton>
              </div>
            </div>
          ),
        },
      ];
    case "top-up":
      return [
        ...topUp,
        {
          title: "Actions",
          dataIndex: "action",
          render: (_: any, { action }: any) => (
            <div className={styles.actionButton}>
              <div>
                <Button disabled={isActive} onClick={action}>
                  View
                </Button>
              </div>
            </div>
          ),
        },
      ];
    default:
      return [];
  }
};

const withdrawal = [
  // {
  //   title: "Username",
  //   dataIndex: "username",
  //   key: "username",
  //   render: (_: any, { username }: any) => (
  //     <p className={styles.username}>{username}</p>
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
  //       {/* <div className={styles.statusContainer}>
  //         <div className={styles.statusIndicator} /> {status}
  //       </div> */}
  //       <Tag color={getStatusCode("success")}>{status}</Tag>
  //       <p style={{ marginLeft: 5 }}>{createdOn}</p>
  //     </div>
  //   ),
  // },
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
    title: "Info",
    dataIndex: "info",
    key: "info",
    render: (
      _: any,
      {
        uniq,
        createdOn,
        usdAmount,
        localCurrency,
        rawAmount,
        cryptoAmount,
        cryptoCurrency,
        netFee,
      }: any
    ) => (
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* <span className={styles.username}>{`${uniqId.slice(0, 6)}...${uniqId.slice(
          uniqId.length - 6
        )}`}</span> */}
        <span>{uniq}</span>
        <span>Order Placed @ {createdOn}</span>
        <span>
          {localCurrency} {rawAmount} ({cryptoAmount} {cryptoCurrency}) - $
          {usdAmount} with fee of {localCurrency} {netFee}
        </span>
      </div>
    ),
  },
  {
    title: "Payment Details",
    dataIndex: "paymentAccount",
    key: "paymentAccount",
    render: (
      _: any,
      {
        uniq,
        createdOn,
        usdAmount,
        localCurrency,
        rawAmount,
        cryptoAmount,
        cryptoCurrency,
        netFee,
      }: any
    ) => (
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* <span>{uniq}</span>
        <span>Order Placed @ {createdOn}</span>
        <span>
          {localCurrency} {rawAmount} ({cryptoAmount} {cryptoCurrency}) - $
          {usdAmount} with fee of {localCurrency} {netFee}
        </span>
        <span>Completed by</span> */}
      </div>
    ),
  },
];

const topUp = [
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
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (_: any, { status }: any) => (
      // <div className={styles.statusContainer}>
      //   <div className={styles.statusIndicator} /> {status}
      // </div>

      <Tag color={getStatusCode("success")}>{status}</Tag>
    ),
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    width: "20%",
  },
];
