import React, { useState } from "react";

import PageLayout from "@/components/PageLayout";
import styles from "@/pages/search/users.module.css";
import NavigationStep from "@/components/NavigationStep";
import Button from "@/components/Button";
import { Table } from "antd";
import Modal from "@/components/Modal";

const columns = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "#Transaction ID",
    dataIndex: "transactionId",
    key: "transactionId",
  },
  {
    title: "Amount (USD)",
    dataIndex: "amountUSD",
    key: "amountUSD",
  },
  {
    title: "Amount (GHS)",
    dataIndex: "amount",
    key: "amount",
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

  const dataSource = [
    {
      key: "1",
      username: "Mike",
      transactionId: "#22002200002",
      phoneNumber: "+234812325600",
      amountUSD: "$400",
      amount: "GHS",
      action: () => setOpenModal(true),
    },
    {
      key: "3",
      username: "Mike",
      transactionId: "#22002200002",
      phoneNumber: "+234812325600",
      amountUSD: "$400",
      amount: "GHS",
      action: () => setOpenModal(true),
    },
    {
      key: "3",
      username: "Mike",
      transactionId: "#22002200002",
      phoneNumber: "+234812325600",
      amountUSD: "$400",
      amount: "GHS",
      action: () => setOpenModal(true),
    },
    {
      key: "4",
      username: "Mike",
      transactionId: "#22002200002",
      phoneNumber: "+234812325600",
      amountUSD: "$400",
      amount: "GHS",
      action: () => setOpenModal(true),
    },
    {
      key: "5",
      username: "Mike",
      transactionId: "#22002200002",
      phoneNumber: "+234812325600",
      amountUSD: "$400",
      amount: "GHS",
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
        <h3 className={styles.header}>Search</h3>
        <div className={styles.tabContainer}>
          <div className={styles.tabItem}>Search Momo withdrawal</div>
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
