import React, { useMemo, useState } from "react";
import PageLayout from "@/components/PageLayout";
import styles from "@/pages/site-settings/site-settings.module.css";
import Button from "@/components/Button";
import { Skeleton } from "antd";
import Modal from "@/components/Modal";
// import Input from "@/components/Input/Input";
import { Input as AntdInput, Button as AntdButton, message } from "antd";
import Dropdown from "@/components/Dropdown";
import Toggle from "@/components/Toggle";
import axios from "axios";
import { BASE_URL } from "@/CONFIG";
import { useRouter } from "next/router";
import useCustomQuery from "@/hooks/useCustomQuery";

export default function SiteSetting() {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState<string>("");
  const [siteSettings, setSiteSettings] = useState<any>({});
  const [loadingKey, setLoadingKey] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);

  let auth: any = {};
  if (typeof window !== "undefined" && localStorage.getItem("auth")) {
    auth = JSON.parse(localStorage.getItem("auth") || "");
  }

  const {
    isLoading,
    refetch,
    data: { data: result } = {},
  } = useCustomQuery({
    queryKey: ["siteSettings"],
    queryFn: async () => {
      const result = await axios.post(
        `${BASE_URL}/site-settings`,
        {},
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      );
      return result;
    },
  });

  useMemo(() => {
    const temp = result?.data || [];
    const groupedItems = temp.reduce((prev: any, curr: any) => {
      const key = "category";
      if (!prev[curr[key]]) {
        prev[curr[key]] = [];
      }

      prev[curr[key]].push(curr);
      return prev;
    }, {});
    setSiteSettings(groupedItems);
    if (!currentTab || currentTab?.length === 0) {
      setCurrentTab(Object.keys(groupedItems)[0]);
    }

    return groupedItems;
  }, [result]);

  const handleChange = (name: any, value: any) => {
    const currItem = siteSettings?.[currentTab];
    const newValue = currItem.map((i: any) => {
      if (i.name === name) {
        return { ...i, value };
      } else {
        return i;
      }
    });
    setSiteSettings({ ...siteSettings, [currentTab]: newValue });
  };

  const updateFields = (item: any, value?: any) => {
    let tempValue = value || item.value;
    if (typeof value === "boolean") {
      if (value === true) {
        tempValue = "TRUE";
      } else {
        tempValue = "FALSE";
      }
      handleChange(item.name, value);
    }

    setLoadingKey(item.name);

    axios
      .post(
        `${BASE_URL}/site-settings/update-site-settings`,
        {
          category: currentTab,
          name: item.name,
          value: tempValue,
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
          messageApi.success({
            content: `${item.title} updated sucessfully`,
            duration: 5,
          });
          refetch();
        } else {
          messageApi.error({ content: res.data.message, duration: 5 });
        }
      })
      .catch((e) => {
        if (e?.response?.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
      });
  };

  const items = [
    "Sending Crypto Status for Ethereum",
    "Percentage Fee for Withdrawals",
  ];

  return (
    <PageLayout title="Site Settings">
      {contextHolder}
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
          Site settings{" "}
          {currentTab && (
            <span style={{ color: "#98A2B3", textTransform: "capitalize" }}>
              - {currentTab.replaceAll("_", " ")}
            </span>
          )}
        </h3>

        {isLoading ? (
          <Skeleton active style={{ marginTop: 20 }} />
        ) : (
          <div>
            <p className={styles.subHeader}></p>
            <div className={styles.siteSettingsContainer}>
              <div className={styles.navBar}>
                {Object.keys(siteSettings).map(
                  (category: string, idx: number) => (
                    <div
                      key={idx}
                      className={
                        currentTab === category ? styles.tabActive : styles.tab
                      }
                      onClick={() => setCurrentTab(category)}
                    >
                      {currentTab === category && (
                        <div className={styles.indicator} />
                      )}{" "}
                      <span style={{ textTransform: "capitalize" }}>
                        {category.toString().replaceAll("_", " ")}
                      </span>
                    </div>
                  )
                )}
              </div>
              <div className={styles.siteSettingsMain}>
                <div
                  style={{ gap: 5, flexWrap: "wrap" }}
                  className={styles.ratesContainer}
                >
                  {siteSettings?.[currentTab]?.map((item: any, idx: number) => {
                    return (
                      <div
                        style={{ marginBottom: 20 }}
                        className={styles.ratesInputContainer}
                        key={idx}
                      >
                        <div>
                          <p>{item.title}</p>
                          {item.title === items[0] ||
                            (item.title === items[1] && (
                              <p style={{ marginTop: 5 }}>{item.name}</p>
                            ))}
                        </div>
                        {item.editable ? (
                          item.valueType === "BOOL" ? (
                            <div className={styles.value}>
                              <div className={styles.switchContainer}>
                                <Toggle
                                  defaultValue={item.value}
                                  onToggle={(value) => {
                                    updateFields(item, value);
                                  }}
                                />
                              </div>
                            </div>
                          ) : (
                            <div
                              style={{
                                width: "50%",
                                display: "flex",
                                gap: 5,
                              }}
                            >
                              <AntdInput
                                // leftIcon={<div className={styles.leftIcon}>$</div>}
                                size="middle"
                                value={item.value}
                                onChange={(e) =>
                                  handleChange(item.name, e.target.value)
                                }
                              />
                              <AntdButton
                                type="primary"
                                loading={loadingKey === currentTab}
                                onClick={() => updateFields(item)}
                              >
                                Update
                              </AntdButton>
                            </div>
                          )
                        ) : item.valueType === "BOOL" ? (
                          <div className={styles.value}>
                            <div className={styles.switchContainer}>
                              <Toggle
                                disabled
                                defaultValue={item.value}
                                onToggle={(value) => {
                                  handleChange(item.name, value);
                                }}
                              />
                            </div>
                          </div>
                        ) : (
                          <div style={{ width: "50%" }}>
                            <AntdInput
                              // leftIcon={<div className={styles.leftIcon}>$</div>}
                              size="middle"
                              value={item.value}
                              disabled
                              onChange={(e) =>
                                handleChange(item.name, e.target.value)
                              }
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
