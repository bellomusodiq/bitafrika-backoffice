import React, { useState } from "react";

import PageLayout from "@/components/PageLayout";
import styles from "@/pages/country-settings/country-settings.module.css";
import NavigationStep from "@/components/NavigationStep";
import Button from "@/components/Button";
import { Checkbox, DatePicker, Divider, Space, Switch, Table } from "antd";
import Modal from "@/components/Modal";
import DropModal from "@/components/DropModal";
import Input from "@/components/Input/Input";
import Dropdown from "@/components/Dropdown";

export default function Search() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<string>("basicInformation");
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
      <NavigationStep hideButton />
      <div className={styles.container}>
        <h3 className={styles.header}>Users</h3>
        <p className={styles.subHeader}>1000 Total users</p>
        <div className={styles.tabContainer}>
          <div
            onClick={() => setCurrentTab("basicInformation")}
            className={
              currentTab === "basicInformation"
                ? styles.tabItemActive
                : styles.tabItem
            }
          >
            Basic Information
          </div>
          <div
            onClick={() => setCurrentTab("paymentMethods")}
            className={
              currentTab === "paymentMethods"
                ? styles.tabItemActive
                : styles.tabItem
            }
          >
            Payment methods
          </div>
          <div
            onClick={() => setCurrentTab("rates")}
            className={
              currentTab === "rates" ? styles.tabItemActive : styles.tabItem
            }
          >
            Rates
          </div>
        </div>
        <div className={styles.body}>
          {currentTab === "basicInformation" && (
            <>
              <p className={styles.bodyHeader}>Name</p>
              <p className={styles.bodySubHeader}>
                Select a country to automatically fill the field or enter
                details manually
              </p>
              <Divider style={{ margin: 0 }} />
              <div className={styles.bodyInputContainer}>
                <p>Country</p>
                <div>
                  <Dropdown
                    options={[
                      { title: "Ghana", value: "Ghana" },
                      { title: "Cameroon", value: "Cameroon" },
                      { title: "Nigeria", value: "Nigeria" },
                    ]}
                    onChange={() => {}}
                  />
                </div>
              </div>
              <Divider style={{ margin: 0 }} />
              <div className={styles.bodyInputContainer}>
                <p>Country annotation (eg. USA)</p>
                <div>
                  <Input />
                </div>
              </div>
              <Divider style={{ margin: 0 }} />
              <div className={styles.bodyInputContainer}>
                <p>Currency</p>
                <div>
                  <Input />
                </div>
              </div>
              <Divider style={{ margin: 0 }} />
              <div className={styles.bodyInputContainer}>
                <p>Currency code (eg. USD)</p>
                <div>
                  <Input />
                </div>
              </div>
              <Divider style={{ margin: 0 }} />
              <div className={styles.bodyInputContainer}>
                <p>Phone code</p>
                <div>
                  <Input />
                </div>
              </div>
              <Divider style={{ margin: 0 }} />
              <div className={styles.bodyFooter}>
                <div>
                  <Button color="white">
                    <span style={{ color: "red" }}>Delete country</span>
                  </Button>
                </div>
                <div className={styles.cancelBtns}>
                  <div style={{ marginRight: 12 }}>
                    <Button color="white">Cancel</Button>
                  </div>
                  <div>
                    <Button>Save</Button>
                  </div>
                </div>
              </div>
            </>
          )}
          {currentTab === "paymentMethods" && (
            <>
              <div className={styles.bodyInputContainer}>
                <p>Mobile money</p>
                <div>
                  <Switch />
                </div>
              </div>
              <Divider style={{ margin: 0 }} />
              <div className={styles.bodyInputContainer}>
                <p>Bank Transfer</p>
                <div>
                  <Switch />
                </div>
              </div>
              <Divider style={{ margin: 0 }} />
              <div className={styles.bodyInputContainer}>
                <p>Chipper cash</p>
                <div>
                  <Switch />
                </div>
              </div>
              <Divider style={{ margin: 0 }} />
              <div>
                <Button onClick={() => setOpenModal(true)}>
                  Add new payment method
                </Button>
              </div>
            </>
          )}
          {currentTab === "rates" && (
            <>
              <div className={styles.ratesTab}>
                <a
                  onClick={() => setRatesTab("BTC")}
                  style={{ color: ratesTab === "BTC" ? "#3861FB" : "#d0d5dd" }}
                  className={styles.ratesTabItem}
                >
                  {ratesTab === "BTC" && (
                    <div className={styles.ratesIndicator} />
                  )}
                  BTC
                </a>
                <a
                  onClick={() => setRatesTab("USDT")}
                  style={{ color: ratesTab === "USDT" ? "#3861FB" : "#d0d5dd" }}
                  className={styles.ratesTabItem}
                >
                  {ratesTab === "USDT" && (
                    <div className={styles.ratesIndicator} />
                  )}
                  USDT
                </a>
                <a
                  onClick={() => setRatesTab("TRX")}
                  style={{ color: ratesTab === "TRX" ? "#3861FB" : "#d0d5dd" }}
                  className={styles.ratesTabItem}
                >
                  {ratesTab === "TRX" && (
                    <div className={styles.ratesIndicator} />
                  )}
                  TRX
                </a>
                <a
                  onClick={() => setRatesTab("BNB")}
                  style={{ color: ratesTab === "BNB" ? "#3861FB" : "#d0d5dd" }}
                  className={styles.ratesTabItem}
                >
                  {ratesTab === "BNB" && (
                    <div className={styles.ratesIndicator} />
                  )}
                  BNB
                </a>
              </div>
              <div className={styles.ratesContainer}>
                <div className={styles.ratesInputContainer}>
                  <p>Buy Rate</p>
                  <Input leftIcon={<div className={styles.leftIcon}>$</div>} />
                </div>
                <div className={styles.ratesInputContainer}>
                  <p>Sell/withdrawal Rate</p>
                  <Input leftIcon={<div className={styles.leftIcon}>$</div>} />
                </div>
              </div>
              <Divider style={{ margin: 0 }} />
              <div className={styles.ratesContainer}>
                <div className={styles.ratesInputContainer}>
                  <p>USD Buy Rate</p>
                  <Input leftIcon={<div className={styles.leftIcon}>$</div>} />
                </div>
                <div className={styles.ratesInputContainer}>
                  <p>USD Sell Rate</p>
                  <Input leftIcon={<div className={styles.leftIcon}>$</div>} />
                </div>
              </div>
              <div className={styles.ratesFooter}>
                <div style={{ marginRight: 10 }}>
                  <Button color="white">Cancel</Button>
                </div>
                <div>
                  <Button>Update</Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
