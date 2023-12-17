import React, { useRef, useState } from "react";
import styles from "@/pages/users/details/details.module.css";
import { NextPage } from "next";
import PageLayout from "@/components/PageLayout";
import NavigationStep from "@/components/NavigationStep";
import Button from "@/components/Button";
import { Divider, Table } from "antd";
import KeyValue from "@/components/KeyValue/KeyValue";
import Modal from "@/components/Modal";
import Input from "@/components/Input/Input";
import Dropdown from "@/components/Dropdown";

const PaymentAccountsTable: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const columns: any = [
    {
      title: "Payment Type",
      dataIndex: "paymentType",
      key: "paymentType",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phonenumber",
      dataIndex: "phonenumber",
      key: "phonenumber",
    },
    {
      title: "Provider",
      dataIndex: "provider",
      key: "provider",
    },
    {
      title: "Date Registered",
      dataIndex: "data",
      key: "data",
    },
  ];

  const dataSource = [
    {
      key: "1",
      paymentType: "MOBILE MONEY",
      name: "EMMANUEL NKRUMAH KWABENA",
      phonenumber: "0708 000 0000",
      provider: "MTN - GH",
      data: "Thur 18 Jan, 2023 11:34PM",
    },
    {
      key: "2",
      paymentType: "MOBILE MONEY",
      name: "EMMANUEL NKRUMAH KWABENA",
      phonenumber: "0708 000 0000",
      provider: "MTN - GH",
      data: "Thur 18 Jan, 2023 11:34PM",
    },
    {
      key: "3",
      paymentType: "MOBILE MONEY",
      name: "EMMANUEL NKRUMAH KWABENA",
      phonenumber: "0708 000 0000",
      provider: "MTN - GH",
      data: "Thur 18 Jan, 2023 11:34PM",
    },
    {
      key: "4",
      paymentType: "MOBILE MONEY",
      name: "EMMANUEL NKRUMAH KWABENA",
      phonenumber: "0708 000 0000",
      provider: "MTN - GH",
      data: "Thur 18 Jan, 2023 11:34PM",
    },
    {
      key: "5",
      paymentType: "MOBILE MONEY",
      name: "EMMANUEL NKRUMAH KWABENA",
      phonenumber: "0708 000 0000",
      provider: "MTN - GH",
      data: "Thur 18 Jan, 2023 11:34PM",
    },
  ];

  return (
    <Table
      style={{ fontFamily: "PP Telegraf" }}
      dataSource={dataSource}
      columns={columns}
    />
  );
};

const KYCVerificationTable: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
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
          <span>This user is verified</span>
        </div>
      ),
    },
    {
      title: "Date completed",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "",
      dataIndex: "action",
      render: (_: any, { action }: any) => (
        <div className={styles.actionButton}>
          <div style={{ marginRight: 10 }}>
            <Button onClick={action}>View photos</Button>
          </div>
          <div style={{ marginRight: 10 }}>
            <Button color="white" onClick={action}>
              View documents
            </Button>
          </div>
          <div>
            <Button color="white" onClick={action}>
              <span style={{ color: "#F04438" }}>Reject</span>
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
      status: "verified",
      date: "Thur 18 Jan, 2023 11:34PM",
      action: () => setOpenModal(true),
    },
    {
      key: "2",
      username: "@username",
      status: "verified",
      date: "Thur 18 Jan, 2023 11:34PM",
      action: () => setOpenModal(true),
    },
    {
      key: "3",
      username: "@username",
      status: "verified",
      date: "Thur 18 Jan, 2023 11:34PM",
      action: () => setOpenModal(true),
    },
    {
      key: "4",
      username: "@username",
      status: "verified",
      date: "Thur 18 Jan, 2023 11:34PM",
      action: () => setOpenModal(true),
    },
    {
      key: "5",
      username: "@username",
      status: "verified",
      date: "Thur 18 Jan, 2023 11:34PM",
      action: () => setOpenModal(true),
    },
  ];

  return (
    <Table
      style={{ fontFamily: "PP Telegraf" }}
      dataSource={dataSource}
      columns={columns}
    />
  );
};

