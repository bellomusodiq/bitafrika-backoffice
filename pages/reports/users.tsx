import React, { useState } from "react";

import PageLayout from "@/components/PageLayout";
import styles from "@/pages/reports/users.module.css";
import NavigationStep from "@/components/NavigationStep";
import Button from "@/components/Button";
import { DatePicker, Divider, Table } from "antd";
import Modal from "@/components/Modal";
import Dropdown from "@/components/Dropdown";
import CustomPieChart from "@/components/Charts/PieChart";
import { BASE_URL } from "@/CONFIG";
import axios from "axios";
import formatDate from "@/utils/formatDate";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";

const BALANCE_COLUMNS = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Balance",
    dataIndex: "usdBalance",
    key: "usdBalance",
    render: (_: any, { usdBalance }: any) => <>${usdBalance}</>,
  },
  {
    title: "Actions",
    dataIndex: "action",
    render: (_: any, { action, loading }: any) => (
      <div className={styles.actionButton}>
        <div>
          <Button className={styles.whiteButton} onClick={action}>
            {loading ? (
              <>Loading...</>
            ) : (
              <>
                <img src="/icons/assets.svg" />
                <span>Asset breakdown</span>
              </>
            )}
          </Button>
        </div>
      </div>
    ),
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
    dataIndex: "count",
    key: "count",
  },
  {
    title: "USD value",
    dataIndex: "total",
    key: "total",
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

const SELL_COLUMN = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "No of trnx",
    dataIndex: "count",
    key: "count",
  },
  {
    title: "USD value",
    dataIndex: "total",
    key: "total",
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

export default function Search() {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [openModal, setOpenModal] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [currentUser, setCurrentUser] = useState<any>({});
  const [searchType, setSearchType] = useState<string>("Balance");
  const [sort, setSort] = useState<string>("highest");
  const [page, setPage] = useState<number | null>(1);
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const [coin, setCoin] = useState<string>("BTC");
  const [pagination, setPagination] = useState<any>({ pageNumber: 1 });

  let auth: any = {};
  if (typeof window !== "undefined" && localStorage.getItem("auth")) {
    auth = JSON.parse(localStorage.getItem("auth") || "");
  }

  const getAssetBreakdown = (user: any, i: number) => {
    setCurrentUser(user);
    setLoadingIndex(i);
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/reports/user/balance/${user.username}`,
        {},
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res) => {
        setLoadingIndex(null);
        setLoading(false);
        setOpenModal(res.data);
      })
      .catch((e) => {
        if (e.response.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
      });
  };

  const getBuyAssetBreakdown = (user: any, i: number) => {
    setCurrentUser(user);
    setLoadingIndex(i);
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/reports/users/buy/${user.username}?from=${fromDate}&to=${toDate}`,
        {},
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        setLoadingIndex(null);
        setOpenModal(res.data);
      })
      .catch((e) => {
        if (e.response.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
      });
  };

  const getSellAssetBreakdown = (user: any, i: number) => {
    setCurrentUser(user);
    setLoadingIndex(i);
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/reports/user/sell/${user.username}?from=${fromDate}&to=${toDate}`,
        {},
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res) => {
        setLoadingIndex(null);
        setOpenModal(res.data);
        setLoading(false);
      })
      .catch((e) => {
        if (e.response.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
      });
  };

  const searchUserBalance = () => {
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/reports/user/balance?page=${pagination.pageNumber}&sortBy=${sort}&from=${fromDate}&to=${toDate}&coin=${coin}`,
        {},
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res: any) => {
        setLoading(false);
        const newData = res.data?.data?.map((user: any, i: any) => ({
          ...user,
          action: () => {
            getAssetBreakdown(user, i);
          },
          loading: i === loadingIndex,
        }));

        setData(newData);
        setPagination(res.data.pageInfo);
      })
      .catch((e) => {
        if (e.response.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
      });
  };

  const searchBuyNoTransactions = () => {
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/reports/user/buy?page=${pagination.pageNumber}&sortBy=${sort}&from=${fromDate}&to=${toDate}`,
        {},
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res: any) => {
        setLoading(false);
        const newData = res.data?.data?.map((user: any, i: any) => ({
          ...user,
          action: () => {
            getBuyAssetBreakdown(user, i);
          },
          loading: i === loadingIndex,
        }));

        setData(newData);
        setPagination(res.data.pageInfo);
      })
      .catch((e) => {
        if (e.response.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
      });
  };

  const searchSellNoTransactions = () => {
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/reports/user/sell?page=${pagination.pageNumber}&sortBy=${sort}&from=${fromDate}&to=${toDate}`,
        {},
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res: any) => {
        setLoading(false);
        const newData = res.data?.data?.map((user: any, i: any) => ({
          ...user,
          action: () => {
            getSellAssetBreakdown(user, i);
          },
          loading: i === loadingIndex,
        }));

        setData(newData);
        setPagination(res.data.pageInfo);
      })
      .catch((e) => {
        if (e.response.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
      });
  };

  const onSearch = () => {
    switch (searchType) {
      case "Balance":
        searchUserBalance();
        break;
      case "Buy":
        searchBuyNoTransactions();
        break;
      case "Sell":
        searchSellNoTransactions();
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
        onClose={() => setOpenModal(null)}
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
                User:{" "}
                <span style={{ color: "#1570EF" }}>
                  @{currentUser.username}
                </span>
              </p>
            </div>
            <div className={styles.keyValue}>
              <p className={styles.key}>
                Total balance:{" "}
                <span style={{ color: "black" }}>
                  ${openModal?.totalUsdAmount}
                </span>
              </p>
            </div>
          </div>
          <div className={styles.assetPieContainer}>
            <p>Assets</p>
            <div style={{ width: 160, height: 160 }}>
              <CustomPieChart
                data={openModal?.data.map((item: any) => ({
                  name: item.name,
                  value: item.percentage,
                }))}
              />
            </div>
          </div>
          <div className={styles.divider} />
          {openModal?.data?.map((asset: any) => (
            <div
              key={asset.name}
              className={styles.keyValue}
              style={{ marginBottom: 24 }}
            >
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
                {asset.name} ({asset.percentage * 100}%)
              </div>
              <div className={styles.value}>
                <p
                  style={{ fontSize: 14, color: "#101828", textAlign: "right" }}
                >
                  {asset.cryptoBalance} {asset.coin}
                </p>
                <p
                  style={{ fontSize: 14, color: "#667085", textAlign: "right" }}
                >
                  ~${asset.usd}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Modal>
      <Modal
        openModal={openModal && searchType === "Buy"}
        onClose={() => setOpenModal(null)}
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
                User:{" "}
                <span style={{ color: "#1570EF" }}>
                  @{currentUser.username}
                </span>
              </p>
            </div>
            <div className={styles.keyValue}>
              <p className={styles.key}>
                No of buy orders:{" "}
                <span style={{ color: "black" }}>MISSING</span>
              </p>
            </div>
          </div>
          <div className={styles.assetPieContainer}>
            <p>Assets</p>
            <div style={{ width: 160, height: 160 }}>
              <CustomPieChart
                data={openModal?.data?.map((item: any) => ({
                  name: item.name,
                  value: item.totalUSD,
                }))}
              />
            </div>
          </div>
          <div className={styles.divider} />
          {openModal?.data?.map((asset: any) => (
            <div
              key={asset.coin}
              className={styles.keyValue}
              style={{ marginBottom: 24 }}
            >
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
                {asset.coin}
              </div>
              <div className={styles.value}>
                <p style={{ fontSize: 14, color: "#101828" }}>MISSING orders</p>
              </div>
              <div className={styles.value}>
                <p style={{ fontSize: 14, color: "#667085" }}>
                  {asset.totalCrypto} {asset.coin}
                </p>
              </div>
              <div className={styles.value}>
                <p style={{ fontSize: 14, color: "#101828" }}>
                  ~${asset.totalUSD}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Modal>
      <Modal
        openModal={openModal && searchType === "Sell"}
        onClose={() => setOpenModal(null)}
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
                User:{" "}
                <span style={{ color: "#1570EF" }}>
                  @{currentUser.username}
                </span>
              </p>
            </div>
            <div className={styles.keyValue}>
              <p className={styles.key}>
                No of sell orders:{" "}
                <span style={{ color: "black" }}>MISSING</span>
              </p>
            </div>
          </div>
          <div className={styles.assetPieContainer}>
            <p>Assets</p>
            <div style={{ width: 160, height: 160 }}>
              <CustomPieChart
                data={openModal?.data?.map((item: any) => ({
                  name: item.name,
                  value: item.totalUSD,
                }))}
              />
            </div>
          </div>
          <div className={styles.divider} />
          {openModal?.data?.map((asset: any) => (
            <div
              key={asset.coin}
              className={styles.keyValue}
              style={{ marginBottom: 24 }}
            >
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
                {asset.coin}
              </div>
              <div className={styles.value}>
                <p style={{ fontSize: 14, color: "#101828" }}>MISSING orders</p>
              </div>
              <div className={styles.value}>
                <p style={{ fontSize: 14, color: "#667085" }}>
                  {asset.totalCrypto} {asset.coin}
                </p>
              </div>
              <div className={styles.value}>
                <p style={{ fontSize: 14, color: "#101828" }}>
                  ~${asset.totalUSD}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Modal>
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
                  setPage(1);
                  setData([]);
                }}
              />
            </div>

            <div className={styles.dropdownContainer}>
              <p className={styles.dropdownTitle}>Sort by</p>
              <Dropdown
                value={sort}
                options={[
                  { title: "Highest", value: "higest" },
                  { title: "Lowest", value: "lowest" },
                ]}
                onChange={(value) => {
                  setSort(String(value));
                  setData([]);
                }}
              />
            </div>
            <div className={styles.dropdownContainer}>
              <p className={styles.dropdownTitle}>Date range</p>
              <DatePicker.RangePicker
                style={{ height: 48 }}
                onChange={(values: any) => {
                  setFromDate(formatDate(values[0].$d));
                  setToDate(formatDate(values[1].$d));
                }}
              />
            </div>
            <div className={styles.dropdownContainer}>
              <p className={styles.dropdownTitle}>Coin</p>
              <Dropdown
                value={coin}
                options={[
                  { title: "BTC", value: "BTC" },
                  { title: "ETH", value: "ETH" },
                  { title: "DOGE", value: "DOGE" },
                  { title: "USDT", value: "USDT" },
                  { title: "TRX", value: "TRX" },
                ]}
                onChange={(value) => {
                  setCoin(String(value));
                  setData(false);
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
          <div
            className={styles.table}
            style={{
              fontFamily: "PP Telegraf",
              border: "1px solid var(--Gray-200, #EAECF0)",
              borderRadius: 12,
              boxShadow: "0px 7px 37px -24px rgba(0, 0, 0, 0.09)",
              overflow: "hidden",
            }}
          >
            <Table
              style={{ fontFamily: "PP Telegraf", marginTop: 24 }}
              dataSource={data}
              columns={getColumns()}
              loading={loading}
              pagination={{
                defaultCurrent: pagination.currentPage,
                pageSize: pagination.pageSize,
                showSizeChanger: false,
                onChange(page, pageSize) {
                  setPagination({
                    pageNumber: page,
                  });
                  onSearch();
                },
              }}
            />
          </div>
        )}
      </div>
    </PageLayout>
  );
}
