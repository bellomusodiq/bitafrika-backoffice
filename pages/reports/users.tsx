import React, { useState } from "react";

import PageLayout from "@/components/PageLayout";
import styles from "@/pages/reports/users.module.css";
import NavigationStep from "@/components/NavigationStep";
import Button from "@/components/Button";
import { DatePicker, Divider, Table } from "antd";
import Modal from "@/components/Modal";
import Dropdown from "@/components/Dropdown";
import CustomPieChart from "@/components/Charts/PieChart";

const BALANCE_COLUMNS = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Balance",
    dataIndex: "balance",
    key: "balance",
  },
  {
    title: "Actions",
    dataIndex: "action",
    render: (_: any, { action }: any) => (
      <div className={styles.actionButton}>
        <div>
          <Button className={styles.whiteButton} onClick={action}>
            <img src="/icons/assets.svg" />
            <span>Asset breakdown</span>
          </Button>
        </div>
      </div>
    ),
  },
];

const BALANCE_DATA = [
  {
    key: "1",
    username: "Mike",
    balance: "$2,000,000.00",
  },
  {
    key: "2",
    username: "Mike",
    balance: "$2,000,000.00",
  },
  {
    key: "3",
    username: "Mike",
    balance: "$2,000,000.00",
  },
  {
    key: "4",
    username: "Mike",
    balance: "$2,000,000.00",
  },
  {
    key: "5",
    username: "Mike",
    balance: "$2,000,000.00",
  },
];

const BUY_COLUMNS = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "No of trnx",
    dataIndex: "noTrx",
    key: "noTrx",
  },
  {
    title: "USD value",
    dataIndex: "usdValue",
    key: "usdValue",
  },
  {
    title: "Actions",
    dataIndex: "action",
    render: (_: any, { action }: any) => (
      <div className={styles.actionButton}>
        <div>
          <Button className={styles.whiteButton} onClick={action}>
            <img src="/icons/assets.svg" />
            <span>Asset breakdown</span>
          </Button>
        </div>
      </div>
    ),
  },
];

const BUY_DATA = [
  {
    key: "1",
    username: "Mike",
    noTrx: 1024,
    usdValue: "$100,009.00",
  },
  {
    key: "2",
    username: "Mike",
    noTrx: 1024,
    usdValue: "$100,009.00",
  },
  {
    key: "3",
    username: "Mike",
    noTrx: 1024,
    usdValue: "$100,009.00",
  },
  {
    key: "4",
    username: "Mike",
    noTrx: 1024,
    usdValue: "$100,009.00",
  },
  {
    key: "5",
    username: "Mike",
    noTrx: 1024,
    usdValue: "$100,009.00",
  },
];

const SELL_COLUMN = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "No of trnx",
    dataIndex: "noTrx",
    key: "noTrx",
  },
  {
    title: "USD value",
    dataIndex: "usdValue",
    key: "usdValue",
  },
  {
    title: "Actions",
    dataIndex: "action",
    render: (_: any, { action }: any) => (
      <div className={styles.actionButton}>
        <div>
          <Button className={styles.whiteButton} onClick={action}>
            <img src="/icons/assets.svg" />
            <span>Asset breakdown</span>
          </Button>
        </div>
      </div>
    ),
  },
];

const SELL_DATA = [
  {
    key: "1",
    username: "Mike",
    noTrx: 1024,
    usdValue: "$100,009.00",
  },
  {
    key: "2",
    username: "Mike",
    noTrx: 1024,
    usdValue: "$100,009.00",
  },
  {
    key: "3",
    username: "Mike",
    noTrx: 1024,
    usdValue: "$100,009.00",
  },
  {
    key: "4",
    username: "Mike",
    noTrx: 1024,
    usdValue: "$100,009.00",
  },
  {
    key: "5",
    username: "Mike",
    noTrx: 1024,
    usdValue: "$100,009.00",
  },
];

