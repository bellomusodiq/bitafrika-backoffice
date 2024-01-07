import React, { useState } from "react";

import PageLayout from "@/components/PageLayout";
import styles from "@/pages/transactions/transactions.module.css";
import NavigationStep from "@/components/NavigationStep";
import Button from "@/components/Button";
import { Checkbox, DatePicker, Divider, Space, Table } from "antd";
import Modal from "@/components/Modal";
import DropModal from "@/components/DropModal";
import Input from "@/components/Input/Input";
import Dropdown from "@/components/Dropdown";

const airtimeColumns: any = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Product",
    dataIndex: "product",
    key: "product",
  },
  {
    title: "Biller",
    dataIndex: "biller",
    key: "biller",
  },
  {
    title: "Phonenumber",
    dataIndex: "phonenumber",
    key: "phonenumber",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
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

const tvSubscriptionColumns: any = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Product",
    dataIndex: "product",
    key: "product",
  },
  {
    title: "Biller",
    dataIndex: "biller",
    key: "biller",
  },
  {
    title: "Reference",
    dataIndex: "reference",
    key: "reference",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
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
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [utility, setUtility] = useState<string>("Airtime Topup");

  const airtimeDataSource = [
    {
      key: "1",
      username: "@username",
      product: "Airtime topup",
      biller: "MTN Ghana",
      phonenumber: "0708 000 0000",
      amount: "200 GHC",
      date: "Thur 23 Feb, 2023",
      action: () => setOpenModal(true),
    },
    {
      key: "2",
      username: "@username",
      product: "Airtime topup",
      biller: "MTN Ghana",
      phonenumber: "0708 000 0000",
      amount: "200 GHC",
      date: "Thur 23 Feb, 2023",
      action: () => setOpenModal(true),
    },
    {
      key: "3",
      username: "@username",
      product: "Airtime topup",
      biller: "MTN Ghana",
      phonenumber: "0708 000 0000",
      amount: "200 GHC",
      date: "Thur 23 Feb, 2023",
      action: () => setOpenModal(true),
    },
    {
      key: "4",
      username: "@username",
      product: "Airtime topup",
      biller: "MTN Ghana",
      phonenumber: "0708 000 0000",
      amount: "200 GHC",
      date: "Thur 23 Feb, 2023",
      action: () => setOpenModal(true),
    },
    {
      key: "5",
      username: "@username",
      product: "Airtime topup",
      biller: "MTN Ghana",
      phonenumber: "0708 000 0000",
      amount: "200 GHC",
      date: "Thur 23 Feb, 2023",
      action: () => setOpenModal(true),
    },
  ];
  const tvSubscriptionDataSource = [
    {
      key: "1",
      username: "@username",
      product: "TV Subscription",
      biller: "Startimes",
      reference: "1234567890",
      amount: "200 GHC",
      date: "Thur 23 Feb, 2023",
      action: () => setOpenModal(true),
    },
    {
      key: "2",
      username: "@username",
      product: "TV Subscription",
      biller: "Startimes",
      reference: "1234567890",
      amount: "200 GHC",
      date: "Thur 23 Feb, 2023",
      action: () => setOpenModal(true),
    },
    {
      key: "3",
      username: "@username",
      product: "TV Subscription",
      biller: "Startimes",
      reference: "1234567890",
      amount: "200 GHC",
      date: "Thur 23 Feb, 2023",
      action: () => setOpenModal(true),
    },
    {
      key: "4",
      username: "@username",
      product: "TV Subscription",
      biller: "Startimes",
      reference: "1234567890",
      amount: "200 GHC",
      date: "Thur 23 Feb, 2023",
      action: () => setOpenModal(true),
    },
    {
      key: "5",
      username: "@username",
      product: "TV Subscription",
      biller: "Startimes",
      reference: "1234567890",
      amount: "200 GHC",
      date: "Thur 23 Feb, 2023",
      action: () => setOpenModal(true),
    },
  ];

  const getDataSource: any = () => {
    switch (utility) {
      case "Airtime Topup":
        return airtimeDataSource;
      default:
        return tvSubscriptionDataSource;
    }
  };

  const getColumns = () => {
    switch (utility) {
      case "Airtime Topup":
        return airtimeColumns;
      default:
        return tvSubscriptionColumns;
    }
  };
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
        <h3 className={styles.header}>Transactions</h3>
        <p className={styles.subHeader}>1000 Total transactions</p>
        <div className={styles.tabContainer}>
          <div className={styles.tabItem}>Utility</div>
        </div>
        <div className={styles.dropdownContainer}>
          <Dropdown
            options={[
              { title: "Airtime Topup", value: "Airtime Topup" },
              { title: "TV Subscription", value: "TV Subscription" },
            ]}
            onChange={(value) => setUtility(String(value))}
          />
        </div>
        <Divider />
        <DropModal
          open={openFilter}
          onToggle={setOpenFilter}
          title={
            <div className={styles.dropModal}>
              <img
                src="/icons/plus.svg"
                width={14}
                height={14}
                style={{ marginTop: -5, marginRight: 10 }}
              />
              Add filter
            </div>
          }
        >
          <div className={styles.dropModalContainer}>
            <p className={styles.filterTitle}>status</p>
            <Checkbox className={styles.checkbox}>Successful</Checkbox>
            <Checkbox className={styles.checkbox}>Failed</Checkbox>
            <Checkbox className={styles.checkbox}>Pending</Checkbox>
            <Divider />
            <p className={styles.filterTitle}>Period</p>
            <DatePicker.RangePicker style={{ marginTop: 10 }} direction="rtl" />
            <Divider />
            <p className={styles.filterTitle}>Users</p>
            <Input className={styles.nameInput} placeholder="name" />
            <Divider style={{ marginTop: 30 }} />
            <div className={styles.dropModalFooter}>
              <Button className={styles.dropModalButton} color="white">
                Clear
              </Button>
              <Button className={styles.dropModalButton2}>Apply filter</Button>
            </div>
          </div>
        </DropModal>
        <div className={styles.searchContainer}>
          <div className={styles.searchHeader}>
            <img src="/icons/search.svg" />
            <input
              className={styles.input}
              placeholder="Type transaction reference"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div>
              <Button className={styles.searchButton}>Search</Button>
            </div>
          </div>
          {!search ? (
            <p className={styles.searchHint}>
              Search hint:{" "}
              <span>
                Enter up to 10 search items , separated by comma (,) to search
                multiple items
              </span>
            </p>
          ) : (
            <div className={styles.table} style={{overflow: "hidden"}}>
              <p className={styles.resultText}>5 result found!</p>
              <Table
                style={{ fontFamily: "PP Telegraf" }}
                dataSource={getDataSource()}
                columns={getColumns()}
              />
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
