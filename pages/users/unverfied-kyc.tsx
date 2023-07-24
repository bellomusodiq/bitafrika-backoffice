import React, { useState } from "react";

import PageLayout from "@/components/PageLayout";
import styles from "@/pages/users/users.module.css";
import NavigationStep from "@/components/NavigationStep";
import Button from "@/components/Button";
import { Checkbox, DatePicker, Divider, Space, Table } from "antd";
import Modal from "@/components/Modal";
import DropModal from "@/components/DropModal";
import Input from "@/components/Input/Input";
import Dropdown from "@/components/Dropdown";
import { useRouter } from "next/router";

const columns: any = [
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
        <div style={{ marginRight: 10 }}>
          <Button color="white" onClick={action}>
            View
          </Button>
        </div>
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
  const [openFilter, setOpenFilter] = useState<boolean>(false);

  const dataSource = [
    {
      key: "1",
      username: "@username",
      email: "EmmanuelNkrumah@email.com",
      biller: "MTN Ghana",
      phonenumber: "0708 000 0000",
      action: () => setOpenModal(true),
    },
    {
      key: "2",
      username: "@username",
      email: "EmmanuelNkrumah@email.com",
      biller: "MTN Ghana",
      phonenumber: "0708 000 0000",
      action: () => setOpenModal(true),
    },
    {
      key: "3",
      username: "@username",
      email: "EmmanuelNkrumah@email.com",
      biller: "MTN Ghana",
      phonenumber: "0708 000 0000",
      action: () => setOpenModal(true),
    },
    {
      key: "4",
      username: "@username",
      email: "EmmanuelNkrumah@email.com",
      biller: "MTN Ghana",
      phonenumber: "0708 000 0000",
      action: () => setOpenModal(true),
    },
    {
      key: "5",
      username: "@username",
      email: "EmmanuelNkrumah@email.com",
      biller: "MTN Ghana",
      phonenumber: "0708 000 0000",
      action: () => setOpenModal(true),
    },
  ];

  return (
    <PageLayout title="Hone">
      <Modal
        openModal={openModal}
        onClose={() => setOpenModal(false)}
        headerCenter={<Button color="white">#</Button>}
      >
        <div className={styles.modalContainer}>
          <p className={styles.modalHeader}>Account details</p>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Account:</p>
            <p className={styles.value}>EMMANUEL KWABENA NKRUMAH</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Country:</p>
            <p className={styles.value}>Ghana (GH)</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Network:</p>
            <p className={styles.value}>MTN</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Phone number:</p>
            <p className={styles.value}>2334567890000</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Status:</p>
            <p className={styles.valueStatus}>Payment method is active</p>
          </div>
          <div className={styles.divider} />
          <p className={styles.date}>Date registered: Thur May 13, 2021.</p>
          <p className={styles.date}>12:33:28 GMT</p>
          <Button
            onClick={() => setOpenModal(false)}
            className={styles.modalButton}
          >
            Close
          </Button>
        </div>
      </Modal>
      <NavigationStep hideButton navigation={["Home", "Users", "Unverified KYC"]} />
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <h3 className={styles.header}>Users</h3>
          <div className={styles.headerButtons}>
            <div>
              <Button color="white">
                <div className={styles.printButton}>
                  <img src="/icons/download.svg" />
                  Download CSV
                </div>
              </Button>
            </div>
          </div>
        </div>
        <p className={styles.subHeader}>1000 Total users</p>
        <div className={styles.tabContainer}>
          <div className={styles.tabItem}>
            Unverified KYC <span>20,000</span>
          </div>
        </div>

        <div className={styles.searchContainer}>
          <div className={styles.table}>
            <Table
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    router.push("/users/details/1", "/users/details/1");
                  },
                };
              }}
              rowClassName={styles.tableRow}
              dataSource={dataSource}
              columns={columns}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
