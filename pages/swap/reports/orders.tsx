import React, { useMemo, useState } from "react";
import PageLayout from "@/components/PageLayout";
import styles from "@/pages/cards/cards-orders.module.css";
import { Button, Table } from "antd";
import Modal from "@/components/Modal";
import axios from "axios";
import { BASE_URL } from "@/CONFIG";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import { GetServerSideProps } from "next";
import useCustomQuery from "@/hooks/useCustomQuery";

interface IProps {
  status: string;
  from: string;
  to: string;
}

export default function SwapOrders({ status, from, to }: IProps) {
  const router = useRouter();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [detailsId, setDetailsId] = useState<string>("");

  let auth: any = {};
  if (typeof window !== "undefined" && localStorage.getItem("auth")) {
    auth = JSON.parse(localStorage.getItem("auth") || "");
  }
  const { isLoading, data: { data: result } = {} } = useCustomQuery({
    queryKey: ["swapOrders", { status, from, to }, currentPage],
    queryFn: async () => {
      const result = await axios.post(
        `${BASE_URL}/swap/filter`,
        {
          status: status,
          from: from,
          to: to,
          page: currentPage,
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
  console.log({ result });

  const { isLoading: isLoadingDetails, data: { data: details } = {} } =
    useCustomQuery({
      queryKey: ["swapOrderDetails", detailsId],
      enabled: detailsId.length > 0,
      queryFn: async () => {
        const result = await axios.post(
          `${BASE_URL}/swap/view`,
          { transactionId: detailsId },
          {
            headers: {
              Authorization: auth.accessToken,
            },
          }
        );
        return result;
      },
    });

  const REQUESTS_COLUMNS = useMemo(() => {
    return [
      {
        title: "Transaction ID",
        dataIndex: "",
        key: "uniqId",
        render: (_: any, { uniqId }: any) => (
          <p className={styles.username}>{`${uniqId.slice(
            0,
            6
          )}...${uniqId.slice(uniqId.length - 6)}`}</p>
        ),
      },
      {
        title: "Username",
        dataIndex: "username",
        key: "username",
        render: (_: any, { username }: any) => (
          <p className={styles.username}>{username}</p>
        ),
      },
      {
        title: "Swap pair",
        key: "pair",
        render: (_: any, res: any) => {
          return (
            <div style={{ display: "flex" }}>
              <p>{res?.sourceCrypto}</p>
              <p style={{ color: "green", margin: "0 10px" }}>&rarr;</p>
              <p>{res?.destinationCrypto}</p>
            </div>
          );
        },
      },
      {
        title: "From",
        key: "from",
        render: (_: any, res: any) => {
          return (
            <p>
              {res?.sourceAmount} {res?.sourceCrypto}
            </p>
          );
        },
      },
      {
        title: "To",
        key: "to",
        render: (_: any, res: any) => {
          return (
            <p>
              {res?.destinationAmount} {res?.destinationCrypto}
            </p>
          );
        },
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (_: any, { status }: any) => (
          <div className={styles.statusContainer}>
            <div className={styles.statusIndicator} /> {status}
          </div>
        ),
      },
      {
        title: "Date",
        dataIndex: "createdOn",
        key: "date",
        width: "20%",
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
  }, []);

  return (
    <PageLayout title="Hone">
      <Modal
        openModal={openModal}
        onClose={() => setOpenModal(false)}
        headerCenter={
          <div className={styles.modalHeader}>
            <p>Transaction details</p>
            <div className={styles.breadCrumb}>Swap</div>
          </div>
        }
        headerLeft={
          <div className={styles.iconContainer}>
            <img src="/icons/receipt-check.svg" />
          </div>
        }
      >
        {isLoadingDetails ? (
          <Loader />
        ) : (
          <div className={styles.modalContainer}>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>
                User:{" "}
                <span style={{ color: "black" }}>
                  {details?.data?.username}
                </span>
              </p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Transaction ID:</p>
              <p className={styles.value}>{details?.data?.uniqId}</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Transaction Status:</p>
              <div className={styles.statusContainer}>
                <div className={styles.statusIndicator} />{" "}
                {details?.data?.status}
              </div>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>From</p>
              <p className={styles.value}>
                {details?.data?.sourceAmount} {details?.data?.sourceCrypto} (
                {details?.data?.sourceCryptoName})
              </p>
            </div>
            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>To</p>
              <p className={styles.value}>
                {details?.data?.destinationAmount}{" "}
                {details?.data?.destinationCrypto} (
                {details?.data?.destinationCryptoName})
              </p>
            </div>

            <div className={styles.divider} />
            <div className={styles.keyValue}>
              <p className={styles.key}>Transaction Date</p>
              <p className={styles.value}>{details?.data?.createdOn}</p>
            </div>
          </div>
        )}
      </Modal>
      <div className={styles.container}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div>
            <Button
              type="text"
              onClick={() =>
                router.push(
                  `/swap/reports?status=${status}&from=${from}&to=${to}`
                )
              }
            >
              <img src="/icons/arrow-left.svg" />
            </Button>
          </div>
          <p className={styles.filterTitle}>Filter swap report order result</p>
        </div>

        {isLoading ? (
          <Loader />
        ) : result ? (
          <div className={styles.table} style={{ overflow: "hidden" }}>
            <p className={styles.resultText}>
              {result?.data.length} result found!
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
                ...item,
                action: () => {
                  setDetailsId(item.uniqId);
                  setOpenModal(true);
                },
              }))}
              columns={REQUESTS_COLUMNS}
              loading={isLoading}
              pagination={false}
            />
            <Pagination
              pageInfo={result?.pageInfo}
              setCurrentPage={setCurrentPage}
            />
          </div>
        ) : null}
      </div>
    </PageLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { status, from, to } = context.query;
  return {
    props: {
      status,
      from,
      to,
    },
  };
};
