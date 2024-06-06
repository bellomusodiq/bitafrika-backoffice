import React, { useRef, useState, useMemo } from "react";
import PageLayout from "@/components/PageLayout";
import styles from "@/pages/manual-approvals/manual-approvals.module.css";
import NavigationStep from "@/components/NavigationStep";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Input from "@/components/Input/Input";
import Dropdown from "@/components/Dropdown";
import { toast } from "react-toastify";
import { BASE_URL } from "@/CONFIG";
import axios from "axios";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";
import { IAdmin, TManualApprovalFilter } from "@/types";
import { getTableColumn } from "@/components/ManualApprovals";
import ManualTopupModal from "@/components/ManualApprovals/ManualTopupModal";
import useCustomQuery from "@/hooks/useCustomQuery";
import type { OTPProps } from "antd/es/input/OTP";
import {
  Skeleton,
  Table,
  Input as AntdInput,
  Modal as AntdModal,
  Button as AntdButton,
} from "antd";
import type { GetProp } from "antd";

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
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openCodeModal, setOpenCodeModal] = useState<boolean>(false);
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false);
  const [pin, setPin] = useState<string>("");
  const [data, setData] = useState<Record<string, string>[] | null>(null);
  const [detail, setDetail] = useState<Record<string, any>>({});
  const [pagination, setPagination] = useState<any>({ pageNumber: 1 });
  const [filterBy, setFilterBy] = useState<TManualApprovalFilter>("withdrawal");
  const [mfaToken, setMfaToken] = useState<string>("");
  const [params, setParams] = useState<string>("");
  const [detailsId, setDetailsId] = useState<string | null>(null);
  const [currRecord, setCurrRecord] = useState<any>({});

  let auth: any = {};
  if (typeof window !== "undefined" && localStorage.getItem("auth")) {
    auth = JSON.parse(localStorage.getItem("auth") || "");
  }

  const {
    isLoading,
    isFetching,
    data: { data: result } = {},
    refetch,
  } = useCustomQuery({
    queryKey: ["approvals", params],
    enabled: params.length > 0,
    queryFn: async () => {
      const topUp = `${BASE_URL}/manual-approvals/top-up/list-awaiting-admin-approval-transactions?page=${pagination.pageNumber}`;
      const withdrawal = `${BASE_URL}/manual-approvals/${params}?page=${pagination.pageNumber}`;
      const URL = params === "withdrawal" ? withdrawal : topUp;
      const result = await axios.post(
        URL,
        {},
        {
          headers: { Authorization: auth.accessToken },
        }
      );
      return result;
    },
  });

  // const { isLoading: isLoadingDetails, data: { data: details = {} } = {} } =
  //   useCustomQuery({
  //     queryKey: ["approvalDetails", detailsId],
  //     enabled: !!detailsId,
  //     queryFn: async () => {
  //       const topUp = `${BASE_URL}/manual-approvals/top-up/view-awaiting-admin-approval-transaction/${detailsId}`;
  //       const withdrawal = `${BASE_URL}/manual-approvals/withdrawal/${detailsId}`;
  //       const URL = params === "withdrawal" ? withdrawal : topUp;
  //       const result = await axios.post(
  //         URL,
  //         {},
  //         {
  //           headers: {
  //             Authorization: auth.accessToken,
  //           },
  //         }
  //       );
  //       return result;
  //     },
  //   });
  const formatData = useMemo(() => {
    const response = result?.data;
    if (Array.isArray(response)) {
      switch (params) {
        case "withdrawal":
          return {
            record: response.map((item: any) => ({
              ...item,
              transactionId: item.uniq,
              email: item.email,
              phoneNumber: item.phone,
              amount: `$${item.usdAmount}`,
              asset: item.cryptoCurrency,
              total: `${item.rawAmount} ${item.localCurrency}`,
              date: item.newDate,
              action: () => {
                // fetchManualApprovalDetail(item.uniq);
                setDetailsId(item.uniq);
                setCurrRecord(item);
                setOpenModal(true);
              },
            })),
            pageInfo: result?.pageInfo,
          };
        case "top-up":
          return {
            record: response.map((item: any) => ({
              ...item,
              transactionId: item.txid,
              email: item.email,
              phoneNumber: item.phone,
              country: item.countryCode,
              total: `${item.currency} ${item.amount}`,
              asset: item.cryptoSymbol,
              // action: () => fetchManualApprovalDetail(item.txid),
              action: () => {
                setDetailsId(item.txid);
                setOpenModal(true);
              },
            })),
            pageInfo: result?.data?.pageInfo,
          };
        default:
          return {
            record: [],
            pageInfo: {},
          };
      }
    }
    return null;
  }, [result]);

  const markAsSuccess = (record: Record<string, string>) => {
    console.log(record);
    if (mfaToken.length === 0) return;
    let payload = {};
    const topUp = `${BASE_URL}/manual-approvals/top-up/approve-manual-top-up`;
    const withdrawal = `${BASE_URL}/manual-approvals/withdrawal/mark-pending-withdrawal-success`;
    const URL = filterBy === "withdrawal" ? withdrawal : topUp;
    if (filterBy === "top-up") {
      payload = {
        uniqueId: record.uniq,
        transactionId: record.txid,
        mfaToken,
      };
    } else {
      payload = {
        id: record.id,
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
        setLoadingDetail(false);
        if (res.data.success) {
          setOpenModal(false);
          setMfaToken("");
          toast.success(res.data.message);
          refetch();
          // fetchManualApproval();
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
    if (mfaToken.length === 0) return;
    let payload = {};
    const topUp = `${BASE_URL}/manual-approvals/top-up/decline-manual-top-up`;
    const withdrawal = `${BASE_URL}/manual-approvals/withdrawal/decline-pending-withdrawal/${record.uniq}`;
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
          setMfaToken("");
          toast.success(res.data.message);
          refetch();
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
    setParams(filterBy);
  };
  const resetFields = () => {
    setOpenCodeModal(false);
    setMfaToken("");
    setLoadingDetail(false);
    setParams("");
  };

  return (
    <PageLayout title="Hone">
      <ManualTopupModal
        open={openAddModal}
        setOpen={setOpenAddModal}
        admin={auth as IAdmin}
      />
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
      <AntdModal
        width="30%"
        onCancel={() => {
          setMfaToken("");
          setOpenModal(false);
        }}
        footer={null}
        open={openModal}
        title={
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
      >
        <div style={{ marginTop: 20 }}>
          <p>MFA Token (For Approvals Only)</p>
          <AntdInput.OTP
            style={{ width: "100%", margin: "10px 0" }}
            formatter={(str) => str.toUpperCase()}
            size="large"
            value={mfaToken}
            onChange={(value) => setMfaToken(value)}
          />
        </div>
        <div style={{ marginTop: 20 }} className={styles.modalFooter}>
          <AntdButton
            loading={loadingDetail}
            disabled={loadingDetail}
            onClick={() => declineManualApproval(currRecord)}
          >
            Decline
          </AntdButton>
          <AntdButton
            onClick={() => markAsSuccess(currRecord)}
            loading={loadingDetail}
            disabled={loadingDetail}
            type="primary"
          >
            Mark as success
          </AntdButton>
        </div>
      </AntdModal>

      {/* <AntdInput.otp />
      
      .OTP formatter={(str) => str.toUpperCase()} {...sharedProps} /> */}
      <NavigationStep hideButton />
      <div className={styles.container}>
        {/* <div
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
        </div> */}
        <p className={styles.filterTitle}>Filter manual approval results by</p>
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
        {isLoading || isFetching ? (
          <Skeleton active style={{ margin: "20px 0" }} />
        ) : formatData && params === filterBy ? (
          <>
            <p style={{ color: "#98a2b3" }} className={styles.subHeader}>
              {formatData?.pageInfo?.totalCount || formatData?.record?.length}{" "}
              result found!
            </p>
            <div className={styles.searchContainer}>
              <div className={styles.table} style={{ overflow: "hidden" }}>
                <Table
                  style={{
                    fontFamily: "PP Telegraf",
                    border: "1px solid var(--Gray-200, #EAECF0)",
                    borderRadius: 12,
                    boxShadow: "0px 7px 37px -24px rgba(0, 0, 0, 0.09)",
                    overflow: "hidden",
                  }}
                  dataSource={formatData.record}
                  columns={getTableColumn(filterBy, loadingDetail)}
                />
              </div>
            </div>
          </>
        ) : null}
      </div>
    </PageLayout>
  );
}
