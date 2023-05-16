export interface TrendItemProps {
  title: string;
  number: string;
  trend?: "up" | "down";
  subTitle?: string;
  trendNumber: number;
  borderTop?: boolean;
  borderRight?: boolean;
  borderBottom?: boolean;
  borderLeft?: boolean;
  dateFrom?: string;
  dateTo?: string;
  onPressAction?: () => void;
  showGraph?: boolean;
  children?: JSX.Element;
}
