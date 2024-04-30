import React, { useState } from "react";

import PageLayout from "@/components/PageLayout";
import styles from "@/pages/users/user-home.module.css";
import NavigationStep from "@/components/NavigationStep";
import Button from "@/components/Button";
import { DatePicker, Table } from "antd";
import Modal from "@/components/Modal";
import axios from "axios";
import { BASE_URL } from "@/CONFIG";
import getToken from "@/utils/getToken";
import Dropdown from "@/components/Dropdown";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";

const COUNTRY_MAP: { [k: string]: string } = {
  GH: "Ghana",
  CM: "Cameroon",
  NG: "Nigeria",
};

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
  const [currentUser, setCurrentUser] = useState<any>({});
  const [searchType, setSearchType] = useState<string>("");
  const [pagination, setPagination] = useState<any>({ current: 1 });

  let auth: any = {};
  if (typeof window !== "undefined" && localStorage.getItem("auth")) {
    auth = JSON.parse(localStorage.getItem("auth") || "");
  }

  const getUsers = () => {
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/users?page=${pagination.current}`,
        { filter: searchType },
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res: any) => {
        setLoading(false);
        if (res.data.success) {
          const response = res.data.data.map((item: any) => ({
            ...item,
            name: `${item.firstName} ${item.lastName}`,
            avatar: `${item.firstName?.[0]}${item.lastName?.[0]}`,
            action: () => router.push(`/users/details/${item.username}`),
          }));
          setData(response);
          setPagination({
            current: res.data.pageInfo?.currentPage,
            pageSize: res.data.pageInfo?.perPage,
            total: res.data.totalCount,
          });
        }
      })
      .catch((e) => {
        if (e.response.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
      });
  };

  const onSearch = () => {
    getUsers();
  };

  const showModal = (user: any) => {
    setCurrentUser(user);
    setOpenModal(true);
  };

  const getColumns = () => {
    return USER_COLUMNS;
  };

  return (
    <PageLayout title="Hone">
      <div className={styles.container}>
        <p className={styles.filterTitle}>Filter results by</p>
        <div className={styles.searchContainer}>
          <div className={styles.searchCard}>
            <div className={styles.dropdownContainer}>
              <p className={styles.dropdownTitle}>Type</p>
              <Dropdown
                value={searchType}
                options={[
                  { title: "Select", value: "" },
                  { title: "Verified users", value: "VERIFIED" },
                  { title: "Unverified users", value: "UNVERIFIED" },
                  { title: "Active users", value: "ACTIVE" },
                  { title: "In Active users", value: "NOT_ACTIVE" },
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
                <Button
                  onClick={onSearch}
                  disabled={loading}
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
            <Table
              style={{
                fontFamily: "PP Telegraf",
                border: "1px solid var(--Gray-200, #EAECF0)",
                borderRadius: 12,
                boxShadow: "0px 7px 37px -24px rgba(0, 0, 0, 0.09)",
                overflow: "hidden",
              }}
              dataSource={data}
              columns={getColumns()}
              loading={loading}
              pagination={{
                ...pagination,
                onChange(page, pageSize) {
                  getUsers();
                },
              }}
            />
          </div>
        )}
      </div>
    </PageLayout>
  );
}
