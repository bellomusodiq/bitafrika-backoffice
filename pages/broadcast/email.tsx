import React, { useState } from "react";

import PageLayout from "@/components/PageLayout";
import styles from "@/pages/broadcast/broadcast.module.css";
import NavigationStep from "@/components/NavigationStep";
import Button from "@/components/Button";
import Input from "@/components/Input/Input";

export default function Search() {
  return (
    <PageLayout title="Hone">
      <NavigationStep hideButton navigation={["Home", "Broadcast", "SMS"]} />
      <div className={styles.container}>
        <h3 className={styles.header}>Email Broadcasts</h3>
        <p className={styles.label}></p>
        <Input placeholder="Email Subject" />
        <textarea
          placeholder="Message Body"
          className={styles.textArea}
          style={{ marginTop: 16 }}
        ></textarea>
        <p className={styles.hint}></p>
        <div style={{ width: "fit-content" }}>
          <Button>Send email broadcast</Button>
        </div>
      </div>
    </PageLayout>
  );
}
