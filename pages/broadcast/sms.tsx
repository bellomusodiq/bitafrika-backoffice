import React, { useState } from "react";

import PageLayout from "@/components/PageLayout";
import styles from "@/pages/broadcast/broadcast.module.css";
import NavigationStep from "@/components/NavigationStep";
import Button from "@/components/Button";

export default function Search() {
  return (
    <PageLayout title="Hone">
      <NavigationStep hideButton navigation={["Home", "Broadcast", "SMS"]} />
      <div className={styles.container}>
        <h3 className={styles.header}>SMS Broadcasts</h3>
        <p className={styles.label}></p>
        <textarea className={styles.textArea}></textarea>
        <p className={styles.hint}>
          Each SMS has a message limit of 160 characters. Messages with more
          than 160 characters will be segmented into multiple texts
        </p>
        <div style={{ width: "fit-content" }}>
          <Button>Send sms broadcast</Button>
        </div>
      </div>
    </PageLayout>
  );
}
