import { InputHTMLAttributes } from "react";

export interface InputProps {
    value: string | number,
    onChange: (value: InputHTMLAttributes<HTMLInputElement>) => void;
    type: string,
    placeholder: string
}