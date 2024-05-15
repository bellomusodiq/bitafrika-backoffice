import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import StatsCard from "../Card/StatsCard";
import styles from "./CoinListing.module.css";
import { CoinListingProps } from "./types";
import { coinImage } from "@/utils/coinImage";

const CoinListing: React.FC<CoinListingProps> = ({ title, coins }) => {
  const router = useRouter();

  return (
    <StatsCard headerTitle={title} showRefresh>
      <div style={{ padding: "0 24px" }}>
        {coins.map((coin, i) => (
          <React.Fragment key={coin.coin}>
            <Link
              href={{
                pathname: `assets/${coin.coin_code}`,
              }}
              className={styles.coinItem}
            >
              <img
                className={styles.coinImage}
                src={coinImage[coin.coin_code]}
              />
              <p className={styles.coinName}>{coin.coin}</p>
              <p className={styles.coinBalance}>
                {coin.amount.toFixed(8)} {coin.coin_code} ($
                {coin.usdAmount || 200000.0})
              </p>
            </Link>
            {i !== coins.length - 1 && <div className={styles.divider} />}
          </React.Fragment>
        ))}
      </div>
    </StatsCard>
  );
};

export default CoinListing;
