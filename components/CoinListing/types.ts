export interface CoinListingProps {
  title: string;
  coins: {
    coin: string;
    coin_code: string;
    amount: number;
    count: number;
    usd: number;
  }[];
  loading: boolean;
  refresh?: () => void;
}