const AccountBalanceTable: React.FC = () => {
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
      render: (_: any, { wallet }: any) => (
        <div className={styles.walletContainer}>
          <p className={styles.walletTitle}>Bitcoin Cash (BCH)</p>
          <p className={styles.walletAddress}>
            Address:{" "}
            <span style={{ color: "#2251FA" }}>
              n1jFNkVNCyJZjB5wyWGxePbgcZHU8Rr2xr
            </span>
          </p>
          <p className={styles.walletTitle}>Network: Legacy</p>
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "balance",
      key: "balance",
      render: (_: any, { balance }: any) => (
        <div className={styles.walletContainer}>
          <p className={styles.walletTitle}>Balance:</p>
          <p className={styles.walletAddress}>0 BCH</p>
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
          <p className={styles.walletAddress}>$0.00</p>
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

  const dataSource = [
    {
      key: "1",
      username: "@username",
      email: "EmmanuelNkrumah@email.com",
      biller: "MTN Ghana",
      phonenumber: "0708 000 0000",
      action: (deduct: boolean) => {
        setOpenModal(true);
        setDeduct(deduct);
      },
    },
    {
      key: "2",
      username: "@username",
      email: "EmmanuelNkrumah@email.com",
      biller: "MTN Ghana",
      phonenumber: "0708 000 0000",
      action: (deduct: boolean) => {
        setOpenModal(true);
        setDeduct(deduct);
      },
    },
    {
      key: "3",
      username: "@username",
      email: "EmmanuelNkrumah@email.com",
      biller: "MTN Ghana",
      phonenumber: "0708 000 0000",
      action: (deduct: boolean) => {
        setOpenModal(true);
        setDeduct(deduct);
      },
    },
    {
      key: "4",
      username: "@username",
      email: "EmmanuelNkrumah@email.com",
      biller: "MTN Ghana",
      phonenumber: "0708 000 0000",
      action: (deduct: boolean) => {
        setOpenModal(true);
        setDeduct(deduct);
      },
    },
    {
      key: "5",
      username: "@username",
      email: "EmmanuelNkrumah@email.com",
      biller: "MTN Ghana",
      phonenumber: "0708 000 0000",
      action: (deduct: boolean) => {
        setOpenModal(true);
        setDeduct(deduct);
      },
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
        style={{ fontFamily: "PP Telegraf" }}
        dataSource={dataSource}
        columns={columns}
      />
    </>
  );
};

const CardsTable: React.FC = () => {
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
              onClick={() => action("cardDetails")}
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
      <Table
        style={{ fontFamily: "PP Telegraf" }}
        dataSource={dataSource}
        columns={columns}
      />
    </>
  );
};

const UserDetails: NextPage = () => {
  const [currentTab, setCurrentTab] = useState<string>("paymentAccounts");
  return (
    <PageLayout title="User Details">
      <div className={styles.header}>
        <NavigationStep color="white" hideButton />
        <div className={styles.headerContainer}>
          <h1 className={styles.headerText}>User details</h1>
          <div className={styles.goBackBtn}>
            <Button color="white">
              <img src="/icons/arrow-left.svg" />
              Go back
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.profileHeader}>
        <img src="/images/avatar-big.png" />
        <div className={styles.profileNameContainer}>
          <h3>Emmanual Nkrumah</h3>
          <p>@kwabena1</p>
        </div>
        <div className={styles.profileActions}>
          <Button className={styles.profileActionBtns} color="white">
            ...
          </Button>
          <Button className={styles.profileActionBtns} color="white">
            Button CTA
          </Button>
          <Button className={styles.profileActionBtns}>Button CTA</Button>
        </div>
      </div>
      <div className={styles.container}>
        <Divider />
        <div className={styles.profileDetailsContainer}>
          <div className={styles.profileDetails}>
            <KeyValue
              items={[
                {
                  key: "First and Other Names:",
                  value: "Emmanual",
                },
                {
                  key: "Last Name:",
                  value: "Nkrumah",
                },
                {
                  key: "Username:",
                  value: "@Kwabyna1",
                },
                {
                  key: "Email Address",
                  value: "Greatthingsinc4@gmail.com",
                },
                {
                  key: "Phone Number:",
                  value: "+23381233224",
                },
                {
                  key: "State/Region:",
                  value: "Greater accra region - Accra",
                },
                {
                  key: "Address:",
                  value: "1, greater accra",
                },
                {
                  key: "Ghana Card No:",
                  value: "012345678987",
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
                    <div className={styles.kycStatus}>
                      <div className={styles.indicator} />
                      <span>Verified</span>
                    </div>
                  ),
                },
                {
                  key: "Sign Up Date:",
                  value: "Thur 12th May, 2022",
                },
                {
                  key: "Last Active:",
                  value: "Thur 12th May, 2022",
                },
                {
                  key: "Today's Limit",
                  valueComponent: (
                    <div className={styles.progressContainer}>
                      <div className={styles.progress}>
                        <div className={styles.fill} style={{ width: "70%" }} />
                      </div>
                      <span>70%</span>
                    </div>
                  ),
                },
              ]}
            />
            <div className={styles.footer}>
              <div>
                <Button className={styles.footerBtns} color="white">
                  View Buy/sell Transactions
                </Button>
              </div>
              <div>
                <Button className={styles.footerBtns} color="white">
                  View card transactions
                </Button>
              </div>
              <div>
                <Button className={styles.footerBtns} color="white">
                  View Deposit/withdrawal Transactions
                </Button>
              </div>
              <div>
                <Button className={styles.footerBtns} color="white">
                  View swap transactions
                </Button>
              </div>
              <div>
                {" "}
                <Button className={styles.footerBtns} color="white">
                  View Utility transactions
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
              background: currentTab === "paymentAccounts" ? "white" : "none",
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
              background: currentTab === "accountBalance" ? "white" : "none",
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
              background: currentTab === "kycVerification" ? "white" : "none",
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
        {currentTab === "accountBalance" && <AccountBalanceTable />}
        {currentTab === "kycVerification" && <KYCVerificationTable />}
        {currentTab === "paymentAccounts" && <PaymentAccountsTable />}
        {currentTab === "cards" && <CardsTable />}
      </div>
    </PageLayout>
  );
};

export default UserDetails;
