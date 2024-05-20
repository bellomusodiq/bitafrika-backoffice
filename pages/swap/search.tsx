import React, { useCallback, useState } from "react";

import PageLayout from "@/components/PageLayout";
import styles from "@/pages/swap/search.module.css";
import NavigationStep from "@/components/NavigationStep";
// import Button from "@/components/Button";
import { Button } from "antd";
import { Table } from "antd";
import Modal from "@/components/Modal";
import axios from "axios";
import { BASE_URL } from "@/CONFIG";
import getToken from "@/utils/getToken";
import Dropdown from "@/components/Dropdown";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

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
      <div className={styles.statusContainer}>
        <div className={styles.statusIndicator} /> {status}
      </div>
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
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [currentDetails, setCurrentDetails] = useState<any>({});

  let auth: any = {};
  if (typeof window !== "undefined" && localStorage.getItem("auth")) {
    auth = JSON.parse(localStorage.getItem("auth") || "");
  }

  const getSwapDetails = () => {
    const msg = "Something went wrong, please try again";
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/swap/search`,
        {
          query: search,
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
          setData(res.data.data);
        } else {
          const message = res.data.message || msg;
          toast.error(message);
        }
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        } else {
          toast.error(msg);
        }
      });
  };

  const onSearch = () => {
    getSwapDetails();
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
                loading={loading}
                onClick={onSearch}
                className={styles.searchButton}
              >
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
              dataSource={data.map((record: any) => ({
                ...record,
                action: () => showModal(record),
              }))}
              columns={REQUESTS_COLUMNS}
              loading={loading}
            />
          </div>
        )}
      </div>
    </PageLayout>
  );
}
