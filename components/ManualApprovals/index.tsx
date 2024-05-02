import styles from "@/pages/manual-approvals/manual-approvals.module.css";
import Button from "@/components/Button";
import { TManualApprovalFilter } from "@/types";

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
  },
  {
    title: "Transaction ID",
    dataIndex: "transactionId",
    key: "transactionId",
    render: (_: any, { transactionId, onCopy }: any) => (
      <div onClick={onCopy} className={styles.transactionId}>
        <p>
          {transactionId?.slice(0, 5)} . . .
          {transactionId?.slice(transactionId?.length - 5)}
        </p>
        <img src="/icons/copy.svg" />
      </div>
    ),
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (
      _: any,
      { rawAmount, cryptoAmount, localCurrency, cryptoCurrency }: any
    ) => (
      <div className={styles.amountContainer}>
        <p className={styles.currency}>
          <span style={{ color: "#98A2B3" }}>{localCurrency}</span> {rawAmount}
        </p>
        <p className={styles.crypto}>
          ({cryptoAmount} {cryptoCurrency})
        </p>
      </div>
    ),
  },
  {
    title: "Date",
    dataIndex: "createdOn",
    key: "createdOn",
    width: "20%",
  },
  {
    title: "Actions",
    dataIndex: "action",
    render: (_: any, { action }: any) => (
      <div className={styles.actionButton}>
        <div>
          <Button
            // disabled={loadingDetail}
            onClick={action}
          >
            View
          </Button>
        </div>
      </div>
    ),
  },
];

const topUp: any = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Transaction ID",
    dataIndex: "txid",
    key: "txid",
    render: (_: any, { txid, onCopy }: any) => (
      <div onClick={onCopy} className={styles.transactionId}>
        <p>
          {txid?.slice(0, 5)} . . .{txid?.slice(txid?.length - 5)}
        </p>
        <img src="/icons/copy.svg" />
      </div>
    ),
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (_: any, { amount, crypto, currency, cryptoSymbol }: any) => (
      <div className={styles.amountContainer}>
        <p className={styles.currency}>
          <span style={{ color: "#98A2B3" }}>{currency}</span> {amount}
        </p>
        <p className={styles.crypto}>
          ({crypto} {cryptoSymbol})
        </p>
      </div>
    ),
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    width: "20%",
  },
];
