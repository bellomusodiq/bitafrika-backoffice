import React, { useState } from "react";

import PageLayout from "@/components/PageLayout";
import styles from "@/pages/reports/transactions.module.css";
import NavigationStep from "@/components/NavigationStep";
import Button from "@/components/Button";
import { DatePicker, Table } from "antd";
import Modal from "@/components/Modal";
import axios from "axios";
import { BASE_URL } from "@/CONFIG";
import getToken from "@/utils/getToken";
import Dropdown from "@/components/Dropdown";
import CustomPieChart from "@/components/Charts/PieChart";

export default function Search() {
  const [search, setSearch] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any>({});
  const [searchType, setSearchType] = useState<string>("Buy");

  const onSearch = () => {
    setData(true);
  };

  const showModal = (user: any) => {
    setCurrentUser(user);
    setOpenModal(true);
  };

  return (
    <PageLayout title="Hone">
      <div className={styles.container}>
        <p className={styles.filterTitle}>Filter results by</p>
        <div className={styles.searchContainer}>
          <div className={styles.searchCard}>
            <div className={styles.dropdownContainer}>
              <p className={styles.dropdownTitle}>Transaction type</p>
              <Dropdown
                value={searchType}
                options={[
                  { title: "Buy transactions", value: "Buy" },
                  { title: "Sell transactions", value: "Sell" },
                  { title: "Buy and Sell transactions", value: "Buy and Sell" },
                  { title: "Send transactions", value: "Send" },
                  { title: "Received transactions", value: "Receive" },
                ]}
                onChange={(value) => {
                  setSearchType(String(value));
                  setData(false);
                }}
              />
            </div>
            <div className={styles.dropdownContainer}>
              <p className={styles.dropdownTitle}>Date range</p>
              <DatePicker.RangePicker style={{ height: 48 }} />
            </div>
            <div className={styles.dropdownContainer}>
              <p className={styles.dropdownTitle}>Status</p>
              <Dropdown
                value={searchType}
                options={[
                  { title: "Successful", value: "Successful" },
                  { title: "Pending", value: "Pending" },
                  { title: "Failed", value: "Failed" },
                ]}
                onChange={(value) => {
                  setSearchType(String(value));
                  setData(false);
                }}
              />
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <div>
                <Button onClick={onSearch} className={styles.searchButton}>
                  Apply filter
                </Button>
              </div>
            </div>
          </div>
        </div>
        {data && searchType === "Buy" && (
          <div className={styles.bodyContainer}>
            <h3 className={styles.header}>Buy transactions report</h3>
            <p className={styles.date}>Date: 01/01/2023 — 01/01/2023</p>
            <p className={styles.date}>Status: Successful</p>

            <h3 style={{ marginTop: 14 }} className={styles.header}>
              Buy orders
            </h3>
            <div className={styles.ordersContainer}>
              <div style={{ flex: 1 }}>
                <div className={styles.order}>
                  <div className={styles.orderIcon} />
                  <p className={styles.orderText}>
                    <span>BTC</span> <span> 1001 orders</span>
                    <span className={styles.grey}>10,000.00 USD</span>
                  </p>
                </div>
                <div className={styles.order}>
                  <div className={styles.orderIcon} />
                  <p className={styles.orderText}>
                    <span>LTC</span> <span> 1001 orders</span>
                    <span className={styles.grey}>10,000.00 USD</span>
                  </p>
                </div>
                <div className={styles.order}>
                  <div className={styles.orderIcon} />
                  <p className={styles.orderText}>
                    <span>DOGE</span> <span> 1001 orders</span>
                    <span className={styles.grey}>10,000.00 USD</span>
                  </p>
                </div>
                <div className={styles.order}>
                  <div className={styles.orderIcon} />
                  <p className={styles.orderText}>
                    <span>TRX</span> <span> 1001 orders</span>
                    <span className={styles.grey}>10,000.00 USD</span>
                  </p>
                </div>
              </div>
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div style={{ width: 200, height: 200 }}>
                  <CustomPieChart />
                </div>
                <div className={styles.pieIndicators}>
                  <div className={styles.pieIndicator}>
                    <div /> 50%
                  </div>
                  <div className={styles.pieIndicator}>
                    <div /> 50%
                  </div>
                  <div className={styles.pieIndicator}>
                    <div /> 50%
                  </div>
                  <div className={styles.pieIndicator}>
                    <div /> 50%
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.divider} style={{ margin: "24px 0" }} />
            <div className={styles.totalHeader}>
              <p>Total buy orders: 7000</p>
              <a href="#">View orders</a>
            </div>
            <div className={styles.footerHeaderContainer}>
              <p>TOTAL AMOUNT</p>
              <p>TOTAL FEES</p>
              <p>GRAND TOTAL</p>
            </div>
            <div className={styles.divider} style={{ marginTop: 5 }} />
            <div className={styles.totalContainer}>
              <p>GHS 109,000</p>
              <p>GHS 0.00</p>
              <p style={{ color: "#1570EF" }}>GHS 109,000</p>
            </div>
          </div>
        )}
        {data && searchType === "Sell" && (
          <div className={styles.bodyContainer}>
            <p className={styles.header}>Sell transactions report</p>
            <p className={styles.date}>Date: 01/01/2023 — 01/01/2023</p>
            <p className={styles.date}>Status: Successful</p>

            <p className={styles.header}>Sell orders</p>
            <div className={styles.ordersContainer}>
              <div style={{ flex: 1 }}>
                <div className={styles.order}>
                  <div className={styles.orderIcon} />
                  <p className={styles.orderText}>
                    <span>BTC</span> <span> 1001 orders</span>
                    <span className={styles.grey}>10,000.00 USD</span>
                  </p>
                </div>
                <div className={styles.order}>
                  <div className={styles.orderIcon} />
                  <p className={styles.orderText}>
                    <span>TRX</span> <span> 1001 orders</span>
                    <span className={styles.grey}>10,000.00 USD</span>
                  </p>
                </div>
                <div className={styles.order}>
                  <div className={styles.orderIcon} />
                  <p className={styles.orderText}>
                    <span>LTC</span> <span> 1001 orders</span>
                    <span className={styles.grey}>10,000.00 USD</span>
                  </p>
                </div>
                <div className={styles.order}>
                  <div className={styles.orderIcon} />
                  <p className={styles.orderText}>
                    <span>DOGE</span> <span> 1001 orders</span>
                    <span className={styles.grey}>10,000.00 USD</span>
                  </p>
                </div>
                <div className={styles.order}>
                  <div className={styles.orderIcon} />
                  <p className={styles.orderText}>
                    <span>MATIC</span> <span> 1001 orders</span>
                    <span className={styles.grey}>10,000.00 USD</span>
                  </p>
                </div>
                <div className={styles.order}>
                  <div className={styles.orderIcon} />
                  <p className={styles.orderText}>
                    <span>BTC</span> <span> 1001 orders</span>
                    <span className={styles.grey}>10,000.00 USD</span>
                  </p>
                </div>
              </div>
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div style={{ width: 200, height: 200 }}>
                  <CustomPieChart />
                </div>
                <div className={styles.pieIndicators}>
                  <div className={styles.pieIndicator}>
                    <div /> 50%
                  </div>
                  <div className={styles.pieIndicator}>
                    <div /> 50%
                  </div>
                  <div className={styles.pieIndicator}>
                    <div /> 50%
                  </div>
                  <div className={styles.pieIndicator}>
                    <div /> 50%
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.divider} style={{ margin: "24px 0" }} />
            <div className={styles.totalHeader}>
              <p>Total sell orders: 7000</p>
              <a href="#">View orders</a>
            </div>
            <div className={styles.footerHeaderContainer}>
              <p>TOTAL AMOUNT</p>
              <p>TOTAL FEES</p>
              <p>GRAND TOTAL</p>
            </div>
            <div className={styles.divider} style={{ marginTop: 5 }} />
            <div className={styles.totalContainer}>
              <p>GHS 109,000</p>
              <p>GHS 1000.00</p>
              <p style={{ color: "#1570EF" }}>GHS 109,000</p>
            </div>
          </div>
        )}
        {data && searchType === "Buy and Sell" && (
          <>
            <div className={styles.bodyContainer}>
              <p className={styles.header}>Buy and Sell transactions report</p>
              <p className={styles.date}>Date: 01/01/2023 — 01/01/2023</p>
              <p className={styles.date}>Status: Successful</p>

              <div className={styles.buySellOrders}>
                <div
                  className={styles.ordersContainer2}
                  style={{ paddingRight: 48 }}
                >
                  <p className={styles.header}>Buy orders</p>
                  <div style={{ flex: 1 }}>
                    <div className={styles.buySellOrdersChild}>
                      <div className={styles.order}>
                        <div className={styles.orderIcon} />
                        <p className={styles.orderText}>
                          <span>BTC</span> <span>1001 orders</span>{" "}
                          <span className={styles.grey}>1001 orders</span>
                        </p>
                      </div>
                      <div className={styles.order}>
                        <div className={styles.orderIcon} />
                        <p className={styles.orderText}>
                          <span>LTC</span> <span>1001 orders</span>{" "}
                          <span className={styles.grey}>1001 orders</span>
                        </p>
                      </div>
                      <div className={styles.order}>
                        <div className={styles.orderIcon} />
                        <p className={styles.orderText}>
                          <span>TRX</span> <span>1001 orders</span>{" "}
                          <span className={styles.grey}>1001 orders</span>
                        </p>
                      </div>
                      <div className={styles.order}>
                        <div className={styles.orderIcon} />
                        <p className={styles.orderText}>
                          <span>DOGE</span> <span>1001 orders</span>{" "}
                          <span className={styles.grey}>1001 orders</span>
                        </p>
                      </div>
                      <div className={styles.order}>
                        <div className={styles.orderIcon} />
                        <p className={styles.orderText}>
                          <span>MATIC</span> <span>1001 orders</span>{" "}
                          <span className={styles.grey}>1001 orders</span>
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        width: "50%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ width: 200, height: 200 }}>
                        <CustomPieChart />
                      </div>
                      <div className={styles.pieIndicators}>
                        <div className={styles.pieIndicator}>
                          <div /> 50%
                        </div>
                        <div className={styles.pieIndicator}>
                          <div /> 50%
                        </div>
                        <div className={styles.pieIndicator}>
                          <div /> 50%
                        </div>
                        <div className={styles.pieIndicator}>
                          <div /> 50%
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={styles.divider}
                    style={{ margin: "24px 0" }}
                  />
                  <div className={styles.totalHeader}>
                    <p>Total buy orders: 7000</p>
                    <a href="#">View orders</a>
                  </div>
                  <div className={styles.footerHeaderContainer}>
                    <p>TOTAL AMOUNT</p>
                    <p>TOTAL FEES</p>
                    <p>GRAND TOTAL</p>
                  </div>
                  <div className={styles.divider} style={{ marginTop: 5 }} />
                  <div className={styles.totalContainer}>
                    <p>GHS 109,000</p>
                    <p>GHS 0.00</p>
                    <p style={{ color: "#1570EF" }}>GHS 109,000</p>
                  </div>
                </div>
                <div className={styles.verticalDivider} />
                <div
                  className={styles.ordersContainer2}
                  style={{ paddingLeft: 48 }}
                >
                  <p className={styles.header}>Sell orders</p>
                  <div style={{ flex: 1 }}>
                    <div className={styles.buySellOrdersChild}>
                      <div className={styles.order}>
                        <div className={styles.orderIcon} />
                        <p className={styles.orderText}>
                          <span>BTC</span> <span>1001 orders</span>{" "}
                          <span className={styles.grey}>1001 orders</span>
                        </p>
                      </div>
                      <div className={styles.order}>
                        <div className={styles.orderIcon} />
                        <p className={styles.orderText}>
                          <span>LTC</span> <span>1001 orders</span>{" "}
                          <span className={styles.grey}>1001 orders</span>
                        </p>
                      </div>
                      <div className={styles.order}>
                        <div className={styles.orderIcon} />
                        <p className={styles.orderText}>
                          <span>TRX</span> <span>1001 orders</span>{" "}
                          <span className={styles.grey}>1001 orders</span>
                        </p>
                      </div>
                      <div className={styles.order}>
                        <div className={styles.orderIcon} />
                        <p className={styles.orderText}>
                          <span>DOGE</span> <span>1001 orders</span>{" "}
                          <span className={styles.grey}>1001 orders</span>
                        </p>
                      </div>
                      <div className={styles.order}>
                        <div className={styles.orderIcon} />
                        <p className={styles.orderText}>
                          <span>MATIC</span> <span>1001 orders</span>{" "}
                          <span className={styles.grey}>1001 orders</span>
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        width: "50%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ width: 200, height: 200 }}>
                        <CustomPieChart />
                      </div>
                      <div className={styles.pieIndicators}>
                        <div className={styles.pieIndicator}>
                          <div /> 50%
                        </div>
                        <div className={styles.pieIndicator}>
                          <div /> 50%
                        </div>
                        <div className={styles.pieIndicator}>
                          <div /> 50%
                        </div>
                        <div className={styles.pieIndicator}>
                          <div /> 50%
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={styles.divider}
                    style={{ margin: "24px 0" }}
                  />
                  <div className={styles.totalHeader2}>
                    <p>Total buy orders: 7000</p>
                    <a href="#">View orders</a>
                  </div>
                  <div className={styles.footerHeaderContainer2}>
                    <p>TOTAL AMOUNT</p>
                    <p>TOTAL FEES</p>
                    <p>GRAND TOTAL</p>
                  </div>
                  <div className={styles.divider} style={{ marginTop: 5 }} />
                  <div className={styles.totalContainer2}>
                    <p>GHS 109,000</p>
                    <p>GHS 0.00</p>
                    <p style={{ color: "#1570EF" }}>GHS 109,000</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.bodyContainer}>
              <div className={styles.totalProfitHeader}>
                <p>
                  Total profit <span>(Buy grand total - Sell grand total)</span>
                </p>
                <div className={styles.downloadButton}>
                  <Button>Download report</Button>
                </div>
              </div>
              <p className={styles.profitText}>
                110,000 120,000 ={" "}
                <span style={{ color: "#1570EF" }}>440</span>
              </p>
              <div className={styles.divider} />
              <p className={styles.profitBreakdown}>Total profit breakdown</p>
              <p className={styles.fees}>
                Fees: <span>60</span>
              </p>
              <p className={styles.fees}>
                Rate difference: <span>440-60 = 380 </span>
              </p>
            </div>
          </>
        )}
        {data && searchType === "Send" && (
          <div className={styles.bodyContainer}>
            <p className={styles.header}>Send transactions report</p>
            <p className={styles.date}>Date: 01/01/2023 — 01/01/2023</p>
            <p className={styles.date}>Status: Successful</p>

            <p className={styles.header}>Send transactions</p>
            <div className={styles.ordersContainer}>
              <div style={{ flex: 1 }}>
                <div className={styles.order}>
                  <div className={styles.orderIcon} />
                  <p className={styles.orderText1}>
                    <span>BTC</span> <span>1001 trnx</span>{" "}
                    <span className={styles.grey}> 10.02231 BTC</span>{" "}
                    <span className={styles.grey}>10,010.00 USD</span>
                  </p>
                </div>
                <div className={styles.order}>
                  <div className={styles.orderIcon} />
                  <p className={styles.orderText1}>
                    <span>LTC</span> <span>1001 trnx</span>{" "}
                    <span className={styles.grey}> 10.02231 BTC</span>{" "}
                    <span className={styles.grey}>10,010.00 USD</span>
                  </p>
                </div>
                <div className={styles.order}>
                  <div className={styles.orderIcon} />
                  <p className={styles.orderText1}>
                    <span>TRX</span> <span>1001 trnx</span>{" "}
                    <span className={styles.grey}> 10.02231 BTC</span>{" "}
                    <span className={styles.grey}>10,010.00 USD</span>
                  </p>
                </div>
                <div className={styles.order}>
                  <div className={styles.orderIcon} />
                  <p className={styles.orderText1}>
                    <span>MATIC</span> <span>1001 trnx</span>{" "}
                    <span className={styles.grey}> 10.02231 BTC</span>{" "}
                    <span className={styles.grey}>10,010.00 USD</span>
                  </p>
                </div>
                <div className={styles.order}>
                  <div className={styles.orderIcon} />
                  <p className={styles.orderText1}>
                    <span>DOGE</span> <span>1001 trnx</span>{" "}
                    <span className={styles.grey}> 10.02231 BTC</span>{" "}
                    <span className={styles.grey}>10,010.00 USD</span>
                  </p>
                </div>
              </div>
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div style={{ width: 200, height: 200 }}>
                  <CustomPieChart />
                </div>
                <div className={styles.pieIndicators}>
                  <div className={styles.pieIndicator}>
                    <div /> 50%
                  </div>
                  <div className={styles.pieIndicator}>
                    <div /> 50%
                  </div>
                  <div className={styles.pieIndicator}>
                    <div /> 50%
                  </div>
                  <div className={styles.pieIndicator}>
                    <div /> 50%
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.divider} style={{ margin: "24px 0" }} />
            <div className={styles.totalHeader}>
              <p>Total send transactions: 7000</p>
              <a href="#">View transactions</a>
            </div>
          </div>
        )}
        {data && searchType === "Receive" && (
          <div className={styles.bodyContainer}>
            <p className={styles.header}>Received transactions report</p>
            <p className={styles.date}>Date: 01/01/2023 — 01/01/2023</p>
            <p className={styles.date}>Status: Successful</p>

            <p className={styles.header}>Received transactions</p>
            <div className={styles.ordersContainer}>
              <div style={{ flex: 1 }}>
                <div className={styles.order}>
                  <div className={styles.orderIcon} />
                  <p className={styles.orderText1}>
                    <span>BTC</span> <span>1001 trnx</span>{" "}
                    <span className={styles.grey}> 10.02231 BTC</span>{" "}
                    <span className={styles.grey}>10,010.00 USD</span>
                  </p>
                </div>
                <div className={styles.order}>
                  <div className={styles.orderIcon} />
                  <p className={styles.orderText1}>
                    <span>LTC</span> <span>1001 trnx</span>{" "}
                    <span className={styles.grey}> 10.02231 BTC</span>{" "}
                    <span className={styles.grey}>10,010.00 USD</span>
                  </p>
                </div>
                <div className={styles.order}>
                  <div className={styles.orderIcon} />
                  <p className={styles.orderText1}>
                    <span>TRX</span> <span>1001 trnx</span>{" "}
                    <span className={styles.grey}> 10.02231 BTC</span>{" "}
                    <span className={styles.grey}>10,010.00 USD</span>
                  </p>
                </div>
                <div className={styles.order}>
                  <div className={styles.orderIcon} />
                  <p className={styles.orderText1}>
                    <span>MATIC</span> <span>1001 trnx</span>{" "}
                    <span className={styles.grey}> 10.02231 BTC</span>{" "}
                    <span className={styles.grey}>10,010.00 USD</span>
                  </p>
                </div>
                <div className={styles.order}>
                  <div className={styles.orderIcon} />
                  <p className={styles.orderText1}>
                    <span>DOGE</span> <span>1001 trnx</span>{" "}
                    <span className={styles.grey}> 10.02231 BTC</span>{" "}
                    <span className={styles.grey}>10,010.00 USD</span>
                  </p>
                </div>
              </div>
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div style={{ width: 200, height: 200 }}>
                  <CustomPieChart />
                </div>
                <div className={styles.pieIndicators}>
                  <div className={styles.pieIndicator}>
                    <div /> 50%
                  </div>
                  <div className={styles.pieIndicator}>
                    <div /> 50%
                  </div>
                  <div className={styles.pieIndicator}>
                    <div /> 50%
                  </div>
                  <div className={styles.pieIndicator}>
                    <div /> 50%
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.divider} style={{ margin: "24px 0" }} />
            <div className={styles.totalHeader}>
              <p>Total recived transactions: 7000</p>
              <a href="#">View transactions</a>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
