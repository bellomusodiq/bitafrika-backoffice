import React, { useEffect, useState } from "react";

import PageLayout from "@/components/PageLayout";
import styles from "@/pages/transactions/transactions.module.css";
import NavigationStep from "@/components/NavigationStep";
import Button from "@/components/Button";
import { DatePicker, Skeleton, Table, Tag, message } from "antd";
import Modal from "@/components/Modal";
import axios from "axios";
import { BASE_URL } from "@/CONFIG";
import getToken from "@/utils/getToken";
import Dropdown from "@/components/Dropdown";
import formatDate from "@/utils/formatDate";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";
import Pagination from "@/components/Pagination";
import Link from "next/link";

const COUNTRY_MAP: { [k: string]: string } = {
  GH: "Ghana",
  CM: "Cameroon",
  NG: "Nigeria",
};

export default function Search() {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [currentGiftcard, setCurrentGiftcard] = useState<any>({});
  const [searchType, setSearchType] = useState<string>("Giftcards");
  const [statusType, setStatusType] = useState<string>("success");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [pageInfo, setPageInfo] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const GIFTCRARDS_COLUMNS = [
    {
      title: "TRANSACTIONS",
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
        <Link href={`users/detail/${username}`} className={styles.username}>
          {username}
        </Link>
      ),
    },
    {
      title: "Card type",
      dataIndex: "type",
      key: "type",
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
          <div>
            <Button onClick={action}>View</Button>
          </div>
        </div>
      ),
    },
  ];

  let auth: any = {};
  if (typeof window !== "undefined" && localStorage.getItem("auth")) {
    auth = JSON.parse(localStorage.getItem("auth") || "");
  }

  const showModal = (giftcard: any) => {
    setCurrentGiftcard(giftcard);
    setOpenModal(true);
  };

  const getGiftCardsTransactionsDetail = (id: string) => {
    setLoadingDetail(true);
    axios
      .post(
        `${BASE_URL}/transactions/gift-card/${id}`,
        {},
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res: any) => {
        setLoadingDetail(false);
        if (res.data.success) {
          setCurrentGiftcard(res.data.data);
          setOpenModal(true);
        }
      })
      .catch((e) => {
        if (e?.response?.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
      });
  };

  const getGiftcardsTransactions = () => {
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/gift-cards/transactions?status=${statusType}&startDate=${fromDate}&endDate=${toDate}&page=${currentPage}&pageSize=30`,
        {
          status: statusType,
          startDate: fromDate,
          endDate: toDate,
          cardType: "",
        },
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          setData(
            res.data.data.transactions.map((item: any) => ({
              ...item,
              action: () => {
                showModal(item);
              },
            }))
          );
        } else {
          messageApi.error(res.data.message);
        }
      })
      .catch((e) => {
        if (e?.response?.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
      });
  };

  const onSearch = () => {
    switch (searchType) {
      case "Giftcards":
        getGiftcardsTransactions();
        break;
      default:
        setData([]);
    }
  };

  const getColumns = () => {
    switch (searchType) {
      case "Giftcards":
        return GIFTCRARDS_COLUMNS;
    }
  };

  useEffect(() => {
    if (pageInfo) {
      onSearch();
    }
  }, [currentPage]);

  return (
    <PageLayout title="Hone">
      {contextHolder}
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
                <span style={{ color: "black" }}>
                  @{currentGiftcard?.username}
                </span>
              </p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Transaction ID</p>
              <p className={styles.value}>{currentGiftcard?.transId}</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Transaction Status</p>
              <div className={styles.value}>
                <Tag
                  color={
                    currentGiftcard?.status === "success" ? "success" : "error"
                  }
                >
                  {currentGiftcard?.status}
                </Tag>
              </div>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Card type</p>
              <p className={styles.value}>
                missing ({currentGiftcard?.amount})
              </p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Amount paid</p>
              <p className={styles.value}>missing</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Recipient email</p>
              <p className={styles.value}>{currentGiftcard?.recipient}</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Note</p>
              <p className={styles.value}>{currentGiftcard?.note}</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Transaction date</p>
              <p className={styles.value}>{currentGiftcard?.createdAt}</p>
            </div>
          </div>
        </>
      </Modal>

      <div className={styles.container}>
        <p className={styles.filterTitle}>Filter results by</p>
        <div className={styles.searchContainer}>
          <div className={styles.searchCard}>
            <div className={styles.dropdownContainer}>
              <p className={styles.dropdownTitle}>Transaction type</p>
              <Dropdown
                value={searchType}
                options={[{ title: "Giftcards", value: "Giftcards" }]}
                onChange={(value) => {
                  setSearchType(String(value));
                  setData([]);
                  setCurrentPage(1);
                  setPageInfo(null);
                }}
              />
            </div>
            <div className={styles.dropdownContainer}>
              <p className={styles.dropdownTitle}>Status</p>
              <Dropdown
                value={statusType}
                options={[
                  { title: "All", value: "all" },
                  { title: "Successful", value: "success" },
                  { title: "Pending", value: "pending" },
                  { title: "Failed", value: "failed" },
                ]}
                onChange={(value) => {
                  setStatusType(String(value));
                  setData([]);
                  setPageInfo(null);
                  setCurrentPage(1);
                }}
              />
            </div>
            <div className={styles.dropdownContainer}>
              <p className={styles.dropdownTitle}>Date range</p>
              <DatePicker.RangePicker
                onChange={(values: any) => {
                  setFromDate(formatDate(values[0].$d));
                  setToDate(formatDate(values[1].$d));
                }}
                style={{ height: 48 }}
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
                <Button
                  disabled={loading}
                  onClick={onSearch}
                  className={styles.searchButton}
                >
                  Apply filter
                </Button>
              </div>
            </div>
          </div>
        </div>
        {loading ? (
          <Skeleton active />
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
              dataSource={data}
              columns={GIFTCRARDS_COLUMNS}
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
