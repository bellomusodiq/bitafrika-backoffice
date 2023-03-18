export interface ButtonProps {
  children: JSX.Element | string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  color?: string;
}
