import React, { useEffect, useState } from "react";

import PageLayout from "@/components/PageLayout";
import styles from "@/pages/country-settings/country-settings.module.css";
import NavigationStep from "@/components/NavigationStep";
import Button from "@/components/Button";
import { Checkbox, DatePicker, Divider, Space, Switch, Table } from "antd";
import Modal from "@/components/Modal";
import DropModal from "@/components/DropModal";
import Input from "@/components/Input/Input";
import Dropdown from "@/components/Dropdown";
import Toggle from "@/components/Toggle";
import { BASE_URL } from "@/CONFIG";
import axios from "axios";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function Search() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<string>("Basic Information");
  const [ratesTab, setRatesTab] = useState<string>("BTC");
  const [loading, setLoading] = useState<boolean>(false);
  const [basicInfoLoading, setBasicInfoLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>({});
  const [selectedRate, setSelectedRate] = useState<string>("");

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
          chipper: newData.chipper,
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
          sell: data.rates[selectedRate].sell,
          buy: data.rates[selectedRate].buy,
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
          toast.error(res.data.message);
        } else {
          toast.success("data updated sucessfully ");
        }
      })
      .catch((e) => {
        setBasicInfoLoading(false);
        toast.error("Something went wrong! Try again");
      });
  };

  useEffect(() => {
    fetchCountrySettings();
  }, []);

  const changeRate = (value: string, rateType: string) => {
    const newData = { ...data };
    newData.rates[selectedRate][rateType] = value;
    setData(newData);
  };

  if (loading) {
    return (
      <PageLayout title="Home">
        <div style={{ marginTop: 60 }}>
          <Loader />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Hone">
      <Modal
        customStyles={{ width: "30vw" }}
        openModal={openModal}
        onClose={() => setOpenModal(false)}
      >
        <div className={styles.modalContainer}>
          <p className={styles.modalHeader}>Update {selectedRate} rate</p>
          <div className={styles.inputContainer}>
            <p>New Buy rate</p>
            <input
              className={styles.modalInput}
              value={data.rates?.[selectedRate]?.buy}
              onChange={(e: any) => changeRate(e.target.value, "buy")}
            />
            <p>New Sell rate</p>
            <input
              className={styles.modalInput}
              value={data.rates?.[selectedRate]?.sell}
              onChange={(e: any) => changeRate(e.target.value, "sell")}
            />
          </div>

          <div className={styles.modalFooter}>
            <Button
              onClick={() => setOpenModal(false)}
              className={styles.modalButton}
              color="white"
            >
              Cancel
            </Button>
            <Button
              onClick={updateRate}
              loading={basicInfoLoading}
              className={styles.modalButton}
            >
              Add
            </Button>
          </div>
        </div>
      </Modal>
      <div className={styles.container}>
        <h3 className={styles.header}>Country Settings</h3>
        <p className={styles.subHeader}></p>
        <div className={styles.tabContainer}>
          <div
            onClick={() => setCurrentTab("Basic Information")}
            className={
              currentTab === "Basic Information"
                ? styles.tabItemActive
                : styles.tabItem
            }
          >
            Basic Information
          </div>
          <div
            onClick={() => setCurrentTab("Payment methods")}
            className={
              currentTab === "Payment methods"
                ? styles.tabItemActive
                : styles.tabItem
            }
          >
            Payment methods
          </div>
          <div
            onClick={() => setCurrentTab("Payout methods")}
            className={
              currentTab === "Payout methods"
                ? styles.tabItemActive
                : styles.tabItem
            }
          >
            Payout methods
          </div>
          <div
            onClick={() => setCurrentTab("Rates")}
            className={
              currentTab === "Rates" ? styles.tabItemActive : styles.tabItem
            }
          >
            Rates
          </div>
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
              <Divider style={{ margin: 0 }} />
              <div className={styles.bodyInputContainer}>
                <p>Chipper cash</p>
                <div>
                  <Toggle
                    defaultValue={data.chipper}
                    onToggle={(value) => updatePaymentMethod("chipper", value)}
                  />
                </div>
              </div>
            </div>
          </>
        )}
        {currentTab === "Rates" && (
          <>
            <div className={styles.tableContainer} style={{ marginTop: 24 }}>
              <div className={styles.bodyContainer}>
                <div className={styles.tableRowHeader}>
                  <p style={{ flex: 1 }}>Coin</p>
                  <p style={{ width: "15%" }}>BUY</p>
                  <p style={{ width: "15%" }}>SELL</p>
                  <p style={{ width: "15%" }}>Actions</p>
                </div>
                <div className={styles.tableRow}>
                  <p style={{ flex: 1 }}>{data.currencyCode}</p>
                  <p style={{ width: "15%" }}>{data.rates?.currency?.buy}</p>
                  <p style={{ width: "15%" }}>{data.rates?.currency?.sell}</p>
                  <p style={{ width: "15%" }}>
                    <Button
                      onClick={() => {
                        setOpenModal(true);
                        setSelectedRate("currency");
                      }}
                      className={styles.editButton}
                      color="white"
                    >
                      Edit
                    </Button>
                  </p>
                </div>
                <div className={styles.tableRow}>
                  <p style={{ flex: 1 }}>USDT</p>
                  <p style={{ width: "15%" }}>{data?.rates?.usdt?.buy}</p>
                  <p style={{ width: "15%" }}>{data?.rates?.usdt?.sell}</p>
                  <p style={{ width: "15%" }}>
                    <Button
                      onClick={() => {
                        setOpenModal(true);
                        setSelectedRate("usdt");
                      }}
                      className={styles.editButton}
                      color="white"
                    >
                      Edit
                    </Button>
                  </p>
                </div>
                <div className={styles.tableRow}>
                  <p style={{ flex: 1 }}>EVM</p>
                  <p style={{ width: "15%" }}>{data?.rates?.evm?.buy}</p>
                  <p style={{ width: "15%" }}>{data?.rates?.evm?.sell}</p>
                  <p style={{ width: "15%" }}>
                    <Button
                      className={styles.editButton}
                      onClick={() => {
                        setOpenModal(true);
                        setSelectedRate("evm");
                      }}
                      color="white"
                    >
                      Edit
                    </Button>
                  </p>
                </div>
              </div>
            </div>
          </>
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
      </div>
    </PageLayout>
  );
}
