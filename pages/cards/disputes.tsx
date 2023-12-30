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

const DISPUTES_COLUMNS = [
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
    title: "Card number",
    dataIndex: "cardNumber",
    key: "cardNumber",
  },
  {
    title: "Dispute amount",
    dataIndex: "disputeAmount",
    key: "disputeAmount",
  },
  {
    title: "Merchant name",
    dataIndex: "merchantName",
    key: "merchantName",
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
          <Button onClick={action}>Review</Button>
        </div>
      </div>
    ),
  },
];

const DISPUTES_DATA = [
  {
    transactionId: "#12345566...9934",
    username: "@samuel12345",
    cardNumber: "Ending in 0000",
    disputeAmount: "$9.99",
    merchantName: "SpotifyNG",
    date: "Thur 18th jan 2023",
  },
  {
    transactionId: "#12345566...9934",
    username: "@samuel12345",
    cardNumber: "Ending in 0000",
    disputeAmount: "$9.99",
    merchantName: "SpotifyNG",
    date: "Thur 18th jan 2023",
  },
  {
    transactionId: "#12345566...9934",
    username: "@samuel12345",
    cardNumber: "Ending in 0000",
    disputeAmount: "$9.99",
    merchantName: "SpotifyNG",
    date: "Thur 18th jan 2023",
  },
  {
    transactionId: "#12345566...9934",
    username: "@samuel12345",
    cardNumber: "Ending in 0000",
    disputeAmount: "$9.99",
    merchantName: "SpotifyNG",
    date: "Thur 18th jan 2023",
  },
  {
    transactionId: "#12345566...9934",
    username: "@samuel12345",
    cardNumber: "Ending in 0000",
    disputeAmount: "$9.99",
    merchantName: "SpotifyNG",
    date: "Thur 18th jan 2023",
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
    setData(DISPUTES_DATA);
  };

  const showModal = (user: any) => {
    setCurrentUser(user);
    setOpenModal(true);
  };

  const getColumns = () => {
    return DISPUTES_COLUMNS;
  };

  return (
    <PageLayout title="Hone">
      <Modal
        openModal={openModal}
        onClose={() => setOpenModal(false)}
        headerCenter={
          <div className={styles.modalHeader}>
            <p>Details</p>
            <div className={styles.breadCrumb}>Dispute</div>
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
              <p className={styles.key}>Cardholder name</p>
              <p className={styles.value}>Samuel Ade Samuel</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Card number</p>
              <p className={styles.value}>ending in 9086</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Dispute amount</p>
              <p className={styles.value}>$50.90</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Merchant name</p>
              <p className={styles.value}>SpotifyNG</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Contact</p>
              <p className={styles.value}>01234567890</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Transaction date</p>
              <p className={styles.value}>Monday 23 Jan, 2023 07:52 AM</p>
            </div>
          </div>
          <div className={styles.modalFooter}>
            <div>
              <Button>Resolved</Button>
            </div>
          </div>
        </>
      </Modal>
      <NavigationStep hideButton navigation={["Cards", "Disputes"]} />
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
