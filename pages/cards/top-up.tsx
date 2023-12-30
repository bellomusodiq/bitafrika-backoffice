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

const TOPUP_COLUMNS = [
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
    title: "Card",
    dataIndex: "card",
    key: "card",
  },
  {
    title: "Transaction type",
    dataIndex: "transactionType",
    key: "transactionType",
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

const TOPUP_DATA = [
  {
    transactionId: "#12345566...9934",
    username: "@samuel12345",
    card: "Ending in 0000",
    transactionType: "Momo to bank",
  },
  {
    transactionId: "#12345566...9934",
    username: "@samuel12345",
    card: "Ending in 0000",
    transactionType: "Momo to bank",
  },
  {
    transactionId: "#12345566...9934",
    username: "@samuel12345",
    card: "Ending in 0000",
    transactionType: "Momo to bank",
  },
  {
    transactionId: "#12345566...9934",
    username: "@samuel12345",
    card: "Ending in 0000",
    transactionType: "Momo to bank",
  },
  {
    transactionId: "#12345566...9934",
    username: "@samuel12345",
    card: "Ending in 0000",
    transactionType: "Momo to bank",
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
    setData(TOPUP_DATA);
  };

  const showModal = (user: any) => {
    setCurrentUser(user);
    setOpenModal(true);
  };

  const getColumns = () => {
    return TOPUP_COLUMNS;
  };

  return (
    <PageLayout title="Hone">
      <Modal
        openModal={openModal}
        onClose={() => setOpenModal(false)}
        headerCenter={
          <div className={styles.modalHeader}>
            <p>Details</p>
            <div className={styles.breadCrumb}>Requests</div>
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
              <p className={styles.key}>Username/ID</p>
              <p className={styles.value}>Samuel Ade Samuel</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Phone number</p>
              <p className={styles.value}>+233 908 000 0000</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Card type</p>
              <p className={styles.value}>Mastercard virtual</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Address</p>
              <p className={styles.value}>
                123 street name, city, state, country
              </p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>KYC ID</p>
              <p className={styles.value}>A0123WZ34</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Funding amount</p>
              <p className={styles.value}>$100.69</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Funding Method</p>
              <p className={styles.value}>USDT</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Date requested</p>
              <p className={styles.value}>Monday 23 Jan, 2023 07:52 AM</p>
            </div>
          </div>
          <div className={styles.modalFooter}>
            <div>
              <Button color="white">Decline</Button>
            </div>
            <div>
              <Button>Approve</Button>
            </div>
          </div>
        </>
      </Modal>
      <NavigationStep hideButton navigation={["Cards", "Top up"]} />
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
