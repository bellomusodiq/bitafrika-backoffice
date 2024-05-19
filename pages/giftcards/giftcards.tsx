import React, { useState } from "react";

import PageLayout from "@/components/PageLayout";
import styles from "@/pages/giftcards/cards-orders.module.css";
import NavigationStep from "@/components/NavigationStep";
import Button from "@/components/Button";
import { DatePicker, Table } from "antd";
import Modal from "@/components/Modal";
import axios from "axios";
import { BASE_URL } from "@/CONFIG";
import getToken from "@/utils/getToken";
import Dropdown from "@/components/Dropdown";
import { useRouter } from "next/router";
import Input from "@/components/Input/Input";

const GIFTCRARDS_COLUMNS = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "SKU",
    dataIndex: "sku",
    key: "sku",
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "country",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (_: any, { status }: any) => (
      <div
        style={{
          borderRadius: 16,
          backgroundColor: status === "Enabled" ? "#EDFCF2" : "#FEF3F2",
          color: status === "Enabled" ? "#087443" : "#B42318",
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: 12 }}>{status}</span>
      </div>
    ),
  },
  {
    title: "Actions",
    dataIndex: "action",
    render: (_: any, { enable, disable }: any) => (
      <div className={styles.actionButton}>
        <div style={{ marginRight: 12 }}>
          <Button onClick={enable}>Enable</Button>
        </div>
        <div>
          <Button color="white" onClick={disable}>
            Disable
          </Button>
        </div>
      </div>
    ),
  },
];

const GIFTCRARDS_DATA = [
  {
    name: "Google play store",
    sku: "234234423",
    country: "US",
    currency: "USD",
    status: "Enabled",
    category: "Games",
  },
  {
    name: "Itunes",
    sku: "234234423",
    country: "US",
    currency: "USD",
    status: "Enabled",
    category: "Entertainment",
  },
  {
    name: "Steam card",
    sku: "234234423",
    country: "US",
    currency: "USD",
    status: "Disabled",
    category: "Games",
  },
];

export default function Search() {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [currentUser, setCurrentUser] = useState<any>({});
  const [searchType, setSearchType] = useState<string>("Buy");
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);

  const onSearch = () => {
    setData(GIFTCRARDS_DATA);
  };

  const showModal = (user: any) => {
    setCurrentUser(user);
    setOpenModal(true);
  };

  const getColumns = () => {
    return GIFTCRARDS_COLUMNS;
  };

  return (
    <PageLayout title="Hone">
      <Modal
        openModal={openModal}
        onClose={() => setOpenModal(false)}
        headerCenter={
          <div className={styles.modalHeader}>
            <p>Details</p>
            <div className={styles.breadCrumb}>Giftcards</div>
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
      <Modal
        openModal={openAddModal}
        onClose={() => setOpenAddModal(false)}
        headerCenter={
          <div className={styles.modalHeader}>
            <p>Add giftcard</p>
          </div>
        }
      >
        <div className={styles.inputContainer}>
          <p>Name</p>
          <Input className={styles.modalInput} />
          <p>SKU</p>
          <Input className={styles.modalInput} />
          <p>Country</p>
          <Dropdown
            value={searchType}
            options={[
              { title: "USA", value: "USA" },
              { title: "Canada", value: "Canada" },
            ]}
            onChange={(value) => {
              // setSearchType(String(value));
              // setData([]);
            }}
          />
          <p>Currency</p>
          <Dropdown
            value={searchType}
            options={[
              { title: "USD", value: "USD" },
              { title: "CAD", value: "CAD" },
            ]}
            onChange={(value) => {
              // setSearchType(String(value));
              // setData([]);
            }}
          />
          <p>Category</p>
          <Dropdown
            value={searchType}
            options={[
              { title: "Games", value: "Games" },
              { title: "Entertainment", value: "Entertainment" },
            ]}
            onChange={(value) => {
              // setSearchType(String(value));
              // setData([]);
            }}
          />
          <div className={styles.modalFooter}>
            <Button
              onClick={() => {
                setOpenAddModal(false);
              }}
              className={styles.modalButton}
              color="white"
            >
              Cancel
            </Button>
            <Button
              onClick={() => setOpenAddModal(false)}
              className={styles.modalButton}
            >
              Add
            </Button>
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
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button color="white" isText onClick={() => router.back()}>
              <img src="/icons/arrow-left.svg" />
            </Button>
            <h3 className={styles.header} style={{ marginLeft: 5 }}>
              Giftcards
            </h3>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: 18 }}>
              <Button onClick={() => setOpenAddModal(true)}>
                <img src="/icons/plus-white.svg" /> Add Giftcard
              </Button>
            </div>
          </div>
        </div>

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
            dataSource={GIFTCRARDS_DATA.map((user: any) => ({
              ...user,
              action: () => showModal(user),
            }))}
            columns={GIFTCRARDS_COLUMNS}
            loading={loading}
          />
        </div>
      </div>
    </PageLayout>
  );
}
