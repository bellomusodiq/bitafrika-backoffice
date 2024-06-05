import React, { useMemo, useState } from "react";
import PageLayout from "@/components/PageLayout";
import styles from "@/pages/cards/cards-orders.module.css";
import { Button, DatePicker, Skeleton, Table, Tag } from "antd";
import Modal from "@/components/Modal";
import axios from "axios";
import { BASE_URL } from "@/CONFIG";
import Dropdown from "@/components/Dropdown";
import { useRouter } from "next/router";
import formatDate from "@/utils/formatDate";
import Pagination from "@/components/Pagination";
import useCustomQuery from "@/hooks/useCustomQuery";

export default function Transactions() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [statusType, setStatusType] = useState<string>("success");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentUser, setCurrentUser] = useState<any>({});
  const [params, setParams] = useState<Record<string, string> | null>(null);

  let auth: any = {};
  if (typeof window !== "undefined" && localStorage.getItem("auth")) {
    auth = JSON.parse(localStorage.getItem("auth") || "");
  }
  const { isLoading, data: { data: result } = {} } = useCustomQuery({
    queryKey: ["giftCardTransactions", params, currentPage],
    enabled: !!params,
    queryFn: async () => {
      const result = await axios.post(
        `${BASE_URL}/gift-cards/transactions`,
        {
          status: params?.status,
          startDate: params?.fromDate,
          endDate: params?.toDate,
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

  const REQUESTS_COLUMNS = useMemo(() => {
    return [
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
  }, []);

  const onSearch = () => {
    setParams({
      status: statusType,
      fromDate,
      toDate,
    });
  };

  const showModal = (user: any) => {
    setCurrentUser(user);
    setOpenModal(true);
  };

  const isActiveData = () => {
    let isActive = true;
    if (params?.status !== statusType) isActive = false;
    if (params?.fromDate !== fromDate) isActive = false;
    if (params?.toDate !== toDate) isActive = false;
    return isActive;
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
                color={currentUser?.status === "failed" ? "error" : "success"}
                style={{ textTransform: "capitalize", width: "fit-content" }}
              >
                {currentUser?.status}
              </Tag>
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
            <Button type="text" onClick={router.back}>
              <img src="/icons/arrow-left.svg" />
            </Button>
          </div>
          <p className={styles.filterTitle}>
            Filter giftcard transaction results by
          </p>
        </div>
        <div className={styles.searchContainer}>
          <div className={styles.searchCard}>
            <div className={styles.dropdownContainer}>
              <p className={styles.dropdownTitle}>Status</p>
              <Dropdown
                value={statusType}
                options={[
                  { title: "All", value: "ALL" },
                  { title: "Successful", value: "success" },
                  { title: "Failed", value: "failed" },
                ]}
                onChange={(value) => {
                  setStatusType(String(value));
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
                  disabled={isLoading}
                  onClick={onSearch}
                  className={styles.searchButton}
                >
                  Apply filter
                </Button>
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <Skeleton active style={{ marginTop: 20 }} />
        ) : result?.data && isActiveData() ? (
          <div className={styles.table} style={{ overflow: "hidden" }}>
            <p className={styles.resultText}>
              {result?.data.pageInfo.totalCount || result?.data.length} result
              found!
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
              columns={REQUESTS_COLUMNS}
              loading={isLoading}
              pagination={false}
            />
            <Pagination
              pageInfo={result?.data.pageInfo}
              setCurrentPage={setCurrentPage}
            />
          </div>
        ) : null}
      </div>
    </PageLayout>
  );
}
