import React, { useEffect, useMemo, useState } from "react";

import PageLayout from "@/components/PageLayout";
import styles from "@/pages/cards/search.module.css";
import NavigationStep from "@/components/NavigationStep";
import Button from "@/components/Button";
import { Skeleton, Table, Tag, Button as AntdButton } from "antd";
import Modal from "@/components/Modal";
import axios from "axios";
import { BASE_URL } from "@/CONFIG";
import getToken from "@/utils/getToken";
import Dropdown from "@/components/Dropdown";
import { useRouter } from "next/router";
import VirtualCard from "@/components/VirtualCard/VirtualCard";
import Input from "@/components/Input/Input";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";
import useCustomQuery from "@/hooks/useCustomQuery";
import { GetServerSideProps } from "next";

const TRANSACTIONS_COLUMNS = [
  {
    title: "Transaction ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Merchant",
    dataIndex: "merchant",
    key: "merchant",
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
    title: "Type",
    dataIndex: "transactionType",
    key: "transactionType",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Status",
    dataIndex: "transactionStatus",
    key: "transactionStatus",
    render: (_: any, { transactionStatus }: any) => (
      <Tag color={transactionStatus === "Approved" ? "success" : "warning"}>
        {transactionStatus}
      </Tag>
    ),
  },
  {
    title: "Date",
    dataIndex: "createdAt",
    key: "createdAt",
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

const CardDetails = ({ cardId }: { cardId: string }) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
  const [data, setData] = useState<any>({});
  const [currentUser, setCurrentUser] = useState<any>({});
  const [amount, setAmount] = useState<string>("");
  const [deleteConfirmation, setDeleteConfirmation] = useState<string>("");
  const [requestId, setRequestId] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [reason, setReason] = useState<string>("");

  let auth: any = {};
  if (typeof window !== "undefined" && localStorage.getItem("auth")) {
    auth = JSON.parse(localStorage.getItem("auth") || "");
  }

  const { isLoading, data: { data: result = {} } = {} } = useCustomQuery({
    queryKey: ["cardDetails", cardId],
    enabled: cardId?.length > 0,
    queryFn: async () => {
      const result = await axios.post(
        `${BASE_URL}/virtual-cards/card-details`,
        {
          cardId: cardId,
        },
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      );
      return result;
    },
  });

  const {
    isLoading: isLoadingTransaction,
    data: { data: cardTransactions = {} } = {},
  } = useCustomQuery({
    queryKey: ["cardTransactions", cardId],
    enabled: cardId?.length > 0,
    queryFn: async () => {
      const result = await axios.post(
        `${BASE_URL}/virtual-cards/card-transactions`,
        {
          cardId: cardId,
        },
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      );
      return result;
    },
  });

  const cardData = useMemo(() => {
    return result?.data;
  }, [result]);

  const getCardDetails = () => {
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/virtual-cards/card-details`,
        {
          cardId: router.query.id,
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
          setData(res.data.data);
        }
      })
      .catch((e) => {
        if (e?.response?.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
      });
  };

  const freezeCard = () => {
    setLoadingUpdate(true);
    axios
      .post(
        `${BASE_URL}/virtual-cards/freeze`,
        {
          cardId: router.query.id,
          activated: false,
          otp,
          requestId,
          reason,
        },
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res: any) => {
        setLoadingUpdate(false);
        if (res.data.success) {
          onClose();
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => {
        if (e?.response?.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
      });
  };

  const topUpCard = () => {
    setLoadingUpdate(true);
    axios
      .post(
        `${BASE_URL}/virtual-cards/top-up`,
        {
          cardId: router.query.id,
          amount: Number(amount),
          otp,
          requestId,
        },
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res: any) => {
        setLoadingUpdate(false);
        if (res.data.success) {
          onClose();
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => {
        if (e?.response?.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
      });
  };

  const withdrawCard = () => {
    setLoadingUpdate(true);
    axios
      .post(
        `${BASE_URL}/virtual-cards/withdrawal`,
        {
          cardId: router.query.id,
          amount: Number(amount),
          otp,
          requestId,
        },
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res: any) => {
        setLoadingUpdate(false);
        if (res.data.success) {
          onClose();
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => {
        if (e?.response?.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
      });
  };

  const terminateCard = () => {
    setLoadingUpdate(true);
    axios
      .post(
        `${BASE_URL}/virtual-cards/terminate`,
        {
          cardId: router.query.id,
          otp,
          requestId,
          reason,
        },
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res: any) => {
        setLoadingUpdate(false);
        if (res.data.success) {
          onClose();
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => {
        if (e?.response?.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
      });
  };

  const sendOtp = (action: string) => {
    setLoadingUpdate(true);
    axios
      .post(
        `${BASE_URL}/virtual-cards/action-otp`,
        {
          cardId: router.query.id,
          action,
          value: amount.length > 0 ? amount : null,
        },
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res: any) => {
        setLoadingUpdate(false);
        if (res.data.success) {
          setRequestId(res.data.data.requestId);
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => {
        if (e?.response?.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
      });
  };

  const onClose = () => {
    setAmount("");
    setRequestId("");
    setReason("");
    setOtp("");
    setOpenModal(null);
  };

  // useEffect(() => {
  //   getCardDetails();
  // }, [router.query]);

  const showModal = (user: any) => {
    setOpenModal("transaction");
    setCurrentUser(user);
  };

  const renderSkeleton = () => (
    <Skeleton
      active
      title={false}
      paragraph={{
        rows: 1,
        style: { margin: "5px 0 0 20px" },
        width: "100%",
      }}
    />
  );

  return (
    <PageLayout title="Home">
      <Modal
        openModal={openModal === "terminate"}
        onClose={onClose}
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
          <Input
            placeholder="Enter reason for termination"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <div className={styles.labelContainer}>
            <p className={styles.label}>Enter otp code (Telegram)</p>

            {/* <p className={styles.info}>delete-0223</p> */}
            <AntdButton
              loading={loadingUpdate}
              size="small"
              onClick={() => sendOtp("TERMINATE")}
            >
              Send OTP
            </AntdButton>
          </div>
          <Input
            placeholder=""
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <div className={styles.modalFooter2}>
            <Button
              onClick={() => onClose()}
              className={styles.modalButton}
              color="white"
            >
              Cancel
            </Button>
            <Button
              loading={loadingUpdate}
              onClick={() => {
                if (reason.length > 0 && otp.length > 0) {
                  terminateCard();
                }
              }}
              className={styles.modalButton}
            >
              Terminate
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        openModal={openModal === "withdraw"}
        onClose={onClose}
        customStyles={{ width: "30%" }}
        headerLeft={<>Withdraw user balance</>}
      >
        <div className={styles.modalContainer}>
          <div className={styles.labelContainer}>
            <p className={styles.label}>Amount</p>
          </div>
          <Input
            leftIcon={<div className={styles.leftIcon}>$</div>}
            placeholder="0.00"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className={styles.labelContainer}>
            <p className={styles.label}>Enter otp code (Telegram)</p>
            {/* <p style={{ cursor: "pointer" }} className={styles.info}>
              Send OTP
            </p> */}
            <AntdButton
              loading={loadingUpdate}
              size="small"
              onClick={() => {
                if (amount.length === 0) {
                  toast.error("Input is required!");
                } else {
                  sendOtp("WITHDRAW");
                }
              }}
            >
              Send OTP
            </AntdButton>
          </div>
          <Input value={otp} onChange={(e) => setOtp(e.target.value)} />

          <div className={styles.modalFooter2}>
            <Button
              loading={loadingUpdate}
              onClick={() => {
                if (amount.length > 0 && otp.length > 0) {
                  withdrawCard();
                }
              }}
              className={styles.modalButtonFull}
            >
              Withdrawal
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        openModal={openModal === "freeze"}
        onClose={onClose}
        customStyles={{ width: "30%" }}
        headerLeft={<>Freeze card</>}
      >
        <div className={styles.modalContainer}>
          <div className={styles.labelContainer}>
            <p className={styles.label}>Reason</p>
          </div>
          <Input
            placeholder="Enter reason for freezing card"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <div className={styles.labelContainer}>
            <p className={styles.label}>Enter otp code (Telegram)</p>
            {/* <p className={styles.info}>freeze-0223</p> */}
            <AntdButton
              loading={loadingUpdate}
              size="small"
              onClick={() => sendOtp("FREEZE")}
            >
              Send OTP
            </AntdButton>
          </div>
          <Input
            placeholder=""
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <div className={styles.modalFooter2}>
            <Button
              loading={loadingUpdate}
              onClick={() => {
                if (reason.length > 0 && otp.length > 0) {
                  freezeCard();
                }
              }}
              className={styles.modalButtonFull}
            >
              Freeze card
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        openModal={openModal === "topup"}
        onClose={onClose}
        customStyles={{ width: "30%" }}
        headerLeft={<>Top up user balance</>}
      >
        <div className={styles.modalContainer}>
          <div className={styles.labelContainer}>
            <p className={styles.label}>Amount</p>
          </div>
          <Input
            leftIcon={<div className={styles.leftIcon}>$</div>}
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className={styles.labelContainer}>
            <p className={styles.label}>Enter otp code (Telegram)</p>
            <AntdButton
              loading={loadingUpdate}
              size="small"
              onClick={() => {
                if (amount.length === 0) {
                  toast.error("Input is required!");
                } else {
                  sendOtp("topUp");
                }
              }}
            >
              Send OTP
            </AntdButton>
          </div>
          <Input value={otp} onChange={(e) => setOtp(e.target.value)} />
          <div className={styles.modalFooter2}>
            <Button
              loading={loadingUpdate}
              onClick={() => {
                if (amount.length > 0 && otp.length > 0) {
                  topUpCard();
                }
              }}
              className={styles.modalButtonFull}
            >
              Top up
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        openModal={openModal === "transaction"}
        onClose={() => setOpenModal(null)}
        customStyles={{ width: "40%" }}
        headerLeft={<>Card Transactions</>}
      >
        <div className={styles.modalContainer}>
          <div className={styles.itemContainer}>
            <p className={styles.value}>ID</p>
            <p className={styles.label}>{currentUser?.cardId}</p>
          </div>
          <div className={styles.itemContainer}>
            <p className={styles.value}>Description</p>
            <p className={styles.label}>{currentUser?.description}</p>
          </div>
          <div className={styles.itemContainer}>
            <p className={styles.value}>Currency Code</p>
            <p className={styles.label}>{currentUser?.currencyCode}</p>
          </div>
          <div className={styles.itemContainer}>
            <p className={styles.value}>Merchant Name</p>
            <p className={styles.label}>{currentUser?.merchantName}</p>
          </div>
          <div className={styles.itemContainer}>
            <p className={styles.value}>Merchant Mid</p>
            <p className={styles.label}>{currentUser?.merchantMid}</p>
          </div>
          <div className={styles.itemContainer}>
            <p className={styles.value}>Merchant City</p>
            <p className={styles.label}>{currentUser?.merchantCity}</p>
          </div>
          <div className={styles.itemContainer}>
            <p className={styles.value}>Merchant Country</p>
            <p className={styles.label}>{currentUser?.merchantCountry}</p>
          </div>
          <div className={styles.itemContainer}>
            <p className={styles.value}>Network</p>
            <p className={styles.label}>{currentUser?.network}</p>
          </div>
          <div className={styles.itemContainer}>
            <p className={styles.value}>Transaction Amount</p>
            <p className={styles.label}>{currentUser?.transactionAmount}</p>
          </div>
          <div className={styles.itemContainer}>
            <p className={styles.value}>Transaction Status</p>
            <p className={styles.label}>{currentUser?.transactionStatus}</p>
          </div>
          <div className={styles.itemContainer}>
            <p className={styles.value}>Transaction Type</p>
            <p className={styles.label}>{currentUser?.transactionType}</p>
          </div>
          <div className={styles.itemContainer}>
            <p className={styles.value}>Transaction Time</p>
            <p className={styles.label}>{currentUser?.transactionTime}</p>
          </div>
        </div>
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
          <h3 className={styles.header} style={{ marginLeft: 5 }}>
            Card details
          </h3>
        </div>

        <div className={styles.cardDetailContainer}>
          <div className={styles.cardLeft}>
            {isLoading ? (
              <Skeleton active />
            ) : (
              <>
                <VirtualCard
                  status={cardData?.status}
                  name={cardData?.nameOnCard}
                  cardNumber={cardData?.cardNumber}
                  expDate={cardData?.expiry}
                  cvv={cardData?.cvv}
                />
                <div className={styles.btnContainer}>
                  <button
                    style={{ cursor: "pointer" }}
                    onClick={() => setOpenModal("topup")}
                  >
                    <div className={styles.btn}>
                      <img src="/icons/cards-plus.svg" />
                    </div>
                    Top Up
                  </button>
                  <button
                    style={{ cursor: "pointer" }}
                    onClick={() => setOpenModal("withdraw")}
                  >
                    <div className={styles.btn}>
                      <img src="/icons/cards-minus.svg" />
                    </div>
                    Withdraw
                  </button>
                  <button
                    style={{ cursor: "pointer" }}
                    onClick={() => setOpenModal("freeze")}
                  >
                    <div className={styles.btn}>
                      <img src="/icons/freeze.svg" />
                    </div>
                    Freeze Card
                  </button>
                  <button
                    style={{ cursor: "pointer" }}
                    onClick={() => setOpenModal("terminate")}
                  >
                    <div className={styles.btn}>
                      <img src="/icons/terminate.svg" />
                    </div>
                    Terminate
                  </button>
                </div>
              </>
            )}
          </div>
          <div className={styles.cardRight}>
            <p className={styles.cardItemTitle}>Details</p>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.itemText}>Username </p>
              {isLoading ? (
                renderSkeleton()
              ) : (
                <p className={styles.itemText}>{cardData?.username}</p>
              )}
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.itemText}>Current balance</p>
              {isLoading ? (
                renderSkeleton()
              ) : (
                <p className={styles.itemText}>{cardData?.cardBalance}</p>
              )}
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.itemText}>Created date</p>
              {isLoading ? (
                renderSkeleton()
              ) : (
                <p className={styles.itemText}>{cardData?.createdAt}</p>
              )}
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.itemText}>Expiration date</p>
              {isLoading ? (
                renderSkeleton()
              ) : (
                <p className={styles.itemText}>{cardData?.expiration}</p>
              )}
            </div>
          </div>
        </div>
        <h3 className={styles.tableHeader}>Transactions</h3>
        {isLoadingTransaction ? (
          <Skeleton active />
        ) : (
          <div className={styles.table} style={{ overflow: "hidden" }}>
            <Table
              style={{
                fontFamily: "PP Telegraf",
                border: "1px solid var(--Gray-200, #EAECF0)",
                borderRadius: 12,
                boxShadow: "0px 7px 37px -24px rgba(0, 0, 0, 0.09)",
                overflow: "hidden",
              }}
              dataSource={cardTransactions?.data?.transactions?.map(
                (user: any) => ({
                  ...user,
                  action: () => showModal(user),
                })
              )}
              columns={TRANSACTIONS_COLUMNS}
              loading={isLoadingTransaction}
            />
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  return {
    props: {
      cardId: id,
    },
  };
};

export default CardDetails;
