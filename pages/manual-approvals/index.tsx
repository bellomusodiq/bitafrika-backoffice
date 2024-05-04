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
import { useRouter } from "next/router";
import { TManualApprovalFilter } from "@/types";
import { getTableColumn } from "@/components/ManualApprovals";

export default function Search() {
  const router = useRouter();
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
  const [filterBy, setFilterBy] = useState<TManualApprovalFilter>("withdrawal");
  const [mfaToken, setMfaToken] = useState<string>("");

  let auth: any = {};
  if (typeof window !== "undefined" && localStorage.getItem("auth")) {
    auth = JSON.parse(localStorage.getItem("auth") || "");
  }

  const fetchManualApprovalDetail = (id: string) => {
    const topUp = `${BASE_URL}/manual-approvals/top-up/view-awaiting-admin-approval-transaction/${id}`;
    const withdrawal = `${BASE_URL}/manual-approvals/withdrawal/${id}`;
    const URL = filterBy === "withdrawal" ? withdrawal : topUp;
    setLoadingDetail(true);
    axios
      .post(
        URL,
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
      })
      .catch((e) => {
        setLoadingDetail(false);
        if (e?.response?.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        } else {
          toast.error("Something went wrong, please try again");
        }
      });
  };

  const fetchManualApproval = () => {
    const topUp = `${BASE_URL}/manual-approvals/top-up/list-awaiting-admin-approval-transactions?page=${pagination.pageNumber}`;
    const withdrawal = `${BASE_URL}/manual-approvals/${filterBy}?page=${pagination.pageNumber}`;
    const URL = filterBy === "withdrawal" ? withdrawal : topUp;
    setLoading(true);
    axios
      .post(
        URL,
        {},
        {
          headers: { Authorization: auth.accessToken },
        }
      )
      .then((res: any) => {
        setLoading(false);
        setData(
          res.data.data.map((item: any) => {
            const id = filterBy === "withdrawal" ? item.uniq : item.txid;
            return {
              ...item,
              transactionId: id,
              onCopy: () => {
                toast.success("Copied to clipboard");
              },
              action: () => fetchManualApprovalDetail(id),
            };
          })
        );
        // setPagination(res.data.pageInfo);
      })
      .catch((e) => {
        setLoading(false);
        if (e.response.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        } else {
          toast.error("Something went wrong, please try again");
        }
      });
  };

  const markAsSuccess = (record: Record<string, string>) => {
    let payload = {};
    const topUp = `${BASE_URL}/manual-approvals/top-up/approve-manual-top-up`;
    const withdrawal = `${BASE_URL}/manual-approvals/withdrawal/mark-pending-withdrawal-success/${record.trxId}`;
    const URL = filterBy === "withdrawal" ? withdrawal : topUp;
    if (filterBy === "top-up") {
      payload = {
        uniqueId: record.uniqId,
        transactionId: record.txid,
        mfaToken,
      };
    }
    setLoadingDetail(true);
    axios
      .post(URL, payload, {
        headers: {
          Authorization: auth.accessToken,
        },
      })
      .then((res: any) => {
        if (res.data.success) {
          setLoadingDetail(false);
          setOpenModal(false);
          toast.success(res.data.message);
          fetchManualApproval();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => {
        setLoadingDetail(false);
        if (e?.response?.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        } else {
          toast.error("Something went wrong, please try again");
        }
      });
  };

  const declineManualApproval = (record: Record<string, string>) => {
    let payload = {};
    const topUp = `${BASE_URL}/manual-approvals/top-up/decline-manual-top-up`;
    const withdrawal = `${BASE_URL}/manual-approvals/withdrawal/decline-pending-withdrawal/${record.trxId}`;
    const URL = filterBy === "withdrawal" ? withdrawal : topUp;
    if (filterBy === "top-up") {
      payload = {
        uniqueId: record.uniqId,
        transactionId: record.txid,
      };
    }
    setLoadingDetail(true);
    axios
      .post(URL, payload, {
        headers: {
          Authorization: auth.accessToken,
        },
      })
      .then((res: any) => {
        setLoadingDetail(false);
        if (res.data.success) {
          setOpenModal(false);
          toast.success(res.data.message);
          fetchManualApproval();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => {
        setLoadingDetail(false);
        if (e?.response?.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        } else {
          toast.error("Something went wrong, please try again");
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

  const onSearch = () => {
    fetchManualApproval();
  };
  const resetFields = () => {
    setOpenCodeModal(false);
    setMfaToken("");
    setLoading(false);
    setLoadingDetail(false);
  };
  return (
    <PageLayout title="Hone">
      <Modal
        headerLeft={
          <div className={styles.lockContainer}>
            <img src="/icons/lock.svg" />
          </div>
        }
        onClose={resetFields}
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
            <div className={styles.breadCrumb}>
              {filterBy === "withdrawal" ? "Withdrawal" : "Top Up"}
            </div>
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
              User: <span style={{ color: "black" }}>@{detail.username}</span>
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction ID:</p>
            <p className={styles.value}>{detail.trxId || detail.txid}</p>
          </div>
          <div className={styles.divider} />
          {filterBy === "withdrawal" ? (
            <div className={styles.keyValue}>
              <p className={styles.key}>Transaction type:</p>
              <p className={styles.value}>
                Sell (
                <span style={{ textTransform: "capitalize" }}>
                  {detail?.paymentAccount?.paymentMethod}
                </span>{" "}
                withdrawal)
              </p>
            </div>
          ) : (
            <div className={styles.keyValue}>
              <p className={styles.key}>Transaction type:</p>
              <p className={styles.value}>
                <span style={{ textTransform: "capitalize" }}>
                  {detail?.methodName}
                </span>{" "}
                top-up
              </p>
            </div>
          )}
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Sell amount:</p>
            {filterBy === "withdrawal" ? (
              <p className={styles.value}>
                {detail.localCurrency} {detail.rawAmount} ({detail.cryptoAmount}{" "}
                {detail.cryptoCurrency}) -{" "}
                <span style={{ color: "#667085" }}>${detail.usdAmount}</span>
              </p>
            ) : (
              <p className={styles.value}>
                <span style={{ color: "#98A2B3" }}>{detail.currency}</span>{" "}
                {detail.amount}
                <span style={{ color: "#667085" }}>
                  {" "}
                  ({detail.crypto} {detail.cryptoSymbol})
                </span>
              </p>
            )}
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
                ({detail.localCurrency || detail.currency} {detail.netFee})
              </span>
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Net payout Amount:</p>
            <p className={styles.value}>
              {detail.localCurrency || detail.currency}{" "}
              {detail.rawAmount || detail.amount}
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
            <p className={styles.value}>${detail.usdAmount || detail.usd}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Payment method:</p>
            {filterBy === "withdrawal" ? (
              <div>
                <p className={styles.value} style={{ textAlign: "right" }}>
                  <span style={{ color: "#667085" }}>Account:</span>{" "}
                  {detail?.paymentAccount?.accountName}
                </p>
                <p className={styles.value} style={{ textAlign: "right" }}>
                  <span style={{ color: "#667085" }}>Network:</span>{" "}
                  {detail?.paymentAccount?.providerName}
                </p>
                <p className={styles.value} style={{ textAlign: "right" }}>
                  <span style={{ color: "#667085" }}>Type:</span>{" "}
                  {detail?.paymentAccount?.paymentMethod}
                </p>
              </div>
            ) : (
              <p className={styles.value} style={{ textAlign: "right" }}>
                Processor
              </p>
            )}
          </div>
          <div className={styles.divider} />
          <div className={styles.keyValue}>
            <p className={styles.key}>Transaction data:</p>
            <p className={styles.value}>{detail.date}</p>
          </div>
          {filterBy === "top-up" && (
            <div className={styles.inputContainer}>
              <p>MFA Token (For Approval Only)</p>
              <Input
                value={mfaToken}
                onChange={(e) => setMfaToken(e.target.value)}
              />
            </div>
          )}
          <div style={{ marginBottom: 30 }} className={styles.modalFooter}>
            <Button
              onClick={() => declineManualApproval(detail)}
              className={styles.modalButton}
              color="white"
            >
              Close
            </Button>
            <Button
              onClick={() => markAsSuccess(detail)}
              loading={loadingDetail}
              disabled={loadingDetail}
              className={styles.modalButton}
            >
              Mark as success
            </Button>
          </div>
        </div>
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
        <p className={styles.filterTitle}>Filter results by</p>
        <div className={styles.filterContainer}>
          <div className={styles.searchCard}>
            <div className={styles.dropdownContainer2}>
              <p className={styles.dropdownTitle}>Transaction type</p>
              <Dropdown
                value={filterBy}
                options={[
                  { title: "Withdrawal", value: "withdrawal" },
                  { title: "Top up", value: "top-up" },
                ]}
                onChange={(value) => {
                  setFilterBy(value as typeof filterBy);
                  setData([]);
                  setDetail({});
                }}
              />
            </div>
            <div className={styles.searchButtonContainer}>
              <Button onClick={onSearch} className={styles.searchButton}>
                Apply filter
              </Button>
            </div>
          </div>
        </div>
        <p className={styles.subHeader}>{data.length} pending</p>
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
                columns={getTableColumn(filterBy, loadingDetail)}
              />
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
