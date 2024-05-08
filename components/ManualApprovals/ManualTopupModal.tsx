import Modal from "@/components/Modal";
import Input from "@/components/Input/Input";
import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import styles from "@/pages/manual-approvals/manual-approvals.module.css";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/CONFIG";
import axios from "axios";
import { IAdmin } from "@/types";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

interface IProps {
  open: boolean;
  setOpen(value: boolean): void;
  admin: IAdmin;
}

export default function ManualTopupModal({ open, setOpen, admin }: IProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState({ crypto: [], momo: [] });
  const [amount, setAmount] = useState<string | null>(null);
  const [cryptoSymbol, setCryptoSymbol] = useState<string | null>(null);
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [paymentMethodId, setPaymentMethodId] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      aggregateRequests();
    }
  }, [open]);

  const fetchMomoAccounts = async () => {
    const URL = `${BASE_URL}/manual-approvals/top-up/list-user-momo-accounts/${admin.user?.username}`;
    const res = await axios.post(
      URL,
      {},
      {
        headers: {
          Authorization: admin.accessToken,
        },
      }
    );
    return res?.data?.data;
  };

  const fetchCryptoAssets = async () => {
    const URL = `${BASE_URL}/manual-approvals/top-up/list-crypto-symbols-and-platform`;
    const res = await axios.post(
      URL,
      {},
      {
        headers: {
          Authorization: admin.accessToken,
        },
      }
    );
    return res?.data?.data;
  };

  const aggregateRequests = () => {
    Promise.allSettled([fetchMomoAccounts(), fetchCryptoAssets()])
      .then((results) => {
        setData({
          momo: results[0].status === "fulfilled" ? results[0].value : [],
          crypto: results[1].status === "fulfilled" ? results[1].value : [],
        });
      })
      .catch(() => {
        toast.error("Please try again!");
      });
  };

  const onSubmit = async () => {
    let payload = {
      username: admin.user.username,
      transactionId,
      cryptoSymbol,
      paymentMethodId,
      amount,
      platform: "",
    };
    if (amount && transactionId && cryptoSymbol && paymentMethodId && amount) {
      const temp = (data.crypto.find(
        (i: Record<string, string>) => i.symbol === cryptoSymbol
      ) || {}) as Record<string, string>;
      payload.platform = temp ? temp.platform : "";

      setLoading(true);

      const URL = `${BASE_URL}/manual-approvals/top-up/add-manual-top-up`;
      const response = await axios.post(URL, payload, {
        headers: {
          Authorization: admin.accessToken,
        },
      });

      if (response?.status === 401) {
        localStorage.removeItem("auth");
        router.replace("/", "/");
        return;
      }
      setLoading(false);
      if (response?.data?.success) {
        toast.success(response.data.message);
        setOpen(false);
        resetField();
      } else {
        const message =
          response?.data?.message || "Something went wrong, please try again";
        toast.error(message);
      }
    }
  };

  const resetField = () => {
    setData({ crypto: [], momo: [] });
    setAmount(null);
    setCryptoSymbol(null);
    setTransactionId(null);
    setPaymentMethodId(null);
  };
  return (
    <Modal
      customStyles={{ width: 400 }}
      openModal={open}
      onClose={() => {
        resetField();
        setOpen(false);
      }}
    >
      <div className={styles.modalContainer}>
        <p className={styles.modalHeader}>Manual account Top-Up</p>
        <div className={styles.inputContainer}>
          <p>Transaction ID</p>
          <Input
            value={transactionId || ""}
            onChange={(e) => setTransactionId(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <p>Amount</p>
          <Input
            value={amount || ""}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <p>Crypo Asset</p>
          <Dropdown
            value={cryptoSymbol || ""}
            options={[
              { title: "Please select", value: "" },
              ...data.crypto.map((i: any) => ({
                title: i.symbol,
                value: i.symbol,
              })),
            ]}
            onChange={(value) => {
              setCryptoSymbol(value as string);
            }}
          />
        </div>
        <div className={styles.inputContainer}>
          <p>Momo Account</p>
          <Dropdown
            value={paymentMethodId || ""}
            options={[
              { title: "Please select", value: "" },
              ...data.momo.map((i: any) => ({
                title: i.phoneNumber,
                value: i.id,
              })),
            ]}
            onChange={(value) => {
              setPaymentMethodId(value as string);
            }}
          />
        </div>

        <div className={styles.modalFooter}>
          <Button
            onClick={() => {
              resetField();
              setOpen(false);
            }}
            className={styles.modalButton}
            color="white"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            loading={loading}
            onClick={onSubmit}
            className={styles.modalButton}
          >
            Add to queue
          </Button>
        </div>
      </div>
    </Modal>
  );
}
