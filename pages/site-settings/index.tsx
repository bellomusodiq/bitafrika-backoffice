import React, { useState } from "react";

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

export default function Search() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<string>("Fees");
  const [ratesTab, setRatesTab] = useState<string>("BTC");

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
      <div className={styles.container}>
        <h3 className={styles.header}>
          Site settings - <span style={{ color: "#98A2B3" }}>{currentTab}</span>
        </h3>
        <p className={styles.subHeader}></p>
        <div className={styles.siteSettingsContainer}>
          <div className={styles.navBar}>
            <div
              className={currentTab === "Fees" ? styles.tabActive : styles.tab}
              onClick={() => setCurrentTab("Fees")}
            >
              {currentTab === "Fees" && <div className={styles.indicator} />}{" "}
              Fees
            </div>
            <div
              className={
                currentTab === "Payment methods" ? styles.tabActive : styles.tab
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
              {currentTab === "SMS" && <div className={styles.indicator} />} SMS
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
              className={currentTab === "Swap" ? styles.tabActive : styles.tab}
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
              {currentTab === "Limits" && <div className={styles.indicator} />}{" "}
              Limits
            </div>
            <div
              className={currentTab === "Tron" ? styles.tabActive : styles.tab}
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
              {currentTab === "Support" && <div className={styles.indicator} />}{" "}
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
                    />
                  </div>
                  <div className={styles.ratesInputContainer}>
                    <p>Percentage fee for external transfers</p>
                    <Input
                      leftIcon={<div className={styles.leftIcon}>$</div>}
                    />
                  </div>
                </div>
                <div className={styles.ratesContainer}>
                  <div className={styles.ratesInputContainer}>
                    <p>Percentage fee for withdrawals</p>
                    <Input
                      leftIcon={<div className={styles.leftIcon}>$</div>}
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
                    <Input placeholder="" className={styles.valueInput} />
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
                      onUpdate={() => {}}
                      placeholder=""
                      className={styles.valueInput}
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
                      This is the chippercash tag customers pay for manual topup
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
                      Name on chippercash tag for deposits
                    </p>
                    <p className={styles.keySubText}>
                      This is the name on the chippercash tag customers pay for
                      manual topup{" "}
                    </p>
                  </div>
                  <div className={styles.value}>
                    <Input placeholder="" className={styles.valueInput} />
                  </div>
                </div>
              </>
            )}
            {currentTab === "SMS" && (
              <>
                <div className={styles.keyValue}>
                  <div className={styles.key}>
                    <p className={styles.keyText}>List of sender IDs for SMS</p>
                    <p className={styles.keySubText}>
                      Any one of the IDs is selected when SMS needs to be sent.
                      each ID should be separated by a comma, no spaces{" "}
                    </p>
                  </div>
                  <div className={styles.value}>
                    <Input placeholder="" className={styles.valueInput} />
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
                    <Input placeholder="" className={styles.valueInput} />
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
                    <Input placeholder="" className={styles.valueInput} />
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
                    <Input placeholder="" className={styles.valueInput} />
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
                    <Input placeholder="" className={styles.valueInput} />
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
                    <Input placeholder="" className={styles.valueInput} />
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
                    <Input placeholder="" className={styles.valueInput} />
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
                      Number of fee types used for -{" "}
                      <span className={styles.blueText}>Bitcoin</span>
                    </p>
                    <p className={styles.keySubText}>
                      network block estimation value for bitcoin
                    </p>
                  </div>
                  <div className={styles.value}>
                    <Input placeholder="" className={styles.valueInput} />
                  </div>
                </div>
                <div className={styles.spacer} />
                <div className={styles.keyValue}>
                  <div className={styles.key}>
                    <p className={styles.keyText}>
                      Number of fee types used for -{" "}
                      <span className={styles.blueText}>Bitcoin cash</span>
                    </p>
                    <p className={styles.keySubText}>
                      network block estimation value for bitcoin cash
                    </p>
                  </div>
                  <div className={styles.value}>
                    <Input placeholder="" className={styles.valueInput} />
                  </div>
                </div>
                <div className={styles.spacer} />
                <div className={styles.keyValue}>
                  <div className={styles.key}>
                    <p className={styles.keyText}>
                      Number of fee types used for -{" "}
                      <span className={styles.blueText}>Litecoin</span>
                    </p>
                    <p className={styles.keySubText}>
                      network block estimation value for Litecoin
                    </p>
                  </div>
                  <div className={styles.value}>
                    <Input placeholder="" className={styles.valueInput} />
                  </div>
                </div>
                <div className={styles.spacer} />
                <div className={styles.keyValue}>
                  <div className={styles.key}>
                    <p className={styles.keyText}>
                      Number of fee types used for -{" "}
                      <span className={styles.blueText}>Dogecoin</span>
                    </p>
                    <p className={styles.keySubText}>
                      network block estimation value for Dogecoin
                    </p>
                  </div>
                  <div className={styles.value}>
                    <Input placeholder="" className={styles.valueInput} />
                  </div>
                </div>
                <Divider />
                <div className={styles.keyValue}>
                  <div className={styles.key}>
                    <p className={styles.keyText}>NETWORK FEE PRIORITY TYPE</p>
                    <p className={styles.keySubText}>
                      Transfer mode determines the priority of the network fee
                      for a network. Options are CONSERVATIVE and ECONOMICAL
                    </p>
                  </div>
                  <div className={styles.value}>
                    <Input
                      placeholder=""
                      className={styles.valueInput}
                      onUpdate={() => {}}
                    />
                  </div>
                </div>
                <Divider />
                <div style={{ marginBlock: 30 }} className={styles.keyValue}>
                  <div className={styles.key}>
                    <p className={styles.keyText}>
                      FIXED NETWORK FEE - DOGECOIN -{" "}
                      <span className={styles.greenText}>Enabled</span>
                    </p>
                    <p className={styles.keySubText}>
                      Enable fixed network fee for dogecoin
                    </p>
                  </div>
                  <div className={styles.value}>
                    <div className={styles.switchContainer}>
                      <Toggle />
                    </div>
                  </div>
                </div>
                <div className={styles.keyValue}>
                  <div className={styles.key}>
                    <p className={styles.keyText}>FIXED DOGECOIN NETWORK FEE</p>
                    <p className={styles.keySubText}>
                      Fixed network fee set for dogecoin for sending dogecoin
                    </p>
                  </div>
                  <div className={styles.value}>
                    <Input placeholder="" className={styles.valueInput} />
                  </div>
                </div>
                <Divider />
                <div style={{ marginBlock: 30 }} className={styles.keyValue}>
                  <div className={styles.key}>
                    <p className={styles.keyText}>
                      FIXED NETWORK FEE - LITECOIN -
                      <span className={styles.greenText}>Enabled</span>
                    </p>
                    <p className={styles.keySubText}>
                      Enable fixed network fee for Litecoin
                    </p>
                  </div>
                  <div className={styles.value}>
                    <div className={styles.switchContainer}>
                      <Toggle />
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
                    <Input placeholder="" className={styles.valueInput} />
                  </div>
                </div>
                <Divider />
                <div style={{ marginBlock: 30 }} className={styles.keyValue}>
                  <div className={styles.key}>
                    <p className={styles.keyText}>
                      FIXED NETWORK FEE - BITCOIN CASH -
                      <span className={styles.greenText}>Enabled</span>
                    </p>
                    <p className={styles.keySubText}>
                      Enable fixed network fee for Bitcoin cash
                    </p>
                  </div>
                  <div className={styles.value}>
                    <div className={styles.switchContainer}>
                      <Toggle />
                    </div>
                  </div>
                </div>
                <div className={styles.keyValue}>
                  <div className={styles.key}>
                    <p className={styles.keyText}>
                      FIXED BITCOIN CASH NETWORK FEE
                    </p>
                    <p className={styles.keySubText}>
                      Fixed network fee set for Bitcoin cash for sending Bitcoin
                      cash
                    </p>
                  </div>
                  <div className={styles.value}>
                    <Input placeholder="" className={styles.valueInput} />
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
                      <span className={styles.greenText}>Enabled</span>
                    </p>
                    <p className={styles.keySubText}>
                      This option allows for automated Momo prompt for Account
                      topups with Paybox
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
                      System withdrawal status for mobile money -{" "}
                      <span className={styles.greenText}>Enabled</span>
                    </p>
                    <p className={styles.keySubText}>
                      Whether withdrawals for all cryptocurrency should be
                      disabled. used during maintenance - MASTER (Overrides all
                      withdrawal settings)
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
                      System sending status for all cryptos -{" "}
                      <span className={styles.greenText}>Enabled</span>
                    </p>
                    <p className={styles.keySubText}>
                      System SENDING status for all cryptos
                    </p>
                  </div>
                  <div className={styles.value}>
                    <div className={styles.switchContainer}>
                      <Toggle />
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
                      <span className={styles.greenText}>Enabled</span>
                    </p>
                    <p className={styles.keySubText}>
                      This option allows for manual deposits for Account topups
                      with Android HARDWARE - MASTER (Overrides all Crypto momo
                      manual topup settings)
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
                      Manual Momo deposits for all Vodafone -{" "}
                      <span className={styles.greenText}>Enabled</span>
                    </p>
                    <p className={styles.keySubText}>
                      Whether manual topups for Vodafone should be disabled
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
                      Manual Momo deposits for AirtelTigo -{" "}
                      <span className={styles.greenText}>Enabled</span>
                    </p>
                    <p className={styles.keySubText}>
                      Whether manual topups for AirtelTigo should be disabled
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
                      Manual Momo deposits for MTN -{" "}
                      <span className={styles.greenText}>Enabled</span>
                    </p>
                    <p className={styles.keySubText}>
                      Whether manual topups for MTN should be disabled
                    </p>
                  </div>
                  <div className={styles.value}>
                    <div className={styles.switchContainer}>
                      <Toggle />
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
                      <span className={styles.greenText}>Enabled</span>
                    </p>
                    <p className={styles.keySubText}>
                      Whether withdrawals for bitcoin should be disabled. Used
                      only for bitcoin deposit maintenance
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
                      Momo deposit status for Bitcoin -{" "}
                      <span className={styles.greenText}>Enabled</span>
                    </p>
                    <p className={styles.keySubText}>
                      Whether withdrawals for bitcoin should be disabled. Used
                      only for bitcoin deposit maintenance
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
                      Momo deposit status for Bitcoin cash -{" "}
                      <span className={styles.greenText}>Enabled</span>
                    </p>
                    <p className={styles.keySubText}>
                      Whether withdrawals for bitcoin should be disabled. Used
                      only for bitcoin deposit maintenance
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
                      Momo deposit status for Dogecoin -{" "}
                      <span className={styles.greenText}>Enabled</span>
                    </p>
                    <p className={styles.keySubText}>
                      Whether withdrawals for Dogecoin should be disabled. Used
                      only for Dogecoin deposit maintenance
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
                      Momo deposit status for Litecoin -{" "}
                      <span className={styles.greenText}>Enabled</span>
                    </p>
                    <p className={styles.keySubText}>
                      Whether withdrawals for Litecoin should be disabled. Used
                      only for Litecoin deposit maintenance
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
                      Momo deposit status for Tron -{" "}
                      <span className={styles.greenText}>Enabled</span>
                    </p>
                    <p className={styles.keySubText}>
                      Whether withdrawals for Tron should be disabled. Used only
                      for TrON deposit maintenance
                    </p>
                  </div>
                  <div className={styles.value}>
                    <div className={styles.switchContainer}>
                      <Toggle />
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
                      <span className={styles.greenText}>Enabled</span>
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
                      <span className={styles.greenText}>Enabled</span>
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
                      Momo withdrawal status for Bitcoin cash -{" "}
                      <span className={styles.greenText}>Enabled</span>
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
                      Momo withdrawal status for Dogecoin -{" "}
                      <span className={styles.greenText}>Enabled</span>
                    </p>
                    <p className={styles.keySubText}>
                      Whether withdrawals for Dogecoin should be disabled. Used
                      only for Dogecoin withdrawal maintenance
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
                      Momo withdrawal status for Litecoin -{" "}
                      <span className={styles.greenText}>Enabled</span>
                    </p>
                    <p className={styles.keySubText}>
                      Whether withdrawals for Litecoin should be disabled. Used
                      only for Litecoin withdrawal maintenance
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
                      Momo withdrawal status for Tron -{" "}
                      <span className={styles.greenText}>Enabled</span>
                    </p>
                    <p className={styles.keySubText}>
                      Whether withdrawals for Tron should be disabled. Used only
                      for TrON withdrawal maintenance
                    </p>
                  </div>
                  <div className={styles.value}>
                    <div className={styles.switchContainer}>
                      <Toggle />
                    </div>
                  </div>
                </div>
              </>
            )}
            {currentTab === "Limits" && (
              <>
                <div className={styles.keyValue}>
                  <div className={styles.key}>
                    <p className={styles.keyText}>Daily buying limit in USD</p>
                    <p className={styles.keySubText}>
                      Daily buying limit quoted in USD - Master
                    </p>
                  </div>
                  <div className={styles.value}>
                    <Input
                      onUpdate={() => {}}
                      placeholder=""
                      className={styles.valueInput}
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
                      onUpdate={() => {}}
                      placeholder=""
                      className={styles.valueInput}
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
                      onUpdate={() => {}}
                      placeholder=""
                      className={styles.valueInput}
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
                      onUpdate={() => {}}
                      placeholder=""
                      className={styles.valueInput}
                    />
                  </div>
                </div>
                <div className={styles.spacer} />
                <div className={styles.keyValue}>
                  <div className={styles.key}>
                    <p className={styles.keyText}>Daily buying limit in USD</p>
                    <p className={styles.keySubText}>
                      Daily buying limit quoted in USD - Master
                    </p>
                  </div>
                  <div className={styles.value}>
                    <Input
                      onUpdate={() => {}}
                      placeholder=""
                      className={styles.valueInput}
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
                    <Input placeholder="" className={styles.valueInput} />
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
                    <Input placeholder="" className={styles.valueInput} />
                  </div>
                </div>
                <Divider />
                <div className={styles.keyValue}>
                  <div className={styles.key}>
                    <p className={styles.keyText}>
                      Daily buying limit in USD for USDT - TRON
                    </p>
                    <p className={styles.keySubText}>
                      Daily buying limit for USDT - TRON. Reduces User’s buying
                      limit for the day
                    </p>
                  </div>
                  <div className={styles.value}>
                    <Input placeholder="" className={styles.valueInput} />
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
                    <Input placeholder="" className={styles.valueInput} />
                  </div>
                </div>
                <div className={styles.spacer} />
                <div className={styles.keyValue}>
                  <div className={styles.key}>
                    <p className={styles.keyText}>
                      Daily buying limit in USD for TRX
                    </p>
                    <p className={styles.keySubText}>
                      Daily buying limit for USDT - TRON. Reduces User’s buying
                      limit for the day
                    </p>
                  </div>
                  <div className={styles.value}>
                    <Input placeholder="" className={styles.valueInput} />
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
                    <Input placeholder="" className={styles.valueInput} />
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
                      <Toggle />
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
                      Whether withdrawal for only TRX. TRON should be disabled.
                      Used during TRX - TRON Maintainance
                    </p>
                  </div>
                  <div className={styles.value}>
                    <div className={styles.switchContainer}>
                      <Toggle />
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
                      <Toggle />
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
                      Whether withdrawal for only USDT. TRON should be disabled.
                      Used during USDT - TRON Maintenance
                    </p>
                  </div>
                  <div className={styles.value}>
                    <div className={styles.switchContainer}>
                      <Toggle />
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
                      <Toggle />
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
                      <Toggle />
                    </div>
                  </div>
                </div>
                <Divider />
                <div className={styles.keyValue}>
                  <div className={styles.key}>
                    <p className={styles.keyText}>Minimum sending TRX Amount</p>
                    <p className={styles.keySubText}>
                      Minimum TRX Amount users can send
                    </p>
                  </div>
                  <div className={styles.value}>
                    <Input
                      onUpdate={() => {}}
                      placeholder=""
                      className={styles.valueInput}
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
                      onUpdate={() => {}}
                      placeholder=""
                      className={styles.valueInput}
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
                      onUpdate={() => {}}
                      placeholder=""
                      className={styles.valueInput}
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
                      Minimum network fee in TRX user should have in TRX balance
                      when sending USDT
                    </p>
                  </div>
                  <div className={styles.value}>
                    <Input placeholder="" className={styles.valueInput} />
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
                    <Input placeholder="" className={styles.valueInput} />
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
                    <Input placeholder="" className={styles.valueInput} />
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
                    <Input placeholder="" className={styles.valueInput} />
                  </div>
                </div>
                <Divider />
                <div className={styles.keyValue}>
                  <div className={styles.key}>
                    <p className={styles.keyText}>
                      DON_T_PROCESS_TRON_DEPOSITS -{" "}
                      <span className={styles.redText}>Disabled</span>
                    </p>
                    <p className={styles.keySubText}>
                      incoming TRON deposits won’t be processed. Used in case of
                      Mainnet TRON Server failure
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
                    <p className={styles.keyText}>TRON SWEEP STATE</p>
                    <p className={styles.keySubText}>State of TRON sweeps</p>
                  </div>
                  <div className={styles.value}>
                    <Input placeholder="" className={styles.valueInput} />
                  </div>
                </div>
                <div className={styles.spacer} />
                <div className={styles.keyValue}>
                  <div className={styles.key}>
                    <p className={styles.keyText}>TRON SWEEPING FEE CONTRACT</p>
                    <p className={styles.keySubText}>State of TRON sweeps</p>
                  </div>
                  <div className={styles.value}>
                    <Input placeholder="" className={styles.valueInput} />
                  </div>
                </div>
                <div className={styles.spacer} />
              </>
            )}
            {currentTab === "Ethereum/EVM" && (
              <>
                <div className={styles.keyValue}>
                  <div className={styles.key}>
                    <p className={styles.keyText}>EVM confirmations required</p>
                    <p className={styles.keySubText}>
                      Number of confirmations required for a transaction to be
                      confirmed for EVM
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
                      Sending crypto status for Ethereum
                    </p>
                    <p className={styles.keySubText}>
                      Whether sending for only Bitcoin should be disabled. Used
                      during Bitcoin Maintenance{" "}
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
                      Sending crypto status for Ethereum
                    </p>
                    <p className={styles.keySubText}>
                      Whether sending for only Bitcoin should be disabled. Used
                      during Bitcoin Maintenance{" "}
                    </p>
                  </div>
                  <div className={styles.value}>
                    <div className={styles.switchContainer}>
                      <Toggle />
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
                    <Input placeholder="" className={styles.valueInput} />
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
                    <Input placeholder="" className={styles.valueInput} />
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
                      onUpdate={() => {}}
                      placeholder=""
                      className={styles.valueInput}
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
                      onUpdate={() => {}}
                      placeholder=""
                      className={styles.valueInput}
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
                      onUpdate={() => {}}
                      placeholder=""
                      className={styles.valueInput}
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
                      We will be performing a general service maintenance today
                      from 11pm to 12 midnight. We will provide further updates
                      as we progress.{" "}
                    </p>
                  </div>
                  <div className={styles.value}>
                    <Input
                      onUpdate={() => {}}
                      placeholder=""
                      className={styles.valueInput}
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
                      We are experiencing issues with our KYC partner and we ask
                      users to bear with us as we resolve the issue. Thank you.
                    </p>
                  </div>
                  <div className={styles.value}>
                    <Input
                      onUpdate={() => {}}
                      placeholder=""
                      className={styles.valueInput}
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
                      We are performing a service maintenance for LTC and DOGE .
                      Contact support for manual withdrawals of LTC and DOGE if
                      need be. Thank you.{" "}
                    </p>
                  </div>
                  <div className={styles.value}>
                    <Input
                      onUpdate={() => {}}
                      placeholder=""
                      className={styles.valueInput}
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
                      onUpdate={() => {}}
                      placeholder=""
                      className={styles.valueInput}
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
                    <Input placeholder="" className={styles.valueInput} />
                  </div>
                </div>
              </>
            )}
            {currentTab === "More settings" && (
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
                      Redirect all withdrawals to manual even if automated
                      payout is enabled - MASTER (Overrrides automated
                      withdrawals)
                    </p>
                  </div>
                  <div className={styles.value}>
                    <div className={styles.switchContainer}>
                      <Toggle />
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
                      <Toggle />
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
                    <Input placeholder="" className={styles.valueInput} />
                  </div>
                </div>
                <div className={styles.spacer} />
              </>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
