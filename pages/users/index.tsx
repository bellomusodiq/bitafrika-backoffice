import React, { useMemo, useState } from "react";
import PageLayout from "@/components/PageLayout";
import styles from "@/pages/users/user-home.module.css";
import Button from "@/components/Button";
import { Skeleton, Table, Tag } from "antd";
import axios from "axios";
import { BASE_URL } from "@/CONFIG";
import Dropdown from "@/components/Dropdown";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import useCustomQuery from "@/hooks/useCustomQuery";
import { GetServerSideProps } from "next";

const USER_COLUMNS: any = [
  {
    title: "Name",
    dataIndex: "name",
    render: (_: any, { name, avatar }: any) => (
      <div className={styles.nameContainer}>
        <span className={styles.avatar}>{avatar}</span>
        <span className={styles.name}>{name}</span>
      </div>
    ),
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phonenumber",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "KYC Status",
    dataIndex: "kycStatus",
    key: "kycStatus",
    render: (_: any, { kycStatus }: any) => (
      <Tag color={kycStatus ? "success" : "error"}>
        {kycStatus ? "Verified" : "Not Verified"}
      </Tag>
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
  const [searchType, setSearchType] = useState<string>(type || "ALL");
  const [pageInfo, setPageInfo] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [payload, setPayload] = useState<string>(type || "");

  let auth: any = {};
  if (typeof window !== "undefined" && localStorage.getItem("auth")) {
    auth = JSON.parse(localStorage.getItem("auth") || "");
  }

  const { isLoading, data: result } = useCustomQuery({
    queryKey: ["userInfo", payload, currentPage],
    enabled: payload.length > 0,
    queryFn: async () => {
      const result = await axios.post(
        `${BASE_URL}/users?page=${
          currentPage ? currentPage : pageInfo.currentPage
        }`,
        { filter: payload },
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
        name: `${item.firstName} ${item.lastName}`,
        avatar: `${item.firstName?.[0]}${item.lastName?.[0]}`,
        action: () =>
          router.push(`/users/details/${item.username}?type=${payload}`),
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

  const getColumns = () => {
    return USER_COLUMNS;
  };

  return (
    <PageLayout title="Hone">
      <div className={styles.container}>
        <p className={styles.filterTitle}>Filter user results by</p>
        <div className={styles.searchContainer}>
          <div className={styles.searchCard}>
            <div className={styles.dropdownContainer}>
              <p className={styles.dropdownTitle}>Type</p>
              <Dropdown
                value={searchType}
                options={[
                  { title: "All", value: "ALL" },
                  { title: "Verified users", value: "VERIFIED" },
                  { title: "Unverified users", value: "UNVERIFIED" },
                  { title: "Active users", value: "ACTIVE" },
                  { title: "In Active users", value: "NOT_ACTIVE" },
                ]}
                onChange={(value) => {
                  setSearchType(String(value));
                  setPageInfo(null);
                  setCurrentPage(1);
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
                <Button
                  onClick={onSearch}
                  className={styles.searchButton}
                  loading={isLoading}
                >
                  Apply filter
                </Button>
              </div>
            </div>
          </div>
        </div>
        {isLoading ? (
          <Skeleton active style={{ margin: "20px 0" }} />
        ) : formatData && payload === searchType ? (
          <div className={styles.table} style={{ overflow: "hidden" }}>
            <p className={styles.resultText}>
              {formatData.record.length} result found!
            </p>
            <Table
              style={{
                fontFamily: "PP Telegraf",
                border: "1px solid var(--Gray-200, #EAECF0)",
                borderRadius: 12,
                boxShadow: "0px 7px 37px -24px rgba(0, 0, 0, 0.09)",
                overflow: "hidden",
              }}
              dataSource={formatData.record}
              columns={getColumns()}
              loading={isLoading}
              pagination={false}
            />
            <Pagination
              pageInfo={formatData.pageInfo}
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
