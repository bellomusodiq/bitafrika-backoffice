import React, { useState } from "react";

import PageLayout from "@/components/PageLayout";
import styles from "@/pages/search/users.module.css";
import NavigationStep from "@/components/NavigationStep";
import Button from "@/components/Button";
import { Table } from "antd";
import Modal from "@/components/Modal";
import axios from "axios";
import { BASE_URL } from "@/CONFIG";
import getToken from "@/utils/getToken";
import Dropdown from "@/components/Dropdown";

const COUNTRY_MAP: { [k: string]: string } = {
  GH: "Ghana",
  CM: "Cameroon",
  NG: "Nigeria",
};

const USER_COLUMNS = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
    render: (_: any, { username }: any) => (
      <p className={styles.username}>{username}</p>
    ),
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

const USER_DATA = [
  {
    username: "Samuel 12345",
    email: "EmmanuelNkrumah@email.com",
    phoneNumber: "+233 812 334 0099",
    country: "Ghana",
  },
  {
    username: "Samuel 12345",
    email: "EmmanuelNkrumah@email.com",
    phoneNumber: "+233 812 334 0099",
    country: "Ghana",
  },
  {
    username: "Samuel 12345",
    email: "EmmanuelNkrumah@email.com",
    phoneNumber: "+233 812 334 0099",
    country: "Ghana",
  },
  {
    username: "Samuel 12345",
    email: "EmmanuelNkrumah@email.com",
    phoneNumber: "+233 812 334 0099",
    country: "Ghana",
  },
  {
    username: "Samuel 12345",
    email: "EmmanuelNkrumah@email.com",
    phoneNumber: "+233 812 334 0099",
    country: "Ghana",
  },
  {
    username: "Samuel 12345",
    email: "EmmanuelNkrumah@email.com",
    phoneNumber: "+233 812 334 0099",
    country: "Ghana",
  },
];

