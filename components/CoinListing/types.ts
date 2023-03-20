export interface CoinListingProps {
  title: string;
  coins: {
    icon: string;
    name: string;
    balance: string;
    currency: string;
  }[];
}
