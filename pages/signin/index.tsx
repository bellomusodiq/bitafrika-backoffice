import Button from "@/components/Button";
import Card from "@/components/Card/Card";
import Dropdown from "@/components/Dropdown";
import Input from "@/components/Input/Input";
import Modal from "@/components/Modal";
import { NextPage } from "next";
import React, { useState } from "react";
import styles from "./signin.module.css";
import axios from "axios";
import { BASE_URL } from "../../CONFIG";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Signin: React.FC<NextPage> = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [country, setCountry] = useState<any>({});
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const signIn = () => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/signIn`, { username, password })
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          localStorage.setItem("auth", JSON.stringify(res.data.account));
          router.replace("/dashboard", "/dashboard");
        } else {
          setLoading(false);
          toast.error(res.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      })
      .catch(() => {
        setLoading(false);
        toast.error("Something went wrong, try again", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };
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
            <Button color="white" className={styles.footerButton}>
              Confirm
            </Button>
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
              placeholder="Enter you username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              <Button loading={loading} onClick={signIn}>
                Sign in
              </Button>
            </div>
            <div className={styles.divider} />
            <div className={styles.dropdownContainer}>
              <Dropdown
                options={[{ value: "GH", title: "Ghana" }]}
                onChange={setCountry}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Signin;
