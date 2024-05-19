export interface ButtonProps {
  children: any;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  color?: string;
  loading?: boolean;
  isText?: boolean;
  size?: any;
}
