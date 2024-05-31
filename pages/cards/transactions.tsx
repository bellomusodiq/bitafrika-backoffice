import React, { useEffect, useState } from "react";

import PageLayout from "@/components/PageLayout";
import styles from "@/pages/cards/cards-orders.module.css";
import NavigationStep from "@/components/NavigationStep";
import Button from "@/components/Button";
import { DatePicker, Skeleton, Table, Tag } from "antd";
import Modal from "@/components/Modal";
import axios from "axios";
import { BASE_URL } from "@/CONFIG";
import getToken from "@/utils/getToken";
import Dropdown from "@/components/Dropdown";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";

const TRANSACTIONS_COLUMNS = [
  {
    title: "Transaction ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Merchant",
    dataIndex: "merchantName",
    key: "merchantName",
    render: (_: any, { merchantName }: any) => (
      <p className={styles.username}>{merchantName}</p>
    ),
  },
  {
    title: "Card",
    dataIndex: "maskPan",
    key: "maskPan",
  },
  {
    title: "Amount",
    dataIndex: "transactionAmount",
    key: "transactionAmount",
    render: (_: any, { transactionAmount }: any) => <>${transactionAmount}</>,
  },
  {
    title: "Type",
    dataIndex: "transactionType",
    key: "transactionType",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Status",
    dataIndex: "transactionStatus",
    key: "transactionStatus",
    render: (_: any, { transactionStatus }: any) => (
      <Tag color={transactionStatus === "Approved" ? "success" : "warning"}>
        {transactionStatus}
      </Tag>
    ),
  },
  {
    title: "Date",
    dataIndex: "transactionTime",
    key: "transactionTime",
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
  const [pageInfo, setPageInfo] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  let auth: any = {};
  if (typeof window !== "undefined" && localStorage.getItem("auth")) {
    auth = JSON.parse(localStorage.getItem("auth") || "");
  }

  const getTransactions = () => {
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/virtual-cards/transactions`,
        {
          page: currentPage,
        },
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res: any) => {
        setLoading(false);
        if (res.data.success) {
          setData(res.data.data.transactions);
          setPageInfo(res.data.data.pageInfo);
        }
      })
      .catch((e) => {
        if (e?.response?.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
      });
  };

  const showModal = (user: any) => {
    setCurrentUser(user);
    setOpenModal(true);
  };

  const getColumns = () => {
    return TRANSACTIONS_COLUMNS;
  };

  useEffect(() => {
    getTransactions();
  }, [currentPage]);

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
                User:{" "}
                <span style={{ color: "black" }}>@Samuel12345 (missing)</span>
              </p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Transaction ID</p>
              <p className={styles.value}>{currentUser?.id}</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Amount</p>
              <p className={styles.value}>${currentUser?.transactionAmount}</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Merchant</p>
              <p className={styles.value}>{currentUser?.merchantName}</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Card</p>
              <p className={styles.value}>{currentUser?.maskPan}</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Transaction type</p>
              <p className={styles.value}>{currentUser?.transactionType}</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Total</p>
              <p className={styles.value}>${currentUser?.transactionAmount}</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Description</p>
              <p className={styles.value}>{currentUser?.description}</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Status</p>
              <span
                style={{
                  borderRadius: 16,
                  padding: "12px 16px",
                  backgroundColor:
                    currentUser?.transactionStatus === "Approved"
                      ? "#EDFCF2"
                      : "#FAFAFA",
                  color:
                    currentUser?.transactionStatus === "Approved"
                      ? "#087443"
                      : "#424242",
                }}
              >
                {currentUser?.transactionStatus}
              </span>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Transaction date</p>
              <p className={styles.value}>{currentUser?.createdAt}</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Location</p>
              <p className={styles.value}>
                {currentUser?.merchantCity}, {currentUser?.merchantCountry}
              </p>
            </div>
          </div>
          <div className={styles.modalFooter}>
            <div>
              <Button onClick={() => setOpenModal(false)}>Close</Button>
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
          <Button color="white" isText onClick={router.back}>
            <img src="/icons/arrow-left.svg" />
          </Button>
          <h3 className={styles.header}>Transactions</h3>
        </div>

        {loading ? (
          <Skeleton active style={{ margin: "30px 0" }} />
        ) : (
          <div className={styles.table} style={{ overflow: "hidden" }}>
            <p className={styles.resultText}>
              {pageInfo?.totalCount} result found!
            </p>
            <Table
              style={{
                fontFamily: "PP Telegraf",
                border: "1px solid var(--Gray-200, #EAECF0)",
                borderRadius: 12,
                boxShadow: "0px 7px 37px -24px rgba(0, 0, 0, 0.09)",
                overflow: "hidden",
              }}
              dataSource={data?.map((item: any) => ({
                ...item,
                action: () => showModal(item),
              }))}
              columns={TRANSACTIONS_COLUMNS}
              loading={loading}
              pagination={false}
            />
            <Pagination pageInfo={pageInfo} setCurrentPage={setCurrentPage} />
          </div>
        )}
      </div>
    </PageLayout>
  );
}
