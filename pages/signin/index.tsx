import Card from "@/components/Card/Card";
import { NextPage } from "next";
import React from "react";
import styles from "./signin.module.css";

const Signin: React.FC<NextPage> = () => {
  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <Card>
          <form className={styles.signinForm}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta
            debitis tenetur libero officiis architecto voluptatum, dolorum quas
            fugiat asperiores eius beatae unde nesciunt autem voluptatem ipsam
            cumque nihil hic animi?
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Signin;