const MOMO_TOPUP_COLUMNS = [
  {
    title: "#Transaction ID",
    dataIndex: "transactionId",
    key: "transactionId",
    render: (_: any, { transactionId }: any) => (
      <p className={styles.username}>{transactionId}</p>
    ),
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },

  {
    title: "Amount (GHS)",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (_: any, { status }: any) => (
      <div
        style={{
          padding: 4,
          borderRadius: 16,
          backgroundColor: "#EDFCF2",
          color: "#087443",
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: 12 }}>{status}</span>
      </div>
    ),
  },
  {
    title: "Amount (USD)",
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

const MOMO_TOPUP_DATA = [
  {
    transactionId: "#22002200002",
    username: "Samuel123455",
    amount: "GHS 7,500.99",
    status: "Completed",
    date: "21 Sept, 11:20AM.",
  },
  {
    transactionId: "#22002200002",
    username: "Samuel123455",
    amount: "GHS 7,500.99",
    status: "Completed",
    date: "21 Sept, 11:20AM.",
  },
  {
    transactionId: "#22002200002",
    username: "Samuel123455",
    amount: "GHS 7,500.99",
    status: "Completed",
    date: "21 Sept, 11:20AM.",
  },
  {
    transactionId: "#22002200002",
    username: "Samuel123455",
    amount: "GHS 7,500.99",
    status: "Completed",
    date: "21 Sept, 11:20AM.",
  },
  {
    transactionId: "#22002200002",
    username: "Samuel123455",
    amount: "GHS 7,500.99",
    status: "Completed",
    date: "21 Sept, 11:20AM.",
  },
  {
    transactionId: "#22002200002",
    username: "Samuel123455",
    amount: "GHS 7,500.99",
    status: "Completed",
    date: "21 Sept, 11:20AM.",
  },
];

const MOMO_WITHDRWAL_COLUMNS = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "#Transaction ID",
    dataIndex: "transactionId",
    key: "transactionId",
    render: (_: any, { transactionId }: any) => (
      <p className={styles.username}>{transactionId}</p>
    ),
  },
  {
    title: "Amount (USD)",
    dataIndex: "amountUSD",
    key: "amountUSD",
  },
  {
    title: "Amount (GHS)",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Fee (USD)",
    dataIndex: "fee",
    key: "fee",
  },
  {
    title: "Topup amount (C)",
    dataIndex: "topupAmount",
    key: "topupAmount",
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

const MOMO_WITHDRWAL_DATA = [
  {
    username: "Samuel12345",
    transactionId: "#22200023320",
    amountUSD: "$400",
    amount: "GHS 1,000",
    fee: "$1.20",
    topupAmount: "0.000004564 BTC",
  },
  {
    username: "Samuel12345",
    transactionId: "#22200023320",
    amountUSD: "$400",
    amount: "GHS 1,000",
    fee: "$1.20",
    topupAmount: "0.000004564 BTC",
  },
  {
    username: "Samuel12345",
    transactionId: "#22200023320",
    amountUSD: "$400",
    amount: "GHS 1,000",
    fee: "$1.20",
    topupAmount: "0.000004564 BTC",
  },
  {
    username: "Samuel12345",
    transactionId: "#22200023320",
    amountUSD: "$400",
    amount: "GHS 1,000",
    fee: "$1.20",
    topupAmount: "0.000004564 BTC",
  },
  {
    username: "Samuel12345",
    transactionId: "#22200023320",
    amountUSD: "$400",
    amount: "GHS 1,000",
    fee: "$1.20",
    topupAmount: "0.000004564 BTC",
  },
];

const CRYPTO_TRANSACTIONS_COLUMNS = [
  {
    title: "#Transaction ID",
    dataIndex: "transactionId",
    key: "transactionId",
    render: (_: any, { transactionId }: any) => (
      <p className={styles.username}>{transactionId}</p>
    ),
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Amount (C)",
    dataIndex: "amountCrypto",
    key: "amountCrypto",
  },
  {
    title: "Amount (USD)",
    dataIndex: "amountUSD",
    key: "amountUSD",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "TX type",
    dataIndex: "txType",
    key: "txType",
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

const CRYPTO_TRANSACTIONS_DATA = [
  {
    transactionId: "#20022002200",
    username: "Samuel12345",
    amountCrypto: "0.00000034566 BTC",
    amountUSD: "$4,000.00",
    status: "Confirmed (24/24)",
    txType: "Receive",
  },
  {
    transactionId: "#20022002200",
    username: "Samuel12345",
    amountCrypto: "0.00000034566 BTC",
    amountUSD: "$4,000.00",
    status: "Confirmed (24/24)",
    txType: "Receive",
  },
  {
    transactionId: "#20022002200",
    username: "Samuel12345",
    amountCrypto: "0.00000034566 BTC",
    amountUSD: "$4,000.00",
    status: "Confirmed (24/24)",
    txType: "Receive",
  },
  {
    transactionId: "#20022002200",
    username: "Samuel12345",
    amountCrypto: "0.00000034566 BTC",
    amountUSD: "$4,000.00",
    status: "Confirmed (24/24)",
    txType: "Receive",
  },
  {
    transactionId: "#20022002200",
    username: "Samuel12345",
    amountCrypto: "0.00000034566 BTC",
    amountUSD: "$4,000.00",
    status: "Confirmed (24/24)",
    txType: "Receive",
  },
];

export default function Search() {
  const [search, setSearch] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [currentUser, setCurrentUser] = useState<any>({});
  const [searchType, setSearchType] = useState<string>("User");

  const onSearch = () => {
    switch (searchType) {
      case "User":
        setData(USER_DATA);
        break;
      case "Momo topup":
        setData(MOMO_TOPUP_DATA);
        break;
      case "Momo withdrawal":
        setData(MOMO_WITHDRWAL_DATA);
        break;
      case "Crypto transactions":
        setData(CRYPTO_TRANSACTIONS_DATA);
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
      case "User":
        return USER_COLUMNS;
      case "Momo topup":
        return MOMO_TOPUP_COLUMNS;
      case "Momo withdrawal":
        return MOMO_WITHDRWAL_COLUMNS;
      case "Crypto transactions":
        return CRYPTO_TRANSACTIONS_COLUMNS;
    }
  };

  const renderPlaceHolder = () => {
    switch (searchType) {
      case "User":
        return "Search by user";
      case "Momo topup":
        return "Reference ID";
      case "Momo withdrawal":
        return "Reference ID";
      case "Crypto transactions":
        return "Transaction ID, Recipient address";
    }
  };

  return (
    <PageLayout title="Hone">
      <Modal
        openModal={openModal && searchType === "Crypto transactions"}
        onClose={() => setOpenModal(false)}
        headerCenter={
          <div className={styles.modalHeader}>
            <p>Transaction details</p>
            <div className={styles.breadCrumb}>Crypto transactions</div>
            <div className={styles.breadCrumb}>Receive</div>
          </div>
        }
        headerLeft={
          <div className={styles.iconContainer}>
            <img src="/icons/receipt-check.svg" />
          </div>
        }
      >
        <div className={styles.modalContainer}>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>
              User: <span style={{ color: "black" }}>@Samuel12345</span>
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction ID:</p>
            <p className={styles.value}>TX12345678909887776665</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction Status:</p>
            <div className={styles.statusContainer}>
              <div className={styles.statusIndicator} /> Confirmed
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Asset:</p>
            <p className={styles.value}>Bitcoin</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Address:</p>
            <p className={styles.value}>123, mark avenue</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Asset amount:</p>
            <p className={styles.value} style={{ color: "#16B364" }}>
              +0.001234 BTC
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>USD value:</p>
            <p className={styles.value}>$7,500.00</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Total paid:</p>
            <p className={styles.value}>GHS 750,099.00</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Confirmations:</p>
            <p className={styles.value}>24/24</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction date:</p>
            <p className={styles.value}>Monday 23 Jan, 2023 07:52 AM</p>
          </div>
        </div>
      </Modal>
      <Modal
        openModal={openModal && searchType === "Momo withdrawal"}
        onClose={() => setOpenModal(false)}
        headerCenter={
          <div className={styles.modalHeader}>
            <p>Transaction details</p>
            <div className={styles.breadCrumb}>Sell (Momo withdrawal)</div>
            <div className={styles.breadCrumb}>BITCOIN</div>
          </div>
        }
        headerLeft={
          <div className={styles.iconContainer}>
            <img src="/icons/receipt-check.svg" />
          </div>
        }
      >
        <div className={styles.modalContainer}>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>
              User: <span style={{ color: "black" }}>@Samuel12345</span>
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction ID:</p>
            <p className={styles.value}>TX12345678909887776665</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction Status:</p>
            <div className={styles.statusContainer}>
              <div className={styles.statusIndicator} /> Successful
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Asset amount:</p>
            <p className={styles.value} style={{ color: "#F79009" }}>
              -0.001234 BTC <span style={{ color: "#98A2B3" }}>($50.06)</span>
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Amount:</p>
            <p className={styles.value}>GHS 500.00</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Rate:</p>
            <p className={styles.value}>
              Sold @ 11.2 (price at sell time: $28700.00)
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Fee:</p>
            <p className={styles.value}>
              $1.20 <span style={{ color: "#98A2B3" }}>($50.06)</span>
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Total paid:</p>
            <p className={styles.value}>GHS 750,099.00</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Payment account:</p>
            <p className={styles.status}>
              Samuel samuel{" "}
              <span style={{ color: "#667085" }}>(+2334567895566)</span>
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Order time:</p>
            <p className={styles.value}>Mon 23 jan 07:40:03AM</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Completion time:</p>
            <p className={styles.value}>
              Paid by Pi(Cashout @ Mon 23 jan 07:40:03AM)
            </p>
          </div>
        </div>
      </Modal>
      <Modal
        openModal={openModal && searchType === "Momo topup"}
        onClose={() => setOpenModal(false)}
        headerCenter={
          <div className={styles.modalHeader}>
            <p>Transaction details</p>
            <div className={styles.breadCrumb}>Buy (Momo Top-Up)</div>
            <div className={styles.breadCrumb}>BITCOIN</div>
          </div>
        }
        headerLeft={
          <div className={styles.iconContainer}>
            <img src="/icons/receipt-check.svg" />
          </div>
        }
      >
        <div className={styles.modalContainer}>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>
              User: <span style={{ color: "black" }}>@Samuel12345</span>
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction ID:</p>
            <p className={styles.value}>TX12345678909887776665</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction Status:</p>
            <div className={styles.statusContainer}>
              <div className={styles.statusIndicator} /> Successful
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Asset amount:</p>
            <p className={styles.value} style={{ color: "#16B364" }}>
              +0.001234 BTC
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Rate:</p>
            <p className={styles.value}>100 ghs per Dollar</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Payment account:</p>
            <p className={styles.status}>
              Samuel samuel{" "}
              <span style={{ color: "#667085" }}>(+2334567895566)</span>
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction date:</p>
            <p className={styles.value}>Monday 23 Jan, 2023 07:52 AM</p>
          </div>
        </div>
      </Modal>
      <Modal
        openModal={openModal && searchType === "User"}
        onClose={() => setOpenModal(false)}
        headerCenter={
          <div
            style={{
              width: "fit-content",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              justifySelf: "center",
            }}
          >
            <Button color="white">#</Button>
          </div>
        }
      >
        <div className={styles.modalContainer}>
          <p className={styles.modalHeader}>Account details</p>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Account:</p>
            <p className={styles.value}>
              {currentUser.firstName} {currentUser.lastName}
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Country:</p>
            <p className={styles.value}>
              {COUNTRY_MAP[currentUser.countryCode]} ({currentUser.countryCode})
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Username:</p>
            <p className={styles.value}>{currentUser.username}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Email:</p>
            <p className={styles.value}>{currentUser.email}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Phone number:</p>
            <p className={styles.value}>{currentUser.phone}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Active:</p>
            <p className={styles.valueStatus}>
              {currentUser.active?.toString()}
            </p>
          </div>
          <div className={styles.divider} />
          <p className={styles.date}>
            Date registered: {currentUser.createdOn}
          </p>
          <p className={styles.date}>12:33:28 GMT</p>
          <Button
            onClick={() => setOpenModal(false)}
            className={styles.modalButton}
          >
            Close
          </Button>
        </div>
      </Modal>
      <div className={styles.container}>
        <h3 className={styles.header}>Search</h3>
        <div className={styles.searchContainer}>
          <div className={styles.searchCard}>
            <div className={styles.dropdownContainer}>
              <Dropdown
                value={searchType}
                options={[
                  { title: "User", value: "User" },
                  { title: "Momo topup", value: "Momo topup" },
                  { title: "Momo withdrawal", value: "Momo withdrawal" },
                  {
                    title: "Crypto transactions",
                    value: "Crypto transactions",
                  },
                ]}
                onChange={(value) => {
                  setSearchType(String(value));
                  setData([]);
                }}
              />
            </div>
            <div className={styles.searchHeader}>
              <img src="/icons/search.svg" />
              <input
                className={styles.input}
                placeholder={renderPlaceHolder()}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div>
              <Button onClick={onSearch} className={styles.searchButton}>
                Search
              </Button>
            </div>
          </div>
        </div>
        {data.length === 0 ? (
          <p className={styles.searchHint}></p>
        ) : (
          <div className={styles.table} style={{ overflow: "hidden" }}>
            <p className={styles.resultText}>{data.length} result found!</p>
            <Table
              style={{
                fontFamily: "PP Telegraf",
                border: "1px solid var(--Gray-200, #EAECF0)",
                borderRadius: 12,
                boxShadow: "0px 7px 37px -24px rgba(0, 0, 0, 0.09)",
                overflow: "hidden"
              }}
              dataSource={data.map((user: any) => ({
                ...user,
                action: () => showModal(user),
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
