import React from "react";
import Button from "../Button";
import styles from "./NavigationStep.module.css";
import { useRouter } from "next/router";

const NavigationStep: React.FC<{
  hideButton?: boolean;
  color?: string;
  noPadding?: boolean;
}> = ({ hideButton, color = "none", noPadding = false }) => {
  const router = useRouter();
  return (
    <div
      style={{ padding: noPadding ? 0 : "0 32px" }}
      className={styles.navigationStep}
    >
      <div style={{ color }} className={styles.navItems}>
        <span style={{ color }}>Overview</span>
        <img src="/icons/arrow-right2.svg" />
        <span style={{ color }}>Available balances</span>
        <img src="/icons/arrow-right2.svg" />
        <span style={{ color }}>Bitcoin</span>
      </div>
      {!hideButton && (
        <div>
          <Button onClick={() => router.back()} color="white">
            <>
              <img src="/icons/arrow-left.svg" />
              Back to overview
            </>
          </Button>
        </div>
      )}
    </div>
  );
};

export default NavigationStep;
