import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import StatsCard from "../Card/StatsCard";
import styles from "./CoinListing.module.css";
import { CoinListingProps } from "./types";
import { coinImage } from "@/utils/coinImage";
import { Skeleton } from "antd";

const CoinListing: React.FC<CoinListingProps> = ({
  title,
  coins,
  loading,
  refresh,
}) => {
  const router = useRouter();

  return (
    // <StatsCard headerTitle={title} showRefresh refresh={refresh}>
    <StatsCard headerTitle={title}>
      <div style={{ padding: loading ? "24px" : "0 24px" }}>
        {loading ? (
          <Skeleton active />
        ) : (
          coins.map((coin, i) => (
            <React.Fragment key={coin.coin}>
              {/* <Link
                href={{
                  pathname: `assets/${coin.coin_code}`,
                }}
                className={styles.coinItem}
              > */}
              <div
                style={{ cursor: "pointer" }}
                className={styles.coinItem}
                onClick={() => router.push(`/assets/${coin.coin_code}`)}
              >
                <img
                  className={styles.coinImage}
                  src={coinImage[coin.coin_code]}
                />
                <p className={styles.coinName}>{coin.coin}</p>
                <p className={styles.coinBalance}>
                  {coin.amount.toFixed(8)} {coin.coin_code} ($
                  {coin.usd.toFixed(2)})
                </p>
              </div>
              {/* </Link> */}
              {i !== coins.length - 1 && <div className={styles.divider} />}
            </React.Fragment>
          ))
        )}
      </div>
    </StatsCard>
  );
};

export default CoinListing;
