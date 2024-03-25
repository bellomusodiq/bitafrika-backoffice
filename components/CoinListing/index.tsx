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
    <StatsCard headerTitle={title}>
      <div style={{ padding: "0 24px" }}>
        {coins.map((coin, i) => (
          <React.Fragment key={coin.coin}>
            <Link href="/assets/1" className={styles.coinItem}>
              <img className={styles.coinImage} src={coinImage[coin.coin_code]} />
              <p className={styles.coinName}>{coin.coin}</p>
              <p className={styles.coinBalance}>
                {coin.amount || 0} {coin.coin_code}
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
