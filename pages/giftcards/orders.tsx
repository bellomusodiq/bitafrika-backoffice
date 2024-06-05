import React, { useState } from "react";
import PageLayout from "@/components/PageLayout";
import styles from "@/pages/giftcards/search.module.css";
import Button from "@/components/Button";
import { Table, Button as AntdButton, Tag, Skeleton } from "antd";
import Modal from "@/components/Modal";
import axios from "axios";
import { BASE_URL } from "@/CONFIG";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import useCustomQuery from "@/hooks/useCustomQuery";
import Pagination from "@/components/Pagination";

const GIFTCRARDS_COLUMNS = [
  {
    title: "Transaction ID",
    dataIndex: "transId",
    key: "transId",
    render: (_: any, { transId }: any) => (
      <>
        {transId.slice(0, 6)}...
        {transId.slice(transId.length - 6)}
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
    dataIndex: "cardType",
    key: "cardType",
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
      // <div
      //   style={{
      //     borderRadius: 16,
      //     backgroundColor: "#EDFCF2",
      //     color: "#087443",
      //     textAlign: "center",
      //   }}
      // >
      //   <span style={{ fontSize: 12 }}>{status}</span>
      // </div>
      <Tag color={status === "success" ? "success" : "error"}>{status}</Tag>
    ),
  },
  {
    title: "Date",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "Actions",
    dataIndex: "action",
    render: (_: any, { action }: any) => (
      <div className={styles.actionButton}>
        <Button onClick={action}>View</Button>
      </div>
    ),
  },
];

interface IProps {
  status: string;
  from: string;
  to: string;
}

export default function Search({ status, from, to }: IProps) {
  const router = useRouter();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any>({});
  const [currentPage, setCurrentPage] = useState<number>(1);

  let auth: any = {};
  if (typeof window !== "undefined" && localStorage.getItem("auth")) {
    auth = JSON.parse(localStorage.getItem("auth") || "");
  }

  const { isLoading, data: { data: result } = {} } = useCustomQuery({
    queryKey: ["giftCardTransactions", status, from, to, currentPage],
    enabled: status.length > 0 && from.length > 0 && to.length > 0,
    queryFn: async () => {
      const result = await axios.post(
        `${BASE_URL}/gift-cards/transactions`,
        {
          status,
          startDate: from,
          endDate: to,
          page: currentPage,
        },
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      );
      return result;
    },
  });

  const showModal = (user: any) => {
    setCurrentUser(user);
    setOpenModal(true);
  };

  return (
    <PageLayout title="Hone">
      <Modal
        openModal={openModal}
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
                User:{" "}
                <span style={{ color: "black" }}>@{currentUser?.username}</span>
              </p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Transaction ID</p>
              <p className={styles.value}>{currentUser?.transId}</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Transaction Status</p>
              <Tag
                color={status === "failed" ? "error" : "success"}
                style={{ textTransform: "capitalize", width: "fit-content" }}
              >
                {currentUser?.status}
              </Tag>
              {/* <div className={styles.value}>
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
              </div> */}
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Card type</p>
              <p className={styles.value}>{currentUser?.cardType}</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Amount paid</p>
              <p className={styles.value}>{currentUser?.amount} USDT</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Recipient email</p>
              <p className={styles.value}>{currentUser?.recipient}</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Note</p>
              <p className={styles.value}>{currentUser?.note}</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Transaction date</p>
              <p className={styles.value}>{currentUser?.createdAt}</p>
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
          <div>
            <AntdButton type="text" onClick={() => router.push("/giftcards")}>
              <img src="/icons/arrow-left.svg" />
            </AntdButton>
          </div>
          <p className={styles.filterTitle}>Giftcard orders results</p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          {/* <p className={styles.subHeader}> */}
          <p className={styles.subHeader}>
            Date: {from && new Date(from).toDateString()} -{" "}
            {to && new Date(to).toDateString()}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <p className={styles.subHeader}>Status:</p>
            <Tag
              color={status === "failed" ? "error" : "success"}
              style={{ textTransform: "capitalize", width: "fit-content" }}
            >
              {status}
            </Tag>
          </div>
        </div>
        {/* <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            
            <p className={styles.subHeader}>
              Date: 5th October — 12th October 2023
            </p>
            <p className={styles.subHeader}>Staus: Successful</p>
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
        </div> */}

        {isLoading ? (
          <Skeleton active style={{ marginTop: 20 }} />
        ) : result?.data ? (
          <div className={styles.table} style={{ overflow: "hidden" }}>
            <p className={styles.resultText}>
              {result?.data.pageInfo.totalCount ||
                result?.data?.transactions.length}{" "}
              result found!
            </p>
            <Table
              style={{
                fontFamily: "PP Telegraf",
                border: "1px solid var(--Gray-200, #EAECF0)",
                borderRadius: 12,
                boxShadow: "0px 7px 37px -24px rgba(0, 0, 0, 0.09)",
                overflow: "hidden",
              }}
              dataSource={result?.data?.transactions.map((user: any) => ({
                ...user,
                action: () => showModal(user),
              }))}
              columns={GIFTCRARDS_COLUMNS}
              loading={isLoading}
              pagination={false}
            />
            <Pagination
              pageInfo={result?.data?.pageInfo}
              setCurrentPage={setCurrentPage}
            />
          </div>
        ) : null}
      </div>
    </PageLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { status, from, to } = context.query;
  return {
    props: {
      status,
      from,
      to,
    },
  };
};
