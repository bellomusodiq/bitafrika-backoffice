import React, { useState } from "react";
import PageLayout from "@/components/PageLayout";
import styles from "@/pages/swap/search.module.css";
import { Button, Skeleton, Tag } from "antd";
import { Table } from "antd";
import Modal from "@/components/Modal";
import axios from "axios";
import { BASE_URL } from "@/CONFIG";
import { useRouter } from "next/router";
import useCustomQuery from "@/hooks/useCustomQuery";

const REQUESTS_COLUMNS = [
  {
    title: "Transaction ID",
    dataIndex: "",
    key: "uniqId",
    render: (_: any, { uniqId }: any) => (
      <p className={styles.username}>{`${uniqId.slice(0, 6)}...${uniqId.slice(
        uniqId.length - 6
      )}`}</p>
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
    title: "Swap pair",
    key: "pair",
    render: (_: any, res: any) => {
      return (
        <div style={{ display: "flex" }}>
          <p>{res?.sourceCrypto}</p>
          <p style={{ color: "green", margin: "0 10px" }}>&rarr;</p>
          <p>{res?.destinationCrypto}</p>
        </div>
      );
    },
  },
  {
    title: "From",
    key: "from",
    render: (_: any, res: any) => {
      return (
        <p>
          {res?.sourceAmount} {res?.sourceCrypto}
        </p>
      );
    },
  },
  {
    title: "To",
    key: "to",
    render: (_: any, res: any) => {
      return (
        <p>
          {res?.destinationAmount} {res?.destinationCrypto}
        </p>
      );
    },
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (_: any, { status }: any) => (
      <Tag color={status === "success" ? "success" : "error"}>{status}</Tag>
    ),
  },
  {
    title: "Date",
    dataIndex: "createdOn",
    key: "date",
    width: "20%",
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
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentDetails, setCurrentDetails] = useState<any>({});
  const [params, setParams] = useState<string>("");

  let auth: any = {};
  if (typeof window !== "undefined" && localStorage.getItem("auth")) {
    auth = JSON.parse(localStorage.getItem("auth") || "");
  }

  const { isLoading, data: { data: result } = {} } = useCustomQuery({
    queryKey: ["swapSearch", params],
    enabled: params.length > 0,
    queryFn: async () => {
      const result = await axios.post(
        `${BASE_URL}/swap/search`,
        {
          query: params,
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

  const onSearch = () => {
    setParams(search);
  };

  const showModal = (temp: Record<string, string>) => {
    setCurrentDetails(temp);
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
            <div className={styles.breadCrumb}>Swap</div>
          </div>
        }
        headerLeft={
          <div className={styles.iconContainer}>
            <img src="/icons/receipt-check.svg" />
          </div>
        }
      >
        <div className={styles.modalContainer}>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>
              User:{" "}
              <span style={{ color: "black" }}>{currentDetails?.username}</span>
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction ID:</p>
            <p className={styles.value}>{currentDetails?.uniqId}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction Status:</p>
            <div className={styles.statusContainer}>
              <div className={styles.statusIndicator} />{" "}
              {currentDetails?.status}
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>From</p>
            <p className={styles.value}>
              {currentDetails?.sourceAmount} {currentDetails?.sourceCrypto}
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>To</p>
            <p className={styles.value}>
              {currentDetails?.destinationAmount}{" "}
              {currentDetails?.destinationCrypto}
            </p>
          </div>

          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction Date</p>
            <p className={styles.value}>{currentDetails?.createdOn}</p>
          </div>
        </div>
      </Modal>
      <div className={styles.container}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div>
            <Button type="text" onClick={router.back}>
              <img src="/icons/arrow-left.svg" />
            </Button>
          </div>
          <p className={styles.filterTitle}>Filter swap search results by</p>
        </div>
        <div className={styles.searchContainer}>
          <div className={styles.searchCard}>
            <div className={styles.searchHeader}>
              <img src="/icons/search.svg" />
              <input
                className={styles.input}
                placeholder="Transaction ID"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div>
              <Button
                loading={isLoading}
                onClick={onSearch}
                className={styles.searchButton}
              >
                Search
              </Button>
            </div>
          </div>
        </div>
        {isLoading ? (
          <Skeleton active style={{ margin: "20px 0" }} />
        ) : result && search === params ? (
          <div className={styles.table} style={{ overflow: "hidden" }}>
            <p className={styles.resultText}>
              {result?.data.length} result found!
            </p>
            <Table
              style={{
                fontFamily: "PP Telegraf",
                border: "1px solid var(--Gray-200, #EAECF0)",
                borderRadius: 12,
                boxShadow: "0px 7px 37px -24px rgba(0, 0, 0, 0.09)",
                overflow: "hidden",
              }}
              dataSource={result?.data.map((record: any) => ({
                ...record,
                action: () => showModal(record),
              }))}
              columns={REQUESTS_COLUMNS}
              loading={isLoading}
            />
          </div>
        ) : null}
      </div>
    </PageLayout>
  );
}
