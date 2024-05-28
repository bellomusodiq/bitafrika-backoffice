export interface CardProps {
  children: JSX.Element;
}

export interface StatsCardProps {
  children: JSX.Element;
  headerTitle?: string;
  showRefresh?: boolean;
  refresh?: () => void;
}
