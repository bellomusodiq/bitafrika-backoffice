import React, { useState } from "react";

import PageLayout from "@/components/PageLayout";
import styles from "@/pages/cards/search.module.css";
import NavigationStep from "@/components/NavigationStep";
import Button from "@/components/Button";
import { Table } from "antd";
import Modal from "@/components/Modal";
import axios from "axios";
import { BASE_URL } from "@/CONFIG";
import getToken from "@/utils/getToken";
import Dropdown from "@/components/Dropdown";
import { useRouter } from "next/router";

const COUNTRY_MAP: { [k: string]: string } = {
  GH: "Ghana",
  CM: "Cameroon",
  NG: "Nigeria",
};

const GIFTCRARDS_COLUMNS = [
  {
    title: "Transaction ID",
    dataIndex: "transactionId",
    key: "transactionId",
    render: (_: any, { transactionId }: any) => (
      <>
        {transactionId.slice(0, 6)}...
        {transactionId.slice(transactionId.length - 6)}
      </>
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
    title: "Card type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (_: any, { amount }: any) => <>${amount}</>,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (_: any, { status }: any) => (
      <div
        style={{
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

const GIFTCRARDS_DATA = [
  {
    transactionId: "1243342353453453453",
    username: "samuel12345",
    type: "Apple Itunes",
    amount: 100.99,
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
  {
    transactionId: "1243342353453453453",
    username: "samuel12345",
    type: "Apple Itunes",
    amount: 100.99,
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
  {
    transactionId: "1243342353453453453",
    username: "samuel12345",
    type: "Apple Itunes",
    amount: 100.99,
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
  {
    transactionId: "1243342353453453453",
    username: "samuel12345",
    type: "Apple Itunes",
    amount: 100.99,
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
  {
    transactionId: "1243342353453453453",
    username: "samuel12345",
    type: "Apple Itunes",
    amount: 100.99,
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
];

export default function Search() {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [currentUser, setCurrentUser] = useState<any>({});
  const [searchType, setSearchType] = useState<string>("Transaction ID");

  const onSearch = () => {
    switch (searchType) {
      case "Transaction ID":
        setData(GIFTCRARDS_DATA);
        break;
    }
  };

  const showModal = (user: any) => {
    setCurrentUser(user);
    setOpenModal(true);
  };

  const getColumns = () => {
    switch (searchType) {
      case "Transaction ID":
        return GIFTCRARDS_COLUMNS;
    }
  };

  const renderPlaceHolder = () => {
    switch (searchType) {
      case "Transaction ID":
        return "Enter giftcard transaction ID";
    }
  };

  return (
    <PageLayout title="Hone">
      <Modal
        openModal={openModal && searchType === "Transaction ID"}
        onClose={() => setOpenModal(false)}
        headerCenter={
          <div className={styles.modalHeader}>
            <p>Transaction details</p>
            <div className={styles.breadCrumb}>Giftcards</div>
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
              <p className={styles.value}>1234Y456342342342354</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Transaction Status</p>
              <div className={styles.value}>
                <div
                  style={{
                    padding: "4px 8px",
                    borderRadius: 16,
                    backgroundColor: "#EDFCF2",
                    color: "#087443",
                    textAlign: "center",
                  }}
                >
                  <span style={{ fontSize: 12 }}>Approved</span>
                </div>
              </div>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Card type</p>
              <p className={styles.value}>Googlepay ($100.00)</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Amount paid</p>
              <p className={styles.value}>100 USDT</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Recipient email</p>
              <p className={styles.value}>email@username.com</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Note</p>
              <p className={styles.value}>Note goes here</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Transaction date</p>
              <p className={styles.value}>Monday 23 Jan, 2023 07:52 AM</p>
            </div>
          </div>
        </>
      </Modal>

      <div className={styles.container}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button color="white" isText onClick={() => router.back()}>
            <img src="/icons/arrow-left.svg" />
          </Button>
          <h3 className={styles.header} style={{ marginLeft: 5 }}>
            Search
          </h3>
        </div>
        <div className={styles.searchContainer}>
          <div className={styles.searchCard}>
            <div className={styles.dropdownContainer}>
              <Dropdown
                value={searchType}
                options={[{ title: "Transaction ID", value: "Transaction ID" }]}
                onChange={(value) => {
                  setSearchType(String(value));
                  setData([]);
                }}
              />
            </div>
            <div className={styles.searchHeader}>
              <img src="/icons/search.svg" />
              <input
                className={styles.input}
                placeholder={renderPlaceHolder()}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div>
              <Button onClick={onSearch} className={styles.searchButton}>
                Search
              </Button>
            </div>
          </div>
        </div>
        {data.length === 0 ? (
          <p className={styles.searchHint}></p>
        ) : (
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
        )}
      </div>
    </PageLayout>
  );
}
