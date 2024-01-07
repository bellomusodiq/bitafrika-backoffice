import React, { useState } from "react";

import PageLayout from "@/components/PageLayout";
import styles from "@/pages/cards/cards-orders.module.css";
import NavigationStep from "@/components/NavigationStep";
import Button from "@/components/Button";
import { DatePicker, Table } from "antd";
import Modal from "@/components/Modal";
import axios from "axios";
import { BASE_URL } from "@/CONFIG";
import getToken from "@/utils/getToken";
import Dropdown from "@/components/Dropdown";
import { useRouter } from "next/router";

const TRANSACTIONS_COLUMNS = [
  {
    title: "Transaction ID",
    dataIndex: "transactionId",
    key: "transactionId",
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Merchant",
    dataIndex: "merchant",
    key: "merchant",
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
          <Button onClick={action}>Review</Button>
        </div>
      </div>
    ),
  },
];

const TRANSACTIONS_DATA = [
  {
    transactionId: "#12366...9934",
    username: "@samuel12345",
    amount: "$40.90",
    merchant: "Ubereats",
    total: "$40.90",
    status: "Successful",
    date: "Thur 12 Dec 2023",
  },
  {
    transactionId: "#12366...9934",
    username: "@samuel12345",
    amount: "$40.90",
    merchant: "Ubereats",
    total: "$40.90",
    status: "Successful",
    date: "Thur 12 Dec 2023",
  },
  {
    transactionId: "#12366...9934",
    username: "@samuel12345",
    amount: "$40.90",
    merchant: "Ubereats",
    total: "$40.90",
    status: "Successful",
    date: "Thur 12 Dec 2023",
  },
  {
    transactionId: "#12366...9934",
    username: "@samuel12345",
    amount: "$40.90",
    merchant: "Ubereats",
    total: "$40.90",
    status: "Successful",
    date: "Thur 12 Dec 2023",
  },
  {
    transactionId: "#12366...9934",
    username: "@samuel12345",
    amount: "$40.90",
    merchant: "Ubereats",
    total: "$40.90",
    status: "Successful",
    date: "Thur 12 Dec 2023",
  },
  {
    transactionId: "#12366...9934",
    username: "@samuel12345",
    amount: "$40.90",
    merchant: "Ubereats",
    total: "$40.90",
    status: "Successful",
    date: "Thur 12 Dec 2023",
  },
];

export default function Search() {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(TRANSACTIONS_DATA);
  const [currentUser, setCurrentUser] = useState<any>({});
  const [searchType, setSearchType] = useState<string>("Buy");

  const onSearch = () => {
    setData(TRANSACTIONS_DATA);
  };

  const showModal = (user: any) => {
    setCurrentUser(user);
    setOpenModal(true);
  };

  const getColumns = () => {
    return TRANSACTIONS_COLUMNS;
  };

  return (
    <PageLayout title="Hone">
      <Modal
        openModal={openModal}
        onClose={() => setOpenModal(false)}
        headerCenter={
          <div className={styles.modalHeader}>
            <p>Details</p>
            <div className={styles.breadCrumb}>Transactions</div>
          </div>
        }
      >
        <>
          <div className={styles.modalContainer}>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>
                User: <span style={{ color: "black" }}>@Samuel12345</span>
              </p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Transaction ID</p>
              <p className={styles.value}>TX12345678909887776665</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Amount</p>
              <p className={styles.value}>$9.99</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Merchant</p>
              <p className={styles.value}>AppleMusic.com</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Conversion fees</p>
              <p className={styles.value}>11.2GHS / USD</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Total</p>
              <p className={styles.value}>$100.69</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Description</p>
              <p className={styles.value}>Description goes here</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Status</p>
              <p className={styles.statusContainer}>
                <div className={styles.statusIndicator} />
                Successful
              </p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Transaction date</p>
              <p className={styles.value}>Monday 23 Jan, 2023 07:52 AM</p>
            </div>
          </div>
          <div className={styles.modalFooter}>
            <div>
              <Button>Close</Button>
            </div>
          </div>
        </>
      </Modal>
      <div className={styles.container}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h3 className={styles.header}>Transactions</h3>
          <div>
            <Button color="white" onClick={router.back}>
              <img src="/icons/arrow-left.svg" /> Back
            </Button>
          </div>
        </div>

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
            dataSource={data.map((user: any) => ({
              ...user,
              action: () => showModal(user),
            }))}
            columns={getColumns()}
            loading={loading}
          />
        </div>
      </div>
    </PageLayout>
  );
}
