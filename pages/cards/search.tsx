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
import { useRouter } from "next/router";
import Link from "next/link";
import Pagination from "@/components/Pagination";

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
      <Link href={`/users/details/${username}`} className={styles.username}>
        {username}
      </Link>
    ),
  },
  {
    title: "Card number",
    dataIndex: "cardNumber",
    key: "cardNumber",
  },
  {
    title: "Exp. date",
    dataIndex: "expiryDate",
    key: "expiryDate",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Balance",
    dataIndex: "balance",
    key: "balance",
    render: (_: any, { balance }: any) => <>${balance}</>,
  },
  {
    title: "Date",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "Status",
    dataIndex: "sstatus",
    key: "status",
    render: (_: any, { status }: any) => (
      <span
        style={{
          borderRadius: 16,
          padding: "12px 16px",
          backgroundColor: status === "Card - Active" ? "#EDFCF2" : "#FAFAFA",
          color: status === "Card - Active" ? "#087443" : "#424242",
        }}
      >
        {status}
      </span>
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
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Merchant",
    dataIndex: "merchantName",
    key: "merchantName",
    render: (_: any, { merchantName }: any) => (
      <p className={styles.username}>{merchantName}</p>
    ),
  },
  {
    title: "Amount",
    dataIndex: "transactionAmount",
    key: "transactionAmount",
    render: (_: any, { transactionAmount }: any) => <>${transactionAmount}</>,
  },
  {
    title: "Status",
    dataIndex: "transactionStatus",
    key: "transactionStatus",
    render: (_: any, { transactionStatus }: any) => (
      <span
        style={{
          borderRadius: 16,
          padding: "12px 16px",
          backgroundColor:
            transactionStatus === "Approved" ? "#EDFCF2" : "#FAFAFA",
          color: transactionStatus === "Approved" ? "#087443" : "#424242",
        }}
      >
        {transactionStatus}
      </span>
    ),
  },
  {
    title: "Date",
    dataIndex: "transactionTime",
    key: "transactionTime",
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
    date: "Thur 18 Jan, 2023",
  },
  {
    transactionId: "#12345566...9934",
    username: "@samuel12345",
    merchant: "AppleMusic.com",
    amount: "$9.99",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
  {
    transactionId: "#12345566...9934",
    username: "@samuel12345",
    merchant: "AppleMusic.com",
    amount: "$9.99",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
  {
    transactionId: "#12345566...9934",
    username: "@samuel12345",
    merchant: "AppleMusic.com",
    amount: "$9.99",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
  {
    transactionId: "#12345566...9934",
    username: "@samuel12345",
    merchant: "AppleMusic.com",
    amount: "$9.99",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
  {
    transactionId: "#12345566...9934",
    username: "@samuel12345",
    merchant: "AppleMusic.com",
    amount: "$9.99",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
];

export default function Search() {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [currentUser, setCurrentUser] = useState<any>({});
  const [searchType, setSearchType] = useState<string>("CARDS");
  const [pageInfo, setPageInfo] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  let auth: any = {};
  if (typeof window !== "undefined" && localStorage.getItem("auth")) {
    auth = JSON.parse(localStorage.getItem("auth") || "");
  }

  const searchCards = () => {
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/virtual-cards/search`,
        {
          page: currentPage,
          filter: searchType,
          query: search,
        },
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res: any) => {
        setLoading(false);
        if (res.data.success) {
          setData(
            res.data.data.map((item: any, i: number) => ({
              ...item,
              action: () => {
                router.push(`/cards/details/${item.cardId}`);
              },
            }))
          );
          setPageInfo(res.data.pageInfo);
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
    searchCards();
  };

  const showModal = (id: string) => {
    router.push(`/cards/details/${id}`);
  };

  const getColumns = () => {
    switch (searchType) {
      case "Requests":
        return REQUESTS_COLUMNS;
      case "CARDS":
        return CARDS_COLUMNS;
      case "Disputes":
        return DISPUTES_COLUMNS;
      case "Top up":
        return TOPUPS_COLUMNS;
      case "TRANSACTIONS":
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
      <div className={styles.container}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button color="white" isText onClick={() => router.back()}>
            <img src="/icons/arrow-left.svg" />
          </Button>
          <p className={styles.filterTitle}>Filter card search result by</p>
        </div>
        <div className={styles.searchContainer}>
          <div className={styles.searchCard}>
            <div className={styles.dropdownContainer}>
              <Dropdown
                value={searchType}
                options={[
                  { title: "Cards", value: "CARDS" },
                  {
                    title: "Transactions",
                    value: "TRANSACTIONS",
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
                overflow: "hidden",
              }}
              dataSource={data.map((item: any) => ({
                ...item,
                action: () => showModal(item.cardId),
              }))}
              columns={getColumns()}
              loading={loading}
              pagination={false}
            />
            <Pagination pageInfo={pageInfo} setCurrentPage={setCurrentPage} />
          </div>
        )}
      </div>
    </PageLayout>
  );
}
