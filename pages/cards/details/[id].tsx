import React, { useEffect, useMemo, useState } from "react";

import PageLayout from "@/components/PageLayout";
import styles from "@/pages/cards/search.module.css";
import NavigationStep from "@/components/NavigationStep";
import Button from "@/components/Button";
import { Table, Tag } from "antd";
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
      <Tag color={transactionStatus === "Approved" ? "success" : "failed"}>
        {transactionStatus}
      </Tag>
    ),
  },
  {
    title: "Date",
    dataIndex: "createdAt",
    key: "createdAt",
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
        },
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res: any) => {
        setLoadingUpdate(false);
        setOpenModal(null);
        if (res.data.success) {
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
        },
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res: any) => {
        setLoadingUpdate(false);
        setOpenModal(null);
        setAmount("");
        if (res.data.success) {
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
        },
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res: any) => {
        setLoadingUpdate(false);
        setOpenModal(null);
        setAmount("");
        if (res.data.success) {
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
        },
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res: any) => {
        setLoadingUpdate(false);
        setOpenModal(null);
        if (res.data.success) {
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

  // useEffect(() => {
  //   getCardDetails();
  // }, [router.query]);

  const showModal = (user: any) => {
    setCurrentUser(user);
  };

  return (
    <PageLayout title="Home">
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
          <Input
            placeholder=""
            value={deleteConfirmation}
            onChange={(e) => setDeleteConfirmation(e.target.value)}
          />
          <div className={styles.modalFooter2}>
            <Button
              onClick={() => setOpenModal(null)}
              className={styles.modalButton}
              color="white"
            >
              Cancel
            </Button>
            <Button
              loading={loadingUpdate}
              onClick={terminateCard}
              disabled={deleteConfirmation !== "delete-0223"}
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
          <Input
            placeholder="0.00"
            type="number"
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className={styles.labelContainer}>
            <p className={styles.label}>Enter otp code (Telegram)</p>
            <p style={{ cursor: "pointer" }} className={styles.info}>
              Send OTP
            </p>
          </div>
          <Input
            placeholder=""
            // value={amount}
            // onChange={(e: any) => setAmount(e.target.value)}
          />
          <div className={styles.modalFooter2}>
            <Button
              loading={loadingUpdate}
              onClick={withdrawCard}
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
              loading={loadingUpdate}
              onClick={freezeCard}
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
          <Input
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className={styles.labelContainer}>
            <p className={styles.label}>Enter otp code (Telegram)</p>
            <p className={styles.info}>Send OTP</p>
          </div>
          <Input placeholder="" />
          <div className={styles.modalFooter2}>
            <Button
              loading={loadingUpdate}
              onClick={topUpCard}
              className={styles.modalButtonFull}
            >
              Top up
            </Button>
          </div>
        </div>
      </Modal>
      {isLoading ? (
        <div style={{ marginTop: 60 }}>
          <Loader />
        </div>
      ) : (
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
              <VirtualCard
                status={cardData?.cardDetails?.status}
                name={cardData?.cardDetails?.nameOnCard}
                cardNumber={cardData?.cardDetails?.cardNumber}
                expDate={cardData?.cardDetails?.expiry}
                cvv={cardData?.cardDetails?.cvv}
              />
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
                <p className={styles.itemText}>
                  @username (missing from backend)
                </p>
              </div>
              <div className={styles.divider} />
              <div className={styles.keyValue}>
                <p className={styles.itemText}>Current balance</p>
                <p className={styles.itemText}>
                  ${cardData?.cardDetails?.cardBalance}
                </p>
              </div>
              <div className={styles.divider} />
              <div className={styles.keyValue}>
                <p className={styles.itemText}>Created date</p>
                <p className={styles.itemText}>
                  {cardData?.cardDetails?.createdAt}
                </p>
              </div>
              <div className={styles.divider} />
              <div className={styles.keyValue}>
                <p className={styles.itemText}>Expiration date</p>
                <p className={styles.itemText}>
                  {cardData?.cardDetails?.expiration}
                </p>
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
              dataSource={cardData?.transactions?.map((user: any) => ({
                ...user,
                action: () => showModal(user),
              }))}
              columns={TRANSACTIONS_COLUMNS}
              loading={isLoading}
            />
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  // console.log({ others });
  return {
    props: {
      cardId: id,
    },
  };
};

export default CardDetails;
