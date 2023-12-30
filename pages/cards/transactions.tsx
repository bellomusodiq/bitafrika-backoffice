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
  const [search, setSearch] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
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
      <NavigationStep hideButton navigation={["Cards", "Transactions"]} />
      <div className={styles.container}>
        <p className={styles.filterTitle}>Filter results by</p>
        <div className={styles.searchContainer}>
          <div className={styles.searchCard}>
            <div className={styles.dropdownContainer}>
              <p className={styles.dropdownTitle}>Date range</p>
              <DatePicker.RangePicker style={{ height: 48 }} />
            </div>
            <div className={styles.dropdownContainer}>
              <p className={styles.dropdownTitle}>Status</p>
              <Dropdown
                value={searchType}
                options={[
                  { title: "Successful", value: "Successful" },
                  { title: "Pending", value: "Pending" },
                  { title: "Failed", value: "Failed" },
                ]}
                onChange={(value) => {
                  setSearchType(String(value));
                  setData([]);
                }}
              />
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <div>
                <Button onClick={onSearch} className={styles.searchButton}>
                  Apply filter
                </Button>
              </div>
            </div>
          </div>
        </div>
        {data.length === 0 ? (
          <></>
        ) : (
          <div className={styles.table}>
            <p className={styles.resultText}>{data.length} result found!</p>
            <Table
              style={{ fontFamily: "PP Telegraf" }}
              dataSource={data.map((user: any) => ({
                ...user,
                action: () => showModal(user),
              }))}
              columns={getColumns()}
              loading={loading}
            />
          </div>
        )}
      </div>
    </PageLayout>
  );
}
