import React, { useState } from "react";

import PageLayout from "@/components/PageLayout";
import styles from "@/pages/reports/users.module.css";
import NavigationStep from "@/components/NavigationStep";
import Button from "@/components/Button";
import { DatePicker, Divider, Table } from "antd";
import Modal from "@/components/Modal";
import Dropdown from "@/components/Dropdown";
import { toast } from "react-toastify";

const columns: any = [
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
  },
  {
    title: "Rate",
    dataIndex: "rate",
    key: "rate",
  },
  {
    title: "Fees",
    dataIndex: "fees",
    key: "fees",
  },
  {
    title: "Total",
    dataIndex: "total",
    key: "total",
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
  const [orderType, setOrderType] = useState<string>("Sell orders");
  const [openModal, setOpenModal] = useState<boolean>(false);

  const dataSource = [
    {
      key: "1",
      username: "@username",
      transactionId: "TRX123456784344545",
      paymentMethod: "Mobile Money",
      amount: "$200.2",
      rate: "10",
      fees: "$1.20 (GHS 100.00)",
      total: "GHS 988.00",
      date: "Thur 18 Jan, 2023",
      onCopy: () =>
        toast("Copied to clipboard", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }),
      action: () => setOpenModal(true),
    },
    {
      key: "2",
      username: "@username",
      transactionId: "TRX123456784344545",
      paymentMethod: "Mobile Money",
      amount: "$200.2",
      rate: "10",
      fees: "$1.20 (GHS 100.00)",
      total: "GHS 988.00",
      date: "Thur 18 Jan, 2023",
      onCopy: () =>
        toast("Copied to clipboard", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }),
      action: () => setOpenModal(true),
    },
    {
      key: "3",
      username: "@username",
      transactionId: "TRX123456784344545",
      paymentMethod: "Mobile Money",
      amount: "$200.2",
      rate: "10",
      fees: "$1.20 (GHS 100.00)",
      total: "GHS 988.00",
      date: "Thur 18 Jan, 2023",
      onCopy: () =>
        toast("Copied to clipboard", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }),
      action: () => setOpenModal(true),
    },
    {
      key: "4",
      username: "@username",
      transactionId: "TRX123456784344545",
      paymentMethod: "Mobile Money",
      amount: "$200.2",
      rate: "10",
      fees: "$1.20 (GHS 100.00)",
      total: "GHS 988.00",
      date: "Thur 18 Jan, 2023",
      onCopy: () =>
        toast("Copied to clipboard", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }),
      action: () => setOpenModal(true),
    },
    {
      key: "5",
      username: "@username",
      transactionId: "TRX123456784344545",
      paymentMethod: "Mobile Money",
      amount: "$200.2",
      rate: "10",
      fees: "$1.20 (GHS 100.00)",
      total: "GHS 988.00",
      date: "Thur 18 Jan, 2023",
      onCopy: () =>
        toast("Copied to clipboard", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }),
      action: () => setOpenModal(true),
    },
  ];

  return (
    <PageLayout title="Hone">
      <Modal
        openModal={openModal}
        onClose={() => setOpenModal(false)}
        headerCenter={<Button color="white">#</Button>}
      >
        <div className={styles.modalContainer}>
          <p className={styles.modalHeader}>Account details</p>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Account:</p>
            <p className={styles.value}>EMMANUEL KWABENA NKRUMAH</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Country:</p>
            <p className={styles.value}>Ghana (GH)</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Network:</p>
            <p className={styles.value}>MTN</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Phone number:</p>
            <p className={styles.value}>2334567890000</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Status:</p>
            <p className={styles.valueStatus}>Payment method is active</p>
          </div>
          <div className={styles.divider} />
          <p className={styles.date}>Date registered: Thur May 13, 2021.</p>
          <p className={styles.date}>12:33:28 GMT</p>
          <Button
            onClick={() => setOpenModal(false)}
            className={styles.modalButton}
          >
            Close
          </Button>
        </div>
      </Modal>
      <NavigationStep hideButton />
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <h3 className={styles.header}>Transactions reports</h3>
          <div>
            <Button color="white">
              <div className={styles.printButton}>
                <img src="/icons/printer.svg" />
                Print
              </div>
            </Button>
          </div>
        </div>
        <Divider />
        <div className={styles.filterByContainer}>
          <p className={styles.filterByHeader}>Filter result by</p>
          <div className={styles.filterContainer}>
            <div className={styles.inputContainer}>
              <p>Order type</p>
              <Dropdown
                options={[
                  { title: "Sell orders", value: "Sell orders" },
                  { title: "Buy orders", value: "Buy orders" },
                  { title: "Buy & sell orders", value: "Buy & sell orders" },
                ]}
                onChange={(e) => setOrderType(e.target.value)}
              />
            </div>
            <div className={styles.inputContainer}>
              <p>Date range</p>
              <DatePicker.RangePicker style={{ padding: 8 }} />
            </div>
          </div>
          <Divider style={{ margin: 0 }} />
          <div className={styles.filterByFooter}>
            <div style={{ marginRight: 20 }}>
              <Button>Filter results</Button>
            </div>
            <div>
              <Button color="white">Clear</Button>
            </div>
          </div>
        </div>

        {orderType === "Sell orders" && (
          <>
            <h3 className={styles.header2}>Sell transaction analysis</h3>
            <div className={styles.sellTransactions}>
              <div className={styles.sellTransaction}>
                <p className={styles.sellTransactionTitle}>
                  Total successful orders
                </p>
                <p className={styles.sellTransactionValue}>1009</p>
              </div>
              <div className={styles.verticalDivider} />
              <div className={styles.sellTransaction}>
                <p className={styles.sellTransactionTitle}>Sell total (USD)</p>
                <p className={styles.sellTransactionValue}>10,000.00 USD</p>
              </div>
              <div className={styles.verticalDivider} />
              <div className={styles.sellTransaction}>
                <p className={styles.sellTransactionTitle}>Total fees (USD)</p>
                <p className={styles.sellTransactionValue}>6</p>
                <p className={styles.sellTransactionSubValue}>~400 GHS</p>
              </div>
              <div className={styles.verticalDivider} />
              <div className={styles.sellTransaction}>
                <p className={styles.sellTransactionTitle}>
                  Sell subtotal (GHS)
                </p>
                <p className={styles.sellTransactionValue}>
                  <span style={{ color: "#16B364" }}>10,000.00</span>{" "}
                  <span style={{ fontSize: 12 }}>GHS</span>
                </p>
              </div>
            </div>
          </>
        )}
        {orderType === "Buy orders" && (
          <>
            <h3 className={styles.header2}>Buy transaction analysis</h3>
            <div className={styles.sellTransactions}>
              <div className={styles.sellTransaction}>
                <p className={styles.sellTransactionTitle}>
                  Total successful orders
                </p>
                <p className={styles.sellTransactionValue}>1009</p>
              </div>
              <div className={styles.verticalDivider} />
              <div className={styles.sellTransaction}>
                <p className={styles.sellTransactionTitle}>Sell total (USD)</p>
                <p className={styles.sellTransactionValue}>10,000.00 USD</p>
              </div>
              <div className={styles.verticalDivider} />
              <div className={styles.sellTransaction}>
                <p className={styles.sellTransactionTitle}>Total fees (USD)</p>
                <p className={styles.sellTransactionValue}>6</p>
                <p className={styles.sellTransactionSubValue}>~400 GHS</p>
              </div>
              <div className={styles.verticalDivider} />
              <div className={styles.sellTransaction}>
                <p className={styles.sellTransactionTitle}>
                  Sell subtotal (GHS)
                </p>
                <p className={styles.sellTransactionValue}>
                  <span style={{ color: "#16B364" }}>10,000.00</span>{" "}
                  <span style={{ fontSize: 12 }}>GHS</span>
                </p>
              </div>
            </div>
          </>
        )}
        {orderType === "Buy & sell orders" && (
          <div className={styles.buySellOrders}>
            <div className={styles.buySellOrder}>
              <p className={styles.buySellTitle}>Buy transaction analysis</p>
              <Divider style={{ margin: 0 }} />
              <div className={styles.buySellItem}>
                <p className={styles.buySellItemTitle}>
                  Total successful orders
                </p>
                <p className={styles.buySellItemValue}>1009</p>
              </div>
              <Divider style={{ margin: 0 }} />
              <div className={styles.buySellItem}>
                <p className={styles.buySellItemTitle}>Total USD amount</p>
                <p className={styles.buySellItemValue}>$1009.00</p>
              </div>
              <Divider style={{ margin: 0 }} />
              <div className={styles.buySellItem}>
                <p className={styles.buySellItemTitle}>Total fees (USD)</p>
                <p className={styles.buySellItemValue}>0</p>
                <p className={styles.buySellItemSubValue}>~0.00 GHS</p>
              </div>
              <Divider style={{ margin: 0 }} />
              <div className={styles.buySellItem}>
                <p className={styles.buySellItemTitle}>Buy subtotal (GHS)</p>
                <p className={styles.buySellItemValue}>
                  <span className={styles.buySellGreen}>170,000.00</span>{" "}
                  <span className={styles.buySellCurrency}>GHS</span>
                </p>
              </div>
            </div>
            <div className={styles.buySellOrder}>
              <p className={styles.buySellTitle}>Sell transaction analysis</p>
              <Divider style={{ margin: 0 }} />
              <div className={styles.buySellItem}>
                <p className={styles.buySellItemTitle}>
                  Total successful orders
                </p>
                <p className={styles.buySellItemValue}>1009</p>
              </div>
              <Divider style={{ margin: 0 }} />
              <div className={styles.buySellItem}>
                <p className={styles.buySellItemTitle}>Total USD amount</p>
                <p className={styles.buySellItemValue}>$1009.00</p>
              </div>
              <Divider style={{ margin: 0 }} />
              <div className={styles.buySellItem}>
                <p className={styles.buySellItemTitle}>Total fees (USD)</p>
                <p className={styles.buySellItemValue}>0</p>
                <p className={styles.buySellItemSubValue}>~0.00 GHS</p>
              </div>
              <Divider style={{ margin: 0 }} />
              <div className={styles.buySellItem}>
                <p className={styles.buySellItemTitle}>Buy subtotal (GHS)</p>
                <p className={styles.buySellItemValue}>
                  <span className={styles.buySellGreen}>170,000.00</span>{" "}
                  <span className={styles.buySellCurrency}>GHS</span>
                </p>
              </div>
            </div>
          </div>
        )}
        <div className={styles.searchContainer}>
          <div className={styles.table}>
            <Table style={{fontFamily: "PP Telegraf"}} dataSource={dataSource} columns={columns} />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
