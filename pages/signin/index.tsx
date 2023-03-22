import Button from "@/components/Button";
import Card from "@/components/Card/Card";
import Dropdown from "@/components/Dropdown";
import Input from "@/components/Input/Input";
import Modal from "@/components/Modal";
import { NextPage } from "next";
import React, { useState } from "react";
import styles from "./signin.module.css";

const Signin: React.FC<NextPage> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <div className={styles.container}>
      <Modal
        headerLeft={
          <div className={styles.lockContainer}>
            <img src="/icons/lock.svg" />
          </div>
        }
        onClose={() => setShowModal(false)}
        openModal={showModal}
      >
        <div className={styles.modalContainer}>
          <h3 className={styles.modalTitle}>Enter authentication code</h3>
          <p className={styles.modalText}>
            To complete sign in, please scan this QR code with your Google{" "}
            <br />
            Authenticator App or enter the verification code below.
          </p>
          <img src="/images/QR.png" className={styles.qrImage} />
          <p className={styles.verificationText}>Verification code</p>
          <Input
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <div className={styles.footerContainer}>
            <Button className={styles.footerButton}>Cancel</Button>
            <Button color="white" className={styles.footerButton}>Confirm</Button>
          </div>
        </div>
      </Modal>
      <div className={styles.cardContainer}>
        <Card>
          {/* will change div to form */}
          <div className={styles.signinForm}>
            <img src="/images/Logo.png" className={styles.logo} />
            <h4 className={styles.header}>Welcome back</h4>
            <p className={styles.title}>Please enter your details.</p>
            <Input
              placeholder="Enter you email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
            <Input
              placeholder="*******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              type="password"
            />
            <div className={styles.rememberContainer}>
              <input className={styles.checkbox} type="checkbox" />
              <p className={styles.rememberText}>Remember for 30 days</p>
            </div>
            <div className={styles.buttonContainer}>
              <Button onClick={() => setShowModal(true)}>Sign in</Button>
            </div>
            <div className={styles.divider} />
            <div className={styles.dropdownContainer}>
              <Dropdown>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Impedit, voluptatum magnam fugit natus nobis repellendus ex
                alias explicabo quidem distinctio fugiat accusantium consectetur
                eligendi eos veritatis, voluptatem assumenda non odio?
              </Dropdown>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Signin;
