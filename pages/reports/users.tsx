import React, { useState } from "react";

import PageLayout from "@/components/PageLayout";
import styles from "@/pages/reports/users.module.css";
import NavigationStep from "@/components/NavigationStep";
import Button from "@/components/Button";
import { DatePicker, Divider, Table } from "antd";
import Modal from "@/components/Modal";
import Dropdown from "@/components/Dropdown";

const columns = [
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
    title: "Phone number",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "country",
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
  const [search, setSearch] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);

  const dataSource = [
    {
      key: "1",
      username: "Mike",
      email: "username@gmail.com",
      phoneNumber: "+234812325600",
      country: "Ghana",
      action: () => setOpenModal(true),
    },
    {
      key: "2",
      username: "Mike",
      email: "username@gmail.com",
      phoneNumber: "+234812325600",
      country: "Ghana",
      action: () => setOpenModal(true),
    },
    {
      key: "3",
      username: "Mike",
      email: "username@gmail.com",
      phoneNumber: "+234812325600",
      country: "Ghana",
      action: () => setOpenModal(true),
    },
    {
      key: "4",
      username: "Mike",
      email: "username@gmail.com",
      phoneNumber: "+234812325600",
      country: "Ghana",
      action: () => setOpenModal(true),
    },
    {
      key: "5",
      username: "Mike",
      email: "username@gmail.com",
      phoneNumber: "+234812325600",
      country: "Ghana",
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
      <NavigationStep hideButton />
      <div className={styles.container}>
        <h3 className={styles.header}>User reports</h3>
        <Divider />
        <div className={styles.filterByContainer}>
          <p className={styles.filterByHeader}>Filter result by</p>
          <div className={styles.filterContainer}>
            <div className={styles.inputContainer}>
              <p>Activity</p>
              <Dropdown
                options={[{ title: "Highest", value: "Highest" }]}
                onChange={() => {}}
              />
            </div>
            <div className={styles.inputContainer}>
              <p>Activity</p>
              <DatePicker.RangePicker style={{ padding: 8 }} />
            </div>
          </div>
          <Divider style={{ margin: 0 }} />
          <div className={styles.filterByFooter}>
            <div style={{ marginRight: 20 }}>
              <Button>Filter results</Button>
            </div>
            <div>
              <Button color="white">Clear</Button>
            </div>
          </div>
        </div>
        <div className={styles.searchContainer}>
          <div className={styles.table}>
            <Table dataSource={dataSource} columns={columns} />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
