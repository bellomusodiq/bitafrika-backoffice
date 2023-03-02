import React from "react";
import styles from "./Card.module.css";
import { CardProps } from "./types";

const Card: React.FC<CardProps> = ({ children }) => (
  <div className={styles.card}>{children}</div>
);

export default Card;
