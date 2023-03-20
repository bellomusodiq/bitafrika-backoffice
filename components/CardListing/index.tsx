import React from "react";
import StatsCard from "../Card/StatsCard";
import styles from "./CardListing.module.css";
import { CardListingProps } from "./types";

const CardListing: React.FC<CardListingProps> = ({ title, cards }) => (
  <StatsCard headerTitle={title}>
    <div style={{ padding: "0 24px" }}>
      {cards.map((card, i) => (
        <React.Fragment key={card.title}>
          <div className={styles.coinItem}>
            <img src={card.icon} />
            <div className={styles.coinName}>
              <p>{card.title}</p>
              <p className={styles.username}>{card.username}</p>
            </div>
            <p
              className={styles.coinBalance}
              style={{ color: card.amount > 0 ? "#039855" : "#F04438" }}
            >
              {card.amount > 0 ? "+" : "-"} ${Math.abs(card.amount)}
            </p>
          </div>
          {i !== cards.length - 1 && <div className={styles.divider} />}
        </React.Fragment>
      ))}
    </div>
  </StatsCard>
);

export default CardListing;
