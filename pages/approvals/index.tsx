import React, { useRef, useState } from "react";

import PageLayout from "@/components/PageLayout";
import styles from "@/pages/approvals/approvals.module.css";
import NavigationStep from "@/components/NavigationStep";
import Button from "@/components/Button";
import {
  Checkbox,
  DatePicker,
  Divider,
  Skeleton,
  Space,
  Table,
  message,
} from "antd";
import Modal from "@/components/Modal";
import DropModal from "@/components/DropModal";
import Input from "@/components/Input/Input";
import Dropdown from "@/components/Dropdown";
import useCustomQuery from "@/hooks/useCustomQuery";
import { BASE_URL } from "@/CONFIG";
import axios from "axios";
import { useRouter } from "next/router";
import Pagination from "@/components/Pagination";

const columns: any = [
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    render: (_: any, { type }: any) => (
      <p style={{ textTransform: "capitalize" }}>{type}</p>
    ),
  },
  {
    title: "Initiator type",
    dataIndex: "initiatorType",
    key: "initiatorType",
  },
  {
    title: "Initiator",
    dataIndex: "initiator",
    key: "initiator",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Coin",
    dataIndex: "coin",
    key: "coin",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (_: any, { amount, usdAmount }: any) => (
      <p>
        {amount} <span style={{ color: "#98A2B3" }}>({usdAmount})</span>
      </p>
    ),
  },

  {
    title: "Actions",
    dataIndex: "action",
    render: (_: any, { action, reject }: any) => (
      <div className={styles.actionButton}>
        <div>
          <Button color="white" onClick={reject}>
            Decline
          </Button>
        </div>
        <div style={{ marginLeft: 24 }}>
          <Button onClick={action}>Approve</Button>
        </div>
      </div>
    ),
  },
];

