import Button from "@/components/Button";
import Card from "@/components/Card/Card";
import Dropdown from "@/components/Dropdown";
import Input from "@/components/Input/Input";
import Modal from "@/components/Modal";
import { NextPage } from "next";
import React, { useRef, useState } from "react";
import styles from "./signin.module.css";
import axios from "axios";
import { BASE_URL } from "../../CONFIG";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const Signin: React.FC<NextPage> = () => {
  const router = useRouter();

  const code1 = useRef(null);
  const code2 = useRef(null);
  const code3 = useRef(null);
  const code4 = useRef(null);
  const codeMap: { [k: number]: any } = {
    0: code1,
    1: code2,
    2: code3,
    3: code4,
  };
  const captchaRef = useRef<any>(null);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [country, setCountry] = useState<any>({});
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [openCodeModal, setOpenCodeModal] = useState<boolean>(false);
  const [pin, setPin] = useState<string>("");
  const [token, setToken] = useState<any>(null);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [loginRes, setLoginRes] = useState<any>({});

  const onLoad = () => {
    // this reaches out to the hCaptcha JS API and runs the
    // execute function on it. you can use other functions as
    // documented here:
    // https://docs.hcaptcha.com/configuration#jsapi
    captchaRef.current?.execute();
  };

  const signIn = () => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/login`, { username, password, hCaptcha: token })
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          setLoginRes(res.data.data);
          // localStorage.setItem("auth", JSON.stringify(res.data.account));
          // router.replace("/dashboard", "/dashboard");
          setShowModal(true);
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
      .catch((e) => {
        if (e.response.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
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

  const verifyMfa = () => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/login/verify-mfa`, {
        requestId: loginRes.requestId,
        mfaToken: verificationCode,
      })
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          setLoginRes(res.data.data);
          localStorage.setItem("auth", JSON.stringify(res.data.data));
          router.replace("/dashboard", "/dashboard");
          setShowModal(false);
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
      .catch((e) => {
        if (e.response.status === 401) {
          localStorage.removeItem("auth");
          router.replace("/", "/");
        }
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

  const updatePin = (digit: string) => {
    if (pin.length < 4) {
      codeMap[pin.length + 1]?.current?.focus();
      setPin(`${pin}${digit}`);
    }
  };

  const deletePin = () => {
    if (pin.length > 0) {
      codeMap[pin.length - 1]?.current?.focus();
      if (codeMap[pin.length - 1]) {
        codeMap[pin.length - 1].current.value = "";
      }
      setPin(pin.slice(0, pin.length - 1));
    }
  };

  const changeCode = (e: any) => {
    if (e.key === "Backspace") {
      deletePin();
    } else {
      updatePin(e.target.value);
    }
  };

  console.log(loginRes);

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
          {loginRes.dataURL && (
            <img src={loginRes.dataURL} className={styles.qrImage} />
          )}
          <p className={styles.verificationText}>Verification code</p>
          <Input
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <div className={styles.footerContainer}>
            <Button className={styles.footerButton}>Cancel</Button>
            <Button
              color="white"
              onClick={verifyMfa}
              className={styles.footerButton}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        headerLeft={
          <div className={styles.lockContainer}>
            <img src="/icons/lock.svg" />
          </div>
        }
        onClose={() => setOpenCodeModal(false)}
        openModal={openCodeModal}
      >
        <div className={styles.modalContainer}>
          <h3 className={styles.modalTitle}>Enter email verificaiton code</h3>
          <p className={styles.modalText}>
            Check your email for a 4-Digit verification code to continue
          </p>
          <div className={styles.codeContainer}>
            <input
              ref={code1}
              onKeyUp={(e) => changeCode(e)}
              className={styles.code}
            />
            <input
              ref={code2}
              onKeyUp={(e) => changeCode(e)}
              className={styles.code}
            />
            <input
              ref={code3}
              onKeyUp={(e) => changeCode(e)}
              className={styles.code}
            />
            <input
              ref={code4}
              onKeyUp={(e) => changeCode(e)}
              className={styles.code}
            />
          </div>
          <div className={styles.footerContainer}>
            <Button className={styles.footerButton}>Cancel</Button>
            <Button
              onClick={() => {
                setOpenCodeModal(false);
                signIn();
              }}
              color="white"
              className={styles.footerButton}
            >
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                marginTop: 15,
              }}
            >
              <HCaptcha
                size="normal"
                // This is testing sitekey, will autopass
                // Make sure to replace
                sitekey="20000000-ffff-ffff-ffff-000000000002"
                // size="invisible"
                onVerify={(token) => {
                  setToken(token);
                  setDisabled(false);
                }}
                onError={(e) => console.log(e)}
                // onExpire={onExpire}
                ref={captchaRef}
              />
            </div>
            {!disabled && (
              <Button
                className={styles.buttonContainer}
                disabled={disabled}
                loading={loading}
                onClick={signIn}
              >
                Sign in
              </Button>
            )}
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
