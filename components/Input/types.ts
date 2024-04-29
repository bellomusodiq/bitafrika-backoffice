import { ChangeEvent, MouseEvent } from "react";

export interface InputProps {
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onUpdate?: (e: MouseEvent<HTMLButtonElement>) => void;
  type?: string;
  placeholder?: string;
  className?: string;
  leftIcon?: JSX.Element;
  noBorder?: boolean;
  disabled?: boolean;
  loading?: boolean;
}
