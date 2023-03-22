import React from "react";
import Button from "../Button";
import styles from "./NavigationStep.module.css";

const NavigationStep: React.FC = () => {
  return (
    <div className={styles.navigationStep}>
      <div className={styles.navItems}>
        <span>Overview</span>
        <img src="/icons/arrow-right2.svg" />
        <span>Available balances</span>
        <img src="/icons/arrow-right2.svg" />
        <span>Bitcoin</span>
      </div>
      <div>
        <Button color="white">
          <>
            <img src="/icons/arrow-left.svg" />
            Back to overview
          </>
        </Button>
      </div>
    </div>
  );
};

export default NavigationStep;
