export interface ButtonProps {
  children: JSX.Element;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  color?: string;
}
