import React, { useMemo, useState } from "react";

import PageLayout from "@/components/PageLayout";
import styles from "@/pages/cards/search.module.css";
import NavigationStep from "@/components/NavigationStep";
import Button from "@/components/Button";
import { Skeleton, Table, Tag } from "antd";
import Modal from "@/components/Modal";
import axios from "axios";
import { BASE_URL } from "@/CONFIG";
import getToken from "@/utils/getToken";
import Dropdown from "@/components/Dropdown";
import { useRouter } from "next/router";
import useCustomQuery from "@/hooks/useCustomQuery";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import AntdModal from "@/components/Modal/DetailsModal";
import modalStyles from "@/styles/modal.module.css";
import { getStatusCode } from "@/utils/utils";

const COUNTRY_MAP: { [k: string]: string } = {
  GH: "Ghana",
  CM: "Cameroon",
  NG: "Nigeria",
};

const GIFTCRARDS_COLUMNS = [
  {
    title: "TRANSACTIONS",
    dataIndex: "transId",
    key: "transId",
    render: (_: any, { transId }: any) => (
      <>
        {transId.slice(0, 6)}...
        {transId.slice(transId.length - 6)}
      </>
    ),
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
    render: (_: any, { username }: any) => (
      <Link href={`users/detail/${username}`} className={styles.username}>
        {username}
      </Link>
    ),
  },
  {
    title: "Card type",
    dataIndex: "cardType",
    key: "cardType",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (_: any, { amount }: any) => <>${amount}</>,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (_: any, { status }: any) => (
      <Tag color={status === "success" ? "success" : "error"}>{status}</Tag>
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

export default function Search({ type }: { type: string }) {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [currentGiftcard, setCurrentGiftcard] = useState<any>({});
  const [searchType, setSearchType] = useState<string>(type || "TRANSACTIONS");
  const [pageInfo, setPageInfo] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [payload, setPayload] = useState<string>(type || "");

  let auth: any = {};
  if (typeof window !== "undefined" && localStorage.getItem("auth")) {
    auth = JSON.parse(localStorage.getItem("auth") || "");
  }
  const { isLoading, data: result } = useCustomQuery({
    queryKey: ["giftcard", payload, search, currentPage],
    enabled: payload.length > 0,
    queryFn: async () => {
      const result = await axios.post(
        `${BASE_URL}/gift-cards/search`,
        {
          filter: payload,
          query: search,
          page: currentPage ? currentPage : pageInfo.currentPage,
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

  const formatData = useMemo(() => {
    const temp = result?.data?.data?.transactions;
    if (Array.isArray(temp)) {
      const response = temp.map((item: any) => ({
        ...item,
        action: () => showModal(item),
      }));
      return {
        record: response,
        pageInfo: result?.data?.data?.pageInfo || {},
      };
    }
  }, [result]);

  const onSearch = () => {
    setPayload(searchType);
  };

  const showModal = (user: any) => {
    setCurrentGiftcard(user);
    setOpenModal(true);
  };

  const renderPlaceHolder = () => {
    switch (searchType) {
      case "TRANSACTIONS":
        return "Enter giftcard transaction ID";
      case "CARD_TYPE":
        return "Enter card type";
      case "USERNAME":
        return "Enter username";
    }
  };

  return (
    <PageLayout title="Home">
      <AntdModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title={
          <div>
            <p className={modalStyles.antModalTitle}>Transaction details</p>
            <div className={modalStyles.antModalSubHeader}>
              <p className={modalStyles.antModalSubtitle}>
                Txn id: {currentGiftcard?.transId}
              </p>
              <Tag color="warning">Giftcard transaction</Tag>
            </div>
          </div>
        }
      >
        <>
          <div className={modalStyles.antModalContainer}>
            <div className={modalStyles.item}>
              <p className={modalStyles.label}>Card name</p>
              <p className={modalStyles.values}>{currentGiftcard?.cardType}</p>
            </div>
            <div className={modalStyles.item}>
              <p className={modalStyles.label}>Amount (USD)</p>
              <p className={modalStyles.values}>{currentGiftcard.amount} USD</p>
            </div>
            <div className={modalStyles.item}>
              <p className={modalStyles.label}>Fee</p>
              <p className={modalStyles.values}> USD</p>
            </div>
          </div>
          <div className={modalStyles.antModalSubContent}>
            <div className={modalStyles.item}>
              <p className={modalStyles.label}>Transaction time</p>
              <p className={modalStyles.label}>{currentGiftcard?.createdAt}</p>
            </div>
            <div className={modalStyles.item}>
              <p className={modalStyles.label}>Recipient email</p>
              <p className={modalStyles.label}>{currentGiftcard.recipient}</p>
            </div>
            <div className={modalStyles.item}>
              <p className={modalStyles.label}>Status</p>
              <Tag color={getStatusCode(currentGiftcard?.status)}>
                {currentGiftcard?.status}
              </Tag>
            </div>
          </div>
          <div className={modalStyles.antModalFooterContent}>
            <div className={modalStyles.antModalLeftContent2}>
              <div className={modalStyles.item}>
                <p className={modalStyles.label}>Note</p>
              </div>
              <div className={modalStyles.item}>
                <p className={modalStyles.values}>{currentGiftcard?.note}</p>
              </div>
            </div>
          </div>
        </>
      </AntdModal>
      {/* <Modal
        openModal={openModal && searchType === "TRANSACTIONS"}
        onClose={() => setOpenModal(false)}
        headerCenter={
          <div className={styles.modalHeader}>
            <p>Transaction details</p>
            <div className={styles.breadCrumb}>Giftcards</div>
          </div>
        }
      >
        <>
          <div className={styles.modalContainer}>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>
                User:{" "}
                <span style={{ color: "black" }}>
                  @{currentGiftcard?.username}
                </span>
              </p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Transaction ID</p>
              <p className={styles.value}>{currentGiftcard?.transId}</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Transaction Status</p>
              <div className={styles.value}>
                <Tag
                  color={
                    currentGiftcard?.status === "success" ? "success" : "error"
                  }
                >
                  {currentGiftcard?.status}
                </Tag>
              </div>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Card type</p>
              <p className={styles.value}>
                missing ({currentGiftcard?.amount})
              </p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Amount paid</p>
              <p className={styles.value}>missing</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Recipient email</p>
              <p className={styles.value}>{currentGiftcard?.recipient}</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Note</p>
              <p className={styles.value}>{currentGiftcard?.note}</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Transaction date</p>
              <p className={styles.value}>{currentGiftcard?.createdAt}</p>
            </div>
          </div>
        </>
      </Modal> */}

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
            Search
          </h3>
        </div>
        <div className={styles.searchContainer}>
          <div className={styles.searchCard}>
            <div className={styles.dropdownContainer}>
              <Dropdown
                value={searchType}
                options={[
                  { title: "Transaction ID", value: "TRANSACTIONS" },
                  { title: "Card type", value: "CARD_TYPE" },
                  { title: "Username", value: "USERNAME" },
                ]}
                onChange={(value) => {
                  setSearchType(String(value));
                  setPayload("");
                  setSearch("");
                }}
              />
            </div>
            <div className={styles.searchHeader}>
              <img src="/icons/search.svg" />
              <input
                className={styles.input}
                placeholder={renderPlaceHolder()}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPayload("");
                }}
              />
            </div>
            <div>
              <Button onClick={onSearch} className={styles.searchButton}>
                Search
              </Button>
            </div>
          </div>
        </div>
        {isLoading ? (
          <Skeleton active style={{ marginTop: 20 }} />
        ) : searchType === payload && formatData ? (
          <div className={styles.table} style={{ overflow: "hidden" }}>
            <p className={styles.resultText}>
              {formatData.pageInfo?.totalCount || formatData.record.length}{" "}
              result found!
            </p>
            <Table
              style={{
                fontFamily: "PP Telegraf",
                border: "1px solid var(--Gray-200, #EAECF0)",
                borderRadius: 12,
                boxShadow: "0px 7px 37px -24px rgba(0, 0, 0, 0.09)",
                overflow: "hidden",
              }}
              dataSource={formatData?.record}
              columns={GIFTCRARDS_COLUMNS}
              loading={loading}
              pagination={false}
            />
            <Pagination
              pageInfo={formatData?.pageInfo}
              setCurrentPage={setCurrentPage}
            />
          </div>
        ) : null}
      </div>
    </PageLayout>
  );
}
