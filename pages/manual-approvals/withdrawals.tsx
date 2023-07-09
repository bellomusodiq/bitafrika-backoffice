import React, { useState } from "react";

import PageLayout from "@/components/PageLayout";
import styles from "@/pages/manual-approvals/manual-approvals.module.css";
import NavigationStep from "@/components/NavigationStep";
import Button from "@/components/Button";
import { Checkbox, DatePicker, Divider, Space, Table } from "antd";
import Modal from "@/components/Modal";
import DropModal from "@/components/DropModal";
import Input from "@/components/Input/Input";
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
    render: (_: any, { amount }: any) => (
      <div className={styles.amountContainer}>
        <p className={styles.currency}>
          <span style={{ color: "#98A2B3" }}>GHC</span> {amount.currencyAmount}
        </p>
        <p className={styles.crypto}>({amount.currencyAmount} BTC)</p>
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
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openFilter, setOpenFilter] = useState<boolean>(false);

  const dataSource = [
    {
      key: "1",
      username: "@username",
      transactionId: "TRX123456784344545",
      paymentMethod: "Mobile Money",
      amount: {
        currencyAmount: "100,998.00",
        cryptoAmount: "0.00023400014",
      },
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
      amount: {
        currencyAmount: "100,998.00",
        cryptoAmount: "0.00023400014",
      },
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
      amount: {
        currencyAmount: "100,998.00",
        cryptoAmount: "0.00023400014",
      },
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
      amount: {
        currencyAmount: "100,998.00",
        cryptoAmount: "0.00023400014",
      },
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
      amount: {
        currencyAmount: "100,998.00",
        cryptoAmount: "0.00023400014",
      },
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
      <Modal openModal={openModal} onClose={() => setOpenModal(false)}>
        <div className={styles.modalContainer}>
          <p className={styles.modalHeader}>Transaction details</p>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>User:</p>
            <p className={styles.value}>@Samuel12345</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction date:</p>
            <p className={styles.value}>Monday 23 Jan, 2023 07:52 AM</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction ID:</p>
            <p className={styles.value}>TX12345678909887776665</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction type:</p>
            <p className={styles.value}>Sell (Momo withdrawal)</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Sell Amount:</p>
            <p className={styles.value}>0.001234 BTC ($120.36)</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Rate:</p>
            <p className={styles.value}>100 ghs per Dollar</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Fees:</p>
            <p className={styles.value}>$1.26 (0.000897 BTC)</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Net payout Amount:</p>
            <p className={styles.value}>GHS 750,099.00</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Status:</p>
            <p className={styles.valueStatus}>Payment method is active</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Payment account:</p>
            <p className={styles.value}>Samuel samuel (MTN +2334567895566)</p>
          </div>
          <div className={styles.modalFooter}>
            <Button
              onClick={() => setOpenModal(false)}
              className={styles.modalButton}
              color="white"
            >
              Close
            </Button>
            <Button
              onClick={() => setOpenModal(false)}
              className={styles.modalButton}
              color="white"
            >
              Mark as complete
            </Button>
          </div>
        </div>
      </Modal>
      <Modal openModal={openAddModal} onClose={() => setOpenAddModal(false)}>
        <div className={styles.modalContainer}>
          <p className={styles.modalHeader}>Manual account Top-Up</p>
          <div className={styles.inputContainer}>
            <p>Transaction ID</p>
            <Input />
          </div>
          <div className={styles.inputContainer}>
            <p>Reference</p>
            <Input />
          </div>
          <div className={styles.inputContainer}>
            <p>Name on account</p>
            <Input />
          </div>
          <div className={styles.inputContainer}>
            <p>Amount</p>
            <Input />
          </div>
          <div className={styles.modalFooter}>
            <Button
              onClick={() => setOpenAddModal(false)}
              className={styles.modalButton}
              color="white"
            >
              Cancel
            </Button>
            <Button
              onClick={() => setOpenAddModal(false)}
              className={styles.modalButton}
            >
              Add to queue
            </Button>
          </div>
        </div>
      </Modal>
      <NavigationStep hideButton />
      <div className={styles.container}>
        <h3 className={styles.header}>Manual Approvals</h3>
        <p className={styles.subHeader}>120 Total pending</p>
        <div className={styles.tabContainer}>
          <div className={styles.tabItem}>Withdrawals</div>
          <div className={styles.topUpButton}>
            <div>
              <Button onClick={() => setOpenAddModal(true)} color="white">
                Manual account Top-Up
              </Button>
            </div>
          </div>
        </div>

        <div className={styles.searchContainer}>
          <div className={styles.searchHeader}>
            <img src="/icons/search.svg" />
            <input
              className={styles.input}
              placeholder="Type transaction reference"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div>
              <Button className={styles.searchButton}>Search</Button>
            </div>
          </div>
          {!search ? (
            <p className={styles.searchHint}>
              Search hint:{" "}
              <span>
                Enter up to 10 search items , separated by comma (,) to search
                multiple items
              </span>
            </p>
          ) : (
            <div className={styles.table}>
              <p className={styles.resultText}>5 result found!</p>
              <Table dataSource={dataSource} columns={columns} />
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
