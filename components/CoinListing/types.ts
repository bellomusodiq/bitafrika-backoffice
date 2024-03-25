export interface CoinListingProps {
  title: string;
  coins: {
    coin: string;
    coin_code: string;
    amount: number;
    count: number;
  }[];
}
