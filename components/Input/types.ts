import { InputHTMLAttributes } from "react";

export interface InputProps {
  value: string | number;
  onChange: (e: InputHTMLAttributes<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  className?: string;
}
