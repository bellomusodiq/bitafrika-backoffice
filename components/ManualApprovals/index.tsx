import styles from "@/pages/manual-approvals/manual-approvals.module.css";
import Button from "@/components/Button";
import { TManualApprovalFilter } from "@/types";
import { Tag } from "antd";

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
                <Button disabled={isActive} onClick={action}>
                  View
                </Button>
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
        <Tag color={"success"}>{status}</Tag>
        <p style={{ marginLeft: 5 }}>{createdOn}</p>
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

      <Tag color={"success"}>{status}</Tag>
    ),
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    width: "20%",
  },
];
