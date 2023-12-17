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

const COUNTRY_MAP: { [k: string]: string } = {
  GH: "Ghana",
  CM: "Cameroon",
  NG: "Nigeria",
};

const USER_COLUMNS: any = [
  {
    title: "Name",
    dataIndex: "name",
    render: (_: any, { name }: any) => (
      <div className={styles.nameContainer}>
        <span className={styles.avatar}>EN</span>
        <span className={styles.name}>Emmanuel Nkrumah</span>
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
    dataIndex: "phonenumber",
    key: "phonenumber",
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

const USER_DATA = [
  {
    key: "1",
    username: "@username",
    email: "EmmanuelNkrumah@email.com",
    biller: "MTN Ghana",
    phonenumber: "0708 000 0000",
  },
  {
    key: "2",
    username: "@username",
    email: "EmmanuelNkrumah@email.com",
    biller: "MTN Ghana",
    phonenumber: "0708 000 0000",
  },
  {
    key: "3",
    username: "@username",
    email: "EmmanuelNkrumah@email.com",
    biller: "MTN Ghana",
    phonenumber: "0708 000 0000",
  },
  {
    key: "4",
    username: "@username",
    email: "EmmanuelNkrumah@email.com",
    biller: "MTN Ghana",
    phonenumber: "0708 000 0000",
  },
  {
    key: "5",
    username: "@username",
    email: "EmmanuelNkrumah@email.com",
    biller: "MTN Ghana",
    phonenumber: "0708 000 0000",
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

  const onSearch = () => {
    switch (searchType) {
      case "Registered":
        setData(USER_DATA);
        break;
      default:
        setData([]);
    }
  };

  const showModal = (user: any) => {
    setCurrentUser(user);
    setOpenModal(true);
  };

  const getColumns = () => {
    switch (searchType) {
      case "Registered":
        return USER_COLUMNS;
    }
  };

  return (
    <PageLayout title="Hone">
      <NavigationStep hideButton navigation={["Home", "Search", "User"]} />
      <div className={styles.container}>
        <h3 className={styles.header}>Search</h3>
        <div className={styles.searchContainer}>
          <p className={styles.filterTitle}>Filter results by</p>
          <div className={styles.searchCard}>
            <div className={styles.dropdownContainer}>
              <p className={styles.dropdownTitle}>Type</p>
              <Dropdown
                value={searchType}
                options={[
                  { title: "Select", value: "" },
                  { title: "Registered users", value: "Registered" },
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
        {data.length === 0 ? (
          <p className={styles.searchHint}>
            Search hint:{" "}
            <span>
              Enter up to 10 search items , separated by comma (,) to search
              multiple items
            </span>
          </p>
        ) : (
          <div className={styles.table}>
            <p className={styles.resultText}>{data.length} result found!</p>
            <Table
              style={{ fontFamily: "PP Telegraf" }}
              dataSource={data.map((user: any) => ({
                ...user,
                action: () => router.push("/users/details/1"),
              }))}
              columns={getColumns()}
              loading={loading}
            />
          </div>
        )}
      </div>
    </PageLayout>
  );
}
