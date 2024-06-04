import React, { useEffect, useRef, useState } from "react";

import PageLayout from "@/components/PageLayout";
import styles from "@/pages/country-settings/country-settings.module.css";
import Button from "@/components/Button";
import {
  Divider,
  Space,
  Table,
  Modal,
  InputNumber,
  message,
  Skeleton,
  Button as AntdButton,
} from "antd";
import Input from "@/components/Input/Input";
import Dropdown from "@/components/Dropdown";
import Toggle from "@/components/Toggle";
import { BASE_URL } from "@/CONFIG";
import axios from "axios";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import type { TableProps } from "antd";

export default function Search() {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<string>("Basic Information");
  const [ratesTab, setRatesTab] = useState<string>("BTC");
  const [loading, setLoading] = useState<boolean>(false);
  const [basicInfoLoading, setBasicInfoLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>({});
  const previousData = useRef<any>({});
  const [selectedRate, setSelectedRate] = useState<string>("");
  const [editRate, setEditRate] = useState<any>({ buy: 0, sell: 0 });

  let auth: any = {};
  if (typeof window !== "undefined" && localStorage.getItem("auth")) {
    auth = JSON.parse(localStorage.getItem("auth") || "");
  }

  const fetchCountrySettings = () => {
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/country-settings`,
        {},
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
        } else {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
      });
  };

  const updateBasicInformation = () => {
    setBasicInfoLoading(true);
    axios
      .post(
        `${BASE_URL}/country-settings/update-basic-info`,
        {
          id: data.id,
          name: data.name,
          shortName: data.shortName,
          currencyName: data.currencyName,
          currencyCode: data.currencyCode,
          phoneCode: data.phoneCode,
        },
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res: any) => {
        setBasicInfoLoading(false);
        if (!res.data.success) {
          toast.error(res.data.message);
        } else {
          toast.success("data updated sucessfully ");
        }
      })
      .catch((e) => {
        if (e?.response?.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
        setBasicInfoLoading(false);
        toast.error("Something went wrong! Try again");
      });
  };

  const updatePaymentMethod = (method: string, value: boolean) => {
    const newData = { ...data };
    newData[method] = value;
    setData(newData);
    setBasicInfoLoading(true);
    axios
      .post(
        `${BASE_URL}/country-settings/update-payment-methods`,
        {
          id: newData.id,
          momo: newData.momo,
          bank: newData.bank,
        },
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res: any) => {
        setBasicInfoLoading(false);
        if (!res.data.success) {
          toast.error(res.data.message);
        } else {
          toast.success("data updated sucessfully ");
        }
      })
      .catch((e) => {
        if (e?.response?.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
        setBasicInfoLoading(false);
        toast.error("Something went wrong! Try again");
      });
  };

  const updateRate = () => {
    setBasicInfoLoading(true);
    axios
      .post(
        `${BASE_URL}/country-settings/update-rates`,
        {
          id: data.id,
          type: selectedRate,
          sell: editRate.sell,
          buy: editRate.buy,
        },
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res: any) => {
        setBasicInfoLoading(false);
        setOpenModal(false);
        if (!res.data.success) {
          messageApi.error({ content: res.data.message, duration: 5 });
        } else {
          const newData = { ...data };
          newData.rates[selectedRate].sell = editRate.sell;
          newData.rates[selectedRate].buy = editRate.buy;
          setData(newData);
          messageApi.success({ content: "rate updated", duration: 5 });
        }
      })
      .catch((e) => {
        if (e?.response?.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
        setBasicInfoLoading(false);
        toast.error("Something went wrong! Try again");
      });
  };

  useEffect(() => {
    fetchCountrySettings();
  }, []);

  const changeRate = (value: string, rateType: string) => {
    const newData = { ...editRate };
    newData[rateType] = value;
    setEditRate(newData);
  };

  const columns: TableProps<any>["columns"] = [
    {
      title: "Coin",
      dataIndex: "coin",
      key: "coin",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Buy",
      dataIndex: "buy",
      key: "buy",
    },
    {
      title: "Sell",
      dataIndex: "sell",
      key: "sell",
    },
    {
      title: "Action",
      key: "action",
      render: (_, { type }) => (
        <Space size="middle">
          <AntdButton
            onClick={() => {
              previousData.current = data;
              setOpenModal(true);
              setSelectedRate(type);
              setEditRate({
                buy: data?.rates?.[type]?.buy,
                sell: data?.rates?.[type]?.sell,
              });
            }}
          >
            Edit
          </AntdButton>
        </Space>
      ),
    },
  ];

  const customData: any[] = [
    {
      key: "1",
      coin: "BTC, BCH, LTC, DOGE",
      buy: data?.rates?.currency?.buy,
      sell: data?.rates?.currency?.sell,
      type: "currency",
    },
    {
      key: "2",
      coin: "USDT , USDC, TRON",
      buy: data?.rates?.usdt?.buy,
      sell: data?.rates?.usdt?.sell,
      type: "usdt",
    },
    {
      key: "3",
      coin: "ETH, MATIC, BSC",
      buy: data?.rates?.evm?.buy,
      sell: data?.rates?.evm?.sell,
      type: "evm",
    },
  ];

  return (
    <PageLayout title="Hone">
      {contextHolder}
      <Modal
        okButtonProps={{ size: "large" }}
        cancelButtonProps={{ size: "large" }}
        title={`Update rate`}
        open={openModal}
        onCancel={() => {
          setOpenModal(false);
          setData(previousData.current);
        }}
        onOk={updateRate}
      >
        <div className={styles.inputContainer}>
          <p>New Buy rate</p>
          <InputNumber
            className={styles.modalInput}
            value={editRate.buy}
            onChange={(value: any) => changeRate(value, "buy")}
          />
          <p>New Sell rate</p>
          <InputNumber
            className={styles.modalInput}
            value={editRate.sell}
            onChange={(value: any) => changeRate(value, "sell")}
          />
        </div>
      </Modal>
      <div className={styles.container}>
        <h3 className={styles.header}>Country Settings</h3>
        <p className={styles.subHeader}></p>

        {loading ? (
          <Skeleton active />
        ) : (
          <>
            <div className={styles.tabContainer}>
              <button
                onClick={() => setCurrentTab("Basic Information")}
                style={{
                  background:
                    currentTab === "Basic Information" ? "white" : "none",
                  border:
                    currentTab === "Basic Information"
                      ? "1px solid var(--gray-100, #f2f4f7)"
                      : "none",
                  boxShadow:
                    currentTab === "Basic Information"
                      ? "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.1)"
                      : "none",
                }}
                className={styles.tabItem}
              >
                Basic Information
              </button>
              <button
                onClick={() => setCurrentTab("Rates")}
                style={{
                  background: currentTab === "Rates" ? "white" : "none",
                  border:
                    currentTab === "Rates"
                      ? "1px solid var(--gray-100, #f2f4f7)"
                      : "none",
                  boxShadow:
                    currentTab === "Rates"
                      ? "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.1)"
                      : "none",
                }}
                className={styles.tabItem}
              >
                Rates
              </button>
            </div>
            {currentTab === "Basic Information" && (
              <div className={styles.body}>
                <div className={styles.bodyInputContainer}>
                  <p>Country</p>
                  <div>
                    <Dropdown
                      value={data.shortName}
                      options={[
                        { title: "Ghana", value: "GN" },
                        { title: "Cameroon", value: "CM" },
                        { title: "Nigeria", value: "NG" },
                      ]}
                      onChange={() => {}}
                    />
                  </div>
                </div>
                <Divider style={{ margin: 0 }} />
                <div className={styles.bodyInputContainer}>
                  <p>Country annotation (eg. USA)</p>
                  <div>
                    <Input
                      value={data.shortName}
                      onChange={(e) =>
                        setData({ ...data, shortName: e.target.value })
                      }
                    />
                  </div>
                </div>
                <Divider style={{ margin: 0 }} />
                <div className={styles.bodyInputContainer}>
                  <p>Currency</p>
                  <div>
                    <Input
                      value={data.currencyName}
                      onChange={(e) =>
                        setData({ ...data, currencyName: e.target.value })
                      }
                    />
                  </div>
                </div>
                <Divider style={{ margin: 0 }} />
                <div className={styles.bodyInputContainer}>
                  <p>Currency code (eg. USD)</p>
                  <div>
                    <Input
                      value={data.currencyCode}
                      onChange={(e) =>
                        setData({ ...data, currencyCode: e.target.value })
                      }
                    />
                  </div>
                </div>
                <Divider style={{ margin: 0 }} />
                <div className={styles.bodyInputContainer}>
                  <p>Phone code</p>
                  <div>
                    <Input
                      value={data.phoneCode}
                      onChange={(e) =>
                        setData({ ...data, phoneCode: e.target.value })
                      }
                    />
                  </div>
                </div>
                <Divider style={{ margin: 0 }} />
                <div className={styles.bodyFooter}>
                  <div></div>
                  <div className={styles.cancelBtns}>
                    <div style={{ marginRight: 12 }}>
                      <Button color="white">Cancel</Button>
                    </div>
                    <div>
                      <Button
                        loading={basicInfoLoading}
                        onClick={updateBasicInformation}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {currentTab === "Payment methods" && (
              <>
                <div className={styles.body}>
                  <div className={styles.bodyInputContainer}>
                    <p>Mobile money</p>
                    <div>
                      <Toggle
                        defaultValue={data.momo}
                        onToggle={(value) => updatePaymentMethod("momo", value)}
                      />
                    </div>
                  </div>
                  <Divider style={{ margin: 0 }} />
                  <div className={styles.bodyInputContainer}>
                    <p>Bank Transfer</p>
                    <div>
                      <Toggle
                        defaultValue={data.bank}
                        onToggle={(value) => updatePaymentMethod("bank", value)}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
            {currentTab === "Rates" && (
              <Table columns={columns} dataSource={customData} />
            )}
            {currentTab === "Payout methods" && (
              <>
                <div className={styles.body}>
                  <div className={styles.bodyInputContainer2}>
                    <p style={{ marginRight: 64 }}>Figo</p>
                    <Toggle />
                  </div>
                  <Divider style={{ margin: 0 }} />
                  <div className={styles.bodyInputContainer2}>
                    <p style={{ marginRight: 64 }}>Thepeer</p>
                    <Toggle />
                  </div>
                  <Divider style={{ margin: 0 }} />
                  <div className={styles.bodyInputContainer2}>
                    <p style={{ marginRight: 64 }}>P2P</p>
                    <Toggle />
                  </div>
                  <Divider style={{ margin: 0 }} />
                  <div className={styles.bodyInputContainer2}>
                    <p style={{ marginRight: 64 }}>Vella</p>
                    <Toggle />
                  </div>
                  <Divider style={{ margin: 0 }} />
                  <div className={styles.bodyInputContainer2}>
                    <p style={{ marginRight: 64 }}>Opay</p>
                    <Toggle />
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </PageLayout>
  );
}
