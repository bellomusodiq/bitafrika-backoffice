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
import VirtualCard from "@/components/VirtualCard/VirtualCard";
import Input from "@/components/Input/Input";

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
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
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
];

const TRANSACTIONS_DATA = [
  {
    transactionId: "#12345566...9934",
    type: "Settlement",
    description: "Approved or completed successfully",
    merchant: "AppleMusic.com",
    amount: "$9.99",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
  {
    transactionId: "#12345566...9934",
    type: "Settlement",
    description: "Approved or completed successfully",
    merchant: "AppleMusic.com",
    amount: "$9.99",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
  {
    transactionId: "#12345566...9934",
    type: "Settlement",
    description: "Approved or completed successfully",
    merchant: "AppleMusic.com",
    amount: "$9.99",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
  {
    transactionId: "#12345566...9934",
    type: "Settlement",
    description: "Approved or completed successfully",
    merchant: "AppleMusic.com",
    amount: "$9.99",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
  {
    transactionId: "#12345566...9934",
    type: "Settlement",
    description: "Approved or completed successfully",
    merchant: "AppleMusic.com",
    amount: "$9.99",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
  {
    transactionId: "#12345566...9934",
    type: "Settlement",
    description: "Approved or completed successfully",
    merchant: "AppleMusic.com",
    amount: "$9.99",
    status: "Successful",
    date: "Thur 18 Jan, 2023",
  },
];

export default function Search() {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [openModal, setOpenModal] = useState<string | null>(null);
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
        openModal={openModal === "terminate"}
        onClose={() => setOpenModal(null)}
        customStyles={{ width: "30%" }}
        headerLeft={<>Terminate card</>}
      >
        <div className={styles.modalContainer}>
          <p className={styles.description}>
            You are about to terminate @Username virtual card. Card details will
            be deleted and card would become invalid for use. To continue, enter
            the keyword provided.
          </p>
          <div className={styles.labelContainer}>
            <p className={styles.label}>Reason</p>
          </div>
          <Input placeholder="Enter reason for termination" />
          <div className={styles.labelContainer}>
            <p className={styles.label}>Enter the keyword</p>
            <p className={styles.info}>delete-0223</p>
          </div>
          <Input placeholder="" />
          <div className={styles.modalFooter2}>
            <Button
              onClick={() => setOpenModal(null)}
              className={styles.modalButton}
              color="white"
            >
              Cancel
            </Button>
            <Button
              onClick={() => setOpenModal(null)}
              className={styles.modalButton}
            >
              Terminate
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        openModal={openModal === "withdraw"}
        onClose={() => setOpenModal(null)}
        customStyles={{ width: "30%" }}
        headerLeft={<>Withdraw user balance</>}
      >
        <div className={styles.modalContainer}>
          <div className={styles.labelContainer}>
            <p className={styles.label}>Amount</p>
          </div>
          <Input placeholder="0.00" type="number" />
          <div className={styles.labelContainer}>
            <p className={styles.label}>Enter otp code (Telegram)</p>
            <p style={{ cursor: "pointer" }} className={styles.info}>
              Send OTP
            </p>
          </div>
          <Input placeholder="" />
          <div className={styles.modalFooter2}>
            <Button
              onClick={() => setOpenModal(null)}
              className={styles.modalButtonFull}
            >
              Withdrawal
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        openModal={openModal === "freeze"}
        onClose={() => setOpenModal(null)}
        customStyles={{ width: "30%" }}
        headerLeft={<>Freeze card</>}
      >
        <div className={styles.modalContainer}>
          <div className={styles.labelContainer}>
            <p className={styles.label}>Reason</p>
          </div>
          <Input placeholder="Enter reason for freezing card" />
          <div className={styles.labelContainer}>
            <p className={styles.label}>Enter the keyword</p>
            <p className={styles.info}>freeze-0223</p>
          </div>
          <Input placeholder="" />
          <div className={styles.modalFooter2}>
            <Button
              onClick={() => setOpenModal(null)}
              className={styles.modalButtonFull}
            >
              Freeze card
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        openModal={openModal === "topup"}
        onClose={() => setOpenModal(null)}
        customStyles={{ width: "30%" }}
        headerLeft={<>Top up user balance</>}
      >
        <div className={styles.modalContainer}>
          <div className={styles.labelContainer}>
            <p className={styles.label}>Amount</p>
          </div>
          <Input placeholder="0.00" />
          <div className={styles.labelContainer}>
            <p className={styles.label}>Enter otp cod (Telegram)</p>
            <p className={styles.info}>Send OTP</p>
          </div>
          <Input placeholder="" />
          <div className={styles.modalFooter2}>
            <Button
              onClick={() => setOpenModal(null)}
              className={styles.modalButtonFull}
            >
              Top up
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
          <h3 className={styles.header}>Card details</h3>
          <div>
            <Button color="white" onClick={() => router.back()}>
              <img src="/icons/arrow-left.svg" /> Back
            </Button>
          </div>
        </div>

        <div className={styles.cardDetailContainer}>
          <div className={styles.cardLeft}>
            <VirtualCard />
            <div className={styles.btnContainer}>
              <button onClick={() => setOpenModal("topup")}>
                <div className={styles.btn}>
                  <img src="/icons/cards-plus.svg" />
                </div>
                Top Up
              </button>
              <button onClick={() => setOpenModal("withdraw")}>
                <div className={styles.btn}>
                  <img src="/icons/cards-minus.svg" />
                </div>
                Withdraw
              </button>
              <button onClick={() => setOpenModal("freeze")}>
                <div className={styles.btn}>
                  <img src="/icons/freeze.svg" />
                </div>
                Freeze Card
              </button>
              <button onClick={() => setOpenModal("terminate")}>
                <div className={styles.btn}>
                  <img src="/icons/terminate.svg" />
                </div>
                Terminate
              </button>
            </div>
          </div>
          <div className={styles.cardRight}>
            <p className={styles.cardItemTitle}>Details</p>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.itemText}>Username</p>
              <p className={styles.itemText}>@username</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.itemText}>Current balance</p>
              <p className={styles.itemText}>$2.00</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.itemText}>Limit</p>
              <p className={styles.itemText}>$2.00 / $2.00</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.itemText}>Created date</p>
              <p className={styles.itemText}>Jan, 20 2024</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.itemText}>Expiration date</p>
              <p className={styles.itemText}>Jan 20, 2025</p>
            </div>
          </div>
        </div>
        <h3 className={styles.tableHeader}>Transactions</h3>
        <div className={styles.table} style={{ overflow: "hidden" }}>
          <Table
            style={{
              fontFamily: "PP Telegraf",
              border: "1px solid var(--Gray-200, #EAECF0)",
              borderRadius: 12,
              boxShadow: "0px 7px 37px -24px rgba(0, 0, 0, 0.09)",
              overflow: "hidden",
            }}
            dataSource={TRANSACTIONS_DATA.map((user: any) => ({
              ...user,
              action: () => showModal(user),
            }))}
            columns={TRANSACTIONS_COLUMNS}
            loading={loading}
          />
        </div>
      </div>
    </PageLayout>
  );
}
