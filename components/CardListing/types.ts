export interface CardListingProps {
  title: string;
  cards: {
    icon: string;
    title: string;
    username: string;
    amount: number;
  }[];
}