export default function Search() {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const code1 = useRef<HTMLInputElement | null>(null);
  const code2 = useRef<HTMLInputElement | null>(null);
  const code3 = useRef<HTMLInputElement | null>(null);
  const code4 = useRef<HTMLInputElement | null>(null);
  const code5 = useRef<HTMLInputElement | null>(null);
  const code6 = useRef<HTMLInputElement | null>(null);
  const codeMap: { [k: number]: any } = {
    0: code1,
    1: code2,
    2: code3,
    3: code4,
    4: code5,
    5: code6,
  };
  const [loading, setLoading] = useState<boolean>(false);
  const [currData, setCurrData] = useState<any>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openCodeModal, setOpenCodeModal] = useState<boolean>(false);
  const [openRejectModal, setOpenRejectModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [approvalType, setApprovalType] = useState<any>({
    type: "",
    amount: "",
    intiator: "",
  });
  const [pin, setPin] = useState<string>("");

  let auth: any = {};
  if (typeof window !== "undefined" && localStorage.getItem("auth")) {
    auth = JSON.parse(localStorage.getItem("auth") || "");
  }

  const {
    isLoading,
    isFetching,
    refetch,
    data: { data: result } = {},
  } = useCustomQuery({
    queryKey: ["authorizations"],
    enabled: true,
    queryFn: async () => {
      const result = await axios.post(
        `${BASE_URL}/authorizations`,
        { page: currentPage },
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      );
      return result;
    },
  });

  const handleApproval = () => {
    const approveUrl = `${BASE_URL}/authorizations/approve-transaction`;
    const declineUrl = `${BASE_URL}/authorizations/decline-transaction`;
    const url = currData?.approve ? approveUrl : declineUrl;

    setLoading(true);
    axios
      .post(
        url,
        {
          id: currData?.id,
          mfaToken: pin,
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
          refetch();
          setOpenCodeModal(false);
          messageApi.success({ content: res.data.message, duration: 5 });
        } else {
          messageApi.error({ content: res.data.message, duration: 5 });
        }
      })
      .catch((e) => {
        setLoading(false);
        if (e?.response?.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        } else {
          messageApi.error({
            content: "Something went wrong, please try again",
            duration: 5,
          });
        }
      });
  };

  const updatePin = (digit: string) => {
    if (pin.length < 6) {
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

  const onClose = () => {
    setPin("");
    if (code1.current) code1.current.value = "";
    if (code2.current) code2.current.value = "";
    if (code3.current) code3.current.value = "";
    if (code4.current) code4.current.value = "";
    if (code5.current) code5.current.value = "";
    if (code6.current) code6.current.value = "";
    setOpenCodeModal(false);
  };

  return (
    <PageLayout title="Hone">
      {contextHolder}
      <Modal
        // customStyles={{ width: "40%" }}
        headerCenter={
          <div className={styles.lockContainer}>
            <img src="/images/email.png" style={{ width: 48, height: 48 }} />
          </div>
        }
        onClose={onClose}
        openModal={openCodeModal}
      >
        <div className={styles.modalContainer}>
          <h3
            style={{ textTransform: "capitalize" }}
            className={styles.modalTitle}
          >
            {/* Enter Authenticator verification code */}
            {currData?.approve ? "Approve" : "Reject"}{" "}
            {currData?.transactionType} Request
          </h3>
          <p className={styles.modalText}>
            Check your Authenticator for verification code to continue
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
            <input
              ref={code5}
              onKeyUp={(e) => changeCode(e)}
              className={styles.code}
            />
            <input
              ref={code6}
              onKeyUp={(e) => changeCode(e)}
              className={styles.code}
            />
          </div>
          <div className={styles.footerContainer}>
            <Button
              disabled={loading}
              className={styles.footerButton}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              onClick={handleApproval}
              color="white"
              className={styles.footerButton}
              disabled={loading}
              loading={loading}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        customStyles={{ width: "30%" }}
        // headerCenter={
        //   <div className={styles.lockContainer}>
        //     <img src="/images/email.png" style={{ width: 48, height: 48 }} />
        //   </div>
        // }
        onClose={() => setOpenRejectModal(false)}
        openModal={openRejectModal}
      >
        <div className={styles.modalContainer}>
          <h3 className={styles.modalTitle}>
            <span style={{ color: "#D92D20" }}>Request Declined</span>
          </h3>
          <p className={styles.modalText}>
            You have rejected {approvalType.type} of {approvalType.amount} by{" "}
            {approvalType.initiator}
          </p>

          <div className={styles.footerContainer}>
            <Button onClick={() => setOpenRejectModal(false)} color="white">
              Close
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
                  <span style={{ color: "#667085" }}>Account:</span> Account
                  name
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
        </>
      </Modal>
      <div className={styles.container}>
        <h3 className={styles.header}>Authorizations</h3>
        <p className={styles.subHeader}></p>
        {isLoading || isFetching ? (
          <Skeleton active style={{ marginTop: 20 }} />
        ) : (
          <div className={styles.table} style={{ overflow: "hidden" }}>
            <p className={styles.resultText}>
              {result?.pageInfo?.totalCount || 0} result found!
            </p>
            <Table
              style={{
                fontFamily: "PP Telegraf",
                border: "1px solid var(--Gray-200, #EAECF0)",
                borderRadius: 12,
                boxShadow: "0px 7px 37px -24px rgba(0, 0, 0, 0.09)",
                overflow: "hidden",
              }}
              dataSource={result?.data.map((item: any) => ({
                key: item.id,
                type: item.transactionType,
                initiatorType: item.initiatorType,
                initiator: item.initiator,
                description: item.description,
                coin: item.cryptoSymbol,
                amount: `${item.cryptoAmount} ${item.cryptoSymbol}`,
                usdAmount: `$${item.usdValue}`,
                status: `${item.status}`,
                action: () => {
                  setOpenCodeModal(true);
                  setCurrData({
                    ...item,
                    approve: true,
                  });
                },
                reject: () => {
                  setOpenCodeModal(true);
                  setCurrData({
                    ...item,
                    approve: false,
                  });
                  // setOpenRejectModal(true);
                  // setApprovalType({
                  //   type: item.transactionType,
                  //   initiator: item.initiator,
                  //   amount: `${item.cryptoAmount} ${item.cryptoSymbol}`,
                  // });
                },
              }))}
              columns={columns}
              pagination={false}
            />
            <Pagination
              pageInfo={result?.pageInfo}
              setCurrentPage={setCurrentPage}
            />
            {/* <Pagination
          pageInfo={result?.data?.pageInfo}
          setCurrentPage={setCurrentPage}
        /> */}
          </div>
        )}
      </div>
    </PageLayout>
  );
}
