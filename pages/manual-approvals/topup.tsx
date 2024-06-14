import React, { useRef, useState } from "react";

import PageLayout from "@/components/PageLayout";
import styles from "@/pages/manual-approvals/manual-approvals.module.css";
import NavigationStep from "@/components/NavigationStep";
import Button from "@/components/Button";
import { Checkbox, DatePicker, Divider, Space, Table, message } from "antd";
import Modal from "@/components/Modal";
import DropModal from "@/components/DropModal";
import Input from "@/components/Input/Input";
import Dropdown from "@/components/Dropdown";

const columns: any = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Transaction ID",
    dataIndex: "transactionId",
    key: "transactionId",
    render: (_: any, { transactionId, onCopy }: any) => (
      <div onClick={onCopy} className={styles.transactionId}>
        <p>
          {transactionId?.slice(0, 5)} . . .
          {transactionId?.slice(transactionId?.length - 5)}
        </p>
        <img src="/icons/copy.svg" />
      </div>
    ),
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (_: any, { amount }: any) => (
      <div className={styles.amountContainer}>
        <p className={styles.currency}>
          <span style={{ color: "#98A2B3" }}>GHC</span> {amount.currencyAmount}
        </p>
        <p className={styles.crypto}>({amount.currencyAmount} BTC)</p>
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

export default function Search() {
  const [messageApi, contextHolder] = message.useMessage();
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
  const [search, setSearch] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openCodeModal, setOpenCodeModal] = useState<boolean>(false);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [codeIndex, setCodeIndex] = useState<number>(0);
  const [pin, setPin] = useState<string>("");

  const dataSource = [
    {
      key: "1",
      username: "@username",
      transactionId: "TRX123456784344545",
      paymentMethod: "Mobile Money",
      amount: {
        currencyAmount: "100,998.00",
        cryptoAmount: "0.00023400014",
      },
      date: "Thur 18 Jan, 2023",
      onCopy: () =>
        messageApi.success({ content: "Copied to clipboard", duration: 5 }),

      action: () => setOpenModal(true),
    },
    {
      key: "2",
      username: "@username",
      transactionId: "TRX123456784344545",
      paymentMethod: "Mobile Money",
      amount: {
        currencyAmount: "100,998.00",
        cryptoAmount: "0.00023400014",
      },
      date: "Thur 18 Jan, 2023",
      onCopy: () =>
        messageApi.success({ content: "Copied to clipboard", duration: 5 }),
      action: () => setOpenModal(true),
    },
    {
      key: "3",
      username: "@username",
      transactionId: "TRX123456784344545",
      paymentMethod: "Mobile Money",
      amount: {
        currencyAmount: "100,998.00",
        cryptoAmount: "0.00023400014",
      },
      date: "Thur 18 Jan, 2023",
      onCopy: () =>
        messageApi.success({ content: "Copied to clipboard", duration: 5 }),

      action: () => setOpenModal(true),
    },
    {
      key: "4",
      username: "@username",
      transactionId: "TRX123456784344545",
      paymentMethod: "Mobile Money",
      amount: {
        currencyAmount: "100,998.00",
        cryptoAmount: "0.00023400014",
      },
      date: "Thur 18 Jan, 2023",
      onCopy: () =>
        messageApi.success({ content: "Copied to clipboard", duration: 5 }),

      action: () => setOpenModal(true),
    },
    {
      key: "5",
      username: "@username",
      transactionId: "TRX123456784344545",
      paymentMethod: "Mobile Money",
      amount: {
        currencyAmount: "100,998.00",
        cryptoAmount: "0.00023400014",
      },
      date: "Thur 18 Jan, 2023",
      onCopy: () =>
        messageApi.success({ content: "Copied to clipboard", duration: 5 }),

      action: () => setOpenModal(true),
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
    <PageLayout title="Home">
      {contextHolder}
      <Modal openModal={openModal} onClose={() => setOpenModal(false)}>
        <div className={styles.modalContainer}>
          <p className={styles.modalHeader}>Transaction details</p>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>User:</p>
            <p className={styles.value}>@Samuel12345</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction date:</p>
            <p className={styles.value}>Monday 23 Jan, 2023 07:52 AM</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction ID:</p>
            <p className={styles.value}>TX12345678909887776665</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction type:</p>
            <p className={styles.value}>Sell (Momo withdrawal)</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Sell Amount:</p>
            <p className={styles.value}>0.001234 BTC ($120.36)</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Rate:</p>
            <p className={styles.value}>100 ghs per Dollar</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Fees:</p>
            <p className={styles.value}>$1.26 (0.000897 BTC)</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Net payout Amount:</p>
            <p className={styles.value}>GHS 750,099.00</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Status:</p>
            <p className={styles.valueStatus}>Payment method is active</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Payment account:</p>
            <p className={styles.value}>Samuel samuel (MTN +2334567895566)</p>
          </div>
          <div className={styles.modalFooter}>
            <Button
              onClick={() => setOpenModal(false)}
              className={styles.modalButton}
              color="white"
            >
              Close
            </Button>
            <Button
              onClick={() => {
                setOpenModal(false);
                setOpenCodeModal(true);
              }}
              className={styles.modalButton}
              color="white"
            >
              Mark as complete
            </Button>
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
      <Modal openModal={openAddModal} onClose={() => setOpenAddModal(false)}>
        <div className={styles.modalContainer}>
          <p className={styles.modalHeader}>Manual account Top-Up</p>
          <div className={styles.inputContainer}>
            <p>Transaction ID</p>
            <Input />
          </div>
          <div className={styles.inputContainer}>
            <p>Reference</p>
            <Input />
          </div>
          <div className={styles.inputContainer}>
            <p>Name on account</p>
            <Input />
          </div>
          <div className={styles.inputContainer}>
            <p>Amount</p>
            <Input />
          </div>
          <div className={styles.modalFooter}>
            <Button
              onClick={() => setOpenAddModal(false)}
              className={styles.modalButton}
              color="white"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setOpenAddModal(false);
                setOpenCodeModal(true);
              }}
              className={styles.modalButton}
            >
              Add to queue
            </Button>
          </div>
        </div>
      </Modal>
      <NavigationStep
        hideButton
        navigation={["Home", "Manual approvals", "Withdrawals"]}
      />
      <div className={styles.container}>
        <h3 className={styles.header}>Manual Approvals</h3>
        <p className={styles.subHeader}>120 Total pending</p>
        <div className={styles.tabContainer}>
          <div className={styles.tabItem}>
            Topups <span>200,200</span>
          </div>
          <div className={styles.topUpButton}>
            <div>
              <Button onClick={() => setOpenAddModal(true)} color="white">
                <img src="/icons/plus.svg" /> Manual account Top-Up
              </Button>
            </div>
          </div>
        </div>

        <div className={styles.searchContainer}>
          <div className={styles.table} style={{ overflow: "hidden" }}>
            <Table
              style={{ fontFamily: "PP Telegraf" }}
              dataSource={dataSource}
              columns={columns}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
