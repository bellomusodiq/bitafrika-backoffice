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

const REQUESTS_COLUMNS = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
    render: (_: any, { username }: any) => (
      <p className={styles.username}>{username}</p>
    ),
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Full name",
    dataIndex: "fullName",
    key: "fullName",
  },
  {
    title: "Phone number",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: "KYC details",
    dataIndex: "kycDetails",
    key: "kycDetails",
  },
  {
    title: "KYC ID",
    dataIndex: "kycId",
    key: "kycId",
    render: (_: any, { kycId }: any) => (
      <div className={styles.idContainer}>
        <img src="/icons/document.svg" /> {kycId}
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

const REQUESTS_DATA = [
  {
    username: "@samuel12345",
    type: "Mastercard",
    fullName: "Samuel samuel",
    phoneNumber: "+234800000000",
    kycDetails: "Samuelkyc.doc",
    kycId: "docs.jpg",
  },
  {
    username: "@samuel12345",
    type: "Mastercard",
    fullName: "Samuel samuel",
    phoneNumber: "+234800000000",
    kycDetails: "Samuelkyc.doc",
    kycId: "docs.jpg",
  },
  {
    username: "@samuel12345",
    type: "Mastercard",
    fullName: "Samuel samuel",
    phoneNumber: "+234800000000",
    kycDetails: "Samuelkyc.doc",
    kycId: "docs.jpg",
  },
  {
    username: "@samuel12345",
    type: "Mastercard",
    fullName: "Samuel samuel",
    phoneNumber: "+234800000000",
    kycDetails: "Samuelkyc.doc",
    kycId: "docs.jpg",
  },
  {
    username: "@samuel12345",
    type: "Mastercard",
    fullName: "Samuel samuel",
    phoneNumber: "+234800000000",
    kycDetails: "Samuelkyc.doc",
    kycId: "docs.jpg",
  },
];

export default function Search() {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(REQUESTS_DATA);
  const [currentUser, setCurrentUser] = useState<any>({});
  const [searchType, setSearchType] = useState<string>("Buy");

  const onSearch = () => {
    setData(REQUESTS_DATA);
  };

  const showModal = (user: any) => {
    setCurrentUser(user);
    setOpenModal(true);
  };

  const getColumns = () => {
    return REQUESTS_COLUMNS;
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
      <div className={styles.container}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h3 className={styles.header}>Pending Requests</h3>
          <div>
            <Button color="white" onClick={() => router.back()}>
              <img src="/icons/arrow-left.svg" /> Back
            </Button>
          </div>
        </div>
        <p className={styles.subHeader}>{data.length} pending</p>

        {data.length === 0 ? (
          <></>
        ) : (
          <div className={styles.table} style={{ overflow: "hidden" }}>
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
