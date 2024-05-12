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

const CARDS_COLUMNS = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
    render: (_: any, { username }: any) => (
      <p className={styles.username}>{username}</p>
    ),
  },
  {
    title: "Card number",
    dataIndex: "cardNumber",
    key: "cardNumber",
  },
  {
    title: "Exp. date",
    dataIndex: "expDate",
    key: "expDate",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Account balance",
    dataIndex: "accountBalance",
    key: "accountBalance",
  },
  {
    title: "Date created",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Status",
    dataIndex: "sstatus",
    key: "status",
    render: (_: any, { status }: any) => (
      <span
        style={{
          borderRadius: 16,
          padding: "12px 16px",
          backgroundColor: status === "Active" ? "#EDFCF2" : "#FAFAFA",
          color: status === "Active" ? "#087443" : "#424242",
        }}
      >
        {status}
      </span>
    ),
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

const CARDS_DATA = [
  {
    username: "@samuel12345",
    cardNumber: "ending in 9090",
    expDate: "12/25",
    type: "Mastercard",
    accountBalance: "$10.20",
    date: "12 may, 2024",
    status: "Active",
  },
  {
    username: "@samuel12345",
    cardNumber: "ending in 9090",
    expDate: "12/25",
    type: "Mastercard",
    accountBalance: "$10.20",
    date: "12 may, 2024",
    status: "Active",
  },
  {
    username: "@samuel12345",
    cardNumber: "ending in 9090",
    expDate: "12/25",
    type: "Mastercard",
    accountBalance: "$10.20",
    date: "12 may, 2024",
    status: "Active",
  },
  {
    username: "@samuel12345",
    cardNumber: "ending in 9090",
    expDate: "12/25",
    type: "Mastercard",
    accountBalance: "$10.20",
    date: "12 may, 2024",
    status: "Frozen",
  },
  {
    username: "@samuel12345",
    cardNumber: "ending in 9090",
    expDate: "12/25",
    type: "Mastercard",
    accountBalance: "$10.20",
    date: "12 may, 2024",
    status: "Active",
  },
];

export default function Search() {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [currentUser, setCurrentUser] = useState<any>({});
  const [searchType, setSearchType] = useState<string>("Buy");

  const onSearch = () => {
    setData(CARDS_DATA);
  };

  const showModal = (user: any) => {
    setCurrentUser(user);
    setOpenModal(true);
  };

  const getColumns = () => {
    return CARDS_COLUMNS;
  };

  return (
    <PageLayout title="Hone">
      <Modal
        openModal={openModal}
        onClose={() => setOpenModal(false)}
        headerCenter={
          <div className={styles.modalHeader}>
            <p>Details</p>
            <div className={styles.breadCrumb}>Cards</div>
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
              <p className={styles.key}>Cardholder name</p>
              <p className={styles.value}>Samuel Ade Samuel</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Card number</p>
              <p className={styles.value}> 5004 **** **** **** **** 9098</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Expiry date</p>
              <p className={styles.value}>12/26</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Type</p>
              <p className={styles.value}>Mastercard virtual</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Funding balance</p>
              <p className={styles.value}>$500.00</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Current balance</p>
              <p className={styles.value}>$500.00</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Limit</p>
              <p className={styles.value}>$5000/Mo</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Funding balance</p>
              <p className={styles.value}>$500.00</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>No of transactions</p>
              <p className={styles.value}>
                13{" "}
                <a>
                  View all transactions{" "}
                  <img src="/icons/arror-right-modal.svg" />
                </a>
              </p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>No of disputes</p>
              <p className={styles.value}>0 </p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Date requested</p>
              <p className={styles.value}>Monday 23 Jan, 2023 07:52 AM</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Date Activated</p>
              <p className={styles.value}>Monday 23 Jan, 2023 07:52 AM</p>
            </div>
            <div className={styles.divider} />
          </div>
          <div className={styles.modalFooter}>
            <div>
              <Button color="white">Set limit</Button>
            </div>
            <div>
              <Button color="white">Pause</Button>
            </div>
            <div>
              <Button className={styles.redButton}>block</Button>
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
          <h3 className={styles.header}>Cards</h3>
          <div>
            <Button color="white" onClick={() => router.back()}>
              <img src="/icons/arrow-left.svg" /> Back
            </Button>
          </div>
        </div>
        <div className={styles.searchContainer}>
          <div className={styles.searchCard}>
            <div className={styles.dropdownContainer}>
              <p className={styles.dropdownTitle}>Status</p>
              <Dropdown
                value={searchType}
                options={[
                  { title: "Active", value: "Active" },
                  { title: "In-active", value: "In-active" },
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
                action: () => router.push("/cards/details/1"),
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
