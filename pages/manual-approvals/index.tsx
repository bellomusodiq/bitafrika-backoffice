import React, { useEffect, useRef, useState } from "react";

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
import { BASE_URL } from "@/CONFIG";
import axios from "axios";
import Loader from "@/components/Loader";

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
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false);
  const [pin, setPin] = useState<string>("");
  const [data, setData] = useState<any>([]);
  const [detail, setDetail] = useState<any>({});
  const [pagination, setPagination] = useState<any>({ pageNumber: 1 });

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
      render: (
        _: any,
        { rawAmount, cryptoAmount, localCurrency, cryptoCurrency }: any
      ) => (
        <div className={styles.amountContainer}>
          <p className={styles.currency}>
            <span style={{ color: "#98A2B3" }}>{localCurrency}</span>{" "}
            {rawAmount}
          </p>
          <p className={styles.crypto}>
            ({cryptoAmount} {cryptoCurrency})
          </p>
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
            <Button disabled={loadingDetail} onClick={action}>
              View
            </Button>
          </div>
        </div>
      ),
    },
  ];

  let auth: any = {};
  if (typeof window !== "undefined" && localStorage.getItem("auth")) {
    auth = JSON.parse(localStorage.getItem("auth") || "");
  }

  const fetchManualApprovalDetail = (id: string) => {
    setLoadingDetail(true);
    axios
      .post(
        `${BASE_URL}/manual-approvals/${id}`,
        {},
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res: any) => {
        setLoadingDetail(false);
        setOpenModal(true);
        setDetail(res.data.data);
      });
  };

  const fetchManualApproval = () => {
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/manual-approvals?page=${pagination.pageNumber}&coin=all`,
        {},
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res: any) => {
        setLoading(false);
        setData(
          res.data.data.map((item: any) => ({
            ...item,
            transactionId: item.uniq,
            onCopy: () => {
              toast.success("Copied to clipboard");
            },
            action: () => fetchManualApprovalDetail(item.uniq),
          }))
        );
        // setPagination(res.data.pageInfo);
      });
  };

  const markAsSuccess = (id: string) => {
    setLoadingDetail(true);
    axios
      .post(
        `${BASE_URL}/manual-approvals/mark-pending-withdrawal-success/${id}`,
        {},
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res: any) => {
        if (res.data.success) {
          setLoadingDetail(false);
          setOpenModal(false);
          toast.success(res.data.message);
          fetchManualApproval();
        } else {
          toast.error(res.data.message);
        }
      });
  };

  const declineManualApproval = (id: string) => {
    setLoadingDetail(true);
    axios
      .post(
        `${BASE_URL}/manual-approvals/decline-manual-top-up/${id}`,
        {},
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res: any) => {
        if (res.data.success) {
          setLoadingDetail(false);
          setOpenModal(false);
          toast.success(res.data.message);
          fetchManualApproval();
        } else {
          toast.error(res.data.message);
        }
      });
  };

  useEffect(() => {
    fetchManualApproval();
  }, []);

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
        <>
          <div className={styles.modalContainer} style={{ width: "100%" }}>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>
                User: <span style={{ color: "black" }}>@{detail.username}</span>
              </p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Transaction ID:</p>
              <p className={styles.value}>{detail.trxId}</p>
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
                {detail.localCurrency} {detail.rawAmount} ({detail.cryptoAmount}{" "}
                {detail.cryptoCurrency}) -{" "}
                <span style={{ color: "#667085" }}>${detail.usdAmount}</span>
              </p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Rate:</p>
              <p className={styles.value}>
                Sold @ {detail.rate} (Crypto price - ${detail.cryptoPrice})
              </p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Fees:</p>
              <p className={styles.value}>
                $1.28{" "}
                <span style={{ color: "#667085" }}>
                  ({detail.localCurrency} {detail.netFee})
                </span>
              </p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Net payout Amount:</p>
              <p className={styles.value}>
                {detail.localCurrency} {detail.rawAmount}
              </p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Status:</p>
              <div className={styles.statusContainer}>
                <div className={styles.statusIndicator} /> {detail.status}
              </div>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Amount:</p>
              <p className={styles.value}>${detail.usdAmount}</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Payment method:</p>
              <div>
                <p className={styles.value} style={{ textAlign: "right" }}>
                  <span style={{ color: "#667085" }}>Account:</span>{" "}
                  {detail.accountName}
                </p>
                <p className={styles.value} style={{ textAlign: "right" }}>
                  <span style={{ color: "#667085" }}>Network:</span>{" "}
                  {detail.providerName}
                </p>
                <p className={styles.value} style={{ textAlign: "right" }}>
                  <span style={{ color: "#667085" }}>Phone number:</span>{" "}
                  {detail.accountName}
                </p>
                <p className={styles.value} style={{ textAlign: "right" }}>
                  <span style={{ color: "#667085" }}>Amount:</span>{" "}
                  {detail.localCurrency} {detail.rawAmount}
                </p>
              </div>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Transaction data:</p>
              <p className={styles.value}>{detail.date}</p>
            </div>
          </div>
          <div className={styles.modalFooter}>
            <Button
              onClick={() => declineManualApproval(detail.trxId)}
              className={styles.modalButton}
              color="white"
            >
              Close
            </Button>
            <Button
              onClick={() => markAsSuccess(detail.trxId)}
              loading={loadingDetail}
              disabled={loadingDetail}
              className={styles.modalButton}
            >
              Mark as success
            </Button>
          </div>
        </>
      </Modal>
      <NavigationStep hideButton />
      <div className={styles.container}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h3 className={styles.header}>Manual Approvals</h3>
          <div>
            <Button onClick={() => setOpenAddModal(true)} color="white">
              <img src="/icons/plus.svg" /> Add a manual transaction
            </Button>
          </div>
        </div>
        <p className={styles.subHeader}>120 pending</p>
        <div className={styles.searchContainer}>
          <div className={styles.table} style={{ overflow: "hidden" }}>
            {loading ? (
              <Loader />
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
