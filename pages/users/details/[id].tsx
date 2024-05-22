import React, { useEffect, useRef, useState } from "react";
import styles from "@/pages/users/details/details.module.css";
import { NextPage } from "next";
import PageLayout from "@/components/PageLayout";
import NavigationStep from "@/components/NavigationStep";
import Button from "@/components/Button";
import {
  Avatar,
  Divider,
  Table,
  Tag,
  Button as AntButton,
  Modal as AntModal,
  Input as AntInput,
  message,
} from "antd";
import KeyValue from "@/components/KeyValue/KeyValue";
import Modal from "@/components/Modal";
import Input from "@/components/Input/Input";
import Dropdown from "@/components/Dropdown";
import axios from "axios";
import { BASE_URL } from "@/CONFIG";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import { UserOutlined } from "@ant-design/icons";

const PaymentAccountsTable: React.FC<any> = ({ data }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const columns: any = [
    {
      title: "Payment Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phonenumber",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Provider",
      dataIndex: "provider",
      key: "provider",
    },
    {
      title: "Date Registered",
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];

  return (
    <Table
      style={{
        fontFamily: "PP Telegraf",
        border: "1px solid var(--Gray-200, #EAECF0)",
        borderRadius: 12,
        boxShadow: "0px 7px 37px -24px rgba(0, 0, 0, 0.09)",
        overflow: "hidden",
      }}
      dataSource={data}
      columns={columns}
    />
  );
};

const KYCVerificationTable: React.FC<any> = ({ data }) => {
  const [openPhotosModal, setOpenPhotosModal] = useState<any>(null);
  const [openDocumentsModal, setOpenDocumentsModal] = useState<any>(null);
  const [openRejectModal, setOpenRejectModal] = useState<any>(null);

  const dataSource = data.map((item: any) => ({
    ...item,
    onOpenPhotos: () => setOpenPhotosModal(item),
    onViewDocuments: () => setOpenDocumentsModal(item),
    onReject: () => setOpenRejectModal(item),
  }));

  const columns: any = [
    {
      title: "Username",
      dataIndex: "username",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_: any, { status }: any) => (
        <div className={styles.statusContainer}>
          <div className={styles.statusIndicator} />
          <span>{status}</span>
        </div>
      ),
    },
    {
      title: "Date completed",
      dataIndex: "dateCompleted",
      key: "dateCompleted",
    },
    {
      title: "",
      dataIndex: "action",
      render: (_: any, { onOpenPhotos, onViewDocuments, onReject }: any) => (
        <div className={styles.actionButton}>
          <div style={{ marginRight: 10 }}>
            <Button onClick={onOpenPhotos}>View photos</Button>
          </div>
          <div style={{ marginRight: 10 }}>
            <Button color="white" onClick={onViewDocuments}>
              View KYC
            </Button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        style={{
          fontFamily: "PP Telegraf",
          border: "1px solid var(--Gray-200, #EAECF0)",
          borderRadius: 12,
          boxShadow: "0px 7px 37px -24px rgba(0, 0, 0, 0.09)",
          overflow: "hidden",
        }}
        dataSource={dataSource}
        columns={columns}
      />
      <Modal
        openModal={Boolean(openPhotosModal)}
        onClose={() => setOpenPhotosModal(null)}
        customStyles={{ width: "30vw" }}
        headerLeft={<p style={{ width: 300 }}>Photos</p>}
      >
        <div className={styles.modalContainer}>
          <div className={styles.photoContainer}>
            <p className={styles.photoTitle}>Selfie URL</p>
            <img
              src={openPhotosModal?.photos?.selfieUrl}
              className={styles.photo}
            />
          </div>
          <div className={styles.photoContainer}>
            <p className={styles.photoTitle}>Photo URL</p>
            <img
              src={openPhotosModal?.photos?.photoUrl}
              className={styles.photo}
            />
          </div>
        </div>
      </Modal>
      <Modal
        openModal={Boolean(openDocumentsModal)}
        onClose={() => setOpenDocumentsModal(null)}
        customStyles={{ width: "30vw" }}
        headerLeft={<p style={{ width: 300 }}>Documents</p>}
      >
        <div className={styles.modalContainer}>
          <div className={styles.photoContainer}>
            <p className={styles.photoTitle}>Document URL</p>
            <a href={openPhotosModal?.documentUrl} className={styles.photo}>
              {openPhotosModal?.documentUrl}
            </a>
          </div>
        </div>
      </Modal>
    </>
  );
};

const AccountBalanceTable: React.FC<any> = ({ data }) => {
  const code1 = useRef(null);
  const code2 = useRef(null);
  const code3 = useRef(null);
  const code4 = useRef(null);
  const codeMap: { [k: number]: any } = {
    0: code1,
    1: code2,
    2: code3,
    3: code4,
  };
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openCodeModal, setOpenCodeModal] = useState<boolean>(false);
  const [deduct, setDeduct] = useState<boolean>(false);
  const [pin, setPin] = useState<string>("");
  const columns: any = [
    {
      title: "",
      dataIndex: "wallet",
      render: (_: any, { symbol, name, address, addressType }: any) => (
        <div className={styles.walletContainer}>
          <p className={styles.walletTitle}>
            {name} ({symbol})
          </p>
          <p className={styles.walletAddress}>
            Address: <span style={{ color: "#2251FA" }}>{address}</span>
          </p>
          <p className={styles.walletTitle}>Network: {addressType}</p>
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "balance",
      key: "balance",
      render: (_: any, { balance, symbol }: any) => (
        <div className={styles.walletContainer}>
          <p className={styles.walletTitle}>Balance:</p>
          <p className={styles.walletAddress}>
            {balance} {symbol}
          </p>
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "usdAmount",
      key: "usdAmount",
      render: (_: any, { usdAmount }: any) => (
        <div className={styles.walletContainer}>
          <p className={styles.walletTitle}>USD Amount:</p>
          <p className={styles.walletAddress}>${usdAmount}</p>
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "action",
      render: (_: any, { action }: any) => (
        <div className={styles.actionButton}>
          <div style={{ marginRight: 10 }}>
            <Button color="white" onClick={() => action(true)}>
              Deduct
            </Button>
          </div>
          <div>
            <Button onClick={action}>Add</Button>
          </div>
        </div>
      ),
    },
  ];

  const updatePin = (digit: string) => {
    if (pin.length < 4) {
      codeMap[pin.length + 1]?.current?.focus();
      setPin(`${pin}${digit}`);
    }
  };

  const deletePin = () => {
    if (pin.length > 0) {
      codeMap[pin.length - 1]?.current?.focus();
      if (codeMap[pin.length - 1]) {
        codeMap[pin.length - 1].current.value = "";
      }
      setPin(pin.slice(0, pin.length - 1));
    }
  };

  const changeCode = (e: any) => {
    if (e.key === "Backspace") {
      deletePin();
    } else {
      updatePin(e.target.value);
    }
  };

  return (
    <>
      <Modal
        openModal={openModal}
        onClose={() => setOpenModal(false)}
        customStyles={{ width: "30vw" }}
        headerLeft={
          <p style={{ width: 300 }}>
            {deduct
              ? "Deduct Crypto from user balance"
              : "Add crypto to user balance"}
          </p>
        }
      >
        <div className={styles.modalContainer}>
          <div className={styles.inputContainer}>
            <p>Amount</p>
            <Dropdown
              onChange={() => {}}
              options={[
                { title: "ETH", value: "ETH" },
                { title: "BTC", value: "BTC" },
                { title: "TRX", value: "TRX" },
              ]}
            />
          </div>
          <div className={styles.inputContainer}>
            <p>Amount</p>
            <Input
              type="number"
              className={styles.modalInput}
              placeholder="0.00"
            />
          </div>
          <div className={styles.modalFooter}>
            <div>
              <Button
                onClick={() => setOpenModal(false)}
                className={styles.modalButton}
                color="white"
              >
                Cancel
              </Button>
            </div>
            <div>
              <Button
                onClick={() => {
                  setOpenModal(false);
                  setOpenCodeModal(true);
                }}
                className={styles.modalButton}
              >
                {deduct ? "Deduct" : "Add"}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        headerLeft={
          <div className={styles.lockContainer}>
            <img src="/icons/lock.svg" />
          </div>
        }
        onClose={() => setOpenCodeModal(false)}
        openModal={openCodeModal}
      >
        <div className={styles.modalContainer}>
          <h3 className={styles.modalTitle}>Enter email verificaiton code</h3>
          <p className={styles.modalText}>
            Check your email for a 4-Digit verification code to continue
          </p>
          <div className={styles.codeContainer}>
            <input
              ref={code1}
              onKeyUp={(e) => changeCode(e)}
              className={styles.code}
            />
            <input
              ref={code2}
              onKeyUp={(e) => changeCode(e)}
              className={styles.code}
            />
            <input
              ref={code3}
              onKeyUp={(e) => changeCode(e)}
              className={styles.code}
            />
            <input
              ref={code4}
              onKeyUp={(e) => changeCode(e)}
              className={styles.code}
            />
          </div>
          <div className={styles.footerContainer}>
            <Button className={styles.footerButton}>Cancel</Button>
            <Button
              onClick={() => setOpenCodeModal(false)}
              color="white"
              className={styles.footerButton}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
      <Table
        style={{
          fontFamily: "PP Telegraf",
          border: "1px solid var(--Gray-200, #EAECF0)",
          borderRadius: 12,
          boxShadow: "0px 7px 37px -24px rgba(0, 0, 0, 0.09)",
          overflow: "hidden",
        }}
        dataSource={data}
        columns={columns}
      />
    </>
  );
};

const CardsTable: React.FC = () => {
  const router = useRouter();
  const [modalType, setModalType] = useState<
    "cardDetails" | "add" | "deduct" | null
  >(null);
  const columns: any = [
    {
      title: "Name",
      dataIndex: "name",
      render: (_: any, { name }: any) => (
        <div className={styles.cardContainer}>
          <img src="/images/master-card.png" className={styles.cardImage} />
          <div>
            <p className={styles.cardTitle}>Mastercard ending in 5678</p>
            <p className={styles.cardTitle}>
              Name:{" "}
              <span style={{ color: "rgb(34, 81, 250)" }}>Emma’s sub</span>
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Card type",
      dataIndex: "cardType",
      key: "cardType",
      render: (_: any, { cardType }: any) => (
        <p className={styles.cardType}>{cardType}</p>
      ),
    },
    {
      title: "Card balance",
      dataIndex: "cardBalance",
      key: "cardBalance",
      render: (_: any, { cardBalance }: any) => (
        <div className={styles.cardContainer}>
          <p className={styles.cardAddress}>${cardBalance}</p>
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "action",
      render: (_: any, { action }: any) => (
        <div className={styles.actionButton}>
          <div style={{ marginRight: 10 }}>
            <Button
              className={styles.cardBtns}
              color="white"
              onClick={() => router.push("/cards/details/1")}
            >
              View card details
            </Button>
          </div>
          <div style={{ marginRight: 10 }}>
            <Button
              className={styles.cardBtns}
              color="white"
              onClick={() => action("deduct")}
            >
              Deduct
            </Button>
          </div>
          <div>
            <Button className={styles.cardBtns} onClick={() => action("add")}>
              Add
            </Button>
          </div>
        </div>
      ),
    },
  ];

  const dataSource = [
    {
      key: "1",
      username: "@username",
      cardType: "Physical Mastercard",
      cardBalance: "5.00",
      action: setModalType,
    },
    {
      key: "2",
      username: "@username",
      cardType: "Physical Mastercard",
      cardBalance: "5.00",
      action: setModalType,
    },
    {
      key: "3",
      username: "@username",
      cardType: "Physical Mastercard",
      cardBalance: "5.00",
      action: setModalType,
    },
    {
      key: "4",
      username: "@username",
      cardType: "Physical Mastercard",
      cardBalance: "5.00",
      action: setModalType,
    },
    {
      key: "5",
      username: "@username",
      cardType: "Physical Mastercard",
      cardBalance: "5.00",
      action: setModalType,
    },
  ];

  return (
    <>
      <Modal
        openModal={modalType === "cardDetails"}
        onClose={() => setModalType(null)}
        headerLeft={<>Card details</>}
      >
        <div className={styles.modalContainer}>
          <div className={styles.cardNameContainer}>
            <div
              className={`${styles.inputContainer} ${styles.inputContainerLeft}`}
            >
              <p>Name on card</p>
              <Input value={"Olivia Rhye"} />
            </div>
            <div className={styles.inputContainer}>
              <p>Expiry</p>
              <Input value={"06 / 2024"} />
            </div>
          </div>
          <div className={styles.cardNameContainer}>
            <div
              className={`${styles.inputContainer} ${styles.inputContainerLeft}`}
            >
              <p>Card number</p>
              <Input value={"1234 1234 1234 1234"} />
            </div>
            <div className={styles.inputContainer}>
              <p>CVV</p>
              <Input value={"123"} />
            </div>
          </div>
          <h4 className={styles.otherDetails}>Other details</h4>
          <div className={styles.inputContainer}>
            <p>Available balance</p>
            <Input value={"$0.00"} />
          </div>
          <div className={styles.inputContainer}>
            <p>Date created</p>
            <Input value={"Thursday Feb 29, 2023 11:23am"} />
          </div>
          <div className={styles.inputContainer}>
            <p>Last used </p>
            <Input value={"Thursday Feb 29, 2023 11:23am"} />
          </div>
          <div className={styles.modalFooter}>
            <div>
              <Button
                onClick={() => setModalType(null)}
                className={styles.modalButton}
                color="white"
              >
                <span className={styles.redText}>Block card</span>
              </Button>
            </div>
            <div>
              <Button
                onClick={() => setModalType(null)}
                className={styles.modalButton}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        openModal={modalType === "add"}
        onClose={() => setModalType(null)}
        headerLeft={
          <p style={{ width: 300 }}>Add funds to users card balance</p>
        }
      >
        <div className={styles.modalContainer}>
          <div className={styles.inputContainer}>
            <p>Amount</p>
            <Dropdown
              onChange={() => {}}
              options={[
                { title: "ETH", value: "ETH" },
                { title: "BTC", value: "BTC" },
                { title: "TRX", value: "TRX" },
              ]}
            />
          </div>
          <div className={styles.inputContainer}>
            <p>Amount</p>
            <Input
              type="number"
              className={styles.modalInput}
              placeholder="0.00"
            />
          </div>
          <div className={styles.modalFooter}>
            <div>
              <Button
                onClick={() => setModalType(null)}
                className={styles.modalButton}
                color="white"
              >
                Cancel
              </Button>
            </div>
            <div>
              <Button
                onClick={() => setModalType(null)}
                className={styles.modalButton}
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        openModal={modalType === "deduct"}
        onClose={() => setModalType(null)}
        headerLeft={
          <p style={{ width: 300 }}>Deduct funds from user card balance</p>
        }
      >
        <div className={styles.modalContainer}>
          <div className={styles.inputContainer}>
            <p>Amount</p>
            <Dropdown
              onChange={() => {}}
              options={[
                { title: "ETH", value: "ETH" },
                { title: "BTC", value: "BTC" },
                { title: "TRX", value: "TRX" },
              ]}
            />
          </div>
          <div className={styles.inputContainer}>
            <p>Amount</p>
            <Input
              type="number"
              className={styles.modalInput}
              placeholder="0.00"
            />
          </div>
          <div className={styles.modalFooter}>
            <div>
              <Button
                onClick={() => setModalType(null)}
                className={styles.modalButton}
                color="white"
              >
                Cancel
              </Button>
            </div>
            <div>
              <Button
                onClick={() => setModalType(null)}
                className={styles.modalButton}
              >
                Deduct
              </Button>
            </div>
          </div>
        </div>
      </Modal>
      <div className={styles.table} style={{ overflow: "hidden" }}>
        <Table
          style={{
            fontFamily: "PP Telegraf",
            border: "1px solid var(--Gray-200, #EAECF0)",
            borderRadius: 12,
            boxShadow: "0px 7px 37px -24px rgba(0, 0, 0, 0.09)",
            overflow: "hidden",
          }}
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    </>
  );
};

const UserDetails: NextPage = () => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const [currentTab, setCurrentTab] = useState<string>("paymentAccounts");
  const [loading, setLoading] = useState<boolean>(false);
  const [isSmsModalOpened, setIsSmsModalOpened] = useState<boolean>(false);
  const [isBuyModalOpened, setIsBuyModalOpened] = useState<boolean>(false);
  const [user, setUser] = useState<any>({});

  let auth: any = {};
  if (typeof window !== "undefined" && localStorage.getItem("auth")) {
    auth = JSON.parse(localStorage.getItem("auth") || "");
  }

  const getUserDetail = () => {
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/users/${router.query.id}`,
        {},
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res: any) => {
        setLoading(false);
        if (res.data.success) {
          setUser(res.data.data);
        }
      })
      .catch((e) => {
        if (e?.response?.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
      });
  };

  const sendSms = () => {
    messageApi.success("SMS successfully sent");
    setIsSmsModalOpened(false);
  };

  const cancelSendSms = () => {
    messageApi.warning("SMS not sent because no message was provided");
    setIsSmsModalOpened(false);
  };

  const disableAccount = () => {
    messageApi.success("Account successfully disabled");
  };

  const updateBuyLimit = () => {
    messageApi.success("Limit successfully updated");
    setIsBuyModalOpened(false);
  };

  const cancelBuyLimit = () => {
    messageApi.warning("Limit not updated because no amount was provided");
    setIsBuyModalOpened(false);
  };

  useEffect(() => {
    getUserDetail();
  }, [router.query]);

  return (
    <PageLayout title="User Details">
      {loading ? (
        <div style={{ marginTop: 60 }}>
          <Loader />
        </div>
      ) : (
        <>
          {contextHolder}
          <AntModal
            title="Send SMS"
            open={isSmsModalOpened}
            onOk={sendSms}
            onCancel={cancelSendSms}
          >
            <div style={{ paddingBottom: 20 }}>
              <p>Enter the SMS content. Limit for 1 SMS is 160 characters.</p>
              <AntInput.TextArea rows={4} maxLength={160} showCount />
            </div>
          </AntModal>
          <AntModal
            title="Update Buy Limits"
            open={isBuyModalOpened}
            onOk={updateBuyLimit}
            onCancel={cancelBuyLimit}
          >
            <div style={{ paddingBottom: 20 }}>
              <p>Enter USD amount to update Buy Limit.</p>
              <AntInput type="number" />
            </div>
          </AntModal>
          <div className={styles.header}>
            <NavigationStep color="white" hideButton />
            <div className={styles.headerContainer}>
              <Button color="white" isText onClick={() => router.back()}>
                <img src="/icons/arrow-left.svg" />
              </Button>
              <h1 className={styles.headerText}>User details</h1>
            </div>
            <Divider style={{ marginTop: 16, marginBottom: 0 }} />
          </div>

          <div className={styles.profileHeader}>
            <Avatar shape="square" size={64} icon={<UserOutlined />} />
            <div className={styles.profileNameContainer}>
              <h3>
                {user?.user?.firstName} {user?.user?.lastName}
              </h3>
              <p>@{user?.user?.username}</p>
            </div>
            <div className={styles.profileActions}>
              <div style={{ marginLeft: 10 }}>
                <AntButton
                  size="large"
                  className={styles.profileActionBtnsDanger}
                  danger
                  onClick={disableAccount}
                >
                  Disable Account
                </AntButton>
              </div>
              <div style={{ marginLeft: 10 }}>
                <Button
                  className={styles.profileActionBtns}
                  onClick={() => setIsSmsModalOpened(true)}
                  color="white"
                >
                  Send SMS
                </Button>
              </div>
              <div style={{ marginLeft: 10 }}>
                <Button
                  onClick={() => setIsBuyModalOpened(true)}
                  className={styles.profileActionBtns}
                >
                  Update Buy Limits
                </Button>
              </div>
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.profileDetailsContainer}>
              <div className={styles.profileDetails}>
                <KeyValue
                  items={[
                    {
                      key: "First and Other Names:",
                      value: user?.user?.firstName,
                    },
                    {
                      key: "Last Name:",
                      value: user?.user?.lastName,
                    },
                    {
                      key: "Username:",
                      value: user?.user?.username,
                    },
                    {
                      key: "Email Address",
                      value: user?.user?.email,
                    },
                    {
                      key: "Phone Number:",
                      value: `+${user?.user?.phone}`,
                    },
                    {
                      key: "State/Region:",
                      value: user?.user?.stateRegion,
                    },
                    {
                      key: "Address:",
                      value: user?.user?.homeAddress,
                    },
                    {
                      key: "Ghana Card No:",
                      value: user?.user?.cardNo,
                    },
                  ]}
                />
              </div>
              <div className={styles.profileStatus}>
                <KeyValue
                  noFooterBoder
                  items={[
                    {
                      key: "KYC status:",
                      valueComponent: (
                        <Tag
                          color={
                            user?.kycInfo?.status === "success"
                              ? "success"
                              : "error"
                          }
                        >
                          {user?.kycInfo?.status}
                        </Tag>
                      ),
                    },
                    {
                      key: "Sign Up Date:",
                      value: user?.user?.signUpDate,
                    },
                    {
                      key: "Last Active:",
                      value: user?.user?.lastActive,
                    },
                    {
                      key: "Today's Limit",
                      valueComponent: (
                        <div className={styles.progressContainer}>
                          <div className={styles.progress}>
                            <div
                              className={styles.fill}
                              style={{ width: "70%" }}
                            />
                          </div>
                          <span>70%</span>
                        </div>
                      ),
                    },
                  ]}
                />
                <div className={styles.footer}>
                  <div>
                    <Button
                      className={styles.footerBtns}
                      color="white"
                      onClick={() =>
                        router.push(
                          `/users/transactions/${user?.kycInfo?.username}?type=buy`
                        )
                      }
                    >
                      View Buy Transactions
                    </Button>
                  </div>
                  <div>
                    <Button
                      className={styles.footerBtns}
                      color="white"
                      onClick={() =>
                        router.push(
                          `/users/transactions/${user?.kycInfo?.username}?type=sell`
                        )
                      }
                    >
                      View Sell Transactions
                    </Button>
                  </div>
                  <div>
                    <Button
                      className={styles.footerBtns}
                      color="white"
                      onClick={() =>
                        router.push(
                          `/users/transactions/${user?.kycInfo?.username}?type=crypto`
                        )
                      }
                    >
                      View Crypto Transactions
                    </Button>
                  </div>
                  <div>
                    <Button
                      className={styles.footerBtns}
                      color="white"
                      onClick={() =>
                        router.push(
                          `/users/transactions/${user?.kycInfo?.username}?type=swap`
                        )
                      }
                    >
                      View Swap Transactions
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <Divider />
            <h2 className={styles.title}>User Details</h2>
            <div className={styles.tabContainer}>
              <button
                onClick={() => setCurrentTab("paymentAccounts")}
                style={{
                  background:
                    currentTab === "paymentAccounts" ? "white" : "none",
                  border:
                    currentTab === "paymentAccounts"
                      ? "1px solid var(--gray-100, #f2f4f7)"
                      : "none",
                  boxShadow:
                    currentTab === "paymentAccounts"
                      ? "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.1)"
                      : "none",
                }}
                className={styles.tabItem}
              >
                Payment Accounts
              </button>
              <button
                onClick={() => setCurrentTab("accountBalance")}
                style={{
                  background:
                    currentTab === "accountBalance" ? "white" : "none",
                  border:
                    currentTab === "accountBalance"
                      ? "1px solid var(--gray-100, #f2f4f7)"
                      : "none",
                  boxShadow:
                    currentTab === "accountBalance"
                      ? "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.1)"
                      : "none",
                }}
                className={styles.tabItem}
              >
                Account Balance
              </button>
              <button
                onClick={() => setCurrentTab("kycVerification")}
                style={{
                  background:
                    currentTab === "kycVerification" ? "white" : "none",
                  border:
                    currentTab === "kycVerification"
                      ? "1px solid var(--gray-100, #f2f4f7)"
                      : "none",
                  boxShadow:
                    currentTab === "kycVerification"
                      ? "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.1)"
                      : "none",
                }}
                className={styles.tabItem}
              >
                KYC Verification
              </button>
              <button
                onClick={() => setCurrentTab("cards")}
                style={{
                  background: currentTab === "cards" ? "white" : "none",
                  border:
                    currentTab === "cards"
                      ? "1px solid var(--gray-100, #f2f4f7)"
                      : "none",
                  boxShadow:
                    currentTab === "cards"
                      ? "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.1)"
                      : "none",
                }}
                className={styles.tabItem}
              >
                Cards
              </button>
            </div>
            {currentTab === "accountBalance" && (
              <AccountBalanceTable data={user?.cryptoAccountBalances} />
            )}
            {currentTab === "kycVerification" && (
              <KYCVerificationTable data={[user.kycInfo]} />
            )}
            {currentTab === "paymentAccounts" && (
              <PaymentAccountsTable data={user?.paymentAccounts} />
            )}
            {currentTab === "cards" && <CardsTable />}
          </div>
        </>
      )}
    </PageLayout>
  );
};

export default UserDetails;
