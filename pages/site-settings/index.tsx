import React, { useEffect, useState } from "react";

import PageLayout from "@/components/PageLayout";
import styles from "@/pages/site-settings/site-settings.module.css";
import NavigationStep from "@/components/NavigationStep";
import Button from "@/components/Button";
import { Checkbox, DatePicker, Divider, Space, Switch, Table } from "antd";
import Modal from "@/components/Modal";
import DropModal from "@/components/DropModal";
import Input from "@/components/Input/Input";
import Dropdown from "@/components/Dropdown";
import Toggle from "@/components/Toggle";
import axios from "axios";
import { BASE_URL } from "@/CONFIG";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function Search() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<string>("Fees");
  const [ratesTab, setRatesTab] = useState<string>("BTC");
  const [loading, setLoading] = useState<boolean>(false);
  const [siteSettings, setSiteSettings] = useState<any>([]);
  const [loadingKey, setLoadingKey] = useState<string>("");

  let auth: any = {};
  if (typeof window !== "undefined" && localStorage.getItem("auth")) {
    auth = JSON.parse(localStorage.getItem("auth") || "");
  }

  const fetchSiteSettings = () => {
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/site-settings`,
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
          setSiteSettings(res.data.data);
        } else {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
      });
  };

  useEffect(() => {
    fetchSiteSettings();
  }, []);

  const getSettingsValue = (name: string) => {
    return siteSettings.find((settings: any) => settings.name === name)?.value;
  };

  const changeSettingsValue = (name: string, value: any) => {
    const newSiteSettings = [...siteSettings];
    const index = newSiteSettings.findIndex(
      (settings) => settings.name === name
    );
    const newSettingsItem = { ...newSiteSettings[index] };
    newSettingsItem.value = value;
    newSiteSettings[index] = newSettingsItem;
    setSiteSettings(newSiteSettings);
  };

  const updateFields = (field: string, value?: any) => {
    console.log("value", value);

    let newValue: any = value;
    if (value === undefined) {
      newValue = getSettingsValue(field);
    }
    if (typeof value === "boolean") {
      if (value === true) {
        newValue = "TRUE";
      } else {
        newValue = "FALSE";
      }
    }
    const settingsItem = siteSettings.find(
      (settings: any) => settings.name === field
    );
    console.log("settingsItem", settingsItem);
    changeSettingsValue(field, value);
    setLoadingKey(field);
    axios
      .post(
        `${BASE_URL}/site-settings/update-site-settings`,
        {
          category: settingsItem.category,
          name: settingsItem.name,
          value: newValue,
        },
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      )
      .then((res: any) => {
        setLoadingKey("");
        if (res.data.success) {
          toast.success(`${settingsItem.title} updated sucessfully`);
        } else {
          toast.error(res.data.message);
        }
      });
  };

  return (
    <PageLayout title="Hone">
      <Modal openModal={openModal} onClose={() => setOpenModal(false)}>
        <div className={styles.modalContainer}>
          <p className={styles.modalHeader}>Manual account Top-Up</p>
          <div className={styles.inputContainer}>
            <p>Transaction ID</p>
            <Dropdown
              options={[{ title: "Card", value: "Card" }]}
              onChange={() => {}}
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
              onClick={() => setOpenModal(false)}
              className={styles.modalButton}
            >
              Add
            </Button>
          </div>
        </div>
      </Modal>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.container}>
          <h3 className={styles.header}>
            Site settings -{" "}
            <span style={{ color: "#98A2B3" }}>{currentTab}</span>
          </h3>
          <p className={styles.subHeader}></p>
          <div className={styles.siteSettingsContainer}>
            <div className={styles.navBar}>
              <div
                className={
                  currentTab === "Fees" ? styles.tabActive : styles.tab
                }
                onClick={() => setCurrentTab("Fees")}
              >
                {currentTab === "Fees" && <div className={styles.indicator} />}{" "}
                Fees
              </div>
              <div
                className={
                  currentTab === "Payment methods"
                    ? styles.tabActive
                    : styles.tab
                }
                onClick={() => setCurrentTab("Payment methods")}
              >
                {currentTab === "Payment methods" && (
                  <div className={styles.indicator} />
                )}{" "}
                Payment methods
              </div>
              <div
                className={currentTab === "SMS" ? styles.tabActive : styles.tab}
                onClick={() => setCurrentTab("SMS")}
              >
                {currentTab === "SMS" && <div className={styles.indicator} />}{" "}
                SMS
              </div>
              <div
                className={
                  currentTab === "Confirmations" ? styles.tabActive : styles.tab
                }
                onClick={() => setCurrentTab("Confirmations")}
              >
                {currentTab === "Confirmations" && (
                  <div className={styles.indicator} />
                )}{" "}
                Confirmations
              </div>
              <div
                className={
                  currentTab === "Network fees/Types"
                    ? styles.tabActive
                    : styles.tab
                }
                onClick={() => setCurrentTab("Network fees/Types")}
              >
                {currentTab === "Network fees/Types" && (
                  <div className={styles.indicator} />
                )}{" "}
                Network fees/Types
              </div>
              <div
                className={
                  currentTab === "System status" ? styles.tabActive : styles.tab
                }
                onClick={() => setCurrentTab("System status")}
              >
                {currentTab === "System status" && (
                  <div className={styles.indicator} />
                )}{" "}
                System status
              </div>
              <div
                className={
                  currentTab === "Manual Momo Deposit"
                    ? styles.tabActive
                    : styles.tab
                }
                onClick={() => setCurrentTab("Manual Momo Deposit")}
              >
                {currentTab === "Manual Momo Deposit" && (
                  <div className={styles.indicator} />
                )}{" "}
                Manual Momo Deposit
              </div>
              <div
                className={
                  currentTab === "Deposit status (Momo)"
                    ? styles.tabActive
                    : styles.tab
                }
                onClick={() => setCurrentTab("Deposit status (Momo)")}
              >
                {currentTab === "Deposit status (Momo)" && (
                  <div className={styles.indicator} />
                )}{" "}
                Deposit status (Momo)
              </div>
              <div
                className={
                  currentTab === "Withdrawal status (Momo)"
                    ? styles.tabActive
                    : styles.tab
                }
                onClick={() => setCurrentTab("Withdrawal status (Momo)")}
              >
                {currentTab === "Withdrawal status (Momo)" && (
                  <div className={styles.indicator} />
                )}{" "}
                Withdrawal status (Momo)
              </div>
              <div
                className={
                  currentTab === "Sending status (Crypto)"
                    ? styles.tabActive
                    : styles.tab
                }
                onClick={() => setCurrentTab("Sending status (Crypto)")}
              >
                {currentTab === "Sending status (Crypto)" && (
                  <div className={styles.indicator} />
                )}{" "}
                Sending status (Crypto)
              </div>
              <div
                className={
                  currentTab === "Utilities" ? styles.tabActive : styles.tab
                }
                onClick={() => setCurrentTab("Utilities")}
              >
                {currentTab === "Utilities" && (
                  <div className={styles.indicator} />
                )}{" "}
                Utilities
              </div>
              <div
                className={
                  currentTab === "Swap" ? styles.tabActive : styles.tab
                }
                onClick={() => setCurrentTab("Swap")}
              >
                {currentTab === "Swap" && <div className={styles.indicator} />}{" "}
                Swap
              </div>
              <div
                className={
                  currentTab === "Limits" ? styles.tabActive : styles.tab
                }
                onClick={() => setCurrentTab("Limits")}
              >
                {currentTab === "Limits" && (
                  <div className={styles.indicator} />
                )}{" "}
                Limits
              </div>
              <div
                className={
                  currentTab === "Tron" ? styles.tabActive : styles.tab
                }
                onClick={() => setCurrentTab("Tron")}
              >
                {currentTab === "Tron" && <div className={styles.indicator} />}{" "}
                Tron
              </div>
              <div
                className={
                  currentTab === "Ethereum/EVM" ? styles.tabActive : styles.tab
                }
                onClick={() => setCurrentTab("Ethereum/EVM")}
              >
                {currentTab === "Ethereum/EVM" && (
                  <div className={styles.indicator} />
                )}{" "}
                Ethereum/EVM
              </div>
              <div
                className={
                  currentTab === "Support" ? styles.tabActive : styles.tab
                }
                onClick={() => setCurrentTab("Support")}
              >
                {currentTab === "Support" && (
                  <div className={styles.indicator} />
                )}{" "}
                Support
              </div>
              <div
                className={
                  currentTab === "Maintenance" ? styles.tabActive : styles.tab
                }
                onClick={() => setCurrentTab("Maintenance")}
              >
                {currentTab === "Maintenance" && (
                  <div className={styles.indicator} />
                )}{" "}
                Maintenance
              </div>
              <div
                className={
                  currentTab === "More settings" ? styles.tabActive : styles.tab
                }
                onClick={() => setCurrentTab("More settings")}
              >
                {currentTab === "More settings" && (
                  <div className={styles.indicator} />
                )}{" "}
                More settings
              </div>
            </div>
            <div className={styles.siteSettingsMain}>
              {currentTab === "Fees" && (
                <>
                  <div className={styles.ratesContainer}>
                    <div className={styles.ratesInputContainer}>
                      <p>Percentage fee for internal transfers</p>
                      <Input
                        leftIcon={<div className={styles.leftIcon}>$</div>}
                        value={getSettingsValue("internalBanFeePercentage")}
                        disabled
                        onChange={(e) =>
                          changeSettingsValue(
                            "internalBanFeePercentage",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className={styles.ratesInputContainer}>
                      <p>Percentage fee for external transfers</p>
                      <Input
                        leftIcon={<div className={styles.leftIcon}>$</div>}
                        value={getSettingsValue("externalFeePercentage")}
                        disabled
                        onChange={(e) =>
                          changeSettingsValue(
                            "externalFeePercentage",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.ratesContainer}>
                    <div className={styles.ratesInputContainer}>
                      <p>Percentage fee for withdrawals</p>
                      <Input
                        leftIcon={<div className={styles.leftIcon}>$</div>}
                        value={getSettingsValue("withdrawalFeePercentage")}
                        disabled
                        onChange={(e) =>
                          changeSettingsValue(
                            "withdrawalFeePercentage",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                </>
              )}
              {currentTab === "Payment methods" && (
                <>
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Momo payment number for deposits
                      </p>
                      <p className={styles.keySubText}>
                        This is the mobile number customers pay for manual topup
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue("momopayid")}
                        disabled
                        onChange={(e) =>
                          changeSettingsValue("momopayid", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <Divider />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Name on momo payment number for deposits
                      </p>
                      <p className={styles.keySubText}>
                        This is the name on the mobile money customers pay for
                        manual topup{" "}
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue("momopayname")}
                        onChange={(e) =>
                          changeSettingsValue("momopayname", e.target.value)
                        }
                        onUpdate={() => updateFields("momopayname")}
                        loading={loadingKey === "momopayname"}
                      />
                    </div>
                  </div>
                  <Divider />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        ChipperCash Tag for deposits
                      </p>
                      <p className={styles.keySubText}>
                        This is the chippercash tag customers pay for manual
                        topup
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue("chippertag")}
                        disabled
                        onChange={(e) =>
                          changeSettingsValue("chippertag", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <Divider />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Name on chippercash tag for deposits
                      </p>
                      <p className={styles.keySubText}>
                        This is the name on the chippercash tag customers pay
                        for manual topup{" "}
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue("chipperName")}
                        disabled
                        onChange={(e) =>
                          changeSettingsValue("chipperName", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </>
              )}
              {currentTab === "SMS" && (
                <>
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        List of sender IDs for SMS
                      </p>
                      <p className={styles.keySubText}>
                        Any one of the IDs is selected when SMS needs to be
                        sent. each ID should be separated by a comma, no spaces{" "}
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue("SMS_SOURCE")}
                        onChange={(e) =>
                          changeSettingsValue("SMS_SOURCE", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <Divider />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>Gateway for SMS</p>
                      <p className={styles.keySubText}>
                        This shows the gateway responsible for delivering SMS.
                        Options are MNOTIFY and WIGAL
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue("SMS_GATEWAY")}
                        onChange={(e) =>
                          changeSettingsValue("SMS_GATEWAY", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </>
              )}
              {currentTab === "Confirmations" && (
                <>
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Number of confirmations required for -{" "}
                        <span className={styles.blueText}>Bitcoin</span>
                      </p>
                      <p className={styles.keySubText}>
                        number of confirmation required for a transaction to be
                        confirmed for bitcoin
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue("BTC_CONFIRMATION")}
                        onChange={(e) =>
                          changeSettingsValue(
                            "BTC_CONFIRMATION",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Number of confirmations required for -{" "}
                        <span className={styles.blueText}>Bitcoin cash</span>
                      </p>
                      <p className={styles.keySubText}>
                        number of confirmation required for a transaction to be
                        confirmed for bitcoin cash
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue("BCH_CONFIRMATION")}
                        onChange={(e) =>
                          changeSettingsValue(
                            "BCH_CONFIRMATION",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Number of confirmations required for -{" "}
                        <span className={styles.blueText}>Litecoin</span>
                      </p>
                      <p className={styles.keySubText}>
                        number of confirmation required for a transaction to be
                        confirmed for Litecoin
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue("LTC_CONFIRMATION")}
                        onChange={(e) =>
                          changeSettingsValue(
                            "LTC_CONFIRMATION",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Number of confirmations required for -{" "}
                        <span className={styles.blueText}>Dogecoin</span>
                      </p>
                      <p className={styles.keySubText}>
                        number of confirmation required for a transaction to be
                        confirmed for Dogecoin
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue("DOGE_CONFIRMATION")}
                        onChange={(e) =>
                          changeSettingsValue(
                            "DOGE_CONFIRMATION",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Number of confirmations required for -{" "}
                        <span className={styles.blueText}>Tron</span>
                      </p>
                      <p className={styles.keySubText}>
                        number of confirmation required for a transaction to be
                        confirmed for Tron
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue("TRON_CONFIRMATION")}
                        onChange={(e) =>
                          changeSettingsValue(
                            "TRON_CONFIRMATION",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.spacer} />
                </>
              )}
              {currentTab === "Network fees/Types" && (
                <>
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Network Fee Type used for -{" "}
                        <span className={styles.blueText}>Bitcoin</span>
                      </p>
                      <p className={styles.keySubText}>
                        network block estimation value for bitcoin
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue("BSC_SELLING_NETWORK_FEE_TYPE")}
                        disabled
                        onChange={(e) =>
                          changeSettingsValue(
                            "BSC_SELLING_NETWORK_FEE_TYPE",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Network Fee Type used for -{" "}
                        <span className={styles.blueText}>Bitcoin cash</span>
                      </p>
                      <p className={styles.keySubText}>
                        network block estimation value for bitcoin cash
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue("BCH_NETWORK_FEE_TYPE")}
                        disabled
                        onChange={(e) =>
                          changeSettingsValue(
                            "BCH_NETWORK_FEE_TYPE",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Network Fee Type used for -{" "}
                        <span className={styles.blueText}>Litecoin</span>
                      </p>
                      <p className={styles.keySubText}>
                        network block estimation value for Litecoin
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue("LTC_NETWORK_FEE_TYPE")}
                        disabled
                        onChange={(e) =>
                          changeSettingsValue(
                            "LTC_NETWORK_FEE_TYPE",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Network Fee Type used for -{" "}
                        <span className={styles.blueText}>Dogecoin</span>
                      </p>
                      <p className={styles.keySubText}>
                        network block estimation value for Dogecoin
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue("DOGE_NETWORK_FEE_TYPE")}
                        disabled
                        onChange={(e) =>
                          changeSettingsValue(
                            "DOGE_NETWORK_FEE_TYPE",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <Divider />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        NETWORK FEE PRIORITY TYPE
                      </p>
                      <p className={styles.keySubText}>
                        Transfer mode determines the priority of the network fee
                        for a network. Options are CONSERVATIVE and ECONOMICAL
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue("KOLLET_TRANSFER_MODE")}
                        onChange={(e) =>
                          changeSettingsValue(
                            "KOLLET_TRANSFER_MODE",
                            e.target.value
                          )
                        }
                        onUpdate={() => updateFields("KOLLET_TRANSFER_MODE")}
                        loading={loadingKey === "KOLLET_TRANSFER_MODE"}
                      />
                    </div>
                  </div>
                  <Divider />
                  <div style={{ marginBlock: 30 }} className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        FIXED NETWORK FEE - DOGECOIN -{" "}
                        {getSettingsValue("DOGE_FIXED_FEE") ? (
                          <span className={styles.greenText}>Enabled</span>
                        ) : (
                          <span className={styles.redText}>Disabled</span>
                        )}
                      </p>
                      <p className={styles.keySubText}>
                        Enable fixed network fee for dogecoin
                      </p>
                    </div>
                    <div className={styles.value}>
                      <div className={styles.switchContainer}>
                        <Toggle
                          defaultValue={getSettingsValue("DOGE_FIXED_FEE")}
                          onToggle={(value) => {
                            updateFields("DOGE_FIXED_FEE", value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        FIXED DOGECOIN NETWORK FEE
                      </p>
                      <p className={styles.keySubText}>
                        Fixed network fee set for dogecoin for sending dogecoin
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue("DOGE_FIXED_SEND_FEE_USD")}
                        disabled
                        onChange={(e) =>
                          changeSettingsValue(
                            "DOGE_FIXED_SEND_FEE_USD",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <Divider />
                  <div style={{ marginBlock: 30 }} className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        FIXED NETWORK FEE - LITECOIN -
                        {getSettingsValue("LTC_FIXED_FEE") ? (
                          <span className={styles.greenText}>Enabled</span>
                        ) : (
                          <span className={styles.redText}>Disabled</span>
                        )}
                      </p>
                      <p className={styles.keySubText}>
                        Enable fixed network fee for Litecoin
                      </p>
                    </div>
                    <div className={styles.value}>
                      <div className={styles.switchContainer}>
                        <Toggle
                          defaultValue={getSettingsValue("LTC_FIXED_FEE")}
                          onToggle={(value) =>
                            updateFields("LTC_FIXED_FEE", value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        FIXED LITECOIN CASH NETWORK FEE
                      </p>
                      <p className={styles.keySubText}>
                        Fixed network fee set for Litecoin for sending Litecoin
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue("LTC_FIXED_SEND_FEE_USD")}
                        disabled
                        onChange={(e) =>
                          changeSettingsValue(
                            "LTC_FIXED_SEND_FEE_USD",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <Divider />
                  <div style={{ marginBlock: 30 }} className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        FIXED NETWORK FEE - BITCOIN CASH -
                        {getSettingsValue("BCH_FIXED_FEE") ? (
                          <span className={styles.greenText}>Enabled</span>
                        ) : (
                          <span className={styles.redText}>Disabled</span>
                        )}
                      </p>
                      <p className={styles.keySubText}>
                        Enable fixed network fee for Bitcoin cash
                      </p>
                    </div>
                    <div className={styles.value}>
                      <div className={styles.switchContainer}>
                        <Toggle
                          defaultValue={getSettingsValue("BCH_FIXED_FEE")}
                          onToggle={(value) =>
                            updateFields("BCH_FIXED_FEE", value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        FIXED BITCOIN CASH NETWORK FEE
                      </p>
                      <p className={styles.keySubText}>
                        Fixed network fee set for Bitcoin cash for sending
                        Bitcoin cash
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue("BCH_FIXED_SEND_FEE_USD")}
                        disabled
                        onChange={(e) =>
                          changeSettingsValue(
                            "BCH_FIXED_SEND_FEE_USD",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                </>
              )}
              {currentTab === "System status" && (
                <>
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Automated system deposits for mobile money -{" "}
                        {getSettingsValue("DEPOSIT_ENABLED") ? (
                          <span className={styles.greenText}>Enabled</span>
                        ) : (
                          <span className={styles.redText}>Disabled</span>
                        )}
                      </p>
                      <p className={styles.keySubText}>
                        This option allows for automated Momo prompt for Account
                        topups with Paybox
                      </p>
                    </div>
                    <div className={styles.value}>
                      <div className={styles.switchContainer}>
                        <Toggle
                          defaultValue={getSettingsValue("DEPOSIT_ENABLED")}
                          onToggle={(value) =>
                            updateFields("DEPOSIT_ENABLED", value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        System withdrawal status for mobile money -{" "}
                        {getSettingsValue("WITHDRAWAL_ENABLED") ? (
                          <span className={styles.greenText}>Enabled</span>
                        ) : (
                          <span className={styles.redText}>Disabled</span>
                        )}
                      </p>
                      <p className={styles.keySubText}>
                        Whether withdrawals for all cryptocurrency should be
                        disabled. used during maintenance - MASTER (Overrides
                        all withdrawal settings)
                      </p>
                    </div>
                    <div className={styles.value}>
                      <div className={styles.switchContainer}>
                        <Toggle
                          defaultValue={getSettingsValue("WITHDRAWAL_ENABLED")}
                          onToggle={(value) =>
                            updateFields("WITHDRAWAL_ENABLED", value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        System sending status for all cryptos -{" "}
                        {getSettingsValue("SEND_ENABLED") ? (
                          <span className={styles.greenText}>Enabled</span>
                        ) : (
                          <span className={styles.redText}>Disabled</span>
                        )}
                      </p>
                      <p className={styles.keySubText}>
                        System SENDING status for all cryptos
                      </p>
                    </div>
                    <div className={styles.value}>
                      <div className={styles.switchContainer}>
                        <Toggle
                          defaultValue={getSettingsValue("SEND_ENABLED")}
                          onToggle={(value) =>
                            updateFields("SEND_ENABLED", value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
              {currentTab === "Manual Momo Deposit" && (
                <>
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Manual Momo deposits for all networks -{" "}
                        {getSettingsValue("DEPOSIT_MANUAL_ENABLED") ? (
                          <span className={styles.greenText}>Enabled</span>
                        ) : (
                          <span className={styles.redText}>Disabled</span>
                        )}
                      </p>
                      <p className={styles.keySubText}>
                        This option allows for manual deposits for Account
                        topups with Android HARDWARE - MASTER (Overrides all
                        Crypto momo manual topup settings)
                      </p>
                    </div>
                    <div className={styles.value}>
                      <div className={styles.switchContainer}>
                        <Toggle
                          defaultValue={getSettingsValue(
                            "DEPOSIT_MANUAL_ENABLED"
                          )}
                          onToggle={(value) =>
                            updateFields("DEPOSIT_MANUAL_ENABLED", value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Manual Momo deposits for all Vodafone -{" "}
                        {getSettingsValue("DEPOSIT_VODAFONE_MANUAL_ENABLED") ? (
                          <span className={styles.greenText}>Enabled</span>
                        ) : (
                          <span className={styles.redText}>Disabled</span>
                        )}
                      </p>
                      <p className={styles.keySubText}>
                        Whether manual topups for Vodafone should be disabled
                      </p>
                    </div>
                    <div className={styles.value}>
                      <div className={styles.switchContainer}>
                        <Toggle
                          defaultValue={getSettingsValue(
                            "DEPOSIT_VODAFONE_MANUAL_ENABLED"
                          )}
                          onToggle={(value) =>
                            updateFields(
                              "DEPOSIT_VODAFONE_MANUAL_ENABLED",
                              value
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Manual Momo deposits for AirtelTigo -{" "}
                        {getSettingsValue(
                          "DEPOSIT_AIRTELTIGO_MANUAL_ENABLED"
                        ) ? (
                          <span className={styles.greenText}>Enabled</span>
                        ) : (
                          <span className={styles.redText}>Disabled</span>
                        )}
                      </p>
                      <p className={styles.keySubText}>
                        Whether manual topups for AirtelTigo should be disabled
                      </p>
                    </div>
                    <div className={styles.value}>
                      <div className={styles.switchContainer}>
                        <Toggle
                          defaultValue={getSettingsValue(
                            "DEPOSIT_AIRTELTIGO_MANUAL_ENABLED"
                          )}
                          onToggle={(value) =>
                            updateFields(
                              "DEPOSIT_AIRTELTIGO_MANUAL_ENABLED",
                              value
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Manual Momo deposits for MTN -{" "}
                        {getSettingsValue("DEPOSIT_MTN_MANUAL_ENABLED") ? (
                          <span className={styles.greenText}>Enabled</span>
                        ) : (
                          <span className={styles.redText}>Disabled</span>
                        )}
                      </p>
                      <p className={styles.keySubText}>
                        Whether manual topups for MTN should be disabled
                      </p>
                    </div>
                    <div className={styles.value}>
                      <div className={styles.switchContainer}>
                        <Toggle
                          defaultValue={getSettingsValue(
                            "DEPOSIT_MTN_MANUAL_ENABLED"
                          )}
                          onToggle={(value) =>
                            updateFields("DEPOSIT_MTN_MANUAL_ENABLED", value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
              {currentTab === "Deposit status (Momo)" && (
                <>
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Momo deposits for all networks -{" "}
                        {getSettingsValue("MOMO_DEPOSIT_FOR_ALL_NETWORKS") ? (
                          <span className={styles.greenText}>Enabled</span>
                        ) : (
                          <span className={styles.redText}>Disabled</span>
                        )}
                      </p>
                      <p className={styles.keySubText}>
                        Whether withdrawals for bitcoin should be disabled. Used
                        only for bitcoin deposit maintenance
                      </p>
                    </div>
                    <div className={styles.value}>
                      <div className={styles.switchContainer}>
                        <Toggle
                        // defaultValue={getSettingsValue(
                        //   "DEPOSIT_MTN_MANUAL_ENABLED"
                        // )}
                        // onToggle={(value) =>
                        //   changeSettingsValue(
                        //     "DEPOSIT_MTN_MANUAL_ENABLED",
                        //     value
                        //   )
                        // }
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Momo deposit status for Bitcoin -{" "}
                        {getSettingsValue("BTC_DEPOSIT_ENABLED") ? (
                          <span className={styles.greenText}>Enabled</span>
                        ) : (
                          <span className={styles.redText}>Disabled</span>
                        )}
                      </p>
                      <p className={styles.keySubText}>
                        Whether withdrawals for bitcoin should be disabled. Used
                        only for bitcoin deposit maintenance
                      </p>
                    </div>
                    <div className={styles.value}>
                      <div className={styles.switchContainer}>
                        <Toggle
                          defaultValue={getSettingsValue("BTC_DEPOSIT_ENABLED")}
                          onToggle={(value) =>
                            updateFields("BTC_DEPOSIT_ENABLED", value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Momo deposit status for Bitcoin cash -{" "}
                        {getSettingsValue("BCH_DEPOSIT_ENABLED") ? (
                          <span className={styles.greenText}>Enabled</span>
                        ) : (
                          <span className={styles.redText}>Disabled</span>
                        )}
                      </p>
                      <p className={styles.keySubText}>
                        Whether withdrawals for bitcoin should be disabled. Used
                        only for bitcoin deposit maintenance
                      </p>
                    </div>
                    <div className={styles.value}>
                      <div className={styles.switchContainer}>
                        <Toggle
                          defaultValue={getSettingsValue("BCH_DEPOSIT_ENABLED")}
                          onToggle={(value) =>
                            updateFields("BCH_DEPOSIT_ENABLED", value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Momo deposit status for Dogecoin -{" "}
                        {getSettingsValue("DOGE_DEPOSIT_ENABLED") ? (
                          <span className={styles.greenText}>Enabled</span>
                        ) : (
                          <span className={styles.redText}>Disabled</span>
                        )}
                      </p>
                      <p className={styles.keySubText}>
                        Whether withdrawals for Dogecoin should be disabled.
                        Used only for Dogecoin deposit maintenance
                      </p>
                    </div>
                    <div className={styles.value}>
                      <div className={styles.switchContainer}>
                        <Toggle
                          defaultValue={getSettingsValue(
                            "DOGE_DEPOSIT_ENABLED"
                          )}
                          onToggle={(value) =>
                            updateFields("DOGE_DEPOSIT_ENABLED", value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Momo deposit status for Litecoin -{" "}
                        {getSettingsValue("LTC_DEPOSIT_ENABLED") ? (
                          <span className={styles.greenText}>Enabled</span>
                        ) : (
                          <span className={styles.redText}>Disabled</span>
                        )}
                      </p>
                      <p className={styles.keySubText}>
                        Whether withdrawals for Litecoin should be disabled.
                        Used only for Litecoin deposit maintenance
                      </p>
                    </div>
                    <div className={styles.value}>
                      <div className={styles.switchContainer}>
                        <Toggle
                          defaultValue={getSettingsValue("LTC_DEPOSIT_ENABLED")}
                          onToggle={(value) =>
                            updateFields("LTC_DEPOSIT_ENABLED", value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Momo deposit status for TRX - TRON -{" "}
                        {getSettingsValue("TRX_DEPOSIT_ENABLED") ? (
                          <span className={styles.greenText}>Enabled</span>
                        ) : (
                          <span className={styles.redText}>Disabled</span>
                        )}
                      </p>
                      <p className={styles.keySubText}>
                        Whether deposits for only TRX - TRON should be disabled.
                        Used during TRX - TRON maintenance
                      </p>
                    </div>
                    <div className={styles.value}>
                      <div className={styles.switchContainer}>
                        <Toggle
                          defaultValue={getSettingsValue("TRX_DEPOSIT_ENABLED")}
                          onToggle={(value) =>
                            updateFields("TRX_DEPOSIT_ENABLED", value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Momo deposit status for USDT - TRON -{" "}
                        {getSettingsValue("USDT_DEPOSIT_ENABLED") ? (
                          <span className={styles.greenText}>Enabled</span>
                        ) : (
                          <span className={styles.redText}>Disabled</span>
                        )}
                      </p>
                      <p className={styles.keySubText}>
                        Whether deposits for only USDT - TRON should be
                        disabled. Used during USDT - TRON maintenance
                      </p>
                    </div>
                    <div className={styles.value}>
                      <div className={styles.switchContainer}>
                        <Toggle
                          defaultValue={getSettingsValue(
                            "USDT_DEPOSIT_ENABLED"
                          )}
                          onToggle={(value) =>
                            updateFields("USDT_DEPOSIT_ENABLED", value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
              {currentTab === "Withdrawal status (Momo)" && (
                <>
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Momo withdrawal for all networks -{" "}
                        {getSettingsValue(
                          "MOMO_WITHDRAWAL_FOR_ALL_NETWORKS"
                        ) ? (
                          <span className={styles.greenText}>Enabled</span>
                        ) : (
                          <span className={styles.redText}>Disabled</span>
                        )}
                      </p>
                      <p className={styles.keySubText}>
                        Whether withdrawals for bitcoin should be disabled. Used
                        only for bitcoin withdrawal maintenance
                      </p>
                    </div>
                    <div className={styles.value}>
                      <div className={styles.switchContainer}>
                        <Toggle />
                      </div>
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Momo withdrawal status for Bitcoin -{" "}
                        {getSettingsValue("BTC_WITHDRAWAL_ENABLED") ? (
                          <span className={styles.greenText}>Enabled</span>
                        ) : (
                          <span className={styles.redText}>Disabled</span>
                        )}
                      </p>
                      <p className={styles.keySubText}>
                        Whether withdrawals for bitcoin should be disabled. Used
                        only for bitcoin withdrawal maintenance
                      </p>
                    </div>
                    <div className={styles.value}>
                      <div className={styles.switchContainer}>
                        <Toggle
                          defaultValue={getSettingsValue(
                            "BTC_WITHDRAWAL_ENABLED"
                          )}
                          onToggle={(value) =>
                            updateFields("BTC_WITHDRAWAL_ENABLED", value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Momo withdrawal status for Bitcoin cash -{" "}
                        {getSettingsValue("BCH_WITHDRAWAL_ENABLED") ? (
                          <span className={styles.greenText}>Enabled</span>
                        ) : (
                          <span className={styles.redText}>Disabled</span>
                        )}
                      </p>
                      <p className={styles.keySubText}>
                        Whether withdrawals for bitcoin should be disabled. Used
                        only for bitcoin withdrawal maintenance
                      </p>
                    </div>
                    <div className={styles.value}>
                      <div className={styles.switchContainer}>
                        <Toggle
                          defaultValue={getSettingsValue(
                            "BCH_WITHDRAWAL_ENABLED"
                          )}
                          onToggle={(value) =>
                            updateFields("BCH_WITHDRAWAL_ENABLED", value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Momo withdrawal status for Dogecoin -{" "}
                        {getSettingsValue("DOGE_WITHDRAWAL_ENABLED") ? (
                          <span className={styles.greenText}>Enabled</span>
                        ) : (
                          <span className={styles.redText}>Disabled</span>
                        )}
                      </p>
                      <p className={styles.keySubText}>
                        Whether withdrawals for Dogecoin should be disabled.
                        Used only for Dogecoin withdrawal maintenance
                      </p>
                    </div>
                    <div className={styles.value}>
                      <div className={styles.switchContainer}>
                        <Toggle
                          defaultValue={getSettingsValue(
                            "DOGE_WITHDRAWAL_ENABLED"
                          )}
                          onToggle={(value) =>
                            updateFields("DOGE_WITHDRAWAL_ENABLED", value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Momo withdrawal status for Litecoin -{" "}
                        {getSettingsValue("LTC_WITHDRAWAL_ENABLED") ? (
                          <span className={styles.greenText}>Enabled</span>
                        ) : (
                          <span className={styles.redText}>Disabled</span>
                        )}
                      </p>
                      <p className={styles.keySubText}>
                        Whether withdrawals for Litecoin should be disabled.
                        Used only for Litecoin withdrawal maintenance
                      </p>
                    </div>
                    <div className={styles.value}>
                      <div className={styles.switchContainer}>
                        <Toggle
                          defaultValue={getSettingsValue(
                            "LTC_WITHDRAWAL_ENABLED"
                          )}
                          onToggle={(value) =>
                            updateFields("LTC_WITHDRAWAL_ENABLED", value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Momo withdrawal status for TRX -{" "}
                        {getSettingsValue("TRX_WITHDRAWAL_ENABLED") ? (
                          <span className={styles.greenText}>Enabled</span>
                        ) : (
                          <span className={styles.redText}>Disabled</span>
                        )}
                      </p>
                      <p className={styles.keySubText}>
                        Whether withdrawal for only TRX - TRON should be
                        disabled. Used during TRX - TRON maintenance
                      </p>
                    </div>
                    <div className={styles.value}>
                      <div className={styles.switchContainer}>
                        <Toggle
                          defaultValue={getSettingsValue(
                            "TRX_WITHDRAWAL_ENABLED"
                          )}
                          onToggle={(value) =>
                            updateFields("TRX_WITHDRAWAL_ENABLED", value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Momo withdrawal status for USDT -{" "}
                        {getSettingsValue("USDT_WITHDRAWAL_ENABLED") ? (
                          <span className={styles.greenText}>Enabled</span>
                        ) : (
                          <span className={styles.redText}>Disabled</span>
                        )}
                      </p>
                      <p className={styles.keySubText}>
                        Whether withdrawal for only USDT - TRON should be
                        disabled. Used during USDT - TRON maintenance
                      </p>
                    </div>
                    <div className={styles.value}>
                      <div className={styles.switchContainer}>
                        <Toggle
                          defaultValue={getSettingsValue(
                            "USDT_WITHDRAWAL_ENABLED"
                          )}
                          onToggle={(value) =>
                            updateFields("USDT_WITHDRAWAL_ENABLED", value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
              {currentTab === "Limits" && (
                <>
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Daily buying limit in USD
                      </p>
                      <p className={styles.keySubText}>
                        Daily buying limit quoted in USD - Master
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        onUpdate={() => updateFields("BUY_LIMIT_USD")}
                        loading={loadingKey === "BUY_LIMIT_USD"}
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue("BUY_LIMIT_USD")}
                        onChange={(e) =>
                          changeSettingsValue("BUY_LIMIT_USD", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>Daily sell limit in USD</p>
                      <p className={styles.keySubText}>
                        Daily selling limit quoted in USD - Master
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        onUpdate={() => updateFields("SELL_LIMIT_USD")}
                        loading={loadingKey === "SELL_LIMIT_USD"}
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue("SELL_LIMIT_USD")}
                        onChange={(e) =>
                          changeSettingsValue("SELL_LIMIT_USD", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Daily buying limit in USD for USDT - Tron
                      </p>
                      <p className={styles.keySubText}>
                        Daily buying limit quoted in USD - Master
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        onUpdate={() => updateFields("USDT_BUY_LIMIT_USD")}
                        loading={loadingKey === "USDT_BUY_LIMIT_USD"}
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue("USDT_BUY_LIMIT_USD")}
                        onChange={(e) =>
                          changeSettingsValue(
                            "USDT_BUY_LIMIT_USD",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Daily selling limit in USD for USDT - Tron
                      </p>
                      <p className={styles.keySubText}>
                        Daily selling limit quoted in USD - Master
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        onUpdate={() => updateFields("SELL_LIMIT_USD")}
                        loading={loadingKey === "SELL_LIMIT_USD"}
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue("SELL_LIMIT_USD")}
                        onChange={(e) =>
                          changeSettingsValue("SELL_LIMIT_USD", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Daily buying limit in USD
                      </p>
                      <p className={styles.keySubText}>
                        Daily buying limit quoted in USD - Master
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        onUpdate={() => updateFields("BUY_LIMIT_USD")}
                        loading={loadingKey === "BUY_LIMIT_USD"}
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue("BUY_LIMIT_USD")}
                        onChange={(e) =>
                          changeSettingsValue("BUY_LIMIT_USD", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.spacer} />
                </>
              )}
              {currentTab === "Tron" && (
                <>
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>Tron central address</p>
                      <p className={styles.keySubText}>
                        Central platform TRON address. Used for sending and
                        receiving
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue("CENTRAL_TRON_ADDRESS")}
                        disabled
                        onChange={(e) =>
                          changeSettingsValue(
                            "CENTRAL_TRON_ADDRESS",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        TRON confirmations required
                      </p>
                      <p className={styles.keySubText}>
                        Number of confirmations required for a transaction to be
                        confirmed for TRON (TRX, USDT)
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue("TRON_CONFIRMATION")}
                        disabled
                        onChange={(e) =>
                          changeSettingsValue(
                            "TRON_CONFIRMATION",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <Divider />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Daily buying limit in USD for USDT - TRON
                      </p>
                      <p className={styles.keySubText}>
                        Daily buying limit for USDT - TRON. Reduces User’s
                        buying limit for the day
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue("BUY_LIMIT_USD")}
                        disabled
                        onChange={(e) =>
                          changeSettingsValue("BUY_LIMIT_USD", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Daily selling limit in USD for USDT - TRON
                      </p>
                      <p className={styles.keySubText}>
                        Daily selling limit for USDT - TRON. Reduces User’s
                        selling limit for the day
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue("USDT_BUY_LIMIT_USD")}
                        disabled
                        onChange={(e) =>
                          changeSettingsValue(
                            "USDT_BUY_LIMIT_USD",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Daily buying limit in USD for TRX
                      </p>
                      <p className={styles.keySubText}>
                        Daily buying limit for USDT - TRON. Reduces User’s
                        buying limit for the day
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue("USDT_SELL_LIMIT_USD")}
                        disabled
                        onChange={(e) =>
                          changeSettingsValue(
                            "USDT_SELL_LIMIT_USD",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Daily selling limit in USD for TRX
                      </p>
                      <p className={styles.keySubText}>
                        Daily selling limit for USDT - TRON. Reduces User’s
                        selling limit for the day
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue("TRX_SELL_LIMIT_USD")}
                        disabled
                        onChange={(e) =>
                          changeSettingsValue(
                            "TRX_SELL_LIMIT_USD",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <Divider />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Sending crypto status for TRX
                      </p>
                      <p className={styles.keySubText}>
                        Whether sending for only TRX. TRON should be disabled.
                        Used during TRX - TRON Maintainance
                      </p>
                    </div>
                    <div className={styles.value}>
                      <div className={styles.switchContainer}>
                        <Toggle
                          defaultValue={getSettingsValue("TRX_SEND_ENABLED")}
                          onToggle={(value) =>
                            updateFields("TRX_SEND_ENABLED", value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Momo withdrawal status for TRX
                      </p>
                      <p className={styles.keySubText}>
                        Whether withdrawal for only TRX. TRON should be
                        disabled. Used during TRX - TRON Maintainance
                      </p>
                    </div>
                    <div className={styles.value}>
                      <div className={styles.switchContainer}>
                        <Toggle
                          defaultValue={getSettingsValue(
                            "TRX_WITHDRAWAL_ENABLED"
                          )}
                          onToggle={(value) =>
                            updateFields("TRX_WITHDRAWAL_ENABLED", value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <Divider />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Sending crypto status for USDT
                      </p>
                      <p className={styles.keySubText}>
                        Whether sending for only USDT. TRON should be disabled.
                        Used during USDT - TRON Maintenance
                      </p>
                    </div>
                    <div className={styles.value}>
                      <div className={styles.switchContainer}>
                        <Toggle
                          defaultValue={getSettingsValue("USDT_SEND_ENABLED")}
                          onToggle={(value) =>
                            updateFields("USDT_SEND_ENABLED", value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Momo withdrawal status for USDT
                      </p>
                      <p className={styles.keySubText}>
                        Whether withdrawal for only USDT. TRON should be
                        disabled. Used during USDT - TRON Maintenance
                      </p>
                    </div>
                    <div className={styles.value}>
                      <div className={styles.switchContainer}>
                        <Toggle
                          defaultValue={getSettingsValue(
                            "USDT_WITHDRAWAL_ENABLED"
                          )}
                          onToggle={(value) =>
                            updateFields("USDT_WITHDRAWAL_ENABLED", value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <Divider />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Momo deposit status for TRX - TRON
                      </p>
                      <p className={styles.keySubText}>
                        Whether deposits for only TRX. TRON should be disabled.
                        Used during TRX - TRON Maintenance
                      </p>
                    </div>
                    <div className={styles.value}>
                      <div className={styles.switchContainer}>
                        <Toggle
                          defaultValue={getSettingsValue("TRX_DEPOSIT_ENABLED")}
                          onToggle={(value) =>
                            updateFields("TRX_DEPOSIT_ENABLED", value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Momo deposit status for USDT - TRON
                      </p>
                      <p className={styles.keySubText}>
                        Whether deposits for only USDT. TRON should be disabled.
                        Used during USDT - TRON Maintenance
                      </p>
                    </div>
                    <div className={styles.value}>
                      <div className={styles.switchContainer}>
                        <Toggle
                          defaultValue={getSettingsValue(
                            "USDT_DEPOSIT_ENABLED"
                          )}
                          onToggle={(value) =>
                            updateFields("USDT_DEPOSIT_ENABLED", value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <Divider />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Minimum sending TRX Amount
                      </p>
                      <p className={styles.keySubText}>
                        Minimum TRX Amount users can send
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        onUpdate={() => updateFields("MINIMUM_TRX_SEND")}
                        loading={loadingKey === "MINIMUM_TRX_SEND"}
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue("MINIMUM_TRX_SEND")}
                        onChange={(e) =>
                          changeSettingsValue(
                            "MINIMUM_TRX_SEND",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>TRX Service fee - Tron</p>
                      <p className={styles.keySubText}>
                        Amount in TRX charged as service fee for sending TRX
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        onUpdate={() =>
                          updateFields("NATIVE_TRX_FEE_TRANSFER_PLATFORM")
                        }
                        loading={
                          loadingKey === "NATIVE_TRX_FEE_TRANSFER_PLATFORM"
                        }
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue(
                          "NATIVE_TRX_FEE_TRANSFER_PLATFORM"
                        )}
                        onChange={(e) =>
                          changeSettingsValue(
                            "NATIVE_TRX_FEE_TRANSFER_PLATFORM",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Minimum sending USDT Amount
                      </p>
                      <p className={styles.keySubText}>
                        Minimum USDT Amount users can send
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        onUpdate={() => updateFields("MINIMUM_USDT_SEND")}
                        loading={loadingKey === "MINIMUM_USDT_SEND"}
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue("MINIMUM_USDT_SEND")}
                        onChange={(e) =>
                          changeSettingsValue(
                            "MINIMUM_USDT_SEND",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        TRX Network fees for USDT Transfers
                      </p>
                      <p className={styles.keySubText}>
                        Minimum network fee in TRX user should have in TRX
                        balance when sending USDT
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue("USDT_TRX_FEE_TRANSFER")}
                        disabled
                        onChange={(e) =>
                          changeSettingsValue(
                            "USDT_TRX_FEE_TRANSFER",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        TRX service fee in USD for USDT - TRON
                      </p>
                      <p className={styles.keySubText}>
                        USD equivalent of TRX charged as service fee for sending
                        USDT. Adds to the minimum network fee in TRX needed
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue(
                          "USDT_TRX_FEE_TRANSFER_PLATFORM_USD"
                        )}
                        disabled
                        onChange={(e) =>
                          changeSettingsValue(
                            "USDT_TRX_FEE_TRANSFER_PLATFORM_USD",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>TRX fee for sending TRX</p>
                      <p className={styles.keySubText}>
                        Minimum network fee in TRX the User should have in TRX
                        balance when sending TRX
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue("NATIVE_TRX_FEE_TRANSFER")}
                        disabled
                        onChange={(e) =>
                          changeSettingsValue(
                            "NATIVE_TRX_FEE_TRANSFER",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>TRX fee for selling USDT</p>
                      <p className={styles.keySubText}>
                        Minimum network fee in TRX the User should have in TRX
                        balance when selling TRX
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue("USDT_TRX_FEE_TRANSFER_SELL")}
                        disabled
                        onChange={(e) =>
                          changeSettingsValue(
                            "USDT_TRX_FEE_TRANSFER_SELL",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <Divider />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        DON_T_PROCESS_TRON_DEPOSITS -{" "}
                        {getSettingsValue(
                          "DONT_PROCESS_INCOMING_TRON_DEPOSITS"
                        ) ? (
                          <span className={styles.greenText}>Enabled</span>
                        ) : (
                          <span className={styles.redText}>Disabled</span>
                        )}
                      </p>
                      <p className={styles.keySubText}>
                        incoming TRON deposits won’t be processed. Used in case
                        of Mainnet TRON Server failure
                      </p>
                    </div>
                    <div className={styles.value}>
                      <div className={styles.switchContainer}>
                        <Toggle
                          defaultValue={getSettingsValue(
                            "DONT_PROCESS_INCOMING_TRON_DEPOSITS"
                          )}
                          onToggle={(value) =>
                            updateFields(
                              "DONT_PROCESS_INCOMING_TRON_DEPOSITS",
                              value
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>TRON SWEEP STATE</p>
                      <p className={styles.keySubText}>State of TRON sweeps</p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue("TRON_SWEEP_STATE")}
                        disabled
                        onChange={(e) =>
                          changeSettingsValue(
                            "TRON_SWEEP_STATE",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        TRON SWEEPING FEE CONTRACT
                      </p>
                      <p className={styles.keySubText}>State of TRON sweeps</p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue("USDT_TRX_FEE_SWEEP")}
                        disabled
                        onChange={(e) =>
                          changeSettingsValue(
                            "USDT_TRX_FEE_SWEEP",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.spacer} />
                </>
              )}
              {currentTab === "Ethereum/EVM" && (
                <>
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        EVM confirmations required
                      </p>
                      <p className={styles.keySubText}>
                        Number of confirmations required for a transaction to be
                        confirmed for EVM
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue("EVM_CONFIRMATION")}
                        disabled
                        onChange={(e) =>
                          changeSettingsValue(
                            "EVM_CONFIRMATION",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <Divider />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Sending crypto status for Ethereum
                      </p>
                      <p className={styles.keySubText}>
                        Whether sending for only Bitcoin should be disabled.
                        Used during Bitcoin Maintenance{" "}
                      </p>
                    </div>
                    <div className={styles.value}>
                      <div className={styles.switchContainer}>
                        <Toggle
                          defaultValue={getSettingsValue("ETH_SEND_ENABLED")}
                          onToggle={(value) =>
                            updateFields("ETH_SEND_ENABLED", value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Sending crypto status for Ethereum
                      </p>
                      <p className={styles.keySubText}>
                        Whether sending for only Bitcoin should be disabled.
                        Used during Bitcoin Maintenance{" "}
                      </p>
                    </div>
                    <div className={styles.value}>
                      <div className={styles.switchContainer}>
                        <Toggle
                          defaultValue={getSettingsValue("BSC_SEND_ENABLED")}
                          onToggle={(value) =>
                            updateFields("BSC_SEND_ENABLED", value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
              {currentTab === "Support" && (
                <>
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>SUPPORT EMAIL</p>
                      <p className={styles.keySubText}>Email for support</p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue("SUPPORT_EMAIL")}
                        disabled
                        onChange={(e) =>
                          changeSettingsValue("SUPPORT_EMAIL", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>SUPPORT WHATSAPP</p>
                      <p className={styles.keySubText}>
                        Whatsapp number for support
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue("SUPPORT_WHATSAPP")}
                        disabled
                        onChange={(e) =>
                          changeSettingsValue(
                            "SUPPORT_WHATSAPP",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <Divider />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>TELEGRAM BOT IDENTIFIER</p>
                      <p className={styles.keySubText}>
                        Identifier for telegram bot
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        onUpdate={() => updateFields("TELEGRAM_BOT_IDENTIFIER")}
                        loading={loadingKey === "TELEGRAM_BOT_IDENTIFIER"}
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue("TELEGRAM_BOT_IDENTIFIER")}
                        onChange={(e) =>
                          changeSettingsValue(
                            "TELEGRAM_BOT_IDENTIFIER",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>TELEGRAM CHAT IDENTIFIER</p>
                      <p className={styles.keySubText}>
                        Identifier for telegram chat
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        onUpdate={() =>
                          updateFields("TELEGRAM_CHAT_IDENTIFIER")
                        }
                        loading={loadingKey === "TELEGRAM_CHAT_IDENTIFIER"}
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue("TELEGRAM_CHAT_IDENTIFIER")}
                        onChange={(e) =>
                          changeSettingsValue(
                            "TELEGRAM_CHAT_IDENTIFIER",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                </>
              )}
              {/* {currentTab === "More settings" && (
              <>
                <div className={styles.keyValue}>
                  <div className={styles.key}>
                    <p className={styles.keyText}>BALANCE OF MERCHANT SIM 1</p>
                    <p className={styles.keySubText}>
                      Account balance of merchant sim 1 - 01234567890
                    </p>
                  </div>
                  <div className={styles.value}>
                    <Input placeholder="" className={styles.valueInput} />
                  </div>
                </div>
                <Divider />
                <div className={styles.keyValue}>
                  <div className={styles.key}>
                    <p className={styles.keyText}>PLATFORM 2FA KEYS</p>
                    <p className={styles.keySubText}>
                      Two FA server token fee for platform
                    </p>
                  </div>
                  <div className={styles.value}>
                    <Input placeholder="" className={styles.valueInput} />
                  </div>
                </div>
                <Divider />
                <div className={styles.keyValue}>
                  <div className={styles.key}>
                    <p className={styles.keyText}>
                      Force withdrawals to manual processing
                    </p>
                    <p className={styles.keySubText}>
                      Identifier for telegram bot
                    </p>
                  </div>
                  <div className={styles.value}>
                    <Input placeholder="" className={styles.valueInput} />
                  </div>
                </div>
                <Divider />
                <div className={styles.keyValue}>
                  <div className={styles.key}>
                    <p className={styles.keyText}>TELEGRAM CHAT IDENTIFIER</p>
                    <p className={styles.keySubText}>
                      Identifier for telegram chat
                    </p>
                  </div>
                  <div className={styles.value}>
                    <Input placeholder="" className={styles.valueInput} />
                  </div>
                </div>
              </>
            )} */}
              {currentTab === "Maintenance" && (
                <>
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        INTERMITTENT NETWORK CONNECTIVITY ISSUES
                      </p>
                      <p className={styles.keySubText}>
                        We are experiencing network latency and connection cut
                        offs from our server provider. Some transactions fail to
                        process. We are working on getting the issue resolved
                        quickly. Sorry for the inconvenience{" "}
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        onUpdate={() =>
                          updateFields("EMERGENCY_MESSAGE_NOTIFICATION_1")
                        }
                        loading={
                          loadingKey === "EMERGENCY_MESSAGE_NOTIFICATION_1"
                        }
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue(
                          "EMERGENCY_MESSAGE_NOTIFICATION_1"
                        )}
                        onChange={(e) =>
                          changeSettingsValue(
                            "EMERGENCY_MESSAGE_NOTIFICATION_1",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        SCHEDULED SERVICE MAINTENANCE TODAY
                      </p>
                      <p className={styles.keySubText}>
                        We will be performing a general service maintenance
                        today from 11pm to 12 midnight. We will provide further
                        updates as we progress.{" "}
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        onUpdate={() =>
                          updateFields("EMERGENCY_MESSAGE_NOTIFICATION_2")
                        }
                        loading={
                          loadingKey === "EMERGENCY_MESSAGE_NOTIFICATION_2"
                        }
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue(
                          "EMERGENCY_MESSAGE_NOTIFICATION_2"
                        )}
                        onChange={(e) =>
                          changeSettingsValue(
                            "EMERGENCY_MESSAGE_NOTIFICATION_2",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        KYC VERIFICATION TEMPORARILY DOWN
                      </p>
                      <p className={styles.keySubText}>
                        We are experiencing issues with our KYC partner and we
                        ask users to bear with us as we resolve the issue. Thank
                        you.
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        onUpdate={() =>
                          updateFields("EMERGENCY_MESSAGE_NOTIFICATION_3")
                        }
                        loading={
                          loadingKey === "EMERGENCY_MESSAGE_NOTIFICATION_3"
                        }
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue(
                          "EMERGENCY_MESSAGE_NOTIFICATION_3"
                        )}
                        onChange={(e) =>
                          changeSettingsValue(
                            "EMERGENCY_MESSAGE_NOTIFICATION_3",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        LTC AND DOGE OPERATIONS TEMPORARILY PASUED
                      </p>
                      <p className={styles.keySubText}>
                        We are performing a service maintenance for LTC and DOGE
                        . Contact support for manual withdrawals of LTC and DOGE
                        if need be. Thank you.{" "}
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        onUpdate={() =>
                          updateFields("EMERGENCY_MESSAGE_NOTIFICATION_4")
                        }
                        loading={
                          loadingKey === "EMERGENCY_MESSAGE_NOTIFICATION_4"
                        }
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue(
                          "EMERGENCY_MESSAGE_NOTIFICATION_4"
                        )}
                        onChange={(e) =>
                          changeSettingsValue(
                            "EMERGENCY_MESSAGE_NOTIFICATION_4",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        TRON BLOCKCHAIN PASUED DUE TO NODE MAINTENANCE - 1
                      </p>
                      <p className={styles.keySubText}>
                        We are performing maintenance on our TRON nodes and as
                        such USDT and TRX has been temporarily paused. Contact
                        support for manual withdrawal if need be. Thank you
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        onUpdate={() =>
                          updateFields("EMERGENCY_MESSAGE_NOTIFICATION_5")
                        }
                        loading={
                          loadingKey === "EMERGENCY_MESSAGE_NOTIFICATION_5"
                        }
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue(
                          "EMERGENCY_MESSAGE_NOTIFICATION_5"
                        )}
                        onChange={(e) =>
                          changeSettingsValue(
                            "EMERGENCY_MESSAGE_NOTIFICATION_5",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.spacer} />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>USDT Exchange price</p>
                      <p className={styles.keySubText}>
                        Exchange price used for USDT
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue("USDT_EXCHANGE_PRICE")}
                        disabled
                        onChange={(e) =>
                          changeSettingsValue(
                            "USDT_EXCHANGE_PRICE",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                </>
              )}
              {currentTab === "More settings" && (
                <>
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        BALANCE OF MERCHANT SIM 1
                      </p>
                      <p className={styles.keySubText}>
                        Account balance of merchant sim 1 - 01234567890
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue("MOMO_1_MERCHANT_MAIN_BALANCE")}
                        onChange={(e) =>
                          changeSettingsValue(
                            "MOMO_1_MERCHANT_MAIN_BALANCE",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <Divider />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>PLATFORM 2FA KEYS</p>
                      <p className={styles.keySubText}>
                        Two FA server token fee for platform
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue("PLATFORM_2FA_KEY")}
                        onChange={(e) =>
                          changeSettingsValue(
                            "PLATFORM_2FA_KEY",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <Divider />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        Force withdrawals to manual processing
                      </p>
                      <p className={styles.keySubText}>
                        Redirect all withdrawals to manual even if automated
                        payout is enabled - MASTER (Overrrides automated
                        withdrawals)
                      </p>
                    </div>
                    <div className={styles.value}>
                      <div className={styles.switchContainer}>
                        <Toggle
                          defaultValue={getSettingsValue(
                            "MANUAL_WITHDRAWAL_PROCESSING"
                          )}
                          onToggle={(value) =>
                            changeSettingsValue(
                              "MANUAL_WITHDRAWAL_PROCESSING",
                              value
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <Divider />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>
                        DISABLE ADDRESS GENERATION -{" "}
                        <span className={styles.redText}>Disabled</span>
                      </p>
                      <p className={styles.keySubText}>
                        Disable address generation. Used when a server is down
                      </p>
                    </div>
                    <div className={styles.value}>
                      <div className={styles.switchContainer}>
                        <Toggle
                          defaultValue={getSettingsValue(
                            "DISABLE_ADDRESS_GENERATION"
                          )}
                          onToggle={(value) =>
                            changeSettingsValue(
                              "DISABLE_ADDRESS_GENERATION",
                              value
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <Divider />
                  <div className={styles.keyValue}>
                    <div className={styles.key}>
                      <p className={styles.keyText}>USDT Exchange price</p>
                      <p className={styles.keySubText}>
                        Exchange price used for USDT
                      </p>
                    </div>
                    <div className={styles.value}>
                      <Input
                        placeholder=""
                        className={styles.valueInput}
                        value={getSettingsValue("USDT_EXCHANGE_PRICE")}
                        onChange={(e) =>
                          changeSettingsValue(
                            "USDT_EXCHANGE_PRICE",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.spacer} />
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
