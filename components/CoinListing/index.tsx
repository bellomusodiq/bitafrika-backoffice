import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import StatsCard from "../Card/StatsCard";
import styles from "./CoinListing.module.css";
import { CoinListingProps } from "./types";

const CoinListing: React.FC<CoinListingProps> = ({ title, coins }) => {
  const router = useRouter();

  const navigateToAssetDetail = (e) => {
    e.preventDefault();
    router.route("/assets/1");
  };
  return (
    <StatsCard headerTitle={title}>
      <div style={{ padding: "0 24px" }}>
        {coins.map((coin, i) => (
          <React.Fragment key={coin.name}>
            <Link
              href="/assets/1"
              className={styles.coinItem}
            >
              <img src={coin.icon} />
              <p className={styles.coinName}>{coin.name}</p>
              <p className={styles.coinBalance}>
                {coin.balance} {coin.currency}
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