export default function Search() {
  const [search, setSearch] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [currentUser, setCurrentUser] = useState<any>({});
  const [searchType, setSearchType] = useState<string>("Balance");

  const onSearch = () => {
    switch (searchType) {
      case "Balance":
        setData(BALANCE_DATA);
        break;
      case "Buy":
        setData(BUY_DATA);
        break;
      case "Sell":
        setData(SELL_DATA);
        break;
    }
  };

  const showModal = (user: any) => {
    setOpenModal(true);
  };

  const getColumns = () => {
    switch (searchType) {
      case "Balance":
        return BALANCE_COLUMNS;
      case "Buy":
        return BUY_COLUMNS;
      case "Sell":
        return SELL_COLUMN;
    }
  };

  return (
    <PageLayout title="Hone">
      <Modal
        openModal={openModal && searchType === "Balance"}
        onClose={() => setOpenModal(false)}
        headerLeft={<img src="/icons/assets-dark.svg" />}
        headerCenter={<p>Assets breakdown</p>}
      >
        <div className={styles.modalContainer}>
          <div className={styles.divider} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div className={styles.keyValue}>
              <p className={styles.key}>
                User: <span style={{ color: "#1570EF" }}>@Samuel12345</span>
              </p>
            </div>
            <div className={styles.keyValue}>
              <p className={styles.key}>
                Total balance:{" "}
                <span style={{ color: "black" }}>$20,000.00</span>
              </p>
            </div>
          </div>
          <div className={styles.assetPieContainer}>
            <p>Assets</p>
            <div style={{ width: 160, height: 160 }}>
              <CustomPieChart />
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue} style={{ marginBottom: 24 }}>
            <div
              className={styles.key}
              style={{ display: "flex", alignItems: "center" }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#9BB0FD",
                  marginRight: 8,
                  fontSize: 14,
                  lineHeight: 20,
                  color: "#101828",
                }}
              />
              Tron (50%)
            </div>
            <div className={styles.value}>
              <p style={{ fontSize: 14, color: "#101828" }}>1508.908 TRX</p>
              <p style={{ fontSize: 14, color: "#667085" }}>~$100.60</p>
            </div>
          </div>
          <div className={styles.keyValue} style={{ marginBottom: 24 }}>
            <div
              className={styles.key}
              style={{ display: "flex", alignItems: "center" }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#9BB0FD",
                  marginRight: 8,
                  fontSize: 14,
                  lineHeight: 20,
                  color: "#101828",
                }}
              />
              Matic (30%)
            </div>
            <div className={styles.value}>
              <p style={{ fontSize: 14, color: "#101828" }}>1508.908 MATIC</p>
              <p style={{ fontSize: 14, color: "#667085" }}>~$100.60</p>
            </div>
          </div>
          <div className={styles.keyValue} style={{ marginBottom: 24 }}>
            <div
              className={styles.key}
              style={{ display: "flex", alignItems: "center" }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#9BB0FD",
                  marginRight: 8,
                  fontSize: 14,
                  lineHeight: 20,
                  color: "#101828",
                }}
              />
              Binance coin (30%)
            </div>
            <div className={styles.value}>
              <p style={{ fontSize: 14, color: "#101828" }}>1.2346 BNB</p>
              <p style={{ fontSize: 14, color: "#667085" }}>~$100.60</p>
            </div>
          </div>
          <div className={styles.keyValue} style={{ marginBottom: 24 }}>
            <div
              className={styles.key}
              style={{ display: "flex", alignItems: "center" }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#9BB0FD",
                  marginRight: 8,
                  fontSize: 14,
                  lineHeight: 20,
                  color: "#101828",
                }}
              />
              Bitcoin (30%)
            </div>
            <div className={styles.value}>
              <p style={{ fontSize: 14, color: "#101828" }}>0.12346 BTC</p>
              <p style={{ fontSize: 14, color: "#667085" }}>~$100.60</p>
            </div>
          </div>
          <div className={styles.keyValue} style={{ marginBottom: 24 }}>
            <div
              className={styles.key}
              style={{ display: "flex", alignItems: "center" }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#9BB0FD",
                  marginRight: 8,
                  fontSize: 14,
                  lineHeight: 20,
                  color: "#101828",
                }}
              />
              Litecoin (0%)
            </div>
            <div className={styles.value}>
              <p style={{ fontSize: 14, color: "#101828" }}>0.12346 LTC</p>
              <p style={{ fontSize: 14, color: "#667085" }}>~$100.60</p>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        openModal={openModal && searchType === "Buy"}
        onClose={() => setOpenModal(false)}
        headerLeft={<img src="/icons/assets-dark.svg" />}
        headerCenter={<p>Order breakdown</p>}
      >
        <div className={styles.modalContainer}>
          <div className={styles.divider} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div className={styles.keyValue}>
              <p className={styles.key}>
                User: <span style={{ color: "#1570EF" }}>@Samuel12345</span>
              </p>
            </div>
            <div className={styles.keyValue}>
              <p className={styles.key}>
                No of buy orders: <span style={{ color: "black" }}>1009</span>
              </p>
            </div>
          </div>
          <div className={styles.assetPieContainer}>
            <p>Assets</p>
            <div style={{ width: 160, height: 160 }}>
              <CustomPieChart />
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue} style={{ marginBottom: 24 }}>
            <div
              className={styles.key}
              style={{ display: "flex", alignItems: "center" }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#9BB0FD",
                  marginRight: 8,
                  fontSize: 14,
                  lineHeight: 20,
                  color: "#101828",
                }}
              />
              BTC
            </div>
            <div className={styles.value}>
              <p style={{ fontSize: 14, color: "#101828" }}>500 orders</p>
            </div>
            <div className={styles.value}>
              <p style={{ fontSize: 14, color: "#667085" }}>12.6067 BTC</p>
            </div>
            <div className={styles.value}>
              <p style={{ fontSize: 14, color: "#101828" }}>~$100.60</p>
            </div>
          </div>
          <div className={styles.keyValue} style={{ marginBottom: 24 }}>
            <div
              className={styles.key}
              style={{ display: "flex", alignItems: "center" }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#9BB0FD",
                  marginRight: 8,
                  fontSize: 14,
                  lineHeight: 20,
                  color: "#101828",
                }}
              />
              TRX
            </div>
            <div className={styles.value}>
              <p style={{ fontSize: 14, color: "#101828" }}>500 orders</p>
            </div>
            <div className={styles.value}>
              <p style={{ fontSize: 14, color: "#667085" }}>12.6067 TRX</p>
            </div>
            <div className={styles.value}>
              <p style={{ fontSize: 14, color: "#101828" }}>~$100.60</p>
            </div>
          </div>
          <div className={styles.keyValue} style={{ marginBottom: 24 }}>
            <div
              className={styles.key}
              style={{ display: "flex", alignItems: "center" }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#9BB0FD",
                  marginRight: 8,
                  fontSize: 14,
                  lineHeight: 20,
                  color: "#101828",
                }}
              />
              USDT
            </div>
            <div className={styles.value}>
              <p style={{ fontSize: 14, color: "#101828" }}>500 orders</p>
            </div>
            <div className={styles.value}>
              <p style={{ fontSize: 14, color: "#667085" }}>12.6067 USDT</p>
            </div>
            <div className={styles.value}>
              <p style={{ fontSize: 14, color: "#101828" }}>~$100.60</p>
            </div>
          </div>
          <div className={styles.keyValue} style={{ marginBottom: 24 }}>
            <div
              className={styles.key}
              style={{ display: "flex", alignItems: "center" }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#9BB0FD",
                  marginRight: 8,
                  fontSize: 14,
                  lineHeight: 20,
                  color: "#101828",
                }}
              />
              MATIC
            </div>
            <div className={styles.value}>
              <p style={{ fontSize: 14, color: "#101828" }}>500 orders</p>
            </div>
            <div className={styles.value}>
              <p style={{ fontSize: 14, color: "#667085" }}>12.6067 MATIC</p>
            </div>
            <div className={styles.value}>
              <p style={{ fontSize: 14, color: "#101828" }}>~$100.60</p>
            </div>
          </div>
          <div className={styles.keyValue} style={{ marginBottom: 24 }}>
            <div
              className={styles.key}
              style={{ display: "flex", alignItems: "center" }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#9BB0FD",
                  marginRight: 8,
                  fontSize: 14,
                  lineHeight: 20,
                  color: "#101828",
                }}
              />
              LTC
            </div>
            <div className={styles.value}>
              <p style={{ fontSize: 14, color: "#101828" }}>500 orders</p>
            </div>
            <div className={styles.value}>
              <p style={{ fontSize: 14, color: "#667085" }}>12.6067 LTC</p>
            </div>
            <div className={styles.value}>
              <p style={{ fontSize: 14, color: "#101828" }}>~$100.60</p>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        openModal={openModal && searchType === "Sell"}
        onClose={() => setOpenModal(false)}
        headerLeft={<img src="/icons/assets-dark.svg" />}
        headerCenter={<p>Order breakdown</p>}
      >
        <div className={styles.modalContainer}>
          <div className={styles.divider} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div className={styles.keyValue}>
              <p className={styles.key}>
                User: <span style={{ color: "#1570EF" }}>@Samuel12345</span>
              </p>
            </div>
            <div className={styles.keyValue}>
              <p className={styles.key}>
                No of sell orders: <span style={{ color: "black" }}>1009</span>
              </p>
            </div>
          </div>
          <div className={styles.assetPieContainer}>
            <p>Assets</p>
            <div style={{ width: 160, height: 160 }}>
              <CustomPieChart />
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue} style={{ marginBottom: 24 }}>
            <div
              className={styles.key}
              style={{ display: "flex", alignItems: "center" }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#9BB0FD",
                  marginRight: 8,
                  fontSize: 14,
                  lineHeight: 20,
                  color: "#101828",
                }}
              />
              BTC
            </div>
            <div className={styles.value}>
              <p style={{ fontSize: 14, color: "#101828" }}>500 orders</p>
            </div>
            <div className={styles.value}>
              <p style={{ fontSize: 14, color: "#667085" }}>12.6067 BTC</p>
            </div>
            <div className={styles.value}>
              <p style={{ fontSize: 14, color: "#101828" }}>~$100.60</p>
            </div>
          </div>
          <div className={styles.keyValue} style={{ marginBottom: 24 }}>
            <div
              className={styles.key}
              style={{ display: "flex", alignItems: "center" }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#9BB0FD",
                  marginRight: 8,
                  fontSize: 14,
                  lineHeight: 20,
                  color: "#101828",
                }}
              />
              TRX
            </div>
            <div className={styles.value}>
              <p style={{ fontSize: 14, color: "#101828" }}>500 orders</p>
            </div>
            <div className={styles.value}>
              <p style={{ fontSize: 14, color: "#667085" }}>12.6067 TRX</p>
            </div>
            <div className={styles.value}>
              <p style={{ fontSize: 14, color: "#101828" }}>~$100.60</p>
            </div>
          </div>
          <div className={styles.keyValue} style={{ marginBottom: 24 }}>
            <div
              className={styles.key}
              style={{ display: "flex", alignItems: "center" }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#9BB0FD",
                  marginRight: 8,
                  fontSize: 14,
                  lineHeight: 20,
                  color: "#101828",
                }}
              />
              USDT
            </div>
            <div className={styles.value}>
              <p style={{ fontSize: 14, color: "#101828" }}>500 orders</p>
            </div>
            <div className={styles.value}>
              <p style={{ fontSize: 14, color: "#667085" }}>12.6067 USDT</p>
            </div>
            <div className={styles.value}>
              <p style={{ fontSize: 14, color: "#101828" }}>~$100.60</p>
            </div>
          </div>
          <div className={styles.keyValue} style={{ marginBottom: 24 }}>
            <div
              className={styles.key}
              style={{ display: "flex", alignItems: "center" }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#9BB0FD",
                  marginRight: 8,
                  fontSize: 14,
                  lineHeight: 20,
                  color: "#101828",
                }}
              />
              MATIC
            </div>
            <div className={styles.value}>
              <p style={{ fontSize: 14, color: "#101828" }}>500 orders</p>
            </div>
            <div className={styles.value}>
              <p style={{ fontSize: 14, color: "#667085" }}>12.6067 MATIC</p>
            </div>
            <div className={styles.value}>
              <p style={{ fontSize: 14, color: "#101828" }}>~$100.60</p>
            </div>
          </div>
          <div className={styles.keyValue} style={{ marginBottom: 24 }}>
            <div
              className={styles.key}
              style={{ display: "flex", alignItems: "center" }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#9BB0FD",
                  marginRight: 8,
                  fontSize: 14,
                  lineHeight: 20,
                  color: "#101828",
                }}
              />
              LTC
            </div>
            <div className={styles.value}>
              <p style={{ fontSize: 14, color: "#101828" }}>500 orders</p>
            </div>
            <div className={styles.value}>
              <p style={{ fontSize: 14, color: "#667085" }}>12.6067 LTC</p>
            </div>
            <div className={styles.value}>
              <p style={{ fontSize: 14, color: "#101828" }}>~$100.60</p>
            </div>
          </div>
        </div>
      </Modal>
      <NavigationStep
        hideButton
        navigation={["Home", "Reports", "User reports"]}
      />
      <div className={styles.container}>
        <p className={styles.filterTitle}>Filter results by</p>
        <div className={styles.searchContainer}>
          <div className={styles.searchCard}>
            <div className={styles.dropdownContainer}>
              <p className={styles.dropdownTitle}>Type</p>
              <Dropdown
                value={searchType}
                options={[
                  { title: "Balance", value: "Balance" },
                  { title: "Buy transactions", value: "Buy" },
                  { title: "Sell transactions", value: "Sell" },
                ]}
                onChange={(value) => {
                  setSearchType(String(value));
                  setData([]);
                }}
              />
            </div>

            <div className={styles.dropdownContainer}>
              <p className={styles.dropdownTitle}>Sort by</p>
              <Dropdown
                value={searchType}
                options={[
                  { title: "Highest", value: "Highest" },
                  { title: "Lowest", value: "Lowest" },
                ]}
                onChange={(value) => {
                  setSearchType(String(value));
                  setData([]);
                }}
              />
            </div>
            <div className={styles.dropdownContainer}>
              <p className={styles.dropdownTitle}>Date range</p>
              <DatePicker.RangePicker style={{ height: 48 }} />
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
        <Table
          style={{ fontFamily: "PP Telegraf", marginTop: 24 }}
          dataSource={data?.map((item: any) => ({
            ...item,
            action: () => setOpenModal(true),
          }))}
          columns={getColumns()}
          loading={loading}
        />
      </div>
    </PageLayout>
  );
}
