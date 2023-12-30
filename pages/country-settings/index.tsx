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
import Toggle from "@/components/Toggle";

export default function Search() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<string>("Basic Information");
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
      <NavigationStep
        hideButton
        navigation={["Home", "Country Settings", currentTab]}
      />
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
              <div></div>
              <div className={styles.cancelBtns}>
                <div style={{ marginRight: 12 }}>
                  <Button color="white">Cancel</Button>
                </div>
                <div>
                  <Button>Save</Button>
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
                  <Toggle />
                </div>
              </div>
              <Divider style={{ margin: 0 }} />
              <div className={styles.bodyInputContainer}>
                <p>Bank Transfer</p>
                <div>
                  <Toggle />
                </div>
              </div>
              <Divider style={{ margin: 0 }} />
              <div className={styles.bodyInputContainer}>
                <p>Chipper cash</p>
                <div>
                  <Toggle />
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
                  <p style={{ flex: 1 }}>USDT</p>
                  <p style={{ width: "15%" }}>11.60</p>
                  <p style={{ width: "15%" }}>11.60</p>
                  <p style={{ width: "15%" }}>
                    <Button className={styles.editButton} color="white">
                      Edit
                    </Button>
                  </p>
                </div>
                <div className={styles.tableRow}>
                  <p style={{ flex: 1 }}>Bitcoin</p>
                  <p style={{ width: "15%" }}>11.60</p>
                  <p style={{ width: "15%" }}>11.60</p>
                  <p style={{ width: "15%" }}>
                    <Button className={styles.editButton} color="white">
                      Edit
                    </Button>
                  </p>
                </div>
                <div className={styles.tableRow}>
                  <p style={{ flex: 1 }}>Tron</p>
                  <p style={{ width: "15%" }}>11.60</p>
                  <p style={{ width: "15%" }}>11.60</p>
                  <p style={{ width: "15%" }}>
                    <Button className={styles.editButton} color="white">
                      Edit
                    </Button>
                  </p>
                </div>
                <div className={styles.tableRow}>
                  <p style={{ flex: 1 }}>Litecoin</p>
                  <p style={{ width: "15%" }}>11.60</p>
                  <p style={{ width: "15%" }}>11.60</p>
                  <p style={{ width: "15%" }}>
                    <Button className={styles.editButton} color="white">
                      Edit
                    </Button>
                  </p>
                </div>
                <div className={styles.tableRow}>
                  <p style={{ flex: 1 }}>Binance</p>
                  <p style={{ width: "15%" }}>11.60</p>
                  <p style={{ width: "15%" }}>11.60</p>
                  <p style={{ width: "15%" }}>
                    <Button className={styles.editButton} color="white">
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
