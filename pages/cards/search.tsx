import React, { useState } from "react";

import PageLayout from "@/components/PageLayout";
import styles from "@/pages/cards/search.module.css";
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

const REQUESTS_COLUMNS = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
    render: (_: any, { username }: any) => (
      <p className={styles.username}>{username}</p>
    ),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Funding amount",
    dataIndex: "fundingAmount",
    key: "fundingAmount",
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

const REQUESTS_DATA = [
  {
    username: "Samuel 12345",
    name: "Samuel Samuel",
    type: "Mastercard",
    fundingAmount: "$100.50",
    status: "Successful",
  },
  {
    username: "Samuel 12345",
    name: "Samuel Samuel",
    type: "Mastercard",
    fundingAmount: "$100.50",
    status: "Successful",
  },
  {
    username: "Samuel 12345",
    name: "Samuel Samuel",
    type: "Mastercard",
    fundingAmount: "$100.50",
    status: "Successful",
  },
  {
    username: "Samuel 12345",
    name: "Samuel Samuel",
    type: "Mastercard",
    fundingAmount: "$100.50",
    status: "Successful",
  },
  {
    username: "Samuel 12345",
    name: "Samuel Samuel",
    type: "Mastercard",
    fundingAmount: "$100.50",
    status: "Successful",
  },
  {
    username: "Samuel 12345",
    name: "Samuel Samuel",
    type: "Mastercard",
    fundingAmount: "$100.50",
    status: "Successful",
  },
  {
    username: "Samuel 12345",
    name: "Samuel Samuel",
    type: "Mastercard",
    fundingAmount: "$100.50",
    status: "Successful",
  },
];

