import React from "react";
import Button from "../Button";
import styles from "./Header.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import { BASE_URL } from "@/CONFIG";
import { message } from "antd";

const Header: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  const signOut = () => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      const userData = JSON.parse(auth);
      axios
        .post(
          `${BASE_URL}/logout`,
          {},
          { headers: { Authorization: userData.accessToken } }
        )
        .then(() => {
          localStorage.removeItem("auth");
          router.replace("/signin", "/signin");
        })
        .catch((res) => {
          if (res.response.status === 401) {
            localStorage.removeItem("auth");
            router.replace("/", "/");
          }
          messageApi.error({ content: res.data.message, duration: 5 });
        });
    }
  };
  return (
    <nav className={styles.headerContainer}>
      {contextHolder}
      <div className={styles.headerLeft}>
        <span className={styles.text}>Welcome, Emmanuel</span>
        <div className={styles.divider} style={{ margin: "0 16px" }} />
        <span className={styles.text}>Monday 10th Feb, 2023</span>
      </div>
      <div className={styles.headerRight}>
        <img src="/icons/bell.svg" />
        <div className={styles.divider} style={{ margin: "0 28px" }} />
        <img src="/icons/GH.svg" />
        <span className={styles.country}>Ghana</span>
        <Button onClick={signOut} color="white">
          Log Out
        </Button>
      </div>
    </nav>
  );
};

export default Header;
