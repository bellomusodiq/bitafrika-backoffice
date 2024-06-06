import React, { useMemo, useState } from "react";

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
import useCustomQuery from "@/hooks/useCustomQuery";
import { GetServerSideProps } from "next";
import { getStatusCode } from "@/utils/utils";

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
    dataIndex: "expiryDate",
    key: "expiryDate",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Account balance",
    dataIndex: "balance",
    key: "balance",
    render: (_: any, { balance }: any) => <>${balance}</>,
  },
  {
    title: "Date created",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (_: any, { status }: any) => (
      <Tag color={getStatusCode(status)}>{status}</Tag>
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

export default function Search({ type }: { type: string }) {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>({});
  const [searchType, setSearchType] = useState<string>(type || "All");
  const [pageInfo, setPageInfo] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [payload, setPayload] = useState<string>(type || "");

  const showModal = (user: any) => {
    setCurrentUser(user);
    setOpenModal(true);
  };

  const getColumns = () => {
    return CARDS_COLUMNS;
  };

  let auth: any = {};
  if (typeof window !== "undefined" && localStorage.getItem("auth")) {
    auth = JSON.parse(localStorage.getItem("auth") || "");
  }

  const { isLoading, data: result } = useCustomQuery({
    queryKey: ["cardInfo", payload, currentPage],
    enabled: payload.length > 0,
    queryFn: async () => {
      const result = await axios.post(
        `${BASE_URL}/virtual-cards/cards`,
        { page: currentPage, filter: payload },
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      );
      return result;
    },
  });

  const formatData = useMemo(() => {
    const temp = result?.data?.data;
    if (Array.isArray(temp)) {
      const response = temp.map((item: any) => ({
        ...item,
        action: () =>
          router.push(`/cards/details/${item.cardId}?type=${payload}`),
      }));
      return {
        record: response,
        pageInfo: result?.data?.pageInfo || {},
      };
    }
  }, [result]);

  const onSearch = () => {
    setPayload(searchType);
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
          }}
        >
          <Button color="white" isText onClick={() => router.back()}>
            <img src="/icons/arrow-left.svg" />
          </Button>
          <h3 className={styles.header}>Cards</h3>
        </div>
        <div className={styles.searchContainer}>
          <div className={styles.searchCard}>
            <div className={styles.dropdownContainer}>
              <p className={styles.dropdownTitle}>Status</p>
              <Dropdown
                value={searchType}
                options={[
                  { title: "All", value: "All" },
                  { title: "Active", value: "Active" },
                  { title: "In-active", value: "inActive" },
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
        {isLoading ? (
          <Skeleton active style={{ marginTop: "20px" }} />
        ) : formatData && searchType === payload ? (
          <div className={styles.table} style={{ overflow: "hidden" }}>
            <p className={styles.resultText}>
              {formatData?.pageInfo?.totalCount || 0} result found!
            </p>
            <Table
              style={{
                fontFamily: "PP Telegraf",
                border: "1px solid var(--Gray-200, #EAECF0)",
                borderRadius: 12,
                boxShadow: "0px 7px 37px -24px rgba(0, 0, 0, 0.09)",
                overflow: "hidden",
              }}
              dataSource={formatData?.record}
              columns={getColumns()}
              loading={loading}
              pagination={false}
            />
            <Pagination
              pageInfo={formatData?.pageInfo}
              setCurrentPage={setCurrentPage}
            />
          </div>
        ) : null}
      </div>
    </PageLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query;
  return {
    props: {
      type: query?.type || null,
    },
  };
};
