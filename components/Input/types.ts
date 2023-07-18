import { ChangeEvent } from "react";

export interface InputProps {
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onUpdate?: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  className?: string;
  leftIcon?: JSX.Element;
  noBorder?: boolean;
}
