import Card from "@/components/Card/Card";
import Input from "@/components/Input/Input";
import { NextPage } from "next";
import React from "react";
import styles from "./signin.module.css";

const Signin: React.FC<NextPage> = () => {
  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <Card>
          <form className={styles.signinForm}>
            <img src="/images/Logo.png" className={styles.logo} />
            <h4 className={styles.header}>Welcome back</h4>
            <p className={styles.title}>Please enter your details.</p>
            <Input placeholder="Enter you email" />
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Signin;
