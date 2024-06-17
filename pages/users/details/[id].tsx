import React, { useEffect, useRef, useState } from "react";
import styles from "@/pages/users/details/details.module.css";
import { GetServerSideProps, NextPage } from "next";
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
  InputNumber,
  Skeleton,
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
import useCustomQuery from "@/hooks/useCustomQuery";
import { getStatusCode } from "@/utils/utils";

const PaymentAccountsTable: React.FC<any> = ({ username, auth }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { isLoading: isLoading, data: { data: result = {} } = {} } =
    useCustomQuery({
      queryKey: ["userPaymentAccounts", username],
      enabled: username.length > 0,
      queryFn: async () => {
        const result = await axios.post(
          `${BASE_URL}/users/payment-accounts`,
          {
            username,
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

  return isLoading ? (
    <Skeleton active style={{ marginTop: 20 }} />
  ) : (
    <Table
      style={{
        fontFamily: "PP Telegraf",
        border: "1px solid var(--Gray-200, #EAECF0)",
        borderRadius: 12,
        boxShadow: "0px 7px 37px -24px rgba(0, 0, 0, 0.09)",
        overflow: "hidden",
      }}
      dataSource={result?.data || []}
      columns={columns}
      loading={isLoading}
    />
  );
};

const KYCVerificationTable: React.FC<any> = ({ username, auth }) => {
  const [openPhotosModal, setOpenPhotosModal] = useState<any>(null);
  const [openDocumentsModal, setOpenDocumentsModal] = useState<any>(null);
  const [openRejectModal, setOpenRejectModal] = useState<any>(null);

  const { isLoading, data: { data: result = {} } = {} } = useCustomQuery({
    queryKey: ["userKyc", username],
    enabled: username.length > 0,
    queryFn: async () => {
      const result = await axios.post(
        `${BASE_URL}/users/kyc`,
        {
          username,
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

  const dataSource = [result?.data].map((item: any) => ({
    ...item,
    onOpenPhotos: () => setOpenPhotosModal(item),
    onViewDocuments: () => setOpenDocumentsModal(item),
    onReject: () => setOpenRejectModal(item),
    onViewKYC: () => {
      window.open(item?.photos?.selfieUrl || "", "_blank");
    },
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
      render: (
        _: any,
        { onOpenPhotos, onViewDocuments, onReject, onViewKYC }: any
      ) => (
        <div className={styles.actionButton}>
          <div style={{ marginRight: 10 }}>
            <Button onClick={onOpenPhotos}>View photos</Button>
          </div>
          <div style={{ marginRight: 10 }}>
            <Button color="white" onClick={onViewKYC}>
              View KYC
            </Button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      {isLoading ? (
        <Skeleton active style={{ marginTop: 20 }} />
      ) : (
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
      )}
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

const AccountBalanceTable: React.FC<any> = ({ username, auth }) => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const [currency, setCurrency] = useState<string>("");
  const [userAddress, setUserAddress] = useState<string>("");
  const [amount, setAmount] = useState<number | string>("");
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openDeductModal, setOpenDeductModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { isLoading: isLoadingData, data: { data: result = {} } = {} } =
    useCustomQuery({
      queryKey: ["userCryptoBalance", username],
      enabled: username.length > 0,
      queryFn: async () => {
        const result = await axios.post(
          `${BASE_URL}/users/crypto-balance`,
          {
            username,
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
      render: (_: any, { addAction, deductAction, symbol, address }: any) => (
        <div className={styles.actionButton}>
          <div style={{ marginRight: 10 }}>
            <Button color="white" onClick={() => deductAction(symbol, address)}>
              Deduct
            </Button>
          </div>
          <div>
            <Button onClick={() => addAction(symbol, address)}>Add</Button>
          </div>
        </div>
      ),
    },
  ];

  const addBalance = () => {
    setIsLoading(true);
    axios
      .post(
        `${BASE_URL}/manual-approvals/account-balance-update/initiate`,
        {
          username: username,
          cryptoSymbol: currency,
          userAddress,
          cryptoAmount: amount,
          action: "add",
        },
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res: any) => {
        setIsLoading(false);
        if (res.data.status) {
          messageApi.success({
            content: res.data.message,
            duration: 5,
          });
          setAmount("");
          setOpenAddModal(false);
        } else {
          messageApi.error({
            content: res.data.message,
            duration: 5,
          });
        }
      })
      .catch((e) => {
        if (e?.response?.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
      });
  };

  const closeAddModal = () => {
    messageApi.info({
      content: `${username} ${currency} balance not topped up`,
      duration: 5,
    });
    setOpenAddModal(false);
  };

  const deductBalance = () => {
    setIsLoading(true);
    axios
      .post(
        `${BASE_URL}/manual-approvals/account-balance-update/initiate`,
        {
          username: username,
          cryptoSymbol: currency,
          userAddress,
          cryptoAmount: amount,
          action: "deduct",
        },
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res: any) => {
        setIsLoading(false);
        if (res.data.status) {
          messageApi.success({
            content: res.data.message,
            duration: 5,
          });
          setAmount("");
          setOpenDeductModal(false);
        } else {
          messageApi.error({
            content: res.data.message,
            duration: 5,
          });
        }
      })
      .catch((e) => {
        if (e?.response?.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
      });
  };

  const closeDeductModal = () => {
    messageApi.info({
      content: `${username} ${currency} balance not deducted`,
      duration: 5,
    });
    setOpenDeductModal(false);
  };

  return (
    <>
      {contextHolder}
      <AntModal
        title={`Add ${currency}`}
        open={openAddModal}
        onOk={addBalance}
        onCancel={closeAddModal}
        confirmLoading={isLoading}
      >
        <div style={{ paddingBottom: 20 }}>
          <p>
            Enter {currency} amount to add to {username}&apos;s account
          </p>
          <InputNumber
            style={{ width: "100%" }}
            type="number"
            value={amount}
            onChange={(value: any) => setAmount(value)}
          />
        </div>
      </AntModal>
      <AntModal
        title={`Deduct ${currency}`}
        open={openDeductModal}
        onOk={deductBalance}
        onCancel={closeDeductModal}
        confirmLoading={isLoading}
      >
        <div style={{ paddingBottom: 20 }}>
          <p>
            Enter {currency} amount to deduct from {username}&apos;s account
          </p>
          <InputNumber
            style={{ width: "100%" }}
            type="number"
            value={amount}
            onChange={(value: any) => setAmount(value)}
          />
        </div>
      </AntModal>

      {isLoadingData ? (
        <Skeleton active style={{ marginTop: 20 }} />
      ) : (
        <Table
          style={{
            fontFamily: "PP Telegraf",
            border: "1px solid var(--Gray-200, #EAECF0)",
            borderRadius: 12,
            boxShadow: "0px 7px 37px -24px rgba(0, 0, 0, 0.09)",
            overflow: "hidden",
          }}
          dataSource={(result?.data || []).map((item: any) => ({
            ...item,
            addAction: (currency: string, address: string) => {
              setOpenAddModal(true);
              setCurrency(currency);
              setUserAddress(address);
            },
            deductAction: (currency: string, address: string) => {
              setOpenDeductModal(true);
              setCurrency(currency);
              setUserAddress(address);
            },
          }))}
          columns={columns}
          loading={isLoadingData}
        />
      )}
    </>
  );
};

const CardsTable: React.FC<any> = ({ username, auth }) => {
  const router = useRouter();
  const [modalType, setModalType] = useState<
    "cardDetails" | "add" | "deduct" | null
  >(null);

  const { isLoading, data: { data: result = {} } = {} } = useCustomQuery({
    queryKey: ["userCards", username],
    enabled: username.length > 0,
    queryFn: async () => {
      const result = await axios.post(
        `${BASE_URL}/users/cards`,
        {
          username,
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

  const columns: any = [
    {
      title: "Name & Status",
      // dataIndex: "cardNumber",
      render: (_: any, { cardNumber, status }: any) => (
        <div className={styles.cardContainer}>
          {/* <img src="/images/master-card.png" className={styles.cardImage} /> */}
          <div>
            <p className={styles.cardTitle}>{cardNumber}</p>
            <p className={styles.cardTitle}>
              Status:{" "}
              <span style={{ color: "rgb(34, 81, 250)" }}>{status}</span>
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Card type",
      dataIndex: "type",
      key: "type",
      render: (_: any, { type }: any) => (
        <p className={styles.cardType}>{type}</p>
      ),
    },
    {
      title: "Card balance",
      dataIndex: "balance",
      key: "balance",
      render: (_: any, { balance }: any) => (
        <div className={styles.cardContainer}>
          <p className={styles.cardAddress}>${balance}</p>
        </div>
      ),
    },
    {
      title: "Card Expiry Date",
      dataIndex: "expiryDate",
      key: "expiryDate",
      render: (_: any, { expiryDate }: any) => (
        <div className={styles.cardContainer}>
          <p className={styles.cardAddress}>{expiryDate}</p>
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

      {isLoading ? (
        <Skeleton active style={{ marginTop: 20 }} />
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
            dataSource={result?.data}
            columns={columns}
            loading={isLoading}
          />
        </div>
      )}
    </>
  );
};

const TransactionsTable: React.FC<{ username: string; userType: string }> = ({
  username,
  userType,
}) => {
  const router = useRouter();
  const columns: any = [
    {
      title: "Transaction type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, { type }: any) => {
        return (
          <div>
            {type === "Buy Transactions" && (
              <Button
                onClick={() =>
                  router.push(
                    `/users/transactions/${username}?type=buy&userType=${userType}`
                  )
                }
              >
                View
              </Button>
            )}
            {type === "Sell Transactions" && (
              <Button
                onClick={() =>
                  router.push(
                    `/users/transactions/${username}?type=sell&userType=${userType}`
                  )
                }
              >
                View
              </Button>
            )}
            {type === "Crypto Transactions" && (
              <Button
                onClick={() =>
                  router.push(
                    `/users/transactions/${username}?type=crypto&userType=${userType}`
                  )
                }
              >
                View
              </Button>
            )}
            {type === "Swap Transactions" && (
              <Button
                onClick={() =>
                  router.push(
                    `/users/transactions/${username}?type=swap&userType=${userType}`
                  )
                }
              >
                View
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  const dataSource = [
    {
      key: "1",
      type: "Buy Transactions",
    },
    {
      key: "2",
      type: "Sell Transactions",
    },
    {
      key: "3",
      type: "Crypto Transactions",
    },
    {
      key: "4",
      type: "Swap Transactions",
    },
  ];

  return (
    <>
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

interface IProps {
  userId: string;
  userType: string;
}
const UserDetails = ({ userId, userType }: IProps) => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [currentTab, setCurrentTab] = useState<string>("paymentAccounts");
  const [loading, setLoading] = useState<boolean>(false);
  const [isSmsModalOpened, setIsSmsModalOpened] = useState<boolean>(false);
  const [smsText, setSmsText] = useState<string>("");
  const [isSmsLoading, setIsSmsLoading] = useState<boolean>(false);
  const [buyLimit, setBuyLimit] = useState<number | string>("");
  const [isBuyModalOpened, setIsBuyModalOpened] = useState<boolean>(false);
  const [isBuyLoading, setIsBuyLoading] = useState<boolean>(false);
  const [isDisableModal, setIsDisableModal] = useState<boolean>(false);
  const [isDisableLoading, setIsDisableLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>({});

  let auth: any = {};
  if (typeof window !== "undefined" && localStorage.getItem("auth")) {
    auth = JSON.parse(localStorage.getItem("auth") || "");
  }

  const {
    isLoading,
    isFetching,
    refetch,
    data: { data: result = {} } = {},
  } = useCustomQuery({
    queryKey: ["userDetails", userId],
    enabled: userId.length > 0,
    queryFn: async () => {
      const result = await axios.post(
        `${BASE_URL}/users/details`,
        {
          username: userId,
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

  const sendSms = () => {
    setIsSmsLoading(true);
    axios
      .post(
        `${BASE_URL}/users/send-sms`,
        {
          username: result?.data?.username,
          message: smsText,
        },
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res: any) => {
        setIsSmsLoading(false);
        if (res.data.success) {
          setSmsText("");
          messageApi.success({ content: "SMS successfully sent", duration: 5 });
          setIsSmsModalOpened(false);
        } else {
          messageApi.error({
            content: res.data.message,
            duration: 5,
          });
        }
      })
      .catch((e) => {
        if (e?.response?.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
      });
  };

  const cancelSendSms = () => {
    messageApi.warning({
      content: "SMS not sent because no message was provided",
      duration: 5,
    });
    setIsSmsModalOpened(false);
  };

  const disableAccount = (isDisabled: boolean = true) => {
    setIsDisableLoading(true);
    axios
      .post(
        `${BASE_URL}/users/update-user-status`,
        {
          username: result?.data?.username,
          status: isDisabled ? "disable" : "enable",
        },
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res: any) => {
        setIsDisableLoading(false);
        if (res.data.success) {
          refetch();
          messageApi.success({
            content: `Account successfully ${
              isDisabled ? "disabled" : "enabled"
            }`,
            duration: 5,
          });
          setIsDisableModal(false);
        } else {
          messageApi.error({
            content: res.data.message,
            duration: 5,
          });
        }
      })
      .catch((e) => {
        if (e?.response?.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
      });
  };

  const cancelDisableAccount = (isDisabled: boolean = true) => {
    messageApi.info({
      content: `Account was not ${isDisabled ? "disabled" : "enabled"}`,
      duration: 5,
    });
  };

  const updateBuyLimit = () => {
    setIsBuyLoading(true);
    axios
      .post(
        `${BASE_URL}/users/update-user-buy-limit`,
        {
          username: result?.data?.username,
          limit: buyLimit,
        },
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res: any) => {
        setIsBuyLoading(false);
        if (res.data.success) {
          messageApi.success({
            content: "Limit successfully updated",
            duration: 5,
          });
          setIsBuyModalOpened(false);
          setBuyLimit("");
        } else {
          messageApi.error({
            content: res.data.message,
            duration: 5,
          });
        }
      })
      .catch((e) => {
        if (e?.response?.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
      });
  };

  const cancelBuyLimit = () => {
    messageApi.warning({
      content: "Limit not updated because no amount was provided",
      duration: 5,
    });
    setIsBuyModalOpened(false);
  };
  return (
    <PageLayout title="User Details">
      <>
        {contextHolder}
        <AntModal
          title="Send SMS"
          open={isSmsModalOpened}
          onOk={sendSms}
          onCancel={cancelSendSms}
          confirmLoading={isSmsLoading}
        >
          <div style={{ paddingBottom: 20 }}>
            <p>Enter the SMS content. Limit for 1 SMS is 160 characters.</p>
            <AntInput.TextArea
              rows={4}
              maxLength={160}
              showCount
              value={smsText}
              onChange={(e: any) => setSmsText(e.target.value)}
            />
          </div>
        </AntModal>
        <AntModal
          title={`${result?.data?.isActive ? "Disable" : "Enable"} Account"`}
          open={isDisableModal}
          onOk={() => disableAccount(result?.data?.isActive)}
          // onCancel={() => cancelDisableAccount(true)}
          onCancel={() => setIsDisableModal(false)}
          confirmLoading={isDisableLoading}
          onClose={() => setIsDisableModal(false)}
        >
          <div style={{ paddingBottom: 20 }}>
            <p>
              Are you sure you want to{" "}
              {result?.data?.isActive ? "disable" : "enable"} account?
            </p>
          </div>
        </AntModal>
        <AntModal
          title="Update Buy Limits"
          open={isBuyModalOpened}
          onOk={updateBuyLimit}
          onCancel={cancelBuyLimit}
          confirmLoading={isBuyLoading}
        >
          <div style={{ paddingBottom: 20 }}>
            <p>Enter USD amount to update Buy Limit.</p>
            <InputNumber
              value={buyLimit}
              onChange={(value: any) => setBuyLimit(value)}
              type="number"
              style={{ width: "100%" }}
            />
          </div>
        </AntModal>
        <div className={styles.header}>
          <NavigationStep color="white" hideButton />
          <div className={styles.headerContainer}>
            <Button
              color="white"
              isText
              onClick={() => router.push(`/users?type=${userType}`)}
            >
              <img src="/icons/arrow-left.svg" />
            </Button>
            <h1 className={styles.headerText}>User details</h1>
          </div>
          <Divider style={{ marginTop: 16, marginBottom: 0 }} />
        </div>

        {isLoading || isFetching ? (
          <Skeleton active style={{ margin: "20px" }} />
        ) : (
          <>
            <div className={styles.profileHeader}>
              <Avatar shape="square" size={64} icon={<UserOutlined />} />
              <div className={styles.profileNameContainer}>
                <h3>
                  {result?.data.firstName} {result?.data.lastName}
                </h3>
                <p>@{result?.data.username}</p>
              </div>
              {["BLACKSWAN", "SUPER_ADMIN", "MANAGER_ADMIN"].includes(
                auth?.user?.role
              ) && (
                <div className={styles.profileActions}>
                  <div style={{ marginLeft: 10 }}>
                    <AntButton
                      size="large"
                      // className={styles.profileActionBtnsDanger}
                      danger={result?.data.isActive}
                      onClick={() => setIsDisableModal(true)}
                    >
                      {result?.data.isActive ? "Disable" : "Enable"} Account
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
              )}
            </div>
            <div className={styles.container}>
              <div className={styles.profileDetailsContainer}>
                <div className={styles.profileDetails}>
                  <KeyValue
                    items={[
                      {
                        key: "First and Other Names:",
                        value: result?.data?.firstName,
                      },
                      {
                        key: "Last Name:",
                        value: result?.data?.lastName,
                      },
                      {
                        key: "Username:",
                        value: result?.data?.username,
                      },
                      {
                        key: "Email Address",
                        value: result?.data?.email,
                      },
                      {
                        key: "Phone Number:",
                        value: `+${result?.data?.phone}`,
                      },
                      {
                        key: "State/Region:",
                        value: result?.data?.stateRegion,
                      },
                      {
                        key: "Address:",
                        value: result?.data?.homeAddress,
                      },
                      {
                        key: "Ghana Card No:",
                        value: result?.data?.cardNo,
                      },
                      {
                        key: "Can Send:",
                        value: result?.data?.canSend?.toString(),
                      },
                      {
                        key: "Can deposit:",
                        value: result?.data?.canDeposit?.toString(),
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
                            color={getStatusCode(
                              result?.data?.kycStatus
                                ? "Verified"
                                : "Not Verified"
                            )}
                          >
                            {result?.data?.kycStatus
                              ? "Verified"
                              : "Not Verified"}
                          </Tag>
                        ),
                      },
                      {
                        key: "Sign Up Date:",
                        value: result?.data?.signUpDate,
                      },
                      {
                        key: "Last Active:",
                        value: result?.data?.lastActive,
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
                      {
                        key: "Verification TIER:",
                        value: result?.data?.verificationTier,
                      },
                      {
                        key: "Can Withdraw:",
                        value: result?.data?.canWithdraw?.toString(),
                      },
                      {
                        key: "Can trade",
                        value: result?.data?.canTrade?.toString(),
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        <div className={styles.container}>
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
            <button
              onClick={() => setCurrentTab("transactions")}
              style={{
                background: currentTab === "transactions" ? "white" : "none",
                border:
                  currentTab === "transactions"
                    ? "1px solid var(--gray-100, #f2f4f7)"
                    : "none",
                boxShadow:
                  currentTab === "transactions"
                    ? "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.1)"
                    : "none",
              }}
              className={styles.tabItem}
            >
              Transactions
            </button>
          </div>
          {currentTab === "accountBalance" && (
            <AccountBalanceTable username={userId} auth={auth} />
          )}
          {currentTab === "kycVerification" && (
            <KYCVerificationTable username={userId} auth={auth} />
          )}
          {currentTab === "paymentAccounts" && (
            <PaymentAccountsTable username={userId} auth={auth} />
          )}
          {currentTab === "cards" && (
            <CardsTable username={userId} auth={auth} />
          )}
          {currentTab === "transactions" && (
            <TransactionsTable username={userId} userType={userType} />
          )}
        </div>
      </>
    </PageLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id, type } = context.query;
  return {
    props: {
      userId: id,
      userType: type,
    },
  };
};

export default UserDetails;
