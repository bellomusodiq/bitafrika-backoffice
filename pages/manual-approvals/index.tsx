import React, { useRef, useState } from "react";

import PageLayout from "@/components/PageLayout";
import styles from "@/pages/manual-approvals/manual-approvals.module.css";
import NavigationStep from "@/components/NavigationStep";
import Button from "@/components/Button";
import { Checkbox, DatePicker, Divider, Space, Table } from "antd";
import Modal from "@/components/Modal";
import DropModal from "@/components/DropModal";
import Input from "@/components/Input/Input";
import Dropdown from "@/components/Dropdown";
import { toast } from "react-toastify";

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
        toast("Copied to clipboard", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }),
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
        toast("Copied to clipboard", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }),
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
        toast("Copied to clipboard", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }),
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
        toast("Copied to clipboard", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }),
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
        toast("Copied to clipboard", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }),
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
    <PageLayout title="Hone">
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
      <Modal
        customStyles={{ width: 400 }}
        openModal={openAddModal}
        onClose={() => setOpenAddModal(false)}
      >
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
              onClick={() => setOpenAddModal(false)}
              className={styles.modalButton}
            >
              Add to queue
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        openModal={openModal}
        onClose={() => setOpenModal(false)}
        headerCenter={
          <div
            className={styles.modalHeader}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <p style={{ marginRight: 15 }}>Transaction details</p>
            <div className={styles.breadCrumb}>Withdrawal</div>
          </div>
        }
        headerLeft={
          <div className={styles.iconContainer}>
            <img src="/icons/receipt-check.svg" />
          </div>
        }
      >
        <div className={styles.modalContainer} style={{ width: "100%" }}>
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
            <p className={styles.key}>Transaction type:</p>
            <p className={styles.value}>Sell (Momo withdrawal)</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Sell amount:</p>
            <p className={styles.value}>
              GHS 7488.00 (0.001234 BTC) -{" "}
              <span style={{ color: "#667085" }}>$120.66</span>
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Rate:</p>
            <p className={styles.value}>
              Sold @ 11.60 (Crypto price - $27776.50)
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Fees:</p>
            <p className={styles.value}>
              $1.28 <span style={{ color: "#667085" }}>(GHS 1.98)</span>
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Net payout Amount:</p>
            <p className={styles.value}>GHS 7488.00</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Status:</p>
            <div className={styles.statusContainer}>
              <div className={styles.statusIndicator} /> Approved
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Amount:</p>
            <p className={styles.value}>$100.99</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Payment method:</p>
            <div>
              <p className={styles.value} style={{ textAlign: "right" }}>
                <span style={{ color: "#667085" }}>Account:</span> Account name
              </p>
              <p className={styles.value} style={{ textAlign: "right" }}>
                <span style={{ color: "#667085" }}>Network:</span> MTN
              </p>
              <p className={styles.value} style={{ textAlign: "right" }}>
                <span style={{ color: "#667085" }}>Phone number:</span>{" "}
                08000000000
              </p>
              <p className={styles.value} style={{ textAlign: "right" }}>
                <span style={{ color: "#667085" }}>Amount:</span> GHS 7488
              </p>
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction data:</p>
            <p className={styles.value}>Mon 23 jan 07:40:03AM</p>
          </div>
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
            onClick={() => setOpenModal(false)}
            className={styles.modalButton}
          >
            Mark as success
          </Button>
        </div>
      </Modal>
      <NavigationStep
        hideButton
        navigation={["Home", "Manual approvals", "Withdrawals"]}
        rightHeader={
          <div>
            <Button onClick={() => setOpenAddModal(true)} color="white">
              <img src="/icons/plus.svg" /> Add a manual transaction
            </Button>
          </div>
        }
      />
      <div className={styles.container}>
        <h3 className={styles.header}>Manual Approvals</h3>
        <p className={styles.subHeader}>120 pending</p>
        <div className={styles.searchContainer}>
          <div className={styles.table}>
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
