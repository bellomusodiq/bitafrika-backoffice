import React from "react";
import Button from "../Button";
import styles from "./NavigationStep.module.css";
import { useRouter } from "next/router";

const NavigationStep: React.FC<{
  hideButton?: boolean;
  color?: string;
  noPadding?: boolean;
  navigation?: string[];
  rightHeader?: JSX.Element;
}> = ({
  hideButton,
  color = "none",
  noPadding = false,
  navigation = [],
  rightHeader,
}) => {
  const router = useRouter();
  return (
    <div
      style={{ padding: noPadding ? 0 : "0 32px" }}
      className={styles.navigationStep}
    >
      {navigation?.length > 0 && (
        <div style={{ color }} className={styles.navItems}>
          {navigation?.map((n, i) => (
            <React.Fragment key={n}>
              <span style={{ color }}>{n}</span>
              {i !== navigation.length - 1 && (
                <img src="/icons/arrow-right2.svg" />
              )}
            </React.Fragment>
          ))}
        </div>
      )}
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
      {rightHeader}
    </div>
  );
};

export default NavigationStep;
