import React, { useState } from "react";

import PageLayout from "@/components/PageLayout";
import styles from "@/pages/transactions/transactions.module.css";
import NavigationStep from "@/components/NavigationStep";
import Button from "@/components/Button";
import { Checkbox, DatePicker, Divider, Space, Table } from "antd";
import Modal from "@/components/Modal";
import DropModal from "@/components/DropModal";
import Input from "@/components/Input/Input";

const columns = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "From",
    dataIndex: "from",
    key: "from",
    render: (_: any, { from, onCopy }: any) => (
      <div onClick={onCopy} className={styles.transactionId}>
        <p>
          {from?.slice(0, 8)} . . .{from?.slice(from?.length - 5)}
        </p>
      </div>
    ),
  },
  {
    title: "Asset",
    dataIndex: "asset",
    key: "asset",
  },
  {
    title: "Asset amount",
    dataIndex: "assetAmount",
    key: "assetAmount",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
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
  const [openFilter, setOpenFilter] = useState<boolean>(false);

  const dataSource = [
    {
      key: "1",
      username: "@username",
      asset: "Bitcoin",
      amount: "$7500.99",
      from: "TRX123456TRX123",
      assetAmount: "1.23455678 BTC",
      date: "Thur 23 Feb, 2023",
      action: () => setOpenModal(true),
    },
    {
      key: "2",
      username: "@username",
      asset: "Bitcoin",
      amount: "$7500.99",
      from: "TRX123456TRX123",
      assetAmount: "1.23455678 BTC",
      date: "Thur 23 Feb, 2023",
      action: () => setOpenModal(true),
    },
    {
      key: "3",
      username: "@username",
      asset: "Bitcoin",
      amount: "$7500.99",
      from: "TRX123456TRX123",
      assetAmount: "1.23455678 BTC",
      date: "Thur 23 Feb, 2023",
      action: () => setOpenModal(true),
    },
    {
      key: "4",
      username: "@username",
      asset: "Bitcoin",
      amount: "$7500.99",
      from: "TRX123456TRX123",
      assetAmount: "1.23455678 BTC",
      date: "Thur 23 Feb, 2023",
      action: () => setOpenModal(true),
    },
    {
      key: "5",
      username: "@username",
      asset: "Bitcoin",
      amount: "$7500.99",
      from: "TRX123456TRX123",
      assetAmount: "1.23455678 BTC",
      date: "Thur 23 Feb, 2023",
      action: () => setOpenModal(true),
    },
  ];

  return (
    <PageLayout title="Hone">
      <Modal
        openModal={openModal}
        onClose={() => setOpenModal(false)}
        headerLeft={
          <div className={styles.receiptContainer}>
            <img src="/icons/receipt-check.svg" />
          </div>
        }
        headerCenter={
          <div className={styles.modalHeader}>
            Transaction details <span>Sell (Momo withdrawal)</span>
          </div>
        }
      >
        <>
          <Divider style={{ margin: 0 }} />
          <div className={styles.modalContainer}>
            <div className={styles.content}>
              <p className={styles.modalText}>
                User: <span>@Samuel12345</span>
              </p>
              <p className={styles.modalText}>
                Transaction date: <span>Monday 23 Jan, 2023 07:52 AM</span>
              </p>
            </div>
            <Divider style={{ margin: 0 }} />
            <p className={styles.modalText}>
              Transaction ID: <span>TX12345678909887776665</span>
            </p>
            <Divider style={{ margin: 0 }} />
            <p className={styles.modalText}>
              Transaction type: <span>Sell (Momo Withdrawal)</span>
            </p>
            <p className={styles.modalText}>
              Transaction Status:{" "}
              <div className={styles.success}>
                <div />
                Successful
              </div>
            </p>
            <Divider style={{ margin: 0 }} />
            <p className={styles.modalText}>
              Asset: <span>BITCOIN</span>
            </p>
            <Divider style={{ margin: 0 }} />
            <p className={styles.modalText}>
              Asset amount:{" "}
              <span style={{ color: "#F79009" }}>-0.001234 BTC</span>
            </p>
            <Divider style={{ margin: 0 }} />
            <p className={styles.modalText}>
              Amount: <span>$7500.99</span>
            </p>
            <Divider style={{ margin: 0 }} />
            <p className={styles.modalText}>
              Rate: <span>100 ghs per Dollar</span>
            </p>
            <Divider style={{ margin: 0 }} />
            <p className={styles.modalText}>
              Fees: <span>$1.20 (~200 GHS)</span>
            </p>
            <Divider style={{ margin: 0 }} />
            <p className={styles.modalText}>
              Total GHS: <span>GHS 750,099.00</span>
            </p>
            <Divider style={{ margin: 0 }} />
            <p className={styles.modalText}>
              Payment account: <span>Samuel samuel (+2334567895566)</span>
            </p>
          </div>
          <Divider style={{ marginBottom: 16 }} />
          <div className={styles.modalFooter}>
            <div>
              <Button onClick={() => setOpenModal(false)} color="white">
                <div className={styles.buttonContainer}>
                  Next <img src="/icons/arrow-right.svg" />
                </div>
              </Button>
            </div>
            <div className={styles.closeDownloadButtons}>
              <div style={{ marginRight: 16 }}>
                <Button onClick={() => setOpenModal(false)} color="white">
                  Close
                </Button>
              </div>
              <div>
                <Button onClick={() => setOpenModal(false)}>Download</Button>
              </div>
            </div>
          </div>
        </>
      </Modal>
      <NavigationStep
        hideButton
        navigation={["Home", "Transactions", "Crypto Transactions"]}
      />
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <h3 className={styles.header}>Transactions</h3>
          <div className={styles.headerButtons}>
            <div style={{ marginRight: 24 }}>
              <Button color="white">
                <div className={styles.printButton}>
                  <img src="/icons/printer.svg" />
                  Print
                </div>
              </Button>
            </div>
            <div>
              <Button color="white">
                <div className={styles.printButton}>
                  <img src="/icons/download.svg" />
                  Download
                </div>
              </Button>
            </div>
          </div>
        </div>
        <p className={styles.subHeader}>1000 Total transactions</p>
        <div className={styles.tabContainer}>
          <div className={styles.tabItem}>
            Crypto transactions <span>300</span>
          </div>
        </div>
        <div className={styles.filterActions}>
          <DropModal
            open={openFilter}
            onToggle={setOpenFilter}
            title={
              <div className={styles.dropModal}>
                <img
                  src="/icons/plus.svg"
                  width={14}
                  height={14}
                  style={{ marginTop: -5, marginRight: 10 }}
                />
                Add filter
              </div>
            }
          >
            <div className={styles.dropModalContainer}>
              <p className={styles.filterTitle}>status</p>
              <Checkbox className={styles.checkbox}>Successful</Checkbox>
              <Checkbox className={styles.checkbox}>Failed</Checkbox>
              <Checkbox className={styles.checkbox}>Pending</Checkbox>
              <Divider />
              <p className={styles.filterTitle}>Period</p>
              <DatePicker.RangePicker
                style={{ marginTop: 10 }}
                direction="rtl"
              />
              <Divider />
              <p className={styles.filterTitle}>Users</p>
              <Input className={styles.nameInput} placeholder="name" />
              <Divider style={{ marginTop: 30 }} />
              <div className={styles.dropModalFooter}>
                <Button className={styles.dropModalButton} color="white">
                  Clear
                </Button>
                <Button className={styles.dropModalButton2}>
                  Apply filter
                </Button>
              </div>
            </div>
          </DropModal>
          <div>
            <Button color="white">
              <div className={styles.recordTransaction}>
                <img src="/icons/plus-blue.svg" />
                Record transaction
              </div>
            </Button>
          </div>
        </div>
        <div className={styles.searchContainer}>
          <div className={styles.table} style={{overflow: "hidden"}}>
            <p className={styles.resultText}>5 result found!</p>
            <Table
              style={{
                fontFamily: "PP Telegraf",
                border: "1px solid var(--Gray-200, #EAECF0)",
                borderRadius: 12,
                boxShadow: "0px 7px 37px -24px rgba(0, 0, 0, 0.09)",
                overflow: "hidden"
              }}
              dataSource={dataSource}
              columns={columns}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
