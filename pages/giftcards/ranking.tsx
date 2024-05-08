import React, { useState } from "react";

import PageLayout from "@/components/PageLayout";
import styles from "@/pages/giftcards/search.module.css";
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
    title: "Giftcard name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "No. of orders",
    dataIndex: "noOrders",
    key: "noOrders",
  },
  {
    title: "Total USD",
    dataIndex: "totalUsd",
    key: "totalUsd",
    render: (_: any, { totalUsd }: any) => <>${totalUsd}</>,
  },
];

const GIFTCRARDS_DATA = [
  {
    name: "Apple",
    noOrders: 1029,
    totalUsd: 1000.34,
  },
  {
    name: "Google playstore",
    noOrders: 1029,
    totalUsd: 1000.34,
  },
  {
    name: "Steam card",
    noOrders: 1029,
    totalUsd: 1000.34,
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

  const showModal = (user: any) => {
    setCurrentUser(user);
    setOpenModal(true);
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
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h3 className={styles.header}>Giftcard ranking</h3>
            <p className={styles.subHeader}>
              Date: 5th October — 12th October 2023
            </p>
            <p className={styles.subHeader}>Sort by: Highest to lowers</p>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
              <Button color="white" onClick={() => router.back()}>
                <img src="/icons/arrow-left.svg" /> Back
              </Button>
            </div>
            <div style={{ marginLeft: 18 }}>
              <Button onClick={() => {}}>Download</Button>
            </div>
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
            dataSource={GIFTCRARDS_DATA.map((user: any) => ({
              ...user,
              action: () => showModal(user),
            }))}
            columns={GIFTCRARDS_COLUMNS}
            loading={loading}
          />
        </div>
      </div>
    </PageLayout>
  );
}