const CARDS_COLUMNS = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
    render: (_: any, { username }: any) => (
      <p className={styles.username}>{username}</p>
    ),
  },
  {
    title: "Card number",
    dataIndex: "cardNumber",
    key: "cardNumber",
  },
  {
    title: "Exp. date",
    dataIndex: "expDate",
    key: "expDate",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
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

const CARDS_DATA = [
  {
    username: "@samuel12345",
    cardNumber: "ending in 9090",
    expDate: "12/25",
    type: "Mastercard",
  },
  {
    username: "@samuel12345",
    cardNumber: "ending in 9090",
    expDate: "12/25",
    type: "Mastercard",
  },
  {
    username: "@samuel12345",
    cardNumber: "ending in 9090",
    expDate: "12/25",
    type: "Mastercard",
  },
  {
    username: "@samuel12345",
    cardNumber: "ending in 9090",
    expDate: "12/25",
    type: "Mastercard",
  },
  {
    username: "@samuel12345",
    cardNumber: "ending in 9090",
    expDate: "12/25",
    type: "Mastercard",
  },
];

const DISPUTES_COLUMNS = [
  {
    title: "#Transaction ID",
    dataIndex: "transactionId",
    key: "transactionId",
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Card number",
    dataIndex: "cardNumber",
    key: "cardNumber",
  },
  {
    title: "Dispute amount",
    dataIndex: "disputeAmount",
    key: "disputeAmount",
  },
  {
    title: "Merchant name",
    dataIndex: "merchantName",
    key: "merchantName",
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

const DISPUTES_DATA = [
  {
    transactionId: "#12345566...9934",
    username: "@samuel12345",
    cardNumber: "Ending in 0000",
    disputeAmount: "$9.99",
    merchantName: "SpotifyNG",
    date: "Thur 18th jan 2023",
  },
  {
    transactionId: "#12345566...9934",
    username: "@samuel12345",
    cardNumber: "Ending in 0000",
    disputeAmount: "$9.99",
    merchantName: "SpotifyNG",
    date: "Thur 18th jan 2023",
  },
  {
    transactionId: "#12345566...9934",
    username: "@samuel12345",
    cardNumber: "Ending in 0000",
    disputeAmount: "$9.99",
    merchantName: "SpotifyNG",
    date: "Thur 18th jan 2023",
  },
  {
    transactionId: "#12345566...9934",
    username: "@samuel12345",
    cardNumber: "Ending in 0000",
    disputeAmount: "$9.99",
    merchantName: "SpotifyNG",
    date: "Thur 18th jan 2023",
  },
  {
    transactionId: "#12345566...9934",
    username: "@samuel12345",
    cardNumber: "Ending in 0000",
    disputeAmount: "$9.99",
    merchantName: "SpotifyNG",
    date: "Thur 18th jan 2023",
  },
  {
    transactionId: "#12345566...9934",
    username: "@samuel12345",
    cardNumber: "Ending in 0000",
    disputeAmount: "$9.99",
    merchantName: "SpotifyNG",
    date: "Thur 18th jan 2023",
  },
];

const TOPUPS_COLUMNS = [
  {
    title: "#Transaction ID",
    dataIndex: "transactionId",
    key: "transactionId",
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Card number",
    dataIndex: "cardNumber",
    key: "cardNumber",
  },
//   {
//     title: "Transaction type",
//     dataIndex: "transactionType",
//     key: "transactionType",
//   },
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

const TOPUPS_DATA = [
  {
    transactionId: "#12345566...9934",
    username: "@samuel12345",
    cardNumber: "Ending in 0000",
    transactionType: "Momo to bank",
  },
  {
    transactionId: "#12345566...9934",
    username: "@samuel12345",
    cardNumber: "Ending in 0000",
    transactionType: "Momo to bank",
  },
  {
    transactionId: "#12345566...9934",
    username: "@samuel12345",
    cardNumber: "Ending in 0000",
    transactionType: "Momo to bank",
  },
  {
    transactionId: "#12345566...9934",
    username: "@samuel12345",
    cardNumber: "Ending in 0000",
    transactionType: "Momo to bank",
  },
  {
    transactionId: "#12345566...9934",
    username: "@samuel12345",
    cardNumber: "Ending in 0000",
    transactionType: "Momo to bank",
  },
  {
    transactionId: "#12345566...9934",
    username: "@samuel12345",
    cardNumber: "Ending in 0000",
    transactionType: "Momo to bank",
  },
];

const TRANSACTIONS_COLUMNS = [
  {
    title: "Transaction ID",
    dataIndex: "transactionId",
    key: "transactionId",
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Merchant",
    dataIndex: "merchant",
    key: "merchant",
    render: (_: any, { merchant }: any) => (
      <p className={styles.username}>{merchant}</p>
    ),
  },
  {
    title: "Amount",
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

const TRANSACTIONS_DATA = [
  {
    transactionId: "#12345566...9934",
    username: "@samuel12345",
    merchant: "AppleMusic.com",
    amount: "$9.99",
    status: "Successful",
  },
  {
    transactionId: "#12345566...9934",
    username: "@samuel12345",
    merchant: "AppleMusic.com",
    amount: "$9.99",
    status: "Successful",
  },
  {
    transactionId: "#12345566...9934",
    username: "@samuel12345",
    merchant: "AppleMusic.com",
    amount: "$9.99",
    status: "Successful",
  },
  {
    transactionId: "#12345566...9934",
    username: "@samuel12345",
    merchant: "AppleMusic.com",
    amount: "$9.99",
    status: "Successful",
  },
  {
    transactionId: "#12345566...9934",
    username: "@samuel12345",
    merchant: "AppleMusic.com",
    amount: "$9.99",
    status: "Successful",
  },
  {
    transactionId: "#12345566...9934",
    username: "@samuel12345",
    merchant: "AppleMusic.com",
    amount: "$9.99",
    status: "Successful",
  },
];

export default function Search() {
  const [search, setSearch] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [currentUser, setCurrentUser] = useState<any>({});
  const [searchType, setSearchType] = useState<string>("Cards");

  const onSearch = () => {
    switch (searchType) {
      case "Requests":
        setData(REQUESTS_DATA);
        break;
      case "Cards":
        setData(CARDS_DATA);
        break;
      case "Disputes":
        setData(DISPUTES_DATA);
        break;
      case "Top up":
        setData(TOPUPS_DATA);
      case "Transactions":
        setData(TRANSACTIONS_DATA);
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
      case "Requests":
        return REQUESTS_COLUMNS;
      case "Cards":
        return CARDS_COLUMNS;
      case "Disputes":
        return DISPUTES_COLUMNS;
      case "Top up":
        return TOPUPS_COLUMNS;
      case "Transactions":
        return TRANSACTIONS_COLUMNS;
    }
  };

  const renderPlaceHolder = () => {
    switch (searchType) {
      case "Cards":
        return "Last 4 digits of card";
      case "Requests":
        return "Username/ID";
      case "Disputes":
        return "Reference ID/User";
      case "Top up":
        return "Reference ID/User";
      case "Transactions":
        return "Reference ID/User";
    }
  };

  return (
    <PageLayout title="Hone">
      <Modal
        openModal={openModal && searchType === "Cards"}
        onClose={() => setOpenModal(false)}
        headerCenter={
          <div className={styles.modalHeader}>
            <p>Details</p>
            <div className={styles.breadCrumb}>Cards</div>
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
        openModal={openModal && searchType === "Requests"}
        onClose={() => setOpenModal(false)}
        headerCenter={
          <div className={styles.modalHeader}>
            <p>Details</p>
            <div className={styles.breadCrumb}>Requests</div>
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
              <p className={styles.key}>Username/ID</p>
              <p className={styles.value}>Samuel Ade Samuel</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Phone number</p>
              <p className={styles.value}>+233 908 000 0000</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Card type</p>
              <p className={styles.value}>Mastercard virtual</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Address</p>
              <p className={styles.value}>
                123 street name, city, state, country
              </p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>KYC ID</p>
              <p className={styles.value}>A0123WZ34</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Funding amount</p>
              <p className={styles.value}>$100.69</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Funding Method</p>
              <p className={styles.value}>USDT</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Date requested</p>
              <p className={styles.value}>Monday 23 Jan, 2023 07:52 AM</p>
            </div>
          </div>
          <div className={styles.modalFooter}>
            <div>
              <Button color="white">Decline</Button>
            </div>
            <div>
              <Button>Approve</Button>
            </div>
          </div>
        </>
      </Modal>
      <Modal
        openModal={openModal && searchType === "Top up"}
        onClose={() => setOpenModal(false)}
        headerCenter={
          <div className={styles.modalHeader}>
            <p>Details</p>
            <div className={styles.breadCrumb}>Topup</div>
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
              <p className={styles.key}>Transaction ID</p>
              <p className={styles.value}>TX12345678909887776665</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Card number</p>
              <p className={styles.value}>ending in 9086</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Transaction type</p>
              <p className={styles.value}>Topup</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Reason</p>
              <p className={styles.value}>SpotifyNG</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Transaction date</p>
              <p className={styles.value}>Monday 23 Jan, 2023 07:52 AM</p>
            </div>
          </div>
          <div className={styles.modalFooter}>
            <div>
              <Button color="white">Decline</Button>
            </div>
            <div>
              <Button>Approve</Button>
            </div>
          </div>
        </>
      </Modal>
      <Modal
        openModal={openModal && searchType === "Disputes"}
        onClose={() => setOpenModal(false)}
        headerCenter={
          <div className={styles.modalHeader}>
            <p>Details</p>
            <div className={styles.breadCrumb}>Dispute</div>
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
              <p className={styles.key}>Transaction ID</p>
              <p className={styles.value}>TX12345678909887776665</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Cardholder name</p>
              <p className={styles.value}>Samuel Ade Samuel</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Card number</p>
              <p className={styles.value}>ending in 9086</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Dispute amount</p>
              <p className={styles.value}>$50.90</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Merchant name</p>
              <p className={styles.value}>SpotifyNG</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Contact</p>
              <p className={styles.value}>01234567890</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Transaction date</p>
              <p className={styles.value}>Monday 23 Jan, 2023 07:52 AM</p>
            </div>
          </div>
          <div className={styles.modalFooter}>
            <div>
              <Button>Resolved</Button>
            </div>
          </div>
        </>
      </Modal>
      <Modal
        openModal={openModal && searchType === "Transactions"}
        onClose={() => setOpenModal(false)}
        headerCenter={
          <div className={styles.modalHeader}>
            <p>Details</p>
            <div className={styles.breadCrumb}>Transactions</div>
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
              <p className={styles.key}>Transaction ID</p>
              <p className={styles.value}>TX12345678909887776665</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Amount</p>
              <p className={styles.value}>$9.99</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Merchant</p>
              <p className={styles.value}>AppleMusic.com</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Conversion fees</p>
              <p className={styles.value}>11.2GHS / USD</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Total</p>
              <p className={styles.value}>$100.69</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Description</p>
              <p className={styles.value}>Description goes here</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Status</p>
              <p className={styles.statusContainer}>
                <div className={styles.statusIndicator} />
                Successful
              </p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Transaction date</p>
              <p className={styles.value}>Monday 23 Jan, 2023 07:52 AM</p>
            </div>
          </div>
          <div className={styles.modalFooter}>
            <div>
              <Button>Close</Button>
            </div>
          </div>
        </>
      </Modal>
      <NavigationStep hideButton navigation={["Home", "Search", "Cards"]} />
      <div className={styles.container}>
        <h3 className={styles.header}>Search</h3>
        <div className={styles.searchContainer}>
          <div className={styles.searchCard}>
            <div className={styles.dropdownContainer}>
              <Dropdown
                value={searchType}
                options={[
                  { title: "Cards", value: "Cards" },
                  { title: "Requests", value: "Requests" },
                  { title: "Disputes", value: "Disputes" },
                  {
                    title: "Top up",
                    value: "Top up",
                  },
                  {
                    title: "Transactions",
                    value: "Transactions",
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
          <p className={styles.searchHint}>
            
          </p>
        ) : (
          <div className={styles.table} style={{overflow: "hidden"}}>
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
