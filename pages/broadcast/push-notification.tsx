import React, { useState } from "react";

import PageLayout from "@/components/PageLayout";
import styles from "@/pages/broadcast/broadcast.module.css";
import NavigationStep from "@/components/NavigationStep";
import Button from "@/components/Button";

export default function Search() {
  return (
    <PageLayout title="Hone">
      <NavigationStep navigation={["Home", "Broadcast", "SMS"]} />
      <div className={styles.container}>
        <h3 className={styles.header}>Push broadcasts</h3>
        <p className={styles.label}>Push notification</p>
        <textarea className={styles.textArea}></textarea>
        <p className={styles.hint}>
        </p>
        <div style={{ width: "fit-content" }}>
          <Button>Send sms broadcast</Button>
        </div>
      </div>
    </PageLayout>
  );
}
