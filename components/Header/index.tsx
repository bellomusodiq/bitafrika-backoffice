import React from "react";
import Button from "../Button";
import styles from "./Header.module.css";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const router = useRouter();
  return (
    <nav className={styles.headerContainer}>
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
        <Button
          onClick={() => {
            localStorage.removeItem("auth");
            router.replace("/signin", "/signin");
          }}
          color="white"
        >
          Log Out
        </Button>
      </div>
    </nav>
  );
};

export default Header;
