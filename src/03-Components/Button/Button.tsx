import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import style from "./Button.module.css";

type DefaultInputPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

type ButtonPropsType = DefaultInputPropsType & {}

export const Button: React.FC<ButtonPropsType> = ({children,onClick, className, disabled}) => {

    return <button className={`${style.button} ${className}`} disabled={disabled} onClick={onClick}>{children}</button>

}

export default Button;
