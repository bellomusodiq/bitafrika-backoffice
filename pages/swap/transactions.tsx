import React, { useEffect, useMemo, useState } from "react";
import PageLayout from "@/components/PageLayout";
import styles from "@/pages/cards/cards-orders.module.css";
import Button from "@/components/Button";
import { DatePicker, Table } from "antd";
import Modal from "@/components/Modal";
import axios from "axios";
import { BASE_URL } from "@/CONFIG";
import { toast } from "react-toastify";
import Dropdown from "@/components/Dropdown";
import { useRouter } from "next/router";
import formatDate from "@/utils/formatDate";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";

export default function Transactions() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Record<string, string>[]>([]);
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false);
  const [statusType, setStatusType] = useState<string>("success");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [pageInfo, setPageInfo] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentDetails, setCurrentDetails] = useState<any>({});

  let auth: any = {};
  if (typeof window !== "undefined" && localStorage.getItem("auth")) {
    auth = JSON.parse(localStorage.getItem("auth") || "");
  }

  const REQUESTS_COLUMNS = useMemo(() => {
    return [
      {
        title: "Transaction ID",
        dataIndex: "",
        key: "uniqId",
        render: (_: any, { uniqId }: any) => (
          <p className={styles.username}>{`${uniqId.slice(
            0,
            6
          )}...${uniqId.slice(uniqId.length - 6)}`}</p>
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
              <Button disabled={loadingDetail} onClick={action}>
                View
              </Button>
            </div>
          </div>
        ),
      },
    ];
  }, []);

  const getSwapTransactions = () => {
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/swap/filter`,
        {
          status: statusType,
          from: fromDate,
          to: toDate,
          page: currentPage,
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
            res.data.data.map((item: any) => ({
              ...item,
              action: () => {
                getSwapTransactionsDetail(item.uniqId);
              },
            }))
          );
          setPageInfo(res.data.pageInfo);
        } else {
          const message = res.data.message;
          toast.error(message);
        }
      })
      .catch((e) => {
        setLoading(false);
        if (e.response.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        } else {
          toast.error("Something went wrong, please try again");
        }
      });
  };

  const getSwapTransactionsDetail = (id: string) => {
    setLoadingDetail(true);
    axios
      .post(
        `${BASE_URL}/swap/view`,
        { transactionId: id },
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res: any) => {
        setLoadingDetail(false);
        if (res.data.success) {
          setCurrentDetails(res.data.data);
          setOpenModal(true);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => {
        setLoadingDetail(false);
        if (e.response.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        } else {
          toast.error("Something went wrong, please try again");
        }
      });
  };

  const onSearch = () => {
    getSwapTransactions();
  };

  useEffect(() => {
    if (pageInfo) {
      onSearch();
    }
  }, [currentPage]);

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
              {currentDetails?.sourceAmount} {currentDetails?.sourceCrypto} (
              {currentDetails?.sourceCryptoName})
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>To</p>
            <p className={styles.value}>
              {currentDetails?.destinationAmount}{" "}
              {currentDetails?.destinationCrypto} (
              {currentDetails?.destinationCryptoName})
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
            justifyContent: "space-between",
          }}
        >
          <h3 className={styles.header}>Transactions</h3>
          <div>
            <Button color="white" onClick={router.back}>
              <img src="/icons/arrow-left.svg" /> Back
            </Button>
          </div>
        </div>
        <div className={styles.searchContainer}>
          <div className={styles.searchCard}>
            <div className={styles.dropdownContainer}>
              <p className={styles.dropdownTitle}>Status</p>
              <Dropdown
                value={statusType}
                options={[
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
          <Loader />
        ) : (
          <div className={styles.table} style={{ overflow: "hidden" }}>
            <p className={styles.resultText}>{data.length} result found!</p>
            {data.length > 0 && (
              <>
                <Table
                  style={{
                    fontFamily: "PP Telegraf",
                    border: "1px solid var(--Gray-200, #EAECF0)",
                    borderRadius: 12,
                    boxShadow: "0px 7px 37px -24px rgba(0, 0, 0, 0.09)",
                    overflow: "hidden",
                  }}
                  dataSource={data}
                  columns={REQUESTS_COLUMNS}
                  loading={loading}
                  pagination={false}
                />
                <Pagination
                  pageInfo={pageInfo}
                  setCurrentPage={setCurrentPage}
                />
              </>
            )}
          </div>
        )}
      </div>
    </PageLayout>
  );
}
